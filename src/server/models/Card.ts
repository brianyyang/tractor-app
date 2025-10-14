import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICard extends Document {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank:
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | 'J'
    | 'Q'
    | 'K'
    | 'A';
}

const CardSchema = new Schema<ICard>({
  suit: {
    type: String,
    enum: ['hearts', 'diamonds', 'clubs', 'spades'],
    required: true,
  },
  rank: {
    type: String,
    enum: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    required: true,
  },
});

CardSchema.index({ suit: 1, rank: 1 }, { unique: true });

export const Card: Model<ICard> =
  mongoose.models.Card || mongoose.model<ICard>('Card', CardSchema);
