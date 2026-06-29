let isXTurn = true;
let gameOver = false;

const boxes = document.querySelectorAll('.box');
const infoDisplay = document.querySelector('.info');
const resetBtn = document.querySelector('.reset');
const soundState = document.querySelector('.sound');
const musicState = document.querySelector('.music');
const restartBtn = document.querySelector('.restart');
const scoreX = document.querySelector('.scoreX');
const scoreO = document.querySelector('.scoreO');

infoDisplay.textContent = "X's Turn";

const clickSound = new Audio('assets/sounds/move.mp3');
const bgMusic = new Audio('assets/sounds/background-music.mp3');
const gameoverSound = new Audio('assets/sounds/game-over.mp3');

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let counterX = 0;
let counterO = 0;
scoreX.textContent = counterX;
scoreO.textContent = counterO;

document.addEventListener('click', () => {
    bgMusic.play();
    bgMusic.volume = 0.4
    bgMusic.loop = true;
});

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (gameOver) return;

        const boxText = box.querySelector('.boxtext');

        if (boxText.textContent === '') {
            clickSound.currentTime = 0;
            clickSound.play();

            boxText.textContent = isXTurn ? 'X' : 'O';
            boxText.classList.add(isXTurn ? 'red' : 'blue');

            isXTurn = !isXTurn;

            let winner = checkWin();

            if (winner !== null) {
                infoDisplay.textContent = `${winner} wins!`;
                gameOver = true;
                gameoverSound.play();
                bgMusic.pause();
            }
            else if(isDraw()) {
                infoDisplay.textContent = "It's a DRAW!";
                gameOver = true;
                gameoverSound.play();
                bgMusic.pause();
            }
            else {
                infoDisplay.textContent = (isXTurn ? 'X' : 'O') + "'s turn";
            }
        }
    });
});

function checkWin() {
    const boxtexts = document.querySelectorAll('.boxtext');

    for (let i = 0; i < winPatterns.length; ++i) {
        let a = winPatterns[i][0];
        let b = winPatterns[i][1];
        let c = winPatterns[i][2];

        if (boxtexts[a].textContent !== '' &&
            boxtexts[a].textContent === boxtexts[b].textContent &&
            boxtexts[b].textContent === boxtexts[c].textContent) {
            
                const winnerMark = boxtexts[a].textContent;
                const winClass = winnerMark === 'X' ? 'win-x' : 'win-o';

                if(winnerMark === 'X') {
                    counterX++;
                    scoreX.textContent = counterX;
                }
                else {
                    counterO++;
                    scoreO.textContent = counterO;
                }

                boxes[a].classList.add(winClass);
                boxes[b].classList.add(winClass);
                boxes[c].classList.add(winClass);

                return winnerMark;
        }
    }

    return null;
};

function isDraw(){
    const boxtexts = document.querySelectorAll('.boxtext');

    for(let i = 0; i < boxtexts.length; ++i) {
        if(boxtexts[i].textContent === '') {
            return false;
        }
    }
    return true;
}

restartBtn.addEventListener('click', () => {
    bgMusic.currentTime = 0;
    bgMusic.play();
    bgMusic.loop = true;
    
    resetBtn.click();
    infoDisplay.textContent = "X's Turn";

    counterX = 0;
    counterO = 0;

    scoreX.textContent = 0;
    scoreO.textContent = 0;
});


resetBtn.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');

    boxtexts.forEach(box => {
        box.textContent = "";
        box.classList.remove('red', 'blue');
        bgMusic.volume = 0.6;
        
    });

    boxes.forEach(box => {
        box.classList.remove('win-x', 'win-o');
    });

    isXTurn = true;
    gameOver = false;
    infoDisplay.textContent = "X's Turn";

});

let isSoundPlaying = false;

soundState.addEventListener('click', () => {
    if(!isSoundPlaying) {
        gameoverSound.muted = false;
        clickSound.muted = false;
        isSoundPlaying = true;
        soundState.textContent = '🔊';
    }
    else {
        gameoverSound.muted = true;
        clickSound.muted = true;
        isSoundPlaying = false;
        soundState.textContent = '🔇';
    }
});

let isMusicPlaying = false;

musicState.addEventListener('click', () => {
    if(!isMusicPlaying) {
        bgMusic.currentTime = 0;
        bgMusic.muted = false;
        isMusicPlaying = true;
        musicState.textContent = '🎵';
    }
    else {
        bgMusic.muted = true;
        isMusicPlaying = false;
        musicState.textContent = '❌';
    }
});