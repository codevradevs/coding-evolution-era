const nodemailer = require('nodemailer');

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.warn('[mailer] WARNING: GMAIL_USER or GMAIL_APP_PASSWORD not set — emails will not be sent.');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendContactEmails({ name, email, subject, message }) {
  const isIntake = subject?.startsWith('Project Intake');

  const notifyMail = transporter.sendMail({
    from: `"Codevra Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `📬 New ${isIntake ? 'Project Intake' : 'Message'}: ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px;">
        <h2 style="color:#7c3aed;margin-bottom:4px;">New ${isIntake ? 'Project Intake' : 'Contact Message'}</h2>
        <p style="color:#888;font-size:13px;margin-top:0;">Received via codevra.vercel.app</p>
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

  const autoReply = transporter.sendMail({
    from: `"Codevra Devs" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `We received your message — Codevra Devs`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px;">
        <h2 style="color:#7c3aed;">Hey ${name}, we got your message! 👋</h2>
        <p style="color:#aaa;font-size:14px;line-height:1.6;">
          Thanks for reaching out to <strong style="color:#e5e5e5;">Codevra Devs</strong>. We've received your ${isIntake ? 'project intake' : 'message'} and will get back to you within <strong style="color:#7c3aed;">24 hours</strong>.
        </p>
        ${isIntake ? `<p style="color:#aaa;font-size:14px;">In the meantime, book a free 30-min consultation directly:</p>
        <a href="https://calendly.com/codevradevs/codevra-devs-project-consultation" style="display:inline-block;background:#7c3aed;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;margin-top:4px;">Book Free Consultation →</a>` : ''}
        <hr style="border-color:#333;margin:24px 0;" />
        <p style="color:#555;font-size:12px;">Codevra Devs · Nairobi, Kenya · <a href="https://codevra.vercel.app" style="color:#7c3aed;">codevra.vercel.app</a></p>
      </div>
    `,
  }).catch(err => console.error('[mailer] Auto-reply email failed:', err.message));

  await Promise.allSettled([notifyMail, autoReply]);
}

module.exports = { sendContactEmails };
