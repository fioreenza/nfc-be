import { Router } from "express";
import { register, getUser } from "../controllers/userController";

const router = Router();

router.post("/register",  (req, res) => {
    register(req, res);
});

router.get("/user/:nfc_uid",  (req, res) => {
    getUser(req, res);
});


export default router;
