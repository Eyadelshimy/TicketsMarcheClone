import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

async function sendSimpleMessage(recipient, subject, body) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });
  try {
    const data = await mg.messages.create(
      "sandboxc562e747fd1a45ea95912da4e348ca1b.mailgun.org",
      {
        from: "Mailgun Sandbox <postmaster@sandboxc562e747fd1a45ea95912da4e348ca1b.mailgun.org>",
        to: ["Yassin Diab <yassodiab12345@gmail.com>"],
        subject,
        text: body,
      },
    );

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
