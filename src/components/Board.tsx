import React, {useState} from 'react';
import Square from "./Square";
import {initialBoard} from "../utils";

function Board() {

    const [selectedChecker, setSelectedChecker] = useState([5,0])

    return (
        <>
            <div>
                {initialBoard.map((row, rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {row.map((_, cellIndex) => {
                            const findSelected = selectedChecker[0] === rowIndex &&  selectedChecker[1] === cellIndex

                            return (
                                <Square
                                    key={`${rowIndex}-${cellIndex}`}
                                    coordinates={[rowIndex, cellIndex]}
                                    checker={initialBoard[rowIndex][cellIndex]}
                                    isSelected={findSelected}
                                    onCheckerSelected={setSelectedChecker}
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