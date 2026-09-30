import { defineConfig } from 'astro/config';
import { writeFileSync, existsSync } from 'node:fs';
// Contact form mail settings on hosts that build the site from GitHub.
// The mailbox password is never in Git. If the build has the environment
// variable IDEOXPERT_SMTP_PASS (set it in the host's deployment settings),
// the build writes dist/api/mail-config.php with it. Local builds use
// public/api/mail-config.php instead (gitignored).
const mailConfig = {
  name: 'ideoxpert-mail-config',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const pass = process.env.IDEOXPERT_SMTP_PASS;
      const file = new URL('api/mail-config.php', dir);
      if (pass) {
        const quoted = "'" + pass.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
        const php = `<?php\n// Written by the build from IDEOXPERT_SMTP_PASS. Not in Git.\nreturn ['smtp_pass' => ${quoted}];\n`;
        writeFileSync(file, php);
        logger.info('mail config written from IDEOXPERT_SMTP_PASS');
      } else if (!existsSync(file)) {
        logger.warn('no mail password: set IDEOXPERT_SMTP_PASS or upload ideoxpert-mail-config.php above public_html (see README)');
      }
    },
  },
};

export default defineConfig({
  site: 'https://ideoxpert.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  compressHTML: false,
  integrations: [mailConfig],
});
