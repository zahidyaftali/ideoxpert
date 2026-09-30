// Sends forms marked [data-mail-form] to /api/send-mail.php, which emails
// info@ideoxpert.com through the Hostinger mailbox. Shows the result in the
// form's [data-form-status] element.
const ENDPOINT = '/api/send-mail.php';

document.querySelectorAll<HTMLFormElement>('form[data-mail-form]').forEach((form) => {
	const status = form.querySelector<HTMLElement>('[data-form-status]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
	const started = form.querySelector<HTMLInputElement>('input[name="ts"]');
	if (started) started.value = String(Date.now());

	const show = (kind: 'ok' | 'error' | 'busy', text: string) => {
		if (!status) return;
		status.hidden = false;
		status.dataset.kind = kind;
		status.textContent = text;
	};

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		// Custom dropdowns marked required must have a value.
		let customInvalid: HTMLElement | null = null;
		form.querySelectorAll<HTMLElement>('[data-select][data-required]').forEach((sel) => {
			const empty = !sel.querySelector<HTMLInputElement>('input[type="hidden"]')!.value;
			sel.classList.toggle('is-invalid', empty);
			if (empty && !customInvalid) customInvalid = sel;
		});
		if (!form.checkValidity() || customInvalid) {
			form.classList.add('was-validated');
			(form.querySelector<HTMLElement>(':invalid') ?? (customInvalid as HTMLElement | null)?.querySelector('button'))?.focus();
			return;
		}

		const data = new FormData(form);
		data.set('page', location.pathname);
		submit?.setAttribute('disabled', '');
		show('busy', 'Sending…');
		try {
			const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { 'X-Requested-With': 'fetch' } });
			const json = await res.json().catch(() => null);
			if (res.ok && json?.ok) {
				show('ok', json.message);
				form.reset();
				form.classList.remove('was-validated');
				if (started) started.value = String(Date.now());
			} else {
				show('error', json?.message ?? 'Sorry, your message could not be sent. Please email info@ideoxpert.com or message us on WhatsApp.');
			}
		} catch {
			show('error', 'Sorry, your message could not be sent. Please check your connection, or email info@ideoxpert.com.');
		} finally {
			submit?.removeAttribute('disabled');
		}
	});
});
