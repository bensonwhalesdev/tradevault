import { connectDB } from "@/app/api/utils/connectdb";
import User from "../../../models/user.model";

export const getAllUsersResolvers = {
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

    getAllUsers: async (_: any, __: any, context: any) => {
      try {
        await connectDB();

        // Check if user is authenticated and is an admin
        if (!context.user) throw new Error("Not authenticated");
        const adminUser = await User.findById(context.user.userId);
        if (!adminUser || adminUser.role !== "admin") {
          throw new Error("Only admins can view all users");
        }

        const users = await User.find({});
        return users.map((user: any) => ({
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          createdAt: user.createdAt,
        }));
      } catch (error: any) {
        throw new Error(error.message || "Failed to fetch users");
      }
    },
  },
};
