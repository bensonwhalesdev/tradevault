import { gql } from 'graphql-tag';

// --- Core Data Types ---
const typeDefs = gql`
  # Represents a user account
  type User {
    id: ID!
    email: String!
    fullName: String!
    createdAt: String!
  }

  # Tracks the user's cash balance
  type PerformancePoint {
    name: String!
    value: Float!
  }

  type Allocation {
    name: String!
    value: Float!
    color: String!
  }

  type Wallet {
    id: ID!
    userId: ID!
    fiatBalance: Float!
    frozenBalance: Float!
    currency: String!
    totalValue: Float!
    totalInvested: Float!
    dailyChange: Float!
    dailyChangePercent: Float!
    monthlyProfit: Float!
    tradesToday: Int!
    performanceHistory: [PerformancePoint!]!
    assetAllocation: [Allocation!]!
  }

  # Represents a user's holding of a specific stock or crypto
  type Asset {
    id: ID!
    userId: ID!
    assetSymbol: String!
    quantity: Float! # Amount held
    avgCost: Float! # Average purchase price
  }

  # Represents a stock/crypto trade order (Limit or Market)
  type Order {
    id: ID!
    userId: ID!
    assetSymbol: String!
    side: String! # BUY or SELL
    type: String! # MARKET or LIMIT
    status: String! # OPEN, FILLED, or CANCELLED
    quantity: Float!
    price: Float! # Limit price or executed price
    filledQuantity: Float!
    createdAt: String!
  }

  # Represents a deposit or withdrawal transaction
  type Transaction {
    id: ID!
    userId: ID!
    type: String! # DEPOSIT or WITHDRAWAL
    status: String! # PENDING, COMPLETED, FAILED
    amount: Float!
    currency: String!
    method: String! 
    referenceId: String!
    createdAt: String!
  }

  # --- Operation Types ---

  # The READ operations (fetching data)
  type Query {
    # Authentication & User
    me: User # Get the currently logged-in user
    
    # Wallet & Assets
    wallet: Wallet # Get the user's main wallet balance
    portfolio: [Asset!]! # Get all assets the user holds

    # Trading & History
    openOrders: [Order!]! # Get all currently open limit orders
    tradeHistory: [Order!]! # Get all filled/cancelled orders
    transactionHistory: [Transaction!]! # Get deposit/withdrawal history
    
    # Mock Market Data (Since we are not using an external API)
    # We will need a way to mock the data for the frontend chart.
    livePrice(symbol: String!): Float! # Get current mock price for a symbol
    ohlcvData(symbol: String!, interval: String!): [Float!]! # Mock Open-High-Low-Close-Volume data
  }

  # The WRITE operations (changing data)
  type Mutation {
    # Auth
    register(email: String!, password: String!, fullName: String!): User!
    login(email: String!, password: String!): String! # Returns a JWT/Token

    # Wallet Management (Self-managed mock process)
    requestDeposit(amount: Float!, method: String!): Transaction!
    requestWithdrawal(amount: Float!, method: String!): Transaction!
    
    # Trading
    placeOrder(
      assetSymbol: String!
      side: String!
      type: String!
      quantity: Float!
      price: Float # Required only for LIMIT orders
    ): Order!

    cancelOrder(orderId: ID!): Order!
  }
  
  # The REAL-TIME operations (data pushing)
  type Subscription {
    # Real-time update for live charts
    priceUpdate(symbol: String!): Float!
    # Real-time update when an order is filled
    orderFilled(userId: ID!): Order!
  }
`;

export default typeDefs;