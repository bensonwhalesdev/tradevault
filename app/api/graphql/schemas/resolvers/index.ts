import { userResolvers } from "./auth.resolver";
import { getAllUsersResolvers } from "./user.resolver";
import tradeResolvers from "./trade.resolver";

export const resolvers = [userResolvers, getAllUsersResolvers, tradeResolvers];
