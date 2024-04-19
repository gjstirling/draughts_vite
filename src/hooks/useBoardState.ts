import { useState } from "react";

type Coordinates = [number, number];
type BoardLayout = (string | null)[][];

export const initialBoard: BoardLayout = [
  [null, "blue", null, "blue", null, "blue", null, "blue"],
  ["blue", null, "blue", null, "blue", null, "blue", null],
  [null, "blue", null, "blue", null, "blue", null, "blue"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["red", null, "red", null, "red", null, "red", null],
  [null, "red", null, "red", null, "red", null, "red"],
  ["red", null, "red", null, "red", null, "red", null],
];

const testBoard: BoardLayout = [
  [null, "blue", null, "blue", null, "blue", null, "blue"],
  ["blue", null, "blue", null, "blue", null, "blue", null],
  [null, "blue", null, null, null, "blue", null, "blue"],
  [null, null, "blue", null, null, null, null, null],
  [null, "red", null, null, null, null, null, null],
  ["red", null, null, null, "red", null, "red", null],
  [null, "red", null, "red", null, "red", null, "red"],
  ["red", null, "red", null, "red", null, "red", null],
];
/**
 *  Can move checks the  move is legal and returns a boolean based on this information
 */
export function canMove(
  selectedChecker: Coordinates | null,
  target: Coordinates,
  board: BoardLayout,
  turn: boolean
) {
  // Rules
  const isWhiteSquare = (target[0] + target[1]) % 2 === 0;
  // Selected checker ??
  if (isWhiteSquare) return false;
  if (!selectedChecker) return false;

  // turn based play if turn is true it is red, if false it is blue
  const checkerColour = board[selectedChecker[0]][selectedChecker[1]];
  const isRedTurn = !turn && checkerColour === "red";
  const isBlueTurn = turn && checkerColour === "blue";
  if (isRedTurn || isBlueTurn) return false;

  // if checker on square +1y (-1 or +1 x) then allow move
  // override if checker is between

  // is turn two moves away ?

// enforcing 1 step rule
  if (selectedChecker[0] - target[0] > 1) return false;
  if (target[0] - selectedChecker[0] > 1) return false;
  return true;
}

/**
 *  Calculates the new board based on the coordinate the checker is trying to move to.
 * It does not care about whether it is a legal move
 */
export function calcNewBoard(
  start: Coordinates | null,
  finish: Coordinates,
  board: BoardLayout
) {
  const newBoard = board.map((row) => [...row]);

  if (start) {
    newBoard[finish[0]][finish[1]] = newBoard[start[0]][start[1]];
    newBoard[start[0]][start[1]] = null;
    return newBoard;
  } else return board;
}

export function useBoardState() {
  const [board, setBoard] = useState<BoardLayout>(testBoard);
  const [selectedChecker, setSelectedChecker] = useState<Coordinates | null>(
    null
  );
  const [turn, setTurn] = useState(true);

  function moveAction(target: Coordinates): void {
    const res = canMove(selectedChecker, target, board, turn);
    if (!res) return;

    // Set new board layout and flips turn
    setBoard((board) => calcNewBoard(selectedChecker, target, board));
    setTurn(!turn);
    return;
  }

  return {
    board,
    selectedChecker,
    moveAction,
    setSelectedChecker,
    turn,
    setTurn,
  };
}
