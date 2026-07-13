import authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export default class authControler {

  constructor() {
    this.authservice = new authService();
  }

  async signUp(req, res) {
    try {
      const result = await this.authservice.signUp(req.body);
      res.status(200).json({
        success: "true",
        message: "created acount please verify you Email",
        data: result
      })
    } catch (err) {
      res.status(400).json({
        success: "false",
        message: `${err.message}`
      })
    }
  }

  async verifyOtp(req, res) {
    try {
      const user = await this.authservice.verifyOtp(req.body);
      res.status(200).json({
        success: true,
        message: "email verified successfully",
        data: user
      })
    } catch (err) {
      res.status(400).json({
        success: "false",
        message: `${err.message}`
      })
    }
  }

  async forgotPassword(req, res) {
    try {
      await this.authservice.forgotPassword(req.body.email);
      res.status(200).json({
        success: "true",
        message: "if an account exist for this email, then resetPassword email sent"
      })
    } catch (err) {
      res.status(400).json({
        success: "false",
        message: `${err.message}`
      })
    }
  }

  async resetPassword(req, res) {
    try {
      await this.authservice.resetPassword(req.body);
      res.status(200).json({
        success: "true",
        message: "password reset successfully"
      })
    } catch (err) {
      res.status(400).json({
        success: "false",
        message: `${err.message}`
      })
    }
  }

   async login(req, res) {
    try {
        const user = await this.authservice.login(req.body);

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
}