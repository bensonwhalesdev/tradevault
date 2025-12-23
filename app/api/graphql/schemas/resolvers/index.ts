import { userResolvers } from "./auth.resolver";
import tradeResolvers from "./trade.resolver";

export const resolvers = [ userResolvers, tradeResolvers ];