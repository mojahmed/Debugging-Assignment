const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber = 99;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
    // Hide the message displaying the number of guesses
    // Bug 7: Added the following line to hide the message after a correct guess.
    numberOfGuessesMessage.style.display = 'none';
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      // i did fix this line it was displaying tooLowMessage for both cases
      // bug 6: fixed line 51.
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }
  // fixed the equality operator it was 4 of them we should use 3 only if we want to check 
  // whether two values are equal in both value and data type
  // bug1: fixed line 62.
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;

    // I added a code of line number 68 to display the message when the maximum number of attempts is reached.
    // bug8:line number 68
    maxGuessesMessage.style.display = '';

    // I added line of 72 to hide the message when the maximum number of attempts is reached.
    // bug9;line number 72
    numberOfGuessesMessage.style.display = 'none';


    // bug10: i also add code on line 76 to hide the You guessed too low. Try again message.
    tooLowMessage.style.display = 'none';
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {

  // i did correct the if condition it was like <= and i change it to <.
  // bug5: fixed line 88.
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}
// fixed function it was like this "funtion"
// bug2: fixed line 94.
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  // bug3: fixed line 101.
  attempts = 0;

  // Enable the input and submit button

  // line 107 was trike one it was disabeld and i change it to disabled
  // bug4:.
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';


}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
