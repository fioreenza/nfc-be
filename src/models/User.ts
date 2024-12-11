import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  nfc_uid: string;
  name: string;
  address: string; 
  gender: string;
  dob: Date;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  nfc_uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
