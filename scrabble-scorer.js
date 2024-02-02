// This assignment is inspired by a problem on Exorcism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
// Import required module/s
const input = require("readline-sync");
const prompt = require('prompt-sync')({ sigint: true });


const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   
   for (let i = 0; i < word.length; i++) {
      
      for (const pointValue in oldPointStructure) {
         
         if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`

      }
   }
	}
   return letterPoints;
}

// TODO: your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// function prompt for word to score
function initialPrompt() {
   // input prompted word for Scrabble
   let word = input.question("Let's play some scrabble! Enter a word: ");

   // Score input word with oldScrabbleScorer function call
   const result = oldScrabbleScorer(word);

   // print scoring output
   console.log(result);

   // return word
   return result
};

let simpleScorer ;

let vowelBonusScorer;

let scrabbleScorer = oldScrabbleScorer;

const scoringAlgorithms = [];

function scorerPrompt() {}

function transform() {};

let newPointStructure;

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
