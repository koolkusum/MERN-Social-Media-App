import express from "express";
import { login } from "../controllers/auth.js";

//routes are configured
const router = express.Router();

router.post("/login", login);

export default router;