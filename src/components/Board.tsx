import React from 'react';
import Square from "./Square";
import { emptyBoard } from "../utils";

function Board() {
    return (
        <>
            <div>
                {emptyBoard.map((row, rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {row.map((_, cellIndex) => {
                            return (
                                <Square
                                    value={[rowIndex, cellIndex]}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Board;