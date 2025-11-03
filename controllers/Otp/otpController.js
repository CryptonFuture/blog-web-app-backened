import Otp from "../../models/otpModel/otpModel.js";
import otpGenerator from "otp-generator";
import { sendEmail } from '../../helper/emailServices.js'


const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const expiresAt = new Date(Date.now() + 60 * 1000);

    const newOtp = new Otp({ email, otp, expiresAt });
    await newOtp.save();


    sendEmail(newOtp.email, "Account created", otp);

    return res.status(200).json({
      message: "OTP sent successfully!",
      otp,
      expiresIn: 300,
      expiresAt
    });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP", error: error.message });
  }
};


const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ error: "Email and OTP are required" });

    const validOtp = await Otp.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (validOtp.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const lastOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (lastOtp) {
      const timeDiff = (Date.now() - lastOtp.createdAt.getTime()) / 1000;
      if (timeDiff < 30) {
        const wait = 30 - Math.floor(timeDiff);
        return res.status(400).json({
          message: `Please wait ${wait} seconds before resending OTP.`,
        });
      }
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const expiresAt = new Date(Date.now() + 60 * 1000);

    const newOtp = new Otp({ email, otp, expiresAt });
    await newOtp.save();

    await sendEmail(email, otp);

    res.status(200).json({
      message: "New OTP sent successfully!",
      expiresAt, 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {
    sendOtp,
    verifyOtp,
    resendOtp
}
