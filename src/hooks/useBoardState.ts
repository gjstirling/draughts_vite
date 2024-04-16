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

function isMovingOneSpaceOnly(){
    return true;
}

export function useBoardState() {

    const [board, setBoard] = useState<BoardLayout>(initialBoard)
    const [selectedChecker, setSelectedChecker] = useState<Coordinates | null>(null);

    function moveChecker(start: Coordinates, finish: Coordinates) {

        // rule - can only move if square + 1(x) + 1(y) && isEmpty
        if(!isMovingOneSpaceOnly()) return;
        

        // rule - can take is square 1(x) + 1(y) && 2(x) + 2(y) isEmpty

        const newBoard = board.map(row => [...row]);

        newBoard[finish[0]][finish[1]] = newBoard[start[0]][start[1]];
        newBoard[start[0]][start[1]] = null;

        setBoard(newBoard)

        return newBoard
    }


    function moveAction(move: Coordinates) {
        if (selectedChecker) {
            return moveChecker(selectedChecker, move)
        } else {
            return board
        }
    }

    return {
        board, 
        selectedChecker,
        moveAction,
        setSelectedChecker
    }
}