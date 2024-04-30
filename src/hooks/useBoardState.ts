import { useState } from "react";

type Coordinates = [number, number];
type BoardLayout = (string | null)[][];
const redChecker = "red"
const redKing = "RED"
const blueChecker = "blue"
const blueKing = "BLUE"

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

export function canMove(checker: Coordinates, target: Coordinates, board: BoardLayout, isSecondTurn: boolean) {
  const [checkerY, checkerX] = checker;
  const [targetY, targetX] = target;
  const deltaY = targetY - checkerY;
  const deltaX = targetX - checkerX;

  const isSingleMove = Math.abs(deltaY) === 1 && Math.abs(deltaX) === 1;
  if (isSingleMove) {
    return board[targetY][targetX] === null && !isSecondTurn;
  }

  const isDoubleMove = Math.abs(deltaY) === 2 && Math.abs(deltaX) === 2;
  if (isDoubleMove) {
    const middleY = (checkerY + targetY) / 2;
    const middleX = (checkerX + targetX) / 2;
    const checkerColor = board[checkerY][checkerX];
    const middleSquare = board[middleY][middleX];
    return (
      middleSquare !== null &&
      checkerColor !== null &&
      checkerColor.toLowerCase() !== middleSquare.toLowerCase()
    );
  }

  return false;
}

export function checkForSecondTurn(
  target: Coordinates,
  board: BoardLayout,
  oldPosition: Coordinates
) {
  if (Math.abs(oldPosition[0] - target[0]) !== 2) return false;
  if (target[0] < 2 || target[0] > 5) return false;

  // console.log("CASE:    " + canTakeAgain(target, board,-1, 1))

  if (
    canTakeAgain(target, board, 1, 1) ||
    canTakeAgain(target, board, 1, -1) ||
    canTakeAgain(target, board,-1, 1) ||
    canTakeAgain(target, board, -1, -1)
  ){
    return true;
  }
  return false;
}


  // This is used to make sure the move is legal (contains logic for assesing that)
  function canTakeAgain(
    checkerPosition: Coordinates,
    board: BoardLayout,
    dy: number,
    dx: number
  ) {
    const [y, x] = checkerPosition;
    const nextX = x + dx;
    const nextY = y + dy;
    const jumpX = x + 2 * dx;
    const jumpY = y + 2 * dy;
    const nextSquare = board[nextY][nextX]
    const targetSquare = board[jumpY][jumpX]
    const checker = board[y][x]

    // RULES
    if(nextSquare === null || targetSquare !== null || checker === null) return false
    if(checker === "red" && dy === 1) return false 
    if(checker === "blue" && dy === -1) return false 
    if(checker.toLowerCase() === nextSquare.toLowerCase()) return false

    return true;
  }

export function checkBaseRules(
  selectedChecker: Coordinates,
  target: Coordinates,
  board: BoardLayout,
  turn: boolean
) {
  const checker = board[selectedChecker[0]][selectedChecker[1]];
  if (!checker) return false;

  // Rules
  const isWhiteSquare = (target[0] + target[1]) % 2 === 0;
  if (isWhiteSquare) return false;

  // check for correct turn;
  const doesNotMatchTurn = (!turn && checker.toLowerCase() === "red") ||(turn && checker.toLowerCase() === "blue");
  if(doesNotMatchTurn) return false;

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

  return true;
}

export function calcNewBoard(
  start: Coordinates,
  finish: Coordinates,
  board: BoardLayout
) {
  const newBoard = board.map((row) => [...row]);

  newBoard[finish[0]][finish[1]] = newBoard[start[0]][start[1]];
  newBoard[start[0]][start[1]] = null;

  const [checkerY, checkerX] = start;
  const [targetY, targetX] = finish;
  const differenceY = targetY - checkerY;
  const differenceX = targetX - checkerX;
  if (Math.abs(differenceY) > 1 && Math.abs(differenceX) > 1) {
    const y = (start[0] + finish[0]) / 2;
    const x = (start[1] + finish[1]) / 2;
    newBoard[y][x] = null;
  }

  const checker = newBoard[finish[0]][finish[1]];
  if (finish[0] === 0 && checker === redChecker) {
    newBoard[finish[0]][finish[1]] = redKing;
  }
  if (finish[0] === newBoard.length - 1 && checker === blueChecker) {
    newBoard[finish[0]][finish[1]] = blueKing;
  }

  newBoard[finish[0]][finish[1]];
  return newBoard;
}

export function useBoardState() {
  const [board, setBoard] = useState<BoardLayout>(initialBoard);
  const [selectedChecker, setSelectedCheckerState] =
    useState<Coordinates | null>(null);
  const [turn, setTurn] = useState(true);
  const [secondTurn, setSecondTurn] = useState(false);

  function moveAction(target: Coordinates): void {
    if (!selectedChecker) return;

    const res = checkBaseRules(selectedChecker, target, board, turn);
    if (!res) return;

    const move = canMove(selectedChecker, target, board);
    if (!move) return;

    setBoard((board) => calcNewBoard(selectedChecker, target, board));

    const newBoard = calcNewBoard(selectedChecker, target, board)

    const secondTurn = checkForSecondTurn(target, newBoard, selectedChecker);
    if (secondTurn) {
      setSecondTurn(true);
      setSelectedCheckerState(target);
      return;
    }

    setSecondTurn(false);
    setTurn(!turn);
    return;
  }

  function setSelectedChecker(coordinates: Coordinates) {
    if (secondTurn) {
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
