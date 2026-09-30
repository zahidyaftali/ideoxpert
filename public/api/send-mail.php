<?php
/**
 * Website form handler: emails contact and discovery-session enquiries to
 * info@ideoxpert.com through the Hostinger mailbox (SMTP).
 *
 * Settings live in a separate file that is NOT uploaded with the site:
 *   1. ideoxpert-mail-config.php in the folder ABOVE public_html (preferred), or
 *   2. mail-config.php next to this file.
 * Copy mail-config.sample.php, fill in the mailbox password, and upload it to
 * one of those places. Without a password the script falls back to PHP mail().
 *
 * Responds with JSON to fetch() requests; plain form posts (no JavaScript)
 * are redirected back to the page with ?sent=1 or ?error=1.
 */

declare(strict_types=1);

// Errors go to the server log, never into the JSON response.
ini_set('display_errors', '0');

$ajax = (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch');

function respond(bool $ok, string $message, int $status = 200): void
{
	global $ajax;
	if ($ajax) {
		http_response_code($status);
		header('Content-Type: application/json; charset=utf-8');
		header('Cache-Control: no-store');
		echo json_encode(['ok' => $ok, 'message' => $message]);
	} else {
		$back = $_SERVER['HTTP_REFERER'] ?? '/contact';
		$back = strtok($back, '?#') ?: '/contact';
		header('Location: ' . $back . ($ok ? '?sent=1' : '?error=1') . '#form', true, 303);
	}
	exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
	header('Allow: POST');
	respond(false, 'Method not allowed.', 405);
}

// ---------------------------------------------------------------- config
$config = [
	'to' => 'info@ideoxpert.com',
	'from' => 'info@ideoxpert.com',
	'from_name' => 'IdeoXpert Website',
	'smtp_host' => 'smtp.hostinger.com',
	'smtp_port' => 465,
	'smtp_secure' => 'ssl', // 'ssl' (port 465), 'tls' (port 587, STARTTLS) or 'none'
	'smtp_user' => 'info@ideoxpert.com',
	'smtp_pass' => '',
	'allowed_hosts' => ['ideoxpert.com', 'www.ideoxpert.com', 'localhost', '127.0.0.1'],
];
foreach ([dirname(__DIR__, 2) . '/ideoxpert-mail-config.php', __DIR__ . '/mail-config.php'] as $file) {
	if (is_readable($file)) {
		$config = array_merge($config, (array) require $file);
		break;
	}
}

// ---------------------------------------------------------------- checks
// Same-site only: the request must come from one of our own pages.
$source = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$sourceHost = strtolower((string) parse_url($source, PHP_URL_HOST));
if ($sourceHost === '' || !in_array($sourceHost, $config['allowed_hosts'], true)) {
	respond(false, 'This form can only be sent from ideoxpert.com.', 403);
}

// UTF-8 safe length and truncation that do not need the mbstring extension.
$ulen = static fn (string $v): int => (int) preg_match_all('/./us', $v);
$ucut = static fn (string $v, int $max): string => preg_match('/^.{0,' . $max . '}/us', $v, $m) ? $m[0] : substr($v, 0, $max);

$field = static function (string $name, int $max = 200) use ($ucut): string {
	$value = trim((string) ($_POST[$name] ?? ''));
	// Browsers send UTF-8. Text in an old Windows encoding is converted rather
	// than dropped (the UTF-8 checks below would otherwise empty it).
	if (!preg_match('//u', $value)) {
		$value = function_exists('mb_convert_encoding')
			? (string) mb_convert_encoding($value, 'UTF-8', 'Windows-1252')
			: (string) preg_replace('/[\x80-\xFF]/', '?', $value);
	}
	$value = preg_replace('/[^\P{C}\n\t]/u', '', $value) ?? ''; // strip control characters
	return $ucut($value, $max);
};
$oneLine = static fn (string $v): string => trim(preg_replace('/\s+/u', ' ', $v) ?? '');

// Honeypot: a hidden field people never see or fill in.
if ($field('website') !== '') {
	respond(true, 'Thank you.');
}

// Bots submit instantly; people take a few seconds.
$started = (int) ($_POST['ts'] ?? 0);
if ($started > 0 && (int) (microtime(true) * 1000) - $started < 3000) {
	respond(false, 'That was very fast. Please try again.', 429);
}

// Simple rate limit: 5 messages per IP per 10 minutes.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/ideoxpert-form-' . hash('sha256', $ip);
$now = time();
$hits = array_filter(
	is_readable($bucket) ? (array) json_decode((string) file_get_contents($bucket), true) : [],
	static fn ($t) => is_int($t) && $t > $now - 600
);
if (count($hits) >= 5) {
	respond(false, 'Too many messages. Please try again in a few minutes, or email info@ideoxpert.com.', 429);
}

$name = $oneLine($field('name', 100));
$email = $oneLine($field('email', 150));
$message = $field('message', 5000);
$websiteUrl = $oneLine($field('website_url', 200));
$isReview = $field('form', 40) === 'review' || $field('offer', 40) === 'review';
$formName = $isReview ? 'Free website review request' : ($field('form', 40) === 'discovery' ? 'Free plan and quote request' : 'Website inquiry');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
	respond(false, 'Please enter your name and a valid email address.', 422);
}
if ($isReview && $websiteUrl === '') {
	respond(false, 'Please add the address of the website you want us to review.', 422);
}

