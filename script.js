let userScore = 0;
let computerScore = 0;
let roundCount = 1;
const totalRounds = 5;
let userChoice = '';
let computerChoice = '';

const resultDisplay = document.getElementById('result');
const scoreboardDisplay = document.getElementById('scoreboard');
const roundInfoDisplay = document.getElementById('roundInfo');
const nextRoundBtn = document.getElementById('nextRoundBtn');

// Function to randomly select the computer's choice
function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a Tie!";
    } else if ((userChoice === 'Rock' && computerChoice === 'Scissors') || 
               (userChoice === 'Paper' && computerChoice === 'Rock') || 
               (userChoice === 'Scissors' && computerChoice === 'Paper')) {
        userScore++;
        return "You Win!";
    } else {
        computerScore++;
        return "Computer Wins!";
    }
}

// Function to make a choice and lock the user's move
function makeChoice(choice) {
    if (roundCount > totalRounds) return;  // Prevent further choices after the game ends

    userChoice = choice;
    computerChoice = getComputerChoice();

    // Determine the round result
    const result = determineWinner(userChoice, computerChoice);

    // Update the result display
    resultDisplay.innerText = `You chose: ${userChoice} | Computer chose: ${computerChoice}\n${result}`;

    // Update the scoreboard
    updateScoreboard();

    // Disable buttons to prevent cheating
    disableButtons();

    // Enable the Next Round button
    nextRoundBtn.disabled = false;

    // Increment the round count
    roundCount++;
}

// Function to update the scoreboard
function updateScoreboard() {
    scoreboardDisplay.innerText = `User: ${userScore} | Computer: ${computerScore}`;
}

// Function to move to the next round
function nextRound() {
    if (roundCount > totalRounds) {
        showFinalResult(); // Show the final result pop-up
        return;
    }

    resultDisplay.innerText = `Round ${roundCount}/${totalRounds}`;
    roundInfoDisplay.innerText = `Round ${roundCount}/${totalRounds}`;
    enableButtons();
    nextRoundBtn.disabled = true;
}

// Function to disable choice buttons after selection
function disableButtons() {
    document.getElementById('rockBtn').disabled = true;
    document.getElementById('paperBtn').disabled = true;
    document.getElementById('scissorsBtn').disabled = true;
}

// Function to enable choice buttons for the next round
function enableButtons() {
    document.getElementById('rockBtn').disabled = false;
    document.getElementById('paperBtn').disabled = false;
    document.getElementById('scissorsBtn').disabled = false;
}

// Function to show the final result at the end of the game
function showFinalResult() {
    let finalMessage = '';
    if (userScore > computerScore) {
        finalMessage = "Congratulations! YOU WON!!";
    } else if (computerScore > userScore) {
        finalMessage = "OOOPS!!, the computer won the game!";
    } else {
        finalMessage = "It's a TIE!!";
    }
    showPopup(finalMessage); // Show pop-up with final result
}

// Function to restart the game
function restartGame() {
    userScore = 0;
    computerScore = 0;
    roundCount = 1;
    userChoice = '';
    computerChoice = '';

    resultDisplay.innerText = "Choose Rock, Paper, or Scissors!";
    roundInfoDisplay.innerText = `Round 1/${totalRounds}`;
    updateScoreboard();
    enableButtons();
    nextRoundBtn.disabled = true;
}

// Function to show the popup with appropriate message
function showPopup(message) {
    document.getElementById('overlay').classList.add('active');
    document.getElementById('popup').classList.add('active');

    const titleElement = document.getElementById('popup-title');
    const messageElement = document.getElementById('popup-message');
    
    titleElement.innerText = "Game Over!";
    messageElement.innerText = message; // Use the final game message
}

// Close popup functionality
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('popup').classList.remove('active');
});
