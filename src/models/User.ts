import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  nfc_uid: string;
  name: string;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  nfc_uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