// ---------------------------------------------------------------- message
// Fields that older versions of the forms sent (phone, company, industry,
// source) are still read, and simply left out of the email when empty.
$rows = [
	'Name' => $name,
	'Email' => $email,
	'Website' => $websiteUrl,
	'Offer' => $isReview ? 'Free website review: reply within 48 hours with the 3 things to fix first' : '',
	'Phone' => $oneLine($field('phone', 40)),
	'Company' => $oneLine($field('company', 120)),
	'Service' => $oneLine($field('service', 80)),
	'Industry' => $oneLine($field('industry', 80)),
	'Heard about us via' => $oneLine($field('source', 80)),
	'Sent from page' => $oneLine($field('page', 200)),
];
$body = $formName . " from ideoxpert.com\n\n";
foreach ($rows as $label => $value) {
	if ($value !== '') {
		$body .= str_pad($label . ':', 20) . $value . "\n";
	}
}
if ($message !== '') {
	$body .= "\nMessage:\n" . $message . "\n";
}
$body .= "\n--\nSent " . gmdate('D, d M Y H:i') . " UTC from IP " . $ip . "\nReply to this email to answer " . $name . " directly.\n";

$subject = $formName . ': ' . $name . ($rows['Service'] !== '' ? ' (' . $rows['Service'] . ')' : '');

// ---------------------------------------------------------------- send
// Spam filters score plain English that is base64-encoded anyway (From,
// Subject, Reply-To, body), so text is only encoded when it has to be.
$ascii = static fn (string $s): bool => !preg_match('/[^\x20-\x7E]/', $s);
$encode = static fn (string $s): string => $ascii($s) ? $s : '=?UTF-8?B?' . base64_encode($s) . '?=';
$mailbox = static fn (string $display, string $addr): string => ($ascii($display) ? '"' . addcslashes($display, '"\\') . '"' : $encode($display)) . ' <' . $addr . '>';
$domain = substr(strrchr($config['from'], '@') ?: '@ideoxpert.com', 1);
$headers = [
	'Date: ' . date('r'),
	'From: ' . $mailbox($config['from_name'], $config['from']),
	'To: <' . $config['to'] . '>',
	'Reply-To: ' . $mailbox($name, $email),
	'Subject: ' . $encode($subject),
	'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $domain . '>',
	'MIME-Version: 1.0',
	'Content-Type: text/plain; charset=UTF-8',
	'Content-Transfer-Encoding: quoted-printable',
	'X-Mailer: IdeoXpert website',
];
// Readable text (quoted-printable keeps plain English as it is).
$encodedBody = quoted_printable_encode(str_replace("\n", "\r\n", $body));

/** Minimal SMTP client (AUTH LOGIN over SSL or STARTTLS). */
function smtp_send(array $c, string $headerBlock, string $body): void
{
	$remote = ($c['smtp_secure'] === 'ssl' ? 'ssl://' : 'tcp://') . $c['smtp_host'] . ':' . $c['smtp_port'];
	$ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
	$fp = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $ctx);
	if (!$fp) {
		throw new RuntimeException("Could not connect to {$c['smtp_host']}: $errstr");
	}
	stream_set_timeout($fp, 20);
	$read = static function () use ($fp): string {
		$data = '';
		while (($line = fgets($fp, 515)) !== false) {
			$data .= $line;
			if (strlen($line) < 4 || $line[3] === ' ') {
				break;
			}
		}
		return $data;
	};
	$cmd = static function (?string $line, array $expect) use ($fp, $read): string {
		if ($line !== null) {
			fwrite($fp, $line . "\r\n");
		}
		$reply = $read();
		if (!in_array((int) substr($reply, 0, 3), $expect, true)) {
			throw new RuntimeException('SMTP error: ' . trim($reply));
		}
		return $reply;
	};
	// Introduce ourselves by the sending domain: a bare IP or "localhost" here
	// is a spam signal.
	$helo = substr(strrchr($c['from'], '@') ?: '@ideoxpert.com', 1);
	$cmd(null, [220]);
	$cmd("EHLO $helo", [250]);
	if ($c['smtp_secure'] === 'tls') {
		$cmd('STARTTLS', [220]);
		if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
			throw new RuntimeException('Could not start TLS.');
		}
		$cmd("EHLO $helo", [250]);
	}
	if ($c['smtp_user'] !== '') {
		$cmd('AUTH LOGIN', [334]);
		$cmd(base64_encode($c['smtp_user']), [334]);
		$cmd(base64_encode($c['smtp_pass']), [235]);
	}
	$cmd('MAIL FROM:<' . $c['from'] . '>', [250]);
	$cmd('RCPT TO:<' . $c['to'] . '>', [250, 251]);
	$cmd('DATA', [354]);
	// Dot-stuffing: a line that starts with "." gets an extra one.
	$data = preg_replace('/^\./m', '..', $headerBlock . "\r\n\r\n" . $body);
	fwrite($fp, $data . "\r\n.\r\n");
	$cmd(null, [250]);
	$cmd('QUIT', [221]);
	fclose($fp);
}

try {
	if ($config['smtp_pass'] !== '') {
		smtp_send($config, implode("\r\n", $headers), $encodedBody);
	} else {
		// No mailbox password configured: use the server's own mail().
		$mailHeaders = array_values(array_filter($headers, static fn ($h) => !preg_match('/^(To|Subject):/', $h)));
		$sent = mail($config['to'], $encode($subject), $encodedBody, implode("\r\n", $mailHeaders), '-f' . $config['from']);
		if (!$sent) {
			throw new RuntimeException('mail() returned false');
		}
	}
} catch (Throwable $e) {
	error_log('IdeoXpert form: ' . $e->getMessage());
	respond(false, 'Sorry, your message could not be sent. Please email info@ideoxpert.com or message us on WhatsApp.', 500);
}

$hits[] = $now;
@file_put_contents($bucket, json_encode(array_values($hits)), LOCK_EX);

respond(true, $isReview
	? 'Thanks. We will look at your website and send you the 3 things we would fix first within 48 hours.'
	: 'Thank you. Your message has been sent. We reply within 24 hours on weekdays.');
