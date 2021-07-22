# BATTLESHIP GAME

Based on the classic game “Battleship”.

* Two players
* Each player has a 10x10 board
* During setup, players can place an arbitrary number of “battleships” on their board.
The ships are 1-by-n sized, must fit entirely on the board, must be aligned either
vertically or horizontally, and cannot overlap.
* During play, players take a turn “attacking” a single position on the opponent’s board,
and the opponent must respond by either reporting a “hit” on one of their battleships
(if one occupies that position) or a “miss”
* A battleship is sunk if it has been hit on all the squares it occupies
* A player wins if all of their opponent’s battleships have been sunk.


# Requirements

* NodeJS v14.17.3
* nodemon
* ts-node
* typescript
* @types/chai
* @types/mocha
* chai
* mocha


# How to run test locally

* clone the repo
* `cd flare`
* run `npm install`
* run test `npm run test`