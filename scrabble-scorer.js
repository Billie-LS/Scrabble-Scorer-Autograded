// This assignment is inspired by a problem on Exorcism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
// Import required module/s
const input = require("readline-sync");
const prompt = require('prompt-sync')({ sigint: true });

// old scrabble point structure
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
   
   word = word.toUpperCase(); // make case insensitive
   let letterPoints = "";

   // variable to sum up total numeric score
   let score = 0;

   for (let i = 0; i < word.length; i++) {

      // note that the object 'key' is pointValue!
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`;

            score += parseInt(pointValue); // Increment the total score
         }
      }
   }
   // returns a numerical 'score', i.e. integer value
   return score;
   // Return object contain letterPoints and totalScore
   // return {
   //    letterPoints: letterPoints,
   //    score: score
   // };
}


// TODO: your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// TODO:  Modify the provided initialPrompt() function to prompt the user to enter a word to score.

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   
   // call the selected scorer from scorerPrompt()
   const selectedScorer = scorerPrompt();

   // initializes result equal to returned 'score' value
   const result = selectedScorer(word);

   // print scoring output
   // console.log(result.letterPoints); // Print letterPoints
   
   console.log(`Total Score: ${result}`);// Print totalScore
   // console.log(`Total Score: ${result.totalScore}`);// Print totalScore

   return result;

};

/*
TASK 2: ADD AND ORGANIZE SCORING ALGORITHMS
Your job here is to write two other scoring algorithms for the Scrabble player.
*/

// TODO: Define a function that takes a word as a parameter and returns a numerical score. 
// Each letter within the word is worth 1 point.

function simpleScorer(word){
	word = word.toUpperCase(); // make case insensitive
	let letterPoints = "";
   // variable to sum up total numeric score
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      letterPoints += `Points for '${word[i]}': 1\n`;
      score += 1;  // Increment the total score
   }

   // returns a numerical 'score', i.e. integer value
   return score;

   // Return object contain letterPoints and totalScore
   // return {
   //    letterPoints: letterPoints,
   //    score: score
   // };
};


// TODO: Define a function that takes a word as a parameter and returns a score. 
// Each vowel within the word is worth 3 points, and each consonant is worth 1 point.

function vowelBonusScorer(word) {
   word = word.toUpperCase(); // make case insensitive
   let letterPoints = "";

   // variable to sum up total numeric score
   let score = 0;

   for (let i = 0; i < word.length; i++) {

      // Check if letter is a vowel (i.e. 'A', 'E','I', 'O', 'U')
      if ('AEIOU'.includes(word[i])) {
         // If IS a vowel, add 3 points to the letterPoints and totalScore
         letterPoints += `Points for '${word[i]}': 3\n`;
         // Increment numeric total score by 3 points for a vowel
         score += 3;
      }
      // If letter NOT a vowel (i.e. is consonant)
      if (!'AEIOU'.includes(word[i])) {
         // If it's not a vowel, add 1 point to the letterPoints and totalScore
         letterPoints += `Points for '${word[i]}': 1\n`;
         // Increment the total score by 1 point for a consonant
         score += 1;
      }
   }
   // returns a numerical 'score', i.e. integer value
   return score;
   // return {
   //    letterPoints: letterPoints,
   //    score: score
   // };
}


// TODO: Use the oldScrabbleScorer() function provided to score the word provided by the user. 
// Print the result to the console.
let scrabbleScorer = oldScrabbleScorer;

// TODO: Use newPointStructure, to finish writing scrabbleScorer() function
// replace the oldScrabbleScorer() function in scoringAlgorithms with this new function.
scrabbleScorer = function scrabbleScorer(word) {
   
   word = word.toLowerCase(); // make case insensitive
   let letterPoints = "";

   // variable to sum up total numeric score
   let score = 0;

   for (let i = 0; i < word.length; i++) {

      // note that the object 'key' is letter!
      const letter = word[i];

      // Check if the letter exists in the newPointStructure
      if (newPointStructure.hasOwnProperty(letter)) {
         const pointValue = newPointStructure[letter];

         letterPoints += `Points for '${letter}': ${pointValue}\n`;

         score += pointValue; // Increment the total score
      }
   }
   // returns a numerical 'score', i.e. integer value
   return score;
   // Return object contain letterPoints and totalScore
   // return {
   //    letterPoints: letterPoints,
   //    score: score
   // };
}


// TODO: Finish writing the scoringAlgorithms array. 
// It should be populated with three objects, 
// one for each of the three scoring options. 
// Each object should contain three keys: name, description, and scoringFunction

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: "Each letter is worth 1 point. ",
      scoringFunction: simpleScorer
   }, 
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt. ',
      scoringFunction: vowelBonusScorer
   }, 
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm. ',
      scoringFunction: scrabbleScorer
   }
];


// TODO: Finish writing scorerPrompt() so that the user can select which scoring algorithm to use when the program scores their word. 
// scorerPrompt() should return the object the user has selected.
// Use the selected algorithm to determine the score for the word:
// If the user enters 0, have the program output a score using the simple scorer.
// If the user enters 1, use the vowel bonus scoring function.
// If the user enters 2, use the Scrabble scoring option.
// scorerPrompt() should return the object the user has selected.

// function prompts user to select scoring algorithm
function scorerPrompt() {
   
   console.log('Which scoring algorithm would you like to use?\n');

   // Iterate each algorithm in scoringAlgorithms array
   for (let i = 0; i < scoringAlgorithms.length; i++){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   // Prompt user choice (0, 1, or 2) and convert input to integer
   let selectedAlgorithm = parseInt(input.question('Enter 0, 1, or 2: '));

   // retrieve scoring algo by index = user input choice (0, 1, or 2) 
   const selectedScorer = scoringAlgorithms[selectedAlgorithm].scoringFunction;
   // Return selected scoring function
   return selectedScorer;
}


// TASK 3: TRANSFORM SCRABBLE SCORING
// TODO: function transform takes oldPointStructure to make new point structure //

function transform(oldPointStructure) {
   const newPointStructure = {}

   for (const key in oldPointStructure) {
      const letters = oldPointStructure[key];

      for (const letter of letters) {
         newPointStructure[letter.toLowerCase()] = parseInt(key);
      }
   }
   return newPointStructure;
};

// TODO: Locate the newPointStructure object in the starter code and set it equal to transform(oldPointStructure).
let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   
}
// initialPrompt()

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
