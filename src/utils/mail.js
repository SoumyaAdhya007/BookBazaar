import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import env from "../config/env.config.js";
import logger from "../config/logger.config.js";

const sendMail = async (emailAddress, emailSubject, emailContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: env.MAILTRAP_SMTP_HOST,
      port: env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: env.MAILTRAP_SMTP_USERNAME,
        pass: env.MAILTRAP_SMTP_PASSWORD,
      },
    });
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "BookBazar",
        link: "https://mailgen.js/",
      },
    });
    const emailBody = mailGenerator.generate(emailContent);

    const emailText = mailGenerator.generatePlaintext(emailContent);

    await transporter.sendMail({
      from: '"BookBazar" <order@bookbazar.onrender.com>',
      to: emailAddress,
      subject: emailSubject,
      text: emailText, // plain‑text body
      html: emailBody, // HTML body
    });
    logger.info(`\n 📤 Mail send successfully.`);
  } catch (error) {
    logger.error(`\n ❌ Error while sending Email: ${error}`);
  }
};

const orderConfirmationEMail = (username, books, orderId) => {
  return {
    body: {
      name: username,
      intro:
        "Thank you for shopping with BookBazaar! 🎉 Your order has been successfully placed.",
      table: {
        data: books,
        columns: {
          customWidth: {
            item: "30%",
            author: "40%",
            price: "30%",
          },
          customAlignment: {
            price: "right",
          },
        },
      },
      action: {
        instructions:
          "You can view your order details and track its status by clicking the button below:",
        button: {
          color: "#22BC66",
          text: "View My Order",
          link: `https://bookbazaar-38rt.onrender.com/api/v1/orders/${orderId}`,
        },
      },
      outro:
        "Thank you for choosing BookBazaar. We hope you enjoy your new books! 📚",
    },
  };
};

export { sendMail, orderConfirmationEMail };
