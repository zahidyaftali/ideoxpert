<?php
/**
 * Mail settings for send-mail.php.
 *
 * 1. Copy this file and name the copy  ideoxpert-mail-config.php
 * 2. Put the password of the info@ideoxpert.com mailbox below
 *    (Hostinger hPanel > Emails > info@ideoxpert.com > change password if needed).
 * 3. Upload the copy to the folder ABOVE public_html (your home folder), so it
 *    is never reachable from the web. Uploading it as api/mail-config.php
 *    also works.
 *
 * Never commit the filled-in copy to Git.
 */
return [
	'to' => 'info@ideoxpert.com',          // where enquiries arrive
	'from' => 'info@ideoxpert.com',        // must be a mailbox on your domain
	'from_name' => 'IdeoXpert Website',
	'smtp_host' => 'smtp.hostinger.com',
	'smtp_port' => 465,
	'smtp_secure' => 'ssl',
	'smtp_user' => 'info@ideoxpert.com',
	'smtp_pass' => '',                     // <-- mailbox password
];
