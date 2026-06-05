const { Resend } = require('resend');
const twilio = require('twilio');

if (!process.env.RESEND_API_KEY) {
  console.warn('[mailer] WARNING: RESEND_API_KEY not set — emails will not be sent.');
}

console.log('[mailer] RESEND_API_KEY set:', !!process.env.RESEND_API_KEY);
console.log('[mailer] FROM email:', process.env.RESEND_FROM || 'NOT SET');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.RESEND_FROM || 'Codevra <hello@codevra.co.ke>';

function getRoutingEmail(subject = '') {
  const s = subject.toLowerCase();
  if (s.startsWith('project intake')) return process.env.EMAIL_SALES || 'sales@codevra.co.ke';
  if (s.includes('partnership') || s.includes('media') || s.includes('press')) return process.env.EMAIL_PARTNERSHIPS || 'partnerships@codevra.co.ke';
  if (s.includes('career') || s.includes('job') || s.includes('hiring')) return process.env.EMAIL_CAREERS || 'careers@codevra.co.ke';
  if (s.includes('bug') || s.includes('api') || s.includes('technical') || s.includes('dev')) return process.env.EMAIL_DEV || 'dev@codevra.co.ke';
  if (s.includes('support') || s.includes('help') || s.includes('issue')) return process.env.EMAIL_SUPPORT || 'support@codevra.co.ke';
  return process.env.EMAIL_HELLO || 'hello@codevra.co.ke';
}

async function sendContactEmails({ name, email, subject, message }) {
  if (!resend) return console.error('[mailer] Skipping — RESEND_API_KEY not set.');
  const isIntake = subject?.startsWith('Project Intake');
  const routeTo = getRoutingEmail(subject);

  const notifyMail = resend.emails.send({
    from: FROM,
    to: routeTo,
    subject: `📬 New ${isIntake ? 'Project Intake' : 'Message'}: ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px;">
        <h2 style="color:#7c3aed;margin-bottom:4px;">New ${isIntake ? 'Project Intake' : 'Contact Message'}</h2>
        <p style="color:#888;font-size:13px;margin-top:0;">Received via codevra.co.ke → routed to ${routeTo}</p>
        <hr style="border-color:#333;margin:16px 0;" />
        <table style="width:100%;font-size:14px;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;width:100px;">Name</td><td style="color:#e5e5e5;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td><a href="mailto:${email}" style="color:#7c3aed;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Subject</td><td style="color:#e5e5e5;">${subject}</td></tr>
        </table>
        <hr style="border-color:#333;margin:16px 0;" />
        <p style="font-size:13px;color:#888;margin-bottom:8px;">Message:</p>
        <div style="background:#1a1a1a;border-left:3px solid #7c3aed;padding:12px 16px;border-radius:6px;font-size:14px;white-space:pre-wrap;">${message}</div>
        <hr style="border-color:#333;margin:24px 0;" />
        <a href="mailto:${email}" style="background:#7c3aed;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;">Reply to ${name}</a>
      </div>
    `,
  }).catch(err => console.error('[mailer] Notify email failed:', err.message));

  const autoReply = resend.emails.send({
    from: FROM,
    replyTo: routeTo,
    to: email,
    subject: `We received your message — Codevra`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px;">
        <h2 style="color:#7c3aed;">Hey ${name}, we got your message! 👋</h2>
        <p style="color:#aaa;font-size:14px;line-height:1.6;">
          Thanks for reaching out to <strong style="color:#e5e5e5;">Codevra Devs</strong>. We've received your ${isIntake ? 'project intake' : 'message'} and will get back to you within <strong style="color:#7c3aed;">24 hours</strong>.
        </p>
        ${isIntake ? `<p style="color:#aaa;font-size:14px;">In the meantime, book a free 30-min consultation directly:</p>
        <a href="https://calendly.com/codevradevs/codevra-devs-project-consultation" style="display:inline-block;background:#7c3aed;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;margin-top:4px;">Book Free Consultation →</a>` : ''}
        <hr style="border-color:#333;margin:24px 0;" />
        <p style="color:#555;font-size:12px;">Codevra · Nairobi, Kenya · <a href="https://www.codevra.co.ke" style="color:#7c3aed;">codevra.co.ke</a></p>
      </div>
    `,
  }).catch(err => console.error('[mailer] Auto-reply email failed:', err.message));

  await Promise.allSettled([notifyMail, autoReply]);
}

async function sendServiceQuoteEmail({ name, email, company, serviceTitle, requirements, proposal }) {
  if (!resend) return console.error('[mailer] Skipping — RESEND_API_KEY not set.');
  const notifyMail = resend.emails.send({
    from: FROM,
    to: process.env.EMAIL_SALES || 'sales@codevra.co.ke',
    subject: `💼 New Service Quote: ${serviceTitle}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px;">
        <h2 style="color:#7c3aed;margin-bottom:4px;">New Service Quote Request</h2>
        <p style="color:#888;font-size:13px;margin-top:0;">Received via Codevra Services Page</p>
        <hr style="border-color:#333;margin:16px 0;" />
        <table style="width:100%;font-size:14px;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="color:#e5e5e5;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td><a href="mailto:${email}" style="color:#7c3aed;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Company</td><td style="color:#e5e5e5;">${company || 'N/A'}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Service</td><td style="color:#e5e5e5;font-weight:bold;">${serviceTitle}</td></tr>
        </table>
        <hr style="border-color:#333;margin:16px 0;" />
        <p style="font-size:13px;color:#888;margin-bottom:8px;">Requirements:</p>
        <div style="background:#1a1a1a;border-left:3px solid #7c3aed;padding:12px 16px;border-radius:6px;font-size:14px;white-space:pre-wrap;margin-bottom:16px;">${requirements}</div>
        <p style="font-size:13px;color:#888;margin-bottom:8px;">Generated Proposal:</p>
        <div style="background:#1a1a1a;border-left:3px solid #22c55e;padding:12px 16px;border-radius:6px;font-size:13px;white-space:pre-wrap;">${proposal}</div>
        <hr style="border-color:#333;margin:24px 0;" />
        <a href="mailto:${email}" style="background:#7c3aed;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;">Reply to ${name}</a>
      </div>
    `,
  }).catch(err => console.error('[mailer] Service quote notify failed:', err.message));

  const autoReply = resend.emails.send({
    from: FROM,
    to: email,
    subject: `Your quote for ${serviceTitle} — Codevra Devs`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px;">
        <h2 style="color:#7c3aed;">Hey ${name}, we received your quote! 💼</h2>
        <p style="color:#aaa;font-size:14px;line-height:1.6;">
          Thanks for requesting a quote for <strong style="color:#e5e5e5;">${serviceTitle}</strong>. We'll review your requirements and get back to you within <strong style="color:#7c3aed;">24 hours</strong>.
        </p>
        <p style="color:#aaa;font-size:14px;">Want to fast-track your project? Book a free 30-min consultation:</p>
        <a href="https://calendly.com/codevradevs/codevra-devs-project-consultation" style="display:inline-block;background:#7c3aed;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;margin-top:4px;">Book Free Consultation →</a>
        <hr style="border-color:#333;margin:24px 0;" />
        <p style="color:#555;font-size:12px;">Codevra · Nairobi, Kenya · <a href="https://www.codevra.co.ke" style="color:#7c3aed;">codevra.co.ke</a></p>
      </div>
    `,
  }).catch(err => console.error('[mailer] Service quote auto-reply failed:', err.message));

  await Promise.allSettled([notifyMail, autoReply]);
}

