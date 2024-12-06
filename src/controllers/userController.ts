import { Request, Response } from "express";
import { registerUser, getAllUsers, findUserByUID } from "../services/userService";

export const register = async (req: Request, res: Response) => {
  const { nfc_uid, name } = req.body;

  try {
    const existingUser = await findUserByUID(nfc_uid);
    if (existingUser) {
      return res.status(400).json({ message: "Kartu sudah terdaftar", user: existingUser });
    }

    const user = await registerUser(nfc_uid, name);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await findUserByUID(req.params.nfc_uid);
    if (!user) {
      return res.status(404).json({ message: "Kartu belum terdaftar" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
