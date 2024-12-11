// userController.ts
import { Request, Response } from "express";
import { registerUser, findUserByUID } from "../services/userService";
import { eventEmitter } from "../eventEmitter";  // Import eventEmitter

export const register = async (req: Request, res: Response) => {
  const { nfc_uid, name, address, gender, dob } = req.body;

  // Validate incoming request data
  if (!nfc_uid || !name || !address || !gender || !dob) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await findUserByUID(nfc_uid);
    if (existingUser) {
      eventEmitter.emit('data', { message: "Kartu sudah terdaftar", user: existingUser });
      return res.status(400).json({ message: "Kartu sudah terdaftar", user: existingUser });
    }

    const user = await registerUser(nfc_uid, name, address, gender, dob);
    eventEmitter.emit('data', { message: "Pengguna baru berhasil terdaftar", user });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { nfc_uid } = req.params;

  // Validate NFC UID parameter
  if (!nfc_uid) {
    return res.status(400).json({ message: "NFC UID is required" });
  }

  try {
    const user = await findUserByUID(nfc_uid);
    if (!user) {
      eventEmitter.emit('data', { message: "Kartu belum terdaftar", user: {nfc_uid} });
      return res.status(404).json({ message: "Kartu belum terdaftar", user: {nfc_uid} });
    }
    eventEmitter.emit('data', { message: "Kartu ditemukan", user });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
