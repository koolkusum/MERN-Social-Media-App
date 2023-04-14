import express from "express";
//freind control
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
//routes where we grab information leaving database untouched
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
//friend add or remove (facebook stuff not follower)
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;