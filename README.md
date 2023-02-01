1.- created a simple database in mysql called jugadores_assigment

use jugadores_assigment;
CREATE TABLE players (
player_id INT AUTO_INCREMENT PRIMARY KEY,
player_name VARCHAR(255),
player_geography VARCHAR(255)
);

SHOW CREATE TABLE players;

CREATE TABLE games (
game_id INT AUTO_INCREMENT PRIMARY KEY,
game_name VARCHAR(255)
);

CREATE TABLE player_games (
player_id INT,
game_id INT,
level ENUM('INVINCIBLE', 'PRO', 'N00B'),
PRIMARY KEY (player_id, game_id),
FOREIGN KEY (player_id) REFERENCES players(player_id),
FOREIGN KEY (game_id) REFERENCES games(game_id)
);

INSERT INTO players (player_name, player_geography)
VALUES ('Thiago', 'BR'), ('Daniel', 'ESP');

INSERT INTO games (game_name)
VALUES ('FIFA 21'), ('Call of Duty: Warzone');

INSERT INTO player_games (player_id, game_id, level)
VALUES (1, 1, 'PRO'), (1, 2, 'N00B'), (2, 1, 'INVINCIBLE');

INSERT INTO players (player_name, player_geography)
VALUES ('Gabriel', 'USA'), ('Chai', 'THA');

INSERT INTO player_games (player_id, game_id, level)
VALUES (3, 1, 'PRO'), (4, 2, 'N00B');

SHOW CREATE TABLE players;

2.- created a file database.js to fetch the data and match the players in levels
You can find all the players with:
run node database.js
http://localhost:3001/searchPlayers
by level:
http://localhost:3001/playersByLevel?level=INVINCIBLE
http://localhost:3001/playersByLevel?level=NOOB
http://localhost:3001/playersByLevel?level=PRO

3.-You can display All the players running react npm start.
CD front-assigment
npm start
