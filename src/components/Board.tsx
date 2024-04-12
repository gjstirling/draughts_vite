import React, {useState} from 'react';
import Square from "./Square";
import {initialBoard} from "../utils";

type coordinates = [number, number]

function Board() {

    const [board] = useState(initialBoard)
    const [selectedChecker, setSelectedChecker] = useState([null,null])


    return (
        <>
            <div>
                {board.map((row, rowIndex) => (
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

function moveChecker(start: coordinates, finish: coordinates, board: (string | null)[][]) {
    const newBoard = board.map(row => [...row]);

    // Move the checker to the finish position
    newBoard[finish[0]][finish[1]] = newBoard[start[0]][start[1]];
    newBoard[start[0]][start[1]] = null;

    return newBoard
}


export default Board;