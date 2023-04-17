const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// --------- Hard-coded parameters for limits of the game play ----------------------- >

let min_number = 1; //  Assigns lowest number for range of guesses
let max_number = 100;   //  Assigns highest number for range of guesses
let guessMax = 7;   // Assigns max number of computer guesses
let guessedNumbers = []; // Sets up an empty array to push used numbers *

//  ---------------------------------------------------------------------------------- ^

// **  COULD NOT GET CONTROLS FOR CHEATING TO WORK IN THIS VERSION YET. ** //

//  Primary Game Functionality ------------------------------------------------------- >

console.log(`Please think of a Secret Number between ${min_number} and ${max_number} and I will try to guess it. `);

start();

async function start () {
  let guessCount = 0;
  while (guessCount < guessMax) {
    let currentGuess = Math.floor((min_number + max_number) / 2); // starts halving range of guesses
    while (guessedNumbers.includes(currentGuess)) { // if number has been guessed computer will try again so a number isn't guessed twice: *
      currentGuess = Math.floor((min_number + max_number) / 2); 
    }
    console.log(`My guess is ${currentGuess}`);
    guessedNumbers.push(currentGuess);  // pushes current guess to array of guesses used
    guessCount++;   // increments guess count

    let quest = await askQuestion(`Is ${currentGuess} correct? `); // changed to Function askQuestion *
    if (quest === "n") {    //  as long as NO, continue guessing
      let highLow = await askQuestion(`Higher (h) or lower (l) than ${currentGuess}? `);
      if (highLow === "h") {
        min_number = currentGuess + 1;  // resets min range (exluding this guess (+1))
      } else if (highLow === "l") {
        max_number = currentGuess - 1;  //  resets max range (excluding this guess (-1))
      } else {
        console.log('Invalid input');   //  if neither H or L, ends game
        process.exit();
      }
    } else if (quest === "y") { //  ends game if user inputs YES
      console.log('Hurray! I win!');
      console.log(`Here are all the guesses made during the game: ${guessedNumbers.join(', ')}.`);  //  reads the stored array 'guessedNumbers' after win
      process.exit();
    }
  }
  console.log("Sorry, I couldn't guess your number.");
  console.log(`Here are all the guesses made during the game: ${guessedNumbers.join(', ')}.`);  //  reads the stored array 'guessedNumbers' after lose
  process.exit();
}

//  --------------------------------------------------------------------------------- ^

//  ----- Changed inline `await rl.question` to a function - *(AI solution) --------- >

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}
//  --------------------------------------------------------------------------------- ^
