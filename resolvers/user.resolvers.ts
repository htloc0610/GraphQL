import User from "../models/user.model"; // Assuming you have a User model defined
import md5 from "md5";
import jwt from "jsonwebtoken";

export const UserResolvers = {
  Mutation: {
    registerUser: async (
      _: any,
      args: { user: { fullName: string; email: string; password: string } }
    ) => {
      const { user } = args;
      const hashedPassword = md5(user.password);
      const token = jwt.sign(
        { id: user.email, fullName: user.fullName },
        process.env.YOUR_SECRET_KEY,
        { expiresIn: "1h" }
      );
      const newUser = new User({
        fullName: user.fullName,
        email: user.email,
        password: hashedPassword,
        token: token,
      });

      await newUser.save();

      return {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        token: newUser.token,
      };
    },
    loginUser: async (
      _: any,
      args: { user: { email: string; password: string } }
    ) => {
      const { user } = args;
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        throw new Error("User not found");
      }

      const hashedPassword = md5(user.password);
      if (hashedPassword !== existingUser.password) {
        throw new Error("Invalid password");
      }

      return {
        id: existingUser.id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        token: existingUser.token,
      };
    },
  },

  Query: {
    getUser: async (_: any, __: any, context: any) => {
      const user = context["user"];

      if (!user) {
        throw new Error("User not found");
      }

      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        token: user.token,
      };
    },
  },
};
