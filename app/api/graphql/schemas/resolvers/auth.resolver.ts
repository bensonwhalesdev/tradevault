import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IContext } from "../context";
import { UserInputError } from "apollo-server-micro";
import User from "../../../models/user.model";
import Wallet from "../../../models/wallet.model";
import { connectDB } from "@/app/api/utils/connectdb";

const JWT_SECRET = process.env.NEXT_JWT_SECRET || "thisisaseceret";

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      try {
        await connectDB();

        if (!context.user) throw new Error("Not authenticated");
        const user = await User.findById(context.user.userId);
        if (!user) throw new Error("User not found");
        return {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          createdAt: user.createdAt,
        };
      } catch (error: any) {
        console.error("Error in me query:", error);
        throw new Error(error.message || "Failed to fetch user");
      }
    },
  },

  Mutation: {
    register: async (_: any, { email, password, fullName }: any) => {
      try {
        await connectDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new UserInputError("Email already in use.");
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ email, passwordHash, fullName });
        await newUser.save();

        const newWallet = new Wallet({
          userId: newUser._id,
          fiatBalance: 0.0,
          frozenBalance: 0.0,
          currency: "USD",
        });
        await newWallet.save();

        return {
          id: newUser._id.toString(),
          email: newUser.email,
          fullName: newUser.fullName,
        };
      } catch (error: any) {
        console.error("Registration error:", error);
        throw new Error(error.message || "Failed to register user");
      }
    },

    login: async (_: any, { email, password }: any) => {
      try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw new UserInputError("Invalid credentials.");
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          throw new UserInputError("Invalid credentials.");
        }

        const token = jwt.sign(
          {
            _id: user._id.toString(),
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        return token;
      } catch (error: any) {
        console.error("Login error:", error);
        throw new Error(error.message || "Failed to login");
      }
    },

    updateUserBalance: async (
      _: any,
      { userId, amount }: any,
      context: any
    ) => {
      try {
        await connectDB();

        // Check if user is authenticated and is an admin
        if (!context.user) throw new Error("Not authenticated");
        const adminUser = await User.findById(context.user.userId);
        if (!adminUser || adminUser.role !== "admin") {
          throw new Error("Only admins can update user balance");
        }

        // Find and update the target user's wallet
        const wallet = await Wallet.findOneAndUpdate(
          { userId },
          { $set: { fiatBalance: amount } },
          { new: true }
        );

        if (!wallet) {
          throw new Error("Wallet not found for user");
        }

        return wallet;
      } catch (error: any) {
        throw new Error(error.message || "Failed to update user balance");
      }
    },
  },
};
