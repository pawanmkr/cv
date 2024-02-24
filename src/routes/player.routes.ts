import express from "express";
import {
  deletePlayer,
  fetchPlayerByRank,
  fetchRandomPlayer,
  listPlayers,
  updatePlayer
} from "../controllers/player.controller.js";
import { UserController } from "../controllers/handleAuthorization.js";
import authorization from "../middlewares/auth.js";


const playerRouter = express.Router();

playerRouter.post("/", UserController.registerNewUser);
playerRouter.get("/", listPlayers);

playerRouter.get("/rank/:val", fetchPlayerByRank);
playerRouter.get("/random", fetchRandomPlayer);

/* PROTECTED ROUTES */
playerRouter.put("/:id", authorization, updatePlayer);
playerRouter.delete("/:id", authorization, deletePlayer);

export default playerRouter;
