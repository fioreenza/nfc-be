import User, { IUser } from "../models/User";

export const registerUser = async (
  nfc_uid: string,
  name: string,
  address: string,
  gender: string,
  dob: Date
): Promise<IUser> => {
  const user = new User({
    nfc_uid,
    name,
    address,
    gender,
    dob,
  });
  return await user.save();
};

export const findUserByUID = async (nfc_uid: string): Promise<IUser | null> => {
  return await User.findOne({ nfc_uid });
};
