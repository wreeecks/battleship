import { shipOrientation } from "./src/_entities/ship";
import { Battleship } from "./src/_services/battleship";

const game = new Battleship(5,5);

game.startGame();

const ship1 = game.createShip("ragnarok", 5, shipOrientation.Horizontal);

console.log( "isva;id? ", game.placeShip(ship1, 1, 0));

