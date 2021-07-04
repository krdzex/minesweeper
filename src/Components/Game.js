import React from 'react';
import Board from './Board';
const Game = () => {

    const row = 8;
    const col = 8;
    return (
        <div>
            <Board row={row} col={col} />
        </div>
    );
};

export default Game;