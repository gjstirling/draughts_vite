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

/**
 *  Can move checks the  move is legal and returns a boolean based on this information
 */

export function canMove(
  checker: Coordinates,
  target: Coordinates,
  board: BoardLayout
) {
  const [checkerY, checkerX] = checker;
  const [targetY, targetX] = target;
  // for red checker moves
  const differenceY = targetY - checkerY;
  const differenceX = targetX - checkerX;

  // if move only moves diagonally once allow it
  if (Math.abs(differenceY) === 1 && Math.abs(differenceX) === 1) {
    return true;
  }

  // if move is two diagonals check for checker in between
  if (Math.abs(differenceY) === 2 && Math.abs(differenceX) === 2) {
    const y = (checker[0] + target[0]) / 2;
    const x = (checker[1] + target[1]) / 2;
    return board[y][x] !== null;
  }
}

export function checkForDouble(
  target: Coordinates,
  board: BoardLayout,
  turn: boolean,
  oldPosition: Coordinates
) {
  if (Math.abs(oldPosition[0] - target[0]) !== 2) return false;

  if (target[0] < 2 || target[0] > 5) return false;

  // blue
  if (
    board[target[0] + 1][target[1] + 1] &&
    !turn &&
    !board[target[0] + 2][target[1] + 2]
  ) {
    return true;
  }
  if (
    board[target[0] + 1][target[1] - 1] &&
    !turn &&
    !board[target[0] + 2][target[1] - 2]
  ) {
    return true;
  }
  // red
  if (
    board[target[0] - 1][target[1] - 1] &&
    turn &&
    !board[target[0] - 2][target[1] - 2]
  ) {
    return true;
  }

  if (
    board[target[0] - 1][target[1] + 1] &&
    turn &&
    !board[target[0] - 2][target[1] + 2]
  ) {
    return true;
  }

  return false;
}

export function checkBaseRules(
  selectedChecker: Coordinates,
  target: Coordinates,
  board: BoardLayout,
  turn: boolean
) {
  const checker = board[selectedChecker[0]][selectedChecker[1]]
  if(!checker) return false;

  // Rules
  const isWhiteSquare = (target[0] + target[1]) % 2 === 0;
  if (isWhiteSquare) return false;

  // Can only move a max of two diagonal spaces
  if (Math.abs(selectedChecker[0] - target[0]) > 2) return false;
  if (Math.abs(selectedChecker[1] - target[1]) > 2) return false;

  const isUpperCase = (str: string) => str === str.toUpperCase();
  if (!isUpperCase(checker)) {
    // Can only move diagonally "forward"
    if (selectedChecker[0] - target[0] === 0) return false;
    if (selectedChecker[1] - target[1] === 0) return false;
    if (selectedChecker[0] < target[0] && turn) return false;
    if (target[0] < selectedChecker[0] && !turn) return false;
  }

  // check for correct turn;
  const moveMatchesTurn = (turn && checker.toLowerCase() === "red") || (!turn && checker.toLowerCase() === "blue")
  return moveMatchesTurn;
}

/**
 *  Calculates the new board based on the coordinate the checker is trying to move to.
 * It does not care about whether it is a legal move
 */
export function calcNewBoard(
  start: Coordinates,
  finish: Coordinates,
  board: BoardLayout
) {
  const newBoard = board.map((row) => [...row]);

  newBoard[finish[0]][finish[1]] = newBoard[start[0]][start[1]];
  newBoard[start[0]][start[1]] = null;

  // here is checker is between target and checker remove it
  const [checkerY, checkerX] = start;
  const [targetY, targetX] = finish;
  // for red checker moves
  const differenceY = targetY - checkerY;
  const differenceX = targetX - checkerX;

  if (Math.abs(differenceY) > 1 && Math.abs(differenceX) > 1) {
    const y = (start[0] + finish[0]) / 2;
    const x = (start[1] + finish[1]) / 2;
    newBoard[y][x] = null;
  }

  const checker = newBoard[finish[0]][finish[1]]

  // make checkers kings 
  if(finish[0] === 0 && checker === "red"){
    newBoard[finish[0]][finish[1]] = "RED"
  }

  if(finish[0] === (newBoard.length - 1) && checker === "red"){
    newBoard[finish[0]][finish[1]] = "RED"
  }

  newBoard[finish[0]][finish[1]] 
  return newBoard;
}

export function useBoardState() {
  const [board, setBoard] = useState<BoardLayout>(initialBoard);
  const [selectedChecker, setSelectedCheckerState] =
    useState<Coordinates | null>(null);
  const [turn, setTurn] = useState(true);
  const [doubleTurn, setDoubleTurn] = useState(false);

  function moveAction(target: Coordinates): void {
    // guard for no checker selected, basic rules
    if (!selectedChecker) return;

    const res = checkBaseRules(selectedChecker, target, board, turn);
    if (!res) return;

    const move = canMove(selectedChecker, target, board);
    if (!move) return;

    // Set new board layout and flips turn
    setBoard((board) => calcNewBoard(selectedChecker, target, board));

    const secondTurn = checkForDouble(target, board, turn, selectedChecker);

    if (secondTurn) {
      setDoubleTurn(true);
      console.log("Another move?       " + secondTurn);
      setSelectedCheckerState(target);
      return;
    }

    setDoubleTurn(false);
    setTurn(!turn);
    return;
  }

  function setSelectedChecker(coordinates: Coordinates) {
    if (doubleTurn) {
      console.log("ANother move needs to happen");
      return;
    }

    setSelectedCheckerState(coordinates);
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
