const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessedText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
let audioPlayed;
let currentWord;
let wrongGuessCount=0 , maxGuessCount = 6, correctLetters;


const resetGame = () =>{
    playAgainBtn.classList.add("clicked");
    correctLetters = [];
    wrongGuessCount = 0;
    wordDisplay.innerHTML = currentWord.split("").map( () => '<li class="letter"></li>' ).join("");
    gameModal.classList.remove("show");
    // if(!wrongGuessCount) {
    //     hangmanImage.src = `/Hangman Game/images/original-10102868-1.jpg`;
    // }
    // else {

        hangmanImage.src = `/Hangman Game/images/hangman-${wrongGuessCount}.svg`;
    // }
    guessedText.innerHTML = `${wrongGuessCount} / ${maxGuessCount}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    playAgainBtn.classList.remove("clicked");
    
}


// Selecting random Word and hint from word List
const getrandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random()*wordList.length)]
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerHTML = hint;
    resetGame();

}


const gameOver = (isVictory) => {
    setTimeout(() => {
        audioPlayed = isVictory? new Audio("success.mp3"): new Audio("lost.mp3");
        audioPlayed.play();
        const modalText = isVictory? `You found the word:` :`The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory':'lost'}.gif`
        gameModal.querySelector("h3 b").innerText = `${isVictory ? 'Congrats!':'Game Over!'}`
        gameModal.querySelector(".answer").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show");
    },300);
}


const initGame = (button, clickedLetter) => {
    audioPlayed = new Audio('click.mp3');
    audioPlayed.play();
    if (currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter){
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                correctLetters.push(letter);
            }
        });
    }
    else{
        wrongGuessCount++;
        hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true;
    guessedText.innerHTML = `${wrongGuessCount} / ${maxGuessCount}`;

    if(wrongGuessCount === maxGuessCount) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons
for(let i=97; i<123; i++){
    const button = document.createElement("button")
    button.innerHTML = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}




getrandomWord();
playAgainBtn.addEventListener("click", getrandomWord)