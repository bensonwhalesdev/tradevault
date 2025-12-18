import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IContext } from '../context'; 
import { UserInputError } from 'apollo-server-micro'; 
import User from '../../../models/user.model';
import Wallet from '../../../models/wallet.model'
import { connectDB } from '@/app/api/utils/connectdb';

const JWT_SECRET = process.env.JWT_SECRET || 'thisisaseceret';


export const userResolvers = {
  Query: {
    me: async (_: any, args: any, context: IContext) => {
      if (!context.user || !context.user.userId) {
        throw new UserInputError('Authentication required to view profile.');
      }

      const user = await User.findById(context.user.userId); 
      
      if (!user) {
        throw new UserInputError('User not found.');
      }
      return user;
    },
  },

  Mutation: {
    register: async (_: any, { email, password, fullName }: any ) => {
      await connectDB()
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new UserInputError('Email already in use.');
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({ email, passwordHash, fullName }); 
      await newUser.save();
      
      const newWallet = new Wallet({
        userId: newUser._id,
        fiatBalance: 0.00,
        frozenBalance: 0.00,
        currency: 'USD',
      });
      await newWallet.save();

      return newUser;
    },

    login: async (_: any, { email, password }: any ) => {
      await connectDB()
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError('Invalid credentials.');
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        throw new UserInputError('Invalid credentials.');
      }

      const token = jwt.sign( { userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' } );

      return token;
    },
  },
};