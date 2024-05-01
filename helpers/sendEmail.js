import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { META_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "iryna.lender@meta.ua",
    pass: META_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);
const email = {
  to: "irina.lender@ukr.net",
  from: "iryna.lender@meta.ua",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:3000</p>",
};
transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
