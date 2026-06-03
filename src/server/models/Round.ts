import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPlayer } from './Player';
import { Counter } from './Counter';
import { IGame } from './Game';

export interface IBoatTicket {
  player: IPlayer['name'];
  card: String;
  sequence: number;
}

const BoatTicketSchema = new Schema<IBoatTicket>(
  {
    player: { type: Schema.Types.String, ref: 'Player', required: true },
    card: { type: String, required: true },
    sequence: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

export interface IRound extends Document {
  gameId: IGame['gameId'];
  roundId: number;
  otherTeam: IPlayer['name'][];
  pointsScored: number;
  dealer: IPlayer['name'];
  boatTickets: IBoatTicket[];
}

const RoundSchema = new Schema<IRound>({
  gameId: { type: Schema.Types.Number, ref: 'Game', required: true },
  roundId: { type: Number },
  pointsScored: { type: Number, required: true },
  otherTeam: [{ type: Schema.Types.String, ref: 'Player', required: true }],
  dealer: { type: Schema.Types.String, ref: 'Player', required: true },
  boatTickets: { type: [BoatTicketSchema], default: [] },
});

// before saving a new Round, increment the counter and populate the round ID
RoundSchema.pre<IRound>('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: `gameId${this.gameId}_roundId` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    this.roundId = counter.seq;
  }
  next();
});

const Round: Model<IRound> =
  mongoose.models.Round || mongoose.model<IRound>('Round', RoundSchema);

export default Round;
