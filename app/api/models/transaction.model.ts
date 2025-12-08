import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  amount: number;
  currency: string;
  method: 'BANK_TRANSFER' | 'CRYPTO_TRANSFER'; // Simplified methods
  referenceId: string; // Internal ID for tracking
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['DEPOSIT', 'WITHDRAWAL'], required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  amount: { type: Number, required: true, min: 0.01 },
  currency: { type: String, required: true, default: 'USD' },
  method: { type: String, required: true },
  referenceId: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);