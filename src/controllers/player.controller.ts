import { Request, Response } from "express";
import { Player } from "../services/database/player.queries.js";


export async function createNewPlayer(req: Request, res: Response) {
  // Destructuring the request body
  const { name, country } = req.body;

  const player = await Player.createNewPlayerEntry(name, country);

  return res.json({
    message: "New player's entry has been recorded.",
    player: player
  });
}


export async function listPlayers(req: Request, res: Response) {
  const players = await Player.getAllPlayers();
  return res.send(players);
}


export async function updatePlayer(req: Request, res: Response) {
  const { name, score } = req.body;
  const playerId = parseInt(req.params.id as string);

  const updatedPlayer = await Player.updatePlayer(playerId, name, score);
  if (updatedPlayer === undefined) {
    return res.status(404).json({
      message: "Failed to update the player. Please check if the player exists in our system."
    });
  }

  return res.status(200).json({
    message: "Player attributes updated successfully!",
    player: updatedPlayer
  });
}


export async function deletePlayer(req: Request, res: Response) {
  const playerId = parseInt(req.params.id as string);

  await Player.deletePlayer(playerId);

  return res.status(200).json({
    message: "Player Deleted Succesfully!"
  });
}


export async function fetchPlayerByRank(req: Request, res: Response) {
  const playerRank = parseInt(req.params.val as string);
  if (playerRank === 0) {
    return res.status(404).json({
      message: `Invalid rank Value. Ranking starts with 1`
    });
  }

  const players = await Player.getAllPlayers();
  if (playerRank > players.length) {
    return res.status(404).json({
      message: `Player with rank ${playerRank} does not exists.`
    });
  }

  return res.status(200).json({
    rank: playerRank,
    palyer: players[playerRank - 1]
  });
}


export async function fetchRandomPlayer(req: Request, res: Response) {
  const players = await Player.getAllPlayers();
  if (players.length === 0) {
    return res.status(404).json({
      message: "We do not have players in our system."
    });
  }

  const randomIndex = Math.floor(Math.random() * players.length);

  return res.status(200).send(players[randomIndex]);
}

