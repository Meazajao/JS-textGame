const MAX_ATTEMPTS = 5;
const RANGE = 50;
const NUMBERS = Array.from({ length: RANGE }, (_, i) => i + 1);
let targetNumber;
let attemptsLeft;
let guessedNumbers;

const FEEDBACK_EL = document.getElementById("feedback");
const ATTEMPTS_LEFT_EL = document.getElementById("attempts-left");
const GUESSED_NUMBERS_EL = document.getElementById("guessed-numbers");
const RESET_BTN_EL = document.getElementById("reset-btn");

const startGame = () => {
    const RANDOM_INDEX = Math.floor(Math.random() * NUMBERS.length);
    targetNumber = NUMBERS[RANDOM_INDEX];
    attemptsLeft = MAX_ATTEMPTS;
    guessedNumbers = [];

    FEEDBACK_EL.textContent = "💖✨ Welcome, fabulous friend! A pink-loving fairy princess has hidden her favorite number between 1 and 50. Can you guess it? 💅✨";
    ATTEMPTS_LEFT_EL.textContent = attemptsLeft;
    GUESSED_NUMBERS_EL.textContent = "";
    RESET_BTN_EL.style.display = "none";

    playGame();
}

const playGame = () => {
    while (attemptsLeft > 0) {
        let userGuess = prompt(
            `🌸 What's your best guess, darling? Pick a number between 1 and ${RANGE}:\n💞 Attempts left: ${attemptsLeft}\n💄 Your guesses: ${guessedNumbers.join(", ")}`
        );

        if (userGuess === null) {
            alert("😔 Aww, giving up already? The fairy princess is disappointed but waves goodbye with a sparkle.");
            endGame(false);
            return;
        }

        userGuess = parseInt(userGuess);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > RANGE) {
            alert("🚫 Hold up, glamazon! Enter a real number between 1 and 50!");
            continue;
        }

        if (guessedNumbers.includes(userGuess)) {
            alert("👠 You've already tried that number, sparkle star! Pick another one.");
            continue;
        }

        guessedNumbers.push(userGuess);

        if (userGuess === targetNumber) {
            alert(`🎉💖 Yasss! You guessed it! The princess's secret number is ${targetNumber}, and she's showering you with sparkles and confetti! 🎊👑`);
            endGame(true);
            return;
        } else if (userGuess < targetNumber) {
            alert("📉 Ooh, too low, darling! Go higher and reach for the stars! 💫");
        } else {
            alert("📈 Oopsie! Too high! Try a lower number, sparkle queen!");
        }

        attemptsLeft--;
        updateDisplay();

        if (attemptsLeft === 0) {
            alert(`💔 Game over! The fairy princess sighs and reveals her number: ${targetNumber}. Better luck next time, fabulous!`);
            endGame(false);
            return;
        }
    }
}

const updateDisplay = () => {
    FEEDBACK_EL.textContent = "💫 Keep going, fabulous! You're so close!";
    ATTEMPTS_LEFT_EL.textContent = attemptsLeft;
    GUESSED_NUMBERS_EL.textContent = guessedNumbers.join(", ");
}

const endGame = (won) => {
    RESET_BTN_EL.style.display = "block";
    FEEDBACK_EL.textContent = won ? "👑 Sparkle on, superstar! You did it! 💖✨" : "💔 The fairy princess waves goodbye... until next time!";
}

window.onload = startGame;
