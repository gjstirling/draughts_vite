import {useState} from "react";

type Coordinates = [number, number]
type BoardLayout = (string | null)[][]

export const initialBoard: BoardLayout = [
    [null, 'blue', null, 'blue', null, 'blue', null, 'blue'],
    ['blue', null, 'blue', null, 'blue', null, 'blue', null],
    [null, 'blue', null, 'blue', null, 'blue', null, 'blue'],
    [null, null, null, null, null, null, null,null],
    [null, null, null, null, null, null, null,null],
    ["red", null, "red", null, "red", null, "red", null],
    [null, "red", null, "red", null, "red", null, "red"],
    ["red", null, "red", null, "red", null, "red", null]
]



export function useBoardState() {

    const [board, setBoard] = useState<BoardLayout>(initialBoard)
    const [selectedChecker, setSelectedChecker] = useState<Coordinates | null>(null);
    const [turn, setTurn] = useState(true)

    function moveChecker(start: Coordinates, finish: Coordinates) {
        const newBoard = board.map(row => [...row]);

        newBoard[finish[0]][finish[1]] = newBoard[start[0]][start[1]];
        newBoard[start[0]][start[1]] = null;

        setBoard(newBoard)

        return newBoard
    }


    function moveAction(move: Coordinates) {
        const isWhiteSquare = (move[0] + move[1]) % 2 === 0
        // turn based play if turn is true it is red, if false it is blue
        if (!selectedChecker) return board;
        if(isWhiteSquare) return board;

        const checkerColour = board[selectedChecker[0]][selectedChecker[1]];
        const isRedTurn = turn && checkerColour === "red";
        const isBlueTurn = !turn && checkerColour === "blue";

        if (isRedTurn || isBlueTurn) {
            setTurn(!turn);
            return moveChecker(selectedChecker, move);
        }

        return board;
    }

    return {
        board, 
        selectedChecker,
        moveAction,
        setSelectedChecker,
        turn, setTurn
    }
}