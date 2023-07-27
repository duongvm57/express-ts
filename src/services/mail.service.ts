import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

function sendmail(subject: string, body: any, mailTo: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'zius.wu05@gmail.com',
      pass: 'bjucaxystjbjxnxl'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const options = {
    from: 'Express 👻',
    to: mailTo,
    subject: subject,
    text: '',
    html: body
  };

  transporter.sendMail(options, (err, info: SMTPTransport.SentMessageInfo) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.accepted, info.rejected, info.pending);
  });
}

export { sendmail };
