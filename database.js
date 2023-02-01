const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Local12345",
  database: "jugadores_assigment",
});

connection.connect();

// Link player to game API endpoint // Inserting players from database
app.post("/linkPlayerToGame", (req, res) => {
  const { player_id, game_id, level } = req.body;
  const query = `INSERT INTO player_games (player_id, game_id, level) VALUES (${player_id}, ${game_id}, '${level}')`;
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ message: "Player linked to game successfully" });
    }
  });
});

// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
//3. api

app.get("/searchPlayers", (req, res) => {
  const { level, game, geography } = req.query;
  let query = `SELECT player_name, player_geography, game_name, level FROM players
               JOIN player_games ON players.player_id = player_games.player_id
               JOIN games ON player_games.game_id = games.game_id
               WHERE 1`;
  if (level) {
    query += ` AND level = '${level}'`;
  }
  if (game) {
    query += ` AND game_name = '${game}'`;
  }
  if (geography) {
    query += ` AND player_geography = '${geography}'`;
  }
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ players: results });
    }
  });
});

4;
app.get("/playersByLevel", (req, res) => {
  const { level, game } = req.query;
  let query = `SELECT player_name, game_name FROM players
                 JOIN player_games ON players.player_id = player_games.player_id
                 JOIN games ON player_games.game_id = games.game_id
                 WHERE 1`;
  if (level) {
    query += ` AND level = '${level}'`;
  }
  if (game) {
    query += ` AND game_name = '${game}'`;
  }
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ players: results });
    }
  });
});
