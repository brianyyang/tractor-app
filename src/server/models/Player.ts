import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
}

const PlayerSchema: Schema<IPlayer> = new Schema({
  name: { type: String, required: true, unique: true },
});

const Player: Model<IPlayer> =
  mongoose.models.Player || mongoose.model<IPlayer>('Player', PlayerSchema);

export default Player;
