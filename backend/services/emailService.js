const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendOtpEmail(to, otp) {
  try {
    return await transporter.sendMail({
      from: `"Hotel Chandra Bharti" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. Valid for 5 minutes.`
    });
  } catch (err) {
    console.error("Email sending failed:", err.message);
    throw new Error(`Failed to send email: ${err.message}`);
  }
}

module.exports = { sendOtpEmail };

// Verify transporter at startup to catch auth/config issues early
transporter.verify()
  .then(() => console.log("Email transporter verified and ready"))
  .catch((err) => console.error("Email transporter verification failed:", err.message));
