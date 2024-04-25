type BoardLayout = (string | null)[][];

export const testBoard: BoardLayout = [
    [null, null, null, null, null, null, null, null],
    [null, null, "red", null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, "blue", null, null, null, null, null],
    [null, "red", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

export const testBoardWithKing: BoardLayout = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, "blue", null, null, null, null, null],
    [null, "RED", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

export const testBoardForSecondTurn: BoardLayout = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, "blue", null, "blue", null, null, null, null],
    [null, null, "red", null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

  export const errorBoard: BoardLayout = [
    [null, null, null, "blue", null, null, null, null],
    ["blue", null, "blue", null, null, null, null, null],
    [null, "red", null, null, null, null, null, null],
    [null, null, null, null, "blue", null, null, null],
    [null, null, null, "blue", null, "blue", null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

  export const kingNextToChecker: BoardLayout = [
    [null, null, null, "blue", null, null, null, null],
    ["blue", null, "blue", null, null, null, null, null],
    [null, "red", null, null, null, null, null, null],
    [null, null, null, null, "BLUE", null, null, null],
    [null, null, null, "blue", null, "blue", null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];