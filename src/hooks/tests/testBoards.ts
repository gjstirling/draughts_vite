type BoardLayout = (string | null)[][];

export const emptyBoard: BoardLayout = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

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

export const redKingTakesBlueChecker: BoardLayout = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, "blue", null, null, null, null, null],
    [null, "RED", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

export const blueKingNextToBlueChecker: BoardLayout = [
    [null, null, null, "blue", null, null, null, null],
    ["blue", null, "blue", null, null, null, null, null],
    [null, "red", null, null, null, null, null, null],
    [null, null, null, null, "BLUE", null, null, null],
    [null, null, null, "blue", null, "blue", null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

