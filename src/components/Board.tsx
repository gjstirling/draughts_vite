import React from 'react';
import Square from "./Square";
import {initialBoard} from "../utils";

function Board() {
    return (
        <>
            <div>
                {initialBoard.map((row, rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {row.map((_, cellIndex) => {
                            return (
                                <Square
                                    coordinates={[rowIndex, cellIndex]}
                                    checker={initialBoard[rowIndex][cellIndex]}
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