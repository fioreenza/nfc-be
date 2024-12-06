import { Request, Response } from "express";
import { registerUser, findUserByUID } from "../services/userService";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

export const register = async (req: Request, res: Response) => {
  const { nfc_uid, name } = req.body;

  try {
    const existingUser = await findUserByUID(nfc_uid);
    if (existingUser) {
      eventEmitter.emit('data', { message: "Kartu sudah terdaftar", user: existingUser });
      return res.status(400).json({ message: "Kartu sudah terdaftar", user: existingUser });
    }

    const user = await registerUser(nfc_uid, name);
    
    eventEmitter.emit('data', { message: "Pengguna baru berhasil terdaftar", user });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await findUserByUID(req.params.nfc_uid);
    if (!user) {
      eventEmitter.emit('data', { message: "Kartu belum terdaftar" });
      return res.status(404).json({ message: "Kartu belum terdaftar" });
    }

    eventEmitter.emit('data', { message: "Kartu ditemukan", user });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
