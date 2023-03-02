import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();
const { EMAIL_SMTP, EMAIL_SMTP_PORT, EMAIL_SMTP_USERNAME, EMAIL_SMTP_PASSWORD, EMAIL_SENDER_ADDRESS } = process.env;
const port = EMAIL_SMTP_PORT ? +EMAIL_SMTP_PORT : 587

const sendEmailSMTP = async (
  toAddress: string,
  subject: string,
  bodyText: string,
  bodyHtml: string
) => {

  // Create the SMTP transport.
  const transport = nodemailer.createTransport({
    host: EMAIL_SMTP,
    port: port,
    secure: false,
    auth: {
      user: EMAIL_SMTP_USERNAME,
      pass: EMAIL_SMTP_PASSWORD
    }
  });

  // Specify the fields in the email.
  const mailOptions = {
    from: EMAIL_SENDER_ADDRESS,
    to: toAddress,
    subject: subject,
    text: bodyText,
    html: bodyHtml,
    // Custom headers for configuration set and message tags.
    headers: {      
      // 'X-SES-MESSAGE-TAGS': tag0,
      // 'X-SES-MESSAGE-TAGS': tag1
    }
  }

  let message: string;

  try {
    const result = await transport.sendMail(mailOptions);
    message = `Email sent with message ID: ${result.messageId}`;
    console.log(message);
  }
  catch(error) {
    // console.log(`Error message ${error.message}`);
    message = `[sendEmailSMTP] ${error}`
    console.log(message);
  }

  return message;
}

export default sendEmailSMTP;