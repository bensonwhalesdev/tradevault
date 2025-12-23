import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  fiatBalance: number;
  frozenBalance: number;
  currency: string;
  // New fields for the Dashboard
  performanceHistory: { name: string; value: number }[];
  assetAllocation: { name: string; value: number; color: string }[];
}

const WalletSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fiatBalance: { type: Number, required: true, default: 0.00, min: 0 },
  frozenBalance: { type: Number, required: true, default: 0.00, min: 0 },
  currency: { type: String, required: true, default: 'USD' },
  // Store historical data points for the Area Chart
  performanceHistory: [{
    name: { type: String }, // e.g., "Jan", "Feb"
    value: { type: Number }
  }],
  // Store allocation breakdown for the Donut Chart
  assetAllocation: [{
    name: { type: String },
    value: { type: Number },
    color: { type: String }
  }]
}, { timestamps: true });

export default mongoose.models.Wallet || mongoose.model<IWallet>('Wallet', WalletSchema);