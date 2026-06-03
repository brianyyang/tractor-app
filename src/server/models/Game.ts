import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPlayer } from './Player';
import { Counter } from './Counter';

export interface IGame extends Document {
  gameId: number;
  startingCard: string;
  date: Date;
  players: IPlayer['name'][];
  isEnded: boolean;
}

const GameSchema = new Schema<IGame>({
  gameId: { type: Number, unique: true },
  startingCard: { type: String },
  date: { type: Date, default: Date.now },
  players: [{ type: Schema.Types.String, ref: 'Player', required: true }],
  isEnded: { type: Boolean, default: false },
});

// before saving a new Game, increment the counter and populate the game ID
GameSchema.pre<IGame>('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'gameId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    this.gameId = counter.seq;
  }
  next();
});

const Game: Model<IGame> =
  mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;
