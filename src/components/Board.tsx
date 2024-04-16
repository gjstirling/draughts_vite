import {useState} from 'react';
import Square from "./Square";
import {initialBoard} from "../utils";

function Board() {

    type coordinates = [number, number]
    type board = string[][] | null[][]

    const [board, setBoard] = useState(initialBoard)
    const [selectedChecker, setSelectedChecker] = useState<coordinates>([0, 0]);

    function moveChecker(start: coordinates, finish: coordinates, board: board) {
        const newBoard = board.map(row => [...row]);

        newBoard[finish[0]][finish[1]] = newBoard[start[0]][start[1]];
        newBoard[start[0]][start[1]] = null;

        setBoard(newBoard)

        return newBoard
    }

    function moveAction(move: coordinates) {
        if (selectedChecker[0] === 0 && selectedChecker[1] === 0) return board
        else {
            return moveChecker(selectedChecker, move, board as board)
        }
    }

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
                                    checker={board[rowIndex][cellIndex] || ""}
                                    isSelected={findSelected}
                                    onCheckerSelected={(coordinates) => setSelectedChecker(coordinates)}
                                    moveAction={moveAction}
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