async function sendPasswordResetEmail({ name, email, resetLink }) {
  if (!resend) return console.error('[mailer] Skipping — RESEND_API_KEY not set.');
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Reset your Codevra password`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px;">
        <h2 style="color:#22c55e;">Password Reset Request 🔐</h2>
        <p style="color:#aaa;font-size:14px;line-height:1.6;">Hey ${name}, we received a request to reset your <strong style="color:#e5e5e5;">Codevra</strong> password.</p>
        <p style="color:#aaa;font-size:14px;">Click the button below to set a new password. This link expires in <strong style="color:#22c55e;">15 minutes</strong>.</p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${resetLink}" style="background:#22c55e;color:#000;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;font-weight:bold;">Reset My Password →</a>
        </div>
        <p style="color:#555;font-size:12px;">If you didn't request this, ignore this email — your password won't change.</p>
        <hr style="border-color:#333;margin:24px 0;" />
        <p style="color:#555;font-size:12px;">Codevra · Nairobi, Kenya · <a href="https://www.codevra.co.ke" style="color:#22c55e;">codevra.co.ke</a></p>
      </div>
    `,
  }).catch(err => console.error('[mailer] Password reset email failed:', err.message));
}

async function sendWhatsAppNotification(body) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.TWILIO_WHATSAPP_TO;

  if (!accountSid || !authToken || !from || !to) {
    console.warn('[whatsapp] Twilio env vars not set — skipping WhatsApp notification.');
    return;
  }

  const client = twilio(accountSid, authToken);
  try {
    const msg = await client.messages.create({ from, to, body });
    console.log(`[whatsapp] ✅ Sent successfully. SID: ${msg.sid}`);
  } catch (err) {
    console.error(`[whatsapp] ❌ Failed — Code: ${err.code}, Message: ${err.message}`);
  }
}

module.exports = { sendContactEmails, sendPasswordResetEmail, sendServiceQuoteEmail, sendWhatsAppNotification };
