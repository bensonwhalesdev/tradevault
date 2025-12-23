import { connectDB } from "@/app/api/utils/connectdb";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import Wallet from "../../../models/wallet.model";
import Asset from "../../../models/assets.model";
import Order from "../../../models/order.model";
import Transaction from "../../../models/transaction.model";
import { IAsset } from "@/app/api/models/assets.model";
import { IOrder } from "@/app/api/models/order.model";
import { ITransaction } from "@/app/api/models/transaction.model";

// Define the GraphQL Context type to match your Auth middleware structure
interface Context {
  user?: {
    _id: string;
    id?: string;
    userId: string;
    email?: string;
  };
}

interface DepositArgs {
  amount: number;
  method: string;
};

interface PlaceOrderArgs {
  assetSymbol: string;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  quantity: number;
  price?: number;
}

interface CancelOrderArgs {
  orderId: string;
}

const tradeResolvers = {
  Query: {
    // --- Portfolio & Wallet ---
    wallet: async (_: any, __: any, context: Context): Promise<any | null> => {
      try {
        await connectDB();
        
        // Extract userId from nested context object
       const userId = context.user?.userId;
        
        if (!userId) throw new AuthenticationError("Unauthorized: Session not found");

        const wallet = await Wallet.findOne({ userId });
        
        if (!wallet) {
          console.log("No wallet document found for this ID in MongoDB");
          return null;
        }

        const assets = await Asset.find({ userId });
        const totalInvested = assets.reduce(
          (acc, curr) => acc + (curr.quantity * (curr.avgCost || 0)), 
          0
        );

        // Fallback data for new accounts with empty arrays to prevent UI/Chart breakage
        const defaultHistory = [{ name: 'Initial', value: wallet.fiatBalance }];
        const defaultAllocation = [{ name: 'Cash', value: 100, color: '#D4AF37' }];

        return {
          ...wallet._doc,
          id: wallet._id.toString(),
          totalValue: wallet.fiatBalance + totalInvested,
          totalInvested: totalInvested,
          dailyChange: 0, 
          dailyChangePercent: 0,
          monthlyProfit: 0,
          tradesToday: 0,
          performanceHistory: wallet.performanceHistory?.length > 0 ? wallet.performanceHistory : defaultHistory,
          assetAllocation: wallet.assetAllocation?.length > 0 ? wallet.assetAllocation : defaultAllocation,
        };
      } catch (err: any) {
        console.error("Wallet Resolver Error:", err.message);
        throw new Error(err.message);
      }
    },

    openOrders: async (_: any, __: any, context: Context): Promise<IOrder[]> => {
      try {
        await connectDB();
        const userId = context.user?._id || context.user?.id;
        if (!userId) throw new AuthenticationError("Unauthorized");

        return await Order.find({
          userId,
          status: "OPEN",
        }).sort({ createdAt: -1 });
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    tradeHistory: async (_: any, __: any, context: Context): Promise<IOrder[]> => {
      try {
        await connectDB();
        const userId = context.user?._id || context.user?.id;
        if (!userId) throw new AuthenticationError("Unauthorized");

        return await Order.find({
          userId,
          status: { $in: ["FILLED", "CANCELLED"] },
        }).sort({ createdAt: -1 });
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    transactionHistory: async (_: any, __: any, context: Context): Promise<ITransaction[]> => {
      try {
        await connectDB();
        const userId = context.user?._id || context.user?.id;
        if (!userId) throw new AuthenticationError("Unauthorized");

        return await Transaction.find({ userId }).sort({ createdAt: -1 });
      } catch (err: any) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    // --- Wallet Actions ---
    requestDeposit: async (_: any, { amount, method }: DepositArgs, context: Context): Promise<ITransaction> => {
      try {
        await connectDB();
        const userId = context.user?._id || context.user?.id;
        if (!userId) throw new AuthenticationError("Unauthorized");

        const referenceId = `TX-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

        const transaction = await Transaction.create({
          userId,
          type: "DEPOSIT",
          status: "COMPLETED",
          amount,
          method,
          referenceId,
          currency: "USD",
        });

        await Wallet.findOneAndUpdate(
          { userId },
          { $inc: { fiatBalance: amount } },
          { upsert: true, new: true }
        );

        return transaction;
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    // --- Trading Engine Logic ---
    placeOrder: async (_: any, args: PlaceOrderArgs, context: Context): Promise<IOrder> => {
      const { assetSymbol, side, type, quantity, price } = args;
      try {
        await connectDB();
        const userId = context.user?._id || context.user?.id;
        if (!userId) throw new AuthenticationError("Unauthorized");

        const wallet = await Wallet.findOne({ userId });
        if (!wallet) throw new Error("Wallet not found. Please contact support.");

        const executionPrice = type === "MARKET" ? Math.random() * 100 + 40000 : price || 0;
        const totalOrderValue = quantity * executionPrice;

        if (side === "BUY") {
          if (wallet.fiatBalance < totalOrderValue) throw new UserInputError("Insufficient Balance");
        } else {
          const asset = await Asset.findOne({ userId, assetSymbol });
          if (!asset || asset.quantity < quantity) throw new UserInputError("Insufficient Assets");
        }

        const order = await Order.create({
          userId,
          assetSymbol,
          side,
          type,
          status: type === "MARKET" ? "FILLED" : "OPEN",
          quantity,
          price: executionPrice,
          filledQuantity: type === "MARKET" ? quantity : 0,
        });

        if (type === "MARKET") {
          if (side === "BUY") {
            await Wallet.updateOne({ userId }, { $inc: { fiatBalance: -totalOrderValue } });
            await Asset.updateOne(
              { userId, assetSymbol },
              { $inc: { quantity: quantity }, $set: { avgCost: executionPrice } },
              { upsert: true }
            );
          } else {
            await Wallet.updateOne({ userId }, { $inc: { fiatBalance: totalOrderValue } });
            await Asset.updateOne({ userId, assetSymbol }, { $inc: { quantity: -quantity } });
          }
        } else if (type === "LIMIT" && side === "BUY") {
          await Wallet.updateOne(
            { userId },
            { $inc: { fiatBalance: -totalOrderValue, frozenBalance: totalOrderValue } }
          );
        }

        return order;
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    cancelOrder: async (_: any, { orderId }: CancelOrderArgs, context: Context): Promise<IOrder> => {
      try {
        await connectDB();
        const userId = context.user?._id || context.user?.id;
        if (!userId) throw new AuthenticationError("Unauthorized");

        const order = await Order.findOne({ _id: orderId, userId, status: "OPEN" });
        if (!order) throw new Error("Order not found or already closed");

        if (order.side === "BUY" && order.type === "LIMIT") {
          const refundAmount = order.quantity * order.price;
          await Wallet.updateOne(
            { userId },
            { $inc: { fiatBalance: refundAmount, frozenBalance: -refundAmount } }
          );
        }

        order.status = "CANCELLED";
        return await order.save();
      } catch (err: any) {
        throw new Error(err.message);
      }
    },
  },
};

export default tradeResolvers;