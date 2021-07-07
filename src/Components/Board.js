import React, { useCallback, useEffect, useState } from 'react';
import Cell from './Cell';

const Board = (props) => {
    const row = props.row;
    const col = props.col;
    const [grid, setGrid] = useState([])
    const [flaggs, setFlaggs] = useState(10);
    const [status, setStatus] = useState("Game in proggress")
    const [startGame, setStartGame] = useState(false)

    /* Function to create board, we have 2d array and for each cell we have value, is revealed, position on x and y and is cell flagged */
    const createBoard = useCallback(() => {
        let board = [];

        for (let x = 0; x < row; x++) {
            let rowArray = [];
            for (let y = 0; y < col; y++) {
                rowArray.push({
                    value: 0,
                    revealed: false,
                    x: x,
                    y: y,
                    flagged: false
                })
            }
            board.push(rowArray)
        }
        let bombCount = 0;

        // while loop to create 10 bombs, we use random to take random x and y and if that position is equel to 0 we place bomb there
        // if there is bomb on that place he wont place another bomb but he will rerun random and try again
        while (bombCount < 10) {
            let x = Math.floor(Math.random() * (row - 1 - 0 + 1) + 0)
            let y = Math.floor(Math.random() * (col - 1 - 0 + 1) + 0)

            if (board[x][y].value === 0) {
                board[x][y].value = "X";
                bombCount++;
            }
        }

        /*Now we are adding number on our cells. We go through double loop and what we need is to chack if we have bomb around our position
        if we find bomb we add 1 on our cell value
        we chack if i is greater then 0 because if its 0 we cant see row above 0 because there is none and we would get error
        Samo goes for j
        */
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (board[i][j].value !== "X") {

                    if (i > 0 && board[i - 1][j].value === "X") {
                        board[i][j].value++;
                    }

                    if (j > 0 && board[i][j - 1].value === "X") {
                        board[i][j].value++;
                    }

                    if (j < col - 1 && board[i][j + 1].value === "X") {
                        board[i][j].value++;
                    }

                    if (i < row - 1 && board[i + 1][j].value === "X") {
                        board[i][j].value++;
                    }



                    if (i > 0 && j > 0 && board[i - 1][j - 1].value === "X") {
                        board[i][j].value++;
                    }

                    if (i > 0 && j < row - 1 && board[i - 1][j + 1].value === "X") {
                        board[i][j].value++;
                    }

                    if (i < row - 1 && j > 0 && board[i + 1][j - 1].value === "X") {
                        board[i][j].value++;
                    }

                    if (i < row - 1 && j < row - 1 && board[i + 1][j + 1].value === "X") {
                        board[i][j].value++;
                    }

                }

            }
        }
        // this function will return board to us
        return board;
    }, [col, row]);

    /* When our game render first time we create board */
    useEffect(() => {
        const board = createBoard();
        // we set our grid to value that we got from function createBoard
        setGrid(board);
        setStartGame(true);
    }, [createBoard])

    /*Function for right click
    we want to preventDefault to make game easyer
    we watch if that cell is already revealed because if it is we cant place flag on it 
    and we chack if its already flagged
    If its not we place flag and if flag is already there we just remove it
    We make copy of our grid and set it at the end to change cell.flagged value
    */
    const putFlag = (e, x, y) => {
        e.preventDefault();
        const gridCopy = grid.slice();
        if (gridCopy[x][y].flagged === false && gridCopy[x][y].revealed === false) {
            setFlaggs(flaggs - 1)
            gridCopy[x][y].flagged = true;
        }
        else {
            if (!gridCopy[x][y].revealed) {
                setFlaggs(flaggs + 1)
            }
            gridCopy[x][y].flagged = false;
        }
        setGrid(gridCopy)
    }

    /*Function for left click
    we copy our grid array because we will change cell values
    we chack if its flagged then we cant reveal our cell
    if cell is empty we call revealEmptyCells function but we will explain it later
    and we go throught loop to chack how many cells are revealed if that number is 54 we have winner
    if our player click on bomb game is over
    */
    const showValue = (e, x, y) => {

        let gridCopy = grid.slice();
        let number = 0;
        if (gridCopy[x][y].flagged === false) {
            e.target.className = "cellRevealed"
            gridCopy[x][y].revealed = true;
            if (gridCopy[x][y].value === 0) {
                gridCopy = revealEmptyCells(x, y, gridCopy);
            }
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    if (gridCopy[i][j].revealed === true) {
                        number++;
                    }
                }
            }

            if (number === 54) {
                setStatus("You Won!");
                for (let i = 0; i < row; i++) {
                    for (let j = 0; j < col; j++) {
                        if (gridCopy[i][j].flagged && gridCopy[i][j].value === "X") {
                            continue;
                        }
                        gridCopy[i][j].revealed = true;

                    }
                }
            }
            if (gridCopy[x][y].value === "X") {
                setStatus("You Lost!")
                for (let i = 0; i < row; i++) {
                    for (let j = 0; j < col; j++) {
                        if (gridCopy[i][j].flagged && gridCopy[i][j].value === "X") {
                            continue;
                        }
                        gridCopy[i][j].revealed = true;

                    }
                }
            }
            setGrid(gridCopy)
        }
    }

    /* Function to reveal empty cells
    first we need our neigbour cells
    when we got all of them we go through each neigbours cell
    and we chack if that cell is not flagged and if its not revealed because we dont want to reaveal flagged cell and cell that is already revealed
    then we chack if cell is 0 or if cell is not bomb. coz we want only to reveal numbers and empty cells
    if all that is true we reveal that cell and if we value of that cell is 0 that means its empty
    we call this function aggain just with new parameters, i mean with new cell
    */
    const revealEmptyCells = (x, y, grid) => {
        const area = getNeigbors(x, y, grid);
        area.forEach(value => {
            if (!value.flagged && !value.revealed && (value.value === 0 || value.value !== "X")) {
                grid[value.x][value.y].revealed = true;
                if (value.value === 0) {
                    revealEmptyCells(value.x, value.y, grid);
                }
            }
        })
        return grid;
    }

    /*Almost same logic as adding numbers for bombs in neigbours but now we dont need to watch for bombs
    we just need to see our neigbour cells and add them to array 
    */
    const getNeigbors = (x, y, board) => {
        const neighbors = [];
        if (x > 0) {
            neighbors.push(board[x - 1][y]);
        }
        if (x < col - 1) {
            neighbors.push(board[x + 1][y]);
        }
        if (y > 0) {
            neighbors.push(board[x][y - 1]);
        }
        if (y < row - 1) {
            neighbors.push(board[x][y + 1]);
        }


        if (x > 0 && y > 0) {
            neighbors.push(board[x - 1][y - 1]);
        }
        if (x > 0 && y < row - 1) {
            neighbors.push(board[x - 1][y + 1]);
        }
        if (x < col - 1 && y > 0) {
            neighbors.push(board[x + 1][y - 1]);
        }
        if (x < col - 1 && y < row - 1) {
            neighbors.push(board[x + 1][y + 1]);
        }

        return neighbors;
    }
    /* We use it to make new board */
    const restartGame = () => {
        const newBoard = createBoard();
        setGrid(newBoard);
        setStatus("Game in proggress")
        setFlaggs(10);
    }

    const startingGame = () => {
        setStartGame(false);
    }

    return (
        <div className="boardWrapper">
            {startGame && (< div className="popupPlayGame">
                <div className="buttonPlayGame" onClick={startingGame}>
                    Play game
                </div>

            </div>)}

            <div className="statusBar">
                <p style={status === "You Won!" ? { color: "darkgreen" } : (status === "You Lost!" ? { color: "red" } : { color: "lemonchiffon" })}>{status}</p>
                <p>Mines remaining: {flaggs}</p>
            </div>

            <div className="board">
                {grid.map((oneRow) => (
                    oneRow.map((singleCneighborsl, id) => (
                        <Cell info={singleCneighborsl} da={id} putFlag={putFlag} showValue={showValue} key={id} />
                    ))
                ))}
            </div>
            {status !== "Game in proggress" && (< div className="popup">
                <div className="button" onClick={restartGame}>
                    {status === "You Lost!" ? "Try again? " : "Play again?"}
                </div>

            </div>)}
        </div >
    );
};

export default Board;