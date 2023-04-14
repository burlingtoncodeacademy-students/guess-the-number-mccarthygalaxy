// Legacy code (previous versions): ---------- >
    // const max_guesses = 0
    // const min_number = 0
    // const max_number = 0

    // let min = 1
    // let max = 100
    // let guessN = 10

// ^ ------------------------------------------ ^

const readline = require('readline/promises')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function getRandInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min // Function to generate random Secret Number
}                                                            // based on range set by user min_number
                                                             // and max_number below.

start()     

async function start () {
  
    const min_number = parseInt (await rl.question( // Parse/Get a NUMBER from the string input
        `Set range low number? `))
    const max_number = parseInt (await rl.question( // Parse/Get a NUMBER from the string input
        `Set range high number? `))        

    let guesses = 0   
    const secret = getRandInt(min_number, max_number) // Calls (above) function getRandInt to assign Secret Number

// User Customization ----------------------------------->

  let guessSpan = parseFloat (await rl.question( // Needed to change from CONST so Math.abs & Math.ceil work
    `How many guesses do you require? `))
    if (!(Number.isInteger(guessSpan) && guessSpan > 0)){   // If a non whole positive integer is given
        console.log(`\nSmarty pants. ${guessSpan} is not a proper number.`) 
        guessSpan = Math.abs(guessSpan)     // takes any negative and gives absolute value of it
        guessSpan = Math.ceil(guessSpan)    // takes the value and whole integer up    
        console.log(`I rounded you up to ${guessSpan} number of guesses.\n`) 
    } // if number of guesses is proper, no action taken by this if (aka Conditional) statement
    let max_guesses = guessSpan
    let guessRemain = guessSpan - 1

// ^ User Customization ----------------------------------- ^

  while (guesses < max_guesses) {
   
    const guess = await rl.question(
      `Guess a number between ${min_number} and ${max_number}.  `)
    
    if (guess < min_number || guess > max_number) {
      console.log(`${guess} is a number not in range, please try again. \n`) // Out of range; doesn't decrement number of guesses (no penalty)
    } else if (guess < secret) {    // if guess LOWER than Secret
      console.log(`${guess} is too low! You have ${guessRemain} guesses remaining. \n`) 
      guesses = guesses + 1     // increments guess count
      guessRemain = guessRemain - 1 // decrements remaining guesses
    } else if (guess > secret) {    // if guess LOWER than Secret
      console.log(`${guess} is too high! You have ${guessRemain} guesses remaining. \n`)
      guesses = guesses + 1     // increments guess count
      guessRemain = guessRemain - 1 // decrements remaining guesses
    } else {    // if guess equals Secret (but technically, if all other statements are not true)
      console.log(`Correct! You guessed right, the Secret Number is ${guess}!`)
      console.log(`You only needed ${guessSpan - guessRemain} guesses!\n`) // provides guesses used
      process.exit()    // ends program from inside the WHILE loop
    }
  }
  // Outside the WHILE loop, the conclusion is -> incorrect guesses && ran out of guesses, ergo:
  console.log(`You failed miserably to guess my secret number, which was, of course, ${secret}. \n`)

  process.exit() // ends program after/outside the WHILE loop
  
}   // end of async functionality?