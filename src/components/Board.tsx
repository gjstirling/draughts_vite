import React from 'react';
import Square from "./Square";
import {initialBoard} from "../utils";

function Board() {

    const selectedChecker = [0,3]

    return (
        <>
            <div>
                {initialBoard.map((row, rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {row.map((_, cellIndex) => {
                            return (
                                <Square
                                    key={`${rowIndex}-${cellIndex}`}
                                    coordinates={[rowIndex, cellIndex]}
                                    checker={initialBoard[rowIndex][cellIndex]}
                                    isSelected={selectedChecker[0] === rowIndex &&  selectedChecker[1] === cellIndex}
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