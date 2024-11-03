const MAX_ATTEMPTS = 5;
const RANGE = 50;
const NUMBERS = Array.from({ length: RANGE }, (_, i) => i + 1);
let targetNumbers;
let attemptsLeft;
let guessedNumbers;

const FEEDBACK_EL = document.getElementById("feedback");
const ATTEMPTS_LEFT_EL = document.getElementById("attempts-left");
const GUESSED_NUMBERS_EL = document.getElementById("guessed-numbers");
const RESET_BTN_EL = document.getElementById("reset-btn");

function startGame() {
    const RANDOM_INDEX = Math.floor(Math.random() * NUMBERS.length);
    targetNumbers = NUMBERS[RANDOM_INDEX];
    attemptsLeft = MAX_ATTEMPTS;
    guessedNumbers = [];

    FEEDBACK_EL.textContent = "Make your guess!";
    ATTEMPTS_LEFT_EL.textContent = attemptsLeft;
    GUESSED_NUMBERS_EL.textContent = "";
    RESET_BTN_EL.style.display = "none";

    playGame();
}

function playGame() {
    while (attemptsLeft > 0) {
        let userGuess = prompt(
            `Guess a number between 1 and ${RANGE}:\nAttempts left: ${attemptsLeft}\nYour guesses: ${guessedNumbers.join(", ")}`
        );

        if (userGuess === null) {
            alert("Game canceled.");
            endGame(false);
            return;
        }

        userGuess = parseInt(userGuess);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > RANGE) {
            alert("Invalid input. Enter a number between 1 and 50!");
            continue;
        }

        let alreadyGuessed = false;
        for (let i = 0; i < guessedNumbers.length; i++) {
            if (guessedNumbers[i] === userGuess) {
                alreadyGuessed = true;
                break;
            }
        }

        if (alreadyGuessed) {
            alert("You've already guessed that number. Try another one!🙂‍↔️");
            continue;
        }

        guessedNumbers.push(userGuess);

        if (userGuess === targetNumbers) {
            alert(`Congratulations! You've guessed the number ${targetNumbers} correctly✨✨.`);
            endGame(true);
            return;
        } else if (userGuess < targetNumbers) {
            alert("Too low! Try again.");
        } else {
            alert("Too high! Try again.");
        }

        attemptsLeft--;
        updateDisplay();

        if (attemptsLeft === 0) {
            alert(`Game over, you've run out of attempts🤡. The correct number was: ${targetNumbers}`);
            endGame(false);
            return;
        }
    }
}

function updateDisplay() {
    FEEDBACK_EL.textContent = "Keep guessing";
    ATTEMPTS_LEFT_EL.textContent = attemptsLeft;
    GUESSED_NUMBERS_EL.textContent = guessedNumbers.join(", ");
}

function endGame(won) {
    RESET_BTN_EL.style.display = "block";
    FEEDBACK_EL.textContent = won ? "Congratulations! You won!" : "Thanks for playing!🌸";
}

window.onload = startGame;
