import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPlayer } from './Player';
import { Counter } from './Counter';
import { ICard } from './Card';

export interface IGame extends Document {
  gameId: number;
  startingCard: ICard['_id'];
  date: Date;
  players: IPlayer['_id'][];
}

const GameSchema = new Schema<IGame>({
  gameId: { type: Number, unique: true },
  startingCard: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
  date: { type: Date, default: Date.now },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player', required: true }],
});

const Game: Model<IGame> =
  mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;

// before saving a new Game, increment the counter and replace the game ID
GameSchema.pre<IGame>('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'gameId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.gameId = counter.seq;
  }
  next();
});
