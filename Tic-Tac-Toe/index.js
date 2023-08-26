const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // making UI empty 
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // after wining making all boxes clean
        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}


function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
    // check if winner is X
    if(gameGrid[position[0]] === "X") {
        answer = "X";
    }
    else {
        answer = "O";
    }
    // disabling pointer event because we found the winner
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
        })
        // adding background colour to show winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
        })
        if(answer !== "") {
            newGameBtn.classList.add("active");
        gameInfo.innerText = `Winner Player - ${answer}`;
        return;
    }
    // when there is no winner (Game Tied)
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" ) {
            fillCount++;
        }
    });
    if(fillCount == 9) {
        gameInfo.innerText = "Game Tied! ";
        newGameBtn.classList.add("active"); 
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        // below linne makes mouse hover or pointer none 
        boxes[index].style.pointerEvents = "none";
        // swap karo turn 
        swapTurn();
        checkGameOver();
    }
} 

boxes.forEach((box, index)=> {
    box.addEventListener('click',() =>{
        handleClick(index);
    })
});


newGameBtn.addEventListener('click',initGame);

initGame();
