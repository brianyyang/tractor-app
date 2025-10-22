import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPlayer } from './Player';
import { Counter } from './Counter';
import { IGame } from './Game';

export interface IRound extends Document {
  gameId: IGame['_id'];
  roundId: number;
  winningTeam: IPlayer['_id'][];
  otherTeam: IPlayer['_id'][];
  pointsScored: number;
  dealer: IPlayer['_id'];
}

const RoundSchema = new Schema<IRound>({
  gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  pointsScored: { type: Number, required: true },
  winningTeam: [{ type: Schema.Types.ObjectId, ref: 'Player', required: true }],
  otherTeam: [{ type: Schema.Types.ObjectId, ref: 'Player', required: true }],
  dealer: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
});

// before saving a new Round, increment the counter and populate the round ID
RoundSchema.pre<IRound>('save', async function (next) {
  if (this.isNew) {
    const Game = mongoose.model('Game');
    const game = await Game.findById(this.gameId).select('gameId');
    const counter = await Counter.findOneAndUpdate(
      { name: `gameId${game.gameId}_roundId` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.roundId = counter.seq;
  }
  next();
});

const Round: Model<IRound> =
  mongoose.models.Round || mongoose.model<IRound>('Round', RoundSchema);

export default Round;
