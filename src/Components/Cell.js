import React from 'react';

const Cell = (props) => {

    const value = props.info.revealed ? (props.info.value !== 0 ? (props.info.value === "X" ? "💣" : props.info.value) : "") : props.info.flagged ? "🚩" : "";
    return (
        <div className={props.info.revealed ? "cellRevealed" : "cell"} onClick={(event) => props.showValue(event, props.info.x, props.info.y)} onContextMenu={(event) => props.putFlag(event, props.info.x, props.info.y)}>{value}</div >
    );
};

export default Cell;