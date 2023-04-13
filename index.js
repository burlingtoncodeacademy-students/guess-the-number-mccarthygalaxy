// Given Code (Lots of 'Don't worry about it...' in here.)

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function getRandomInt(min, max) { //  AlTERED this given function so that it runs with MIN and MAX Math
  return Math.floor(Math.random() * (max - min + 1)) + min; // Rounds DOWN (floor)
}


start();


async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  // My code starts here:

  let max = 100
  let min = 1

  for (let index = 1; index < 11; index++) {
    //  This line sets up number of guesses to 3 times for computer (guesser)

    let guess = getRandomInt(min, max) //  Declare variable 'guess' & pass the values from variables min and max to set the range to be guessed (getRandomInt)
    console.log("My guess is " + guess); //  Print what the computer guesses each time through the for-loop
    if (guess == secretNumber) {
      //  first possible outcome (correct guess)
      console.log("Congratulations, you guessed the right number!");
      break; //  Stops the loop on correct guess (ending an otherwise endless loop)
    } else if (guess > secretNumber) {
      //  second possible outcome (guess too high)
      console.log("Too high, guess lower.");
      max = guess - 1 // reassigning the max amount to the current guess value (-1 taking into acct you are eliminating the currently guessed number)
    } else {
      //  last (hence 'else') possible outcome (next 2 lines show the actual else-if logic)
            // } else if (guess < secretNumber) {
            //   console.log("Too low, guess higher.")
      console.log("Too low, guess higher.");
      min = guess + 1 // reassigning the min amount to the current guess value (+1 taking into acct you are eliminating the currently guessed number)
    }
  }

  // My code ends here

  process.exit();
}

            // Preliminary Sketching
            // Guess - Range 0 to 100 (inclusive)
            // Rounds:
                // Each turn - 3 possible outcomes:
                  // Higher
                  // Lower
                  // Correct
