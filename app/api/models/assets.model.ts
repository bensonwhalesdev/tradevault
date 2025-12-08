import mongoose, { Schema, Document } from 'mongoose';

export interface IAsset extends Document {
  userId: mongoose.Types.ObjectId;
  assetSymbol: string;
  quantity: number; // Amount of stock/crypto held
  avgCost: number; // Average price the asset was acquired at
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assetSymbol: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0.00, min: 0 },
  avgCost: { type: Number, required: true, default: 0.00, min: 0 },
}, { 
  timestamps: true,
  // Ensure a user only has one entry per asset
  index: { userId: 1, assetSymbol: 1 },
  unique: true, 
});

export default mongoose.models.Asset || mongoose.model<IAsset>('Asset', AssetSchema);