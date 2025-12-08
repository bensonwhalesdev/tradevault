import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  fiatBalance: number; // The user's cash balance for trading (e.g., USD)
  frozenBalance: number; // Funds reserved for open limit orders
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fiatBalance: { type: Number, required: true, default: 0.00, min: 0 },
  frozenBalance: { type: Number, required: true, default: 0.00, min: 0 },
  currency: { type: String, required: true, default: 'USD' }, 
}, { timestamps: true });

// A pre-save hook can be added here to ensure frozenBalance <= fiatBalance

export default mongoose.models.Wallet || mongoose.model<IWallet>('Wallet', WalletSchema);