import { Battleship } from "./src/battleship";
import { Ship } from "./src/ship";

const game = new Battleship(-10, 0);
game.start();

const fleets = [ new Ship("Carrier", 5) ];
game.setGameShipUnits(fleets);

console.log("Playable Units");
console.table(game.fleets);

console.log(game.player1.name);
console.table(game.player1.board.getGrid());

//console.log("\n");

//console.log(game.player2.name);
//console.table(game.player2.board.grid);



// const ship1 = game.createShip("ragnarok1", 5, shipOrientation.Horizontal);
// const ship2 = game.createShip("ragnarok2", 4, shipOrientation.Vertical);

// console.log( "isvalid? ", game.placeShip(ship1, 0, 0));
// console.log( "isvalid? ", game.placeShip(ship1, 0, 0));
// console.log("=======================================")
// console.log( "isvalid? ", game.placeShip(ship2, 1, 0));

