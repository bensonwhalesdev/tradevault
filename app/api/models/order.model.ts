import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  assetSymbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  status: 'OPEN' | 'FILLED' | 'CANCELLED';
  quantity: number;
  price: number; // Limit price or the executed price for Market/Filled orders
  filledQuantity: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assetSymbol: { type: String, required: true, index: true },
  side: { type: String, enum: ['BUY', 'SELL'], required: true },
  type: { type: String, enum: ['MARKET', 'LIMIT'], required: true },
  status: { type: String, enum: ['OPEN', 'FILLED', 'CANCELLED'], default: 'OPEN' },
  quantity: { type: Number, required: true, min: 0.000001 },
  price: { type: Number, required: true, min: 0.01 }, 
  filledQuantity: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);