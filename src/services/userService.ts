import User, { IUser } from "../models/User";

export const registerUser = async (nfc_uid: string, name: string): Promise<IUser> => {
  const user = new User({ nfc_uid, name });
  return await user.save();
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const findUserByUID = async (nfc_uid: string): Promise<IUser | null> => {
  return await User.findOne({ nfc_uid });
};
