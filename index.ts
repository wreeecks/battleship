import { shipOrientation } from "./src/_entities/ship";
import { Battleship } from "./src/_services/battleship";

const game = new Battleship(5,5);

game.startGame();

const ship1 = game.createShip("ragnarok1", 5, shipOrientation.Horizontal);
const ship2 = game.createShip("ragnarok2", 4, shipOrientation.Vertical);

console.log( "isvalid? ", game.placeShip(ship1, 0, 0));
console.log( "isvalid? ", game.placeShip(ship1, 0, 0));
console.log("=======================================")
console.log( "isvalid? ", game.placeShip(ship2, 1, 0));

