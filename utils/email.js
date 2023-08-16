import nodemailer from "nodemailer";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.firstName = user.name;
    this.from = `HRMS <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    //send in blue

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(obj, subject, msg) {
    const { email, password } = obj;
    //send actual email

    //render template
    // const html = pug.renderFile(
    //   `${__dirname}/../views/emails/${template}.pug`,
    //   {
    //     firstName: this.firstName,
    //     url: this.url,
    //     subject,
    //   }
    // );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: msg,
      //   text: htmlToText.convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(email, password) {
    await this.send(
      "Welcome to our company",
      `<h1>Welcome to our company</h1><pre>Your login creds are<br>Email:${email}<br>Password:${password} </pre>`
    );
  }

  async sendLeaveReq(employee, from, to) {
    await this.send(
      "Leave Request",
      `<h1>Hello Sir/Maam this mail is regarding to my leave request from data:${from} to ${to}</h1>
      <h3>Best Regards</h3>
      <h3>${employee.name}</h3>`
    );
  }
}
export default Email;
