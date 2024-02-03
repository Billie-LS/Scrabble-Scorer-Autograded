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

// const simpleScorerPointStructure = {
//    1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// };

const bonusPointStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
};

// Initialize a variable to keep track of the total score
// let totalScore = 0;  

function oldScrabbleScorer(word) {
   // setting to case insesitive
	word = word.toUpperCase();
   // for template literal score output strings
	let letterPoints = "";
   // variable to sum up total numeric score
   let totalScore = 0;

   
   for (let i = 0; i < word.length; i++) {
      
      for (const pointValue in oldPointStructure) {
         
         if (oldPointStructure[pointValue].includes(word[i])) {
            const points = parseInt(pointValue);  // Convert pointValue to a number
            letterPoints += `Points for '${word[i]}': ${points}\n`;
            totalScore += points;  // Increment numeric score
         }
   }
	}
   // Return object contain letterPoints and totalScore
   return {
      letterPoints: letterPoints,
      totalScore: totalScore
   };
}

// TODO: your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// TODO: Modify the provided initialPrompt() function to prompt the user to enter a word to score.

// function prompt for word to score
function initialPrompt() {
   // input prompted word for Scrabble
   let word = input.question("Let's play some scrabble! Enter a word: ");

   // Prompt choice of scoring algorithm
   console.log("\nWhich scoring algorithm would you like to use?");
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   const selectedAlgorithm = Number(input.question("Enter 0, 1, or 2: "));
   const selectedScorer = scoringAlgorithms[selectedAlgorithm].scoringFunction;

   const result = selectedScorer(word); // Score word using scoring algorithm selected

   // Score input word with oldScrabbleScorer function call
   // const result = oldScrabbleScorer(word);

   // print scoring output
   console.log(result.letterPoints); // Print letterPoints
   
   console.log(`Total Score: ${result.totalScore}`);// Print totalScore

   // return word
   return result
};

// let simpleScorer; 
// TODO: Define function simpleScorer takes word as parameter and returns a numerical score. Each letter of the word is 1 point.

function simpleScorer(word) {
	word = word.toUpperCase();
	// for template literal score output strings
	let letterPoints = "";
   // variable to sum up total numeric score
   let totalScore = 0;
   
   for (let i = 0; i < word.length; i++) {
      letterPoints += `Points for '${word[i]}': 1\n`;
      totalScore += 1;  // Increment the total score
   }
   console.log(`Total Score: ${totalScore}`);  // print out total score
   // Return object contain letterPoints and totalScore
   return {
      letterPoints: letterPoints,
      totalScore: totalScore
   };
}


// function simpleScorer(word) {
// 	word = word.toUpperCase();
// 	let letterPoints = "";
//    for (let i = 0; i < word.length; i++) {
//       for (const pointValue in simpleScorerPointStructure) {
//          if (simpleScorerPointStructure[pointValue].includes(word[i])) {
// 			letterPoints += `Points for '${word[i]}': ${pointValue}\n`//       }
//    }
// 	}
//    return letterPoints;
// }


// let vowelBonusScorer;
// TODO: Define function vowelBonusScorer takes word as a parameter and returns a numerical score. Each vowel is worth 3 points, and each consonant is 1 point.
function vowelBonusScorer(word) {
	word = word.toUpperCase();
	// for template literal score output strings
	let letterPoints = "";
   // variable to sum up total numeric score
   let totalScore = 0;
   
   for (let i = 0; i < word.length; i++) {
      
      for (const pointValue in bonusPointStructure) {
         
         if (bonusPointStructure[pointValue].includes(word[i])) {
            const points = parseInt(pointValue);  // Convert pointValue to a number
            letterPoints += `Points for '${word[i]}': ${points}\n`;
            totalScore += points;  // Increment the total score
         }
      }
	}
   console.log(`Total Score: ${totalScore}`);  // print out total score
   // Return object contain letterPoints and totalScore
   return {
      letterPoints: letterPoints,
      totalScore: totalScore
   };
}

// function vowelBonusScorer(word) {
// 	word = word.toUpperCase();
// 	let letterPoints = "";
   
//    for (let i = 0; i < word.length; i++) {
//       if ('AEIOU'.includes(word[i])) {
//          letterPoints += `Points for '${word[i]}': 3\n`;
//       } else {
//          letterPoints += `Points for '${word[i]}': 1\n`;
//       }
//    }
//    return letterPoints;
// }



// TODO: Use the oldScrabbleScorer() function provided to score the word provided by the user. Print the result to the console.
let scrabbleScorer = oldScrabbleScorer;


const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point',
      scoringFunction: simpleScorer
   }, 
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scoringFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scoringFunction: oldScrabbleScorer
   }
];


// TODO: Finish writing scorerPrompt() so that the user can select which scoring algorithm to use when the program scores their word. 
// Use the selected algorithm to determine the score for the word:
// If the user enters 0, have the program output a score using the simple scorer.
// If the user enters 1, use the vowel bonus scoring function.
// If the user enters 2, use the Scrabble scoring option.
function scorerPrompt() {}

// function transform() {};

function transform(oldPointStructure) {
   const newPointStructure = {};

   for (const pointValue in oldPointStructure) {
      const letters = oldPointStructure[pointValue];

      for (const letter of letters) {
         // Convert the letter to uppercase and assign the point value
         newPointStructure[letter.toUpperCase()] = parseInt(pointValue);
      }
   }

   return newPointStructure;
}

// let newPointStructure;
let newPointStructure = transform(oldPointStructure);

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
