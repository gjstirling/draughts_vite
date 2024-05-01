import { useState } from "react";

type Coordinates = [number, number];
type BoardLayout = (string | null)[][];
const redChecker = "red";
const redKing = "RED";
const blueChecker = "blue";
const blueKing = "BLUE";

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

export function canMove(
  checker: Coordinates,
  target: Coordinates,
  board: BoardLayout,
  isSecondTurn: boolean
) {
  const [checkerY, checkerX] = checker;
  const [targetY, targetX] = target;
  const deltaY = targetY - checkerY;
  const deltaX = targetX - checkerX;

  if (targetY < 0 || targetY > board.length - 1) return false;
  if (targetX < 0 || targetX > board.length - 1) return false;
  if (board[targetY][targetX] !== null) return false;

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

  function canTakeAgain(
    checkerPosition: Coordinates,
    board: BoardLayout,
    dy: number,
    dx: number
  ) {
    const [y, x] = checkerPosition;
    const nextSquare = board[y + dy][x + dx];
    const targetSquare = board[y + 2 * dy][x + 2 * dx];
    const checker = board[checkerPosition[0]][checkerPosition[1]];

    if (nextSquare === null || targetSquare !== null || checker === null)
      return false;
    if (checker === "red" && dy === 1) return false;
    if (checker === "blue" && dy === -1) return false;
    if (checker.toLowerCase() === nextSquare.toLowerCase()) return false;

    return true;
  }

  if (
    canTakeAgain(target, board, 1, 1) ||
    canTakeAgain(target, board, 1, -1) ||
    canTakeAgain(target, board, -1, 1) ||
    canTakeAgain(target, board, -1, -1)
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
  const checker = board[selectedChecker[0]][selectedChecker[1]];
  if (!checker) return false;
  // Rules
  const targetIsWhiteSquare = (target[0] + target[1]) % 2 === 0;
  if (targetIsWhiteSquare) return false;
  // check for correct turn;
  const doesNotMatchTurn =
    (!turn && checker.toLowerCase() === "red") ||
    (turn && checker.toLowerCase() === "blue");
  if (doesNotMatchTurn) return false;

  // Can only move a max of two diagonal spaces
  if (
    Math.abs(selectedChecker[0] - target[0]) > 2 ||
    Math.abs(selectedChecker[1] - target[1]) > 2
  )
    return false;

  const isKing = (str: string) => str === str.toUpperCase();
  if (!isKing(checker)) {
    if (selectedChecker[0] - target[0] === 0) return false;
    if (selectedChecker[1] - target[1] === 0) return false;
    if (selectedChecker[0] < target[0] && turn) return false;
    if (target[0] < selectedChecker[0] && !turn) return false;
  }

  return true;
}
function checkAllSpaces(y: number, x: number, board: BoardLayout) {
  return (
    canMove([y, x], [y + 1, x + 1], board, false) ||
    canMove([y, x], [y + 1, x - 1], board, false) ||
    canMove([y, x], [y - 1, x + 1], board, false) || 
    canMove([y, x], [y - 1, x - 1], board, false) ||
    canMove([y, x], [y + 2, x + 2], board, false) ||
    canMove([y, x], [y + 2, x - 2], board, false) ||
    canMove([y, x], [y - 2, x + 2], board, false) ||
    canMove([y, x], [y - 2, x - 2], board, false)
  );
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

export function gameOver(board: BoardLayout, turn: boolean) {
  const nextChecker = turn ? blueChecker : redChecker;
  const nextKing = turn ? blueKing : redKing;

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const isOpponent =
        board[y][x] === nextChecker || board[y][x] === nextKing;
      if (isOpponent && checkAllSpaces(y, x, board)) {
        return false;
      }
    }
  }
  return true;
}

export function useBoardState() {
  const [board, setBoard] = useState<BoardLayout>(initialBoard);
  const [selectedChecker, setSelectedCheckerState] =
    useState<Coordinates | null>(null);
  const [turn, setTurn] = useState(true);
  const [turnLock, setTurnLock] = useState(false);
  const [isGameOver, setGameOver] = useState(false);

  function moveAction(target: Coordinates): void {
    if (!selectedChecker) return;

    const res = checkBaseRules(selectedChecker, target, board, turn);
    if (!res) return;

    const move = canMove(selectedChecker, target, board, turnLock);

    if (!move) return;
    const newBoard = calcNewBoard(selectedChecker, target, board);

    const repeatingTurn = checkForSecondTurn(target, newBoard, selectedChecker);
    setBoard(newBoard);
    if (repeatingTurn) {
      setTurnLock(true);
      setSelectedCheckerState(target);
      return;
    }

    setTurnLock(false);
    if (gameOver(newBoard, turn)) {
      setGameOver(true);
      return;
    }
    setTurn((turn) => !turn);
    return;
  }

  function setSelectedChecker(coordinates: Coordinates) {
    if (turnLock) {
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
    isGameOver,
  };
}
