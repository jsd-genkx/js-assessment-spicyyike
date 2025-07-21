"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;

    // Replace with your own code //
    this.positionRow = null;
    this.positionCol = null;
    this.gameOver = false;
  }

  static createField(holesPercent, row, column) {
    //create a field
    const holes = Math.ceil((holesPercent / 100) * row * column);
    const field = [];
    for (let i = 0; i < row; i++) {
      const r = [];
      for (let j = 0; j < column; j++) {
        r.push(fieldCharacter);
      }
      field.push(r);
    }

    // place holes randomly
    let placeHoles = holes;
    while (placeHoles > 0) {
      const rowRandom = Math.floor(Math.random() * field.length);
      const columnRandom = Math.floor(Math.random() * field[0].length);
      if (field[rowRandom][columnRandom] === fieldCharacter) {
        field[rowRandom][columnRandom] = hole;
        placeHoles--;
      }
    }

    //place hat randomly
    let placeHat = false;
    while (!placeHat) {
      const rowRandom = Math.floor(Math.random() * field.length);
      const columnRandom = Math.floor(Math.random() * field[0].length);
      if (field[rowRandom][columnRandom] === fieldCharacter) {
        field[rowRandom][columnRandom] = hat;
        placeHat = true;
      }
    }

    /*		let placeActor = false;
	while (!placeActor) {
		const rowRandom = Math.floor(Math.random() *field.length);
		const columnRandom = Math.floor(Math.random() *field[0].length);
		if (field[rowRandom][columnRandom] === fieldCharacter) {
			field[rowRandom][columnRandom] = pathCharacter;
			//this.positionRow = rowRandom;
			//this.positionCol = columnRandom;
			placeActor = true;
		}

	} */

    //console.log(field)
    return field;
  }

  // Print field //
  print() {
    clear();
    for (let row of this.field) {
      console.log(row.join(" "));
    }
  }

  move(direction) {
    //console.log(`Moving ${this.positionRow}, ${this.positionCol} to ${direction}`);
    if (direction === "l") {
      this.moveLeft();
    } else if (direction === "r") {
      this.moveRight();
    } else if (direction === "u") {
      this.moveUp();
    } else if (direction === "d") {
      this.moveDown();
    }
  }

  moveLeft() {
    this.positionCol--;
  }

  moveRight() {
    this.positionCol++;
  }

  moveUp() {
    this.positionRow = this.positionRow - 1;
  }

  moveDown() {
    this.positionRow = this.positionRow + 1;
  }

  checkCondition() {
    //console.log(`positionRow: ${positionRow}, positionCol: ${positionCol}`)
    if (
      this.field.length <= this.positionRow ||
      this.field[0].length <= this.positionCol ||
      this.positionRow < 0 ||
      this.positionCol < 0
    ) {
      this.gameOver = true;
      console.log("Loses by attempting to move “outside” the field.");
      return;
    } else if (this.field[this.positionRow][this.positionCol] === "O") {
      this.gameOver = true;
      console.log("Loses by landing on (and falling in) a hole.");
      return;
    } else if (this.field[this.positionRow][this.positionCol] === "^") {
      this.gameOver = true;
      console.log("Wins by finding their hat.");
      return;
    }
  }

  update() {
    if (!this.gameOver) {
      this.field[this.positionRow][this.positionCol] = pathCharacter;
    }
  }

  createActor() {
    let placeActor = false;
    while (!placeActor) {
      const rowRandom = Math.floor(Math.random() * this.field.length);
      const columnRandom = Math.floor(Math.random() * this.field[0].length);
      if (this.field[rowRandom][columnRandom] === fieldCharacter) {
        this.field[rowRandom][columnRandom] = pathCharacter;
        this.positionRow = rowRandom;
        this.positionCol = columnRandom;
        placeActor = true;
      }
    }
  }

  checkEdge() {
    if (
      this.positionRow === 0 ||
      this.positionCol === 0 ||
      this.positionRow === this.field.length - 1 ||
      this.positionCol === this.field[0].length - 1
    ) {
      console.log(
        "Warning: You are at the edge of the field. Please be careful!"
      );
    }
  }

  runner() {
    this.createActor();
    while (!this.gameOver) {
      this.print();
      this.checkEdge();
      const way = prompt("Which way?");
      this.move(way);
      this.checkCondition();
      this.update();
    }
  }
}

// Game Mode ON
const newGame = new Field(Field.createField(20, 4, 4));

newGame.runner();

// let holeCountWrong = 0;
// let actorCountWrong = 0;
// let hatCountWrong = 0;
//  for (let i = 0; i < 10000; i++) {
// 	const field = Field.createField(20,3,3)
// 	//console.log(field)
// 	let holeCount = 0;
// 	let actorCount = 0;
// 	let hatCount = 0;
// 	for (let row of field) {
// 		for (let cell of row) {
// 			if (cell === hole) {
// 				holeCount++;
// 			} else if (cell === pathCharacter) {
// 				actorCount++;
// 			} else if (cell === hat) {
// 				hatCount++;
// 			}

// 		}
// 	}

// 	if (holeCount !== 2) {
// 		holeCountWrong++;
// 	}
// 	if (actorCount !== 1) {
// 		actorCountWrong++;
// 	}
// 	if (hatCount !== 1) {
// 		hatCountWrong++;
// 	}

// }
// 	console.log(`Hole count wrong: ${holeCountWrong}`);
// 	console.log(`Actor count wrong: ${actorCountWrong}`);
// 	console.log(`Hat count wrong: ${hatCountWrong}`);
