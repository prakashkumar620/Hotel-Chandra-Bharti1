const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../services/emailService");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPass = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPass });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: err.message || "Failed to send OTP" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.resetOtp !== Number(otp) || user.resetOtpExpires < Date.now())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOtp = undefined;
  user.resetOtpExpires = undefined;

  await user.save();
  res.json({ message: "Password reset successful" });
};
