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
		// Set the home position at (0, 0) before the game starts
		this.positionRow = 0;
		this.positionCol = 0;
		this.gameOver = false
	}

	static createField(holes,row,column) { 
	//create a field
	const field = [];
	for (let i=0; i < row; i++) {
	const r = []
	for (let j=0; j < column; j++) {
		r.push(fieldCharacter)
	}
	field.push(r)
}
	//console.log(field)


	// place holes randomly
	let placeHoles = holes
	while (placeHoles) {
		//console.log("place hole")
		const rowRandom = Math.floor(Math.random() *field.length);
		const columnRandom = Math.floor(Math.random() *field[0].length);
		if (field[rowRandom][columnRandom] === fieldCharacter) {
			field[rowRandom][columnRandom] = hole;
			placeHoles--;
		}
	}

	//place hat randomly
	let placeHat = false;
	while (!placeHat) {
		//console.log("place hat")
		const rowRandom = Math.floor(Math.random() *field.length);
		const columnRandom = Math.floor(Math.random() *field[0].length);
		if (field[rowRandom][columnRandom] === fieldCharacter) {
			field[rowRandom][columnRandom] = hat;
		}
		placeHat = true;
	} 
console.log(field)
return field
}

	// Print field //
	print() {
		clear();
		for (let row of this.field) {
			console.log(row.join()) 
		}

	}
	

	move(direction) {
		//console.log(`Moving ${this.positionRow}, ${this.positionCol} to ${direction}`);
	if (direction === "l") {
		this.moveLeft()
	}
	else if (direction === "r") {
		this.moveRight()
	}
	else if (direction === "u") {
		this.moveUp()
	}
	else if (direction === "d") {
		this.moveDown()
	}
}


	moveLeft() {
		this.positionCol--
		
		
	}

	moveRight() {
		this.positionCol++
		
	}

	moveUp() {
		this.positionRow = this.positionRow - 1
	}

	moveDown() {
		this.positionRow = this.positionRow + 1
		
	}

	checkCondition() {
		//console.log(`positionRow: ${positionRow}, positionCol: ${positionCol}`)
	if (this.field.length <= this.positionRow || this.field[0].length <= this.positionCol || this.positionRow < 0 || this.positionCol < 0) {
		this.gameOver = true
		console.log('Loses by attempting to move “outside” the field.')
		return;
	}

	else if (this.field[this.positionRow][this.positionCol] === "O") {
		this.gameOver = true
		console.log("Loses by landing on (and falling in) a hole.")
		return;
	}

	else if (this.field[this.positionRow][this.positionCol] === "^") {
		this.gameOver = true
		console.log('Wins by finding their hat.')
		return;
		
}

}

	update() {
		if (!this.gameOver) {
		this.field[this.positionRow][this.positionCol] = pathCharacter
		}
	}

	createActor() {
	let placeActor = false;
	while (!placeActor) {
		const rowRandom = Math.floor(Math.random() *this.field.length);
		const columnRandom = Math.floor(Math.random() *this.field[0].length);
		if (this.field[rowRandom][columnRandom] === fieldCharacter) {
			this.field[rowRandom][columnRandom] = pathCharacter;
			this.positionRow = rowRandom;
			this.positionCol = columnRandom;
		}
		placeActor = true;

	}
	}

	runner() {
		this.createActor()
		while (!this.gameOver) {
			this.print()
			const way = prompt("Which way?") // user input: u , way = 'u'
			this.move(way) // move("u")
			this.checkCondition()
			this.update()
		}
	}

}

// Game Mode ON
// Remark: Code example below should be deleted and use your own code.

// const newGame = new Field(Field.createField(2,3,3));

// newGame.runner()


Field.createField(2,3,3)
Field.createField(2,3,3)
Field.createField(2,3,3)
Field.createField(2,3,3)
Field.createField(2,3,3)
Field.createField(2,3,3)