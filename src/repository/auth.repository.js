import { userModel } from "../models/user.model.js"
import bcrypt from "bcrypt";

export default class authRepo {
  async signUp(data) {
    try {
      const user = await userModel.create(data);
      user.save();
      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new Error("Email already exists");
      }
      throw err;
    }
  }

  async verifyUser(email) {
    try {
      return await userModel.findOneAndUpdate(
        { email },
        { isVerified: true },
        { returnDocument: "after" }
      )
    } catch (err) {
      throw err;
    }
  }

  async updatePassword(email, password) {
    try {
      return await userModel.findOneAndUpdate(
        { email },
        { password },
        { returnDocument: "after" }
      )
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email) {
    return await userModel.findOne({ email });
  }

  async login(data) {
    const user = await userModel.findOne({
      email: data.email
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return user;
  }
}