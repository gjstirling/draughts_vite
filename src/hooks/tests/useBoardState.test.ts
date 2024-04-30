import { describe, expect, test } from "vitest";
import {checkBaseRules, initialBoard, calcNewBoard, canMove, checkForSecondTurn} from "../useBoardState";
import {emptyBoard} from "./testBoards";

type BoardLayout = (string | null)[][];
const redChecker = "red"
const redKing = "RED"
const blueChecker = "blue"
const blueKing = "BLUE"

describe("checkBaseRules: ", () => {
    // true cases:
    test('Returns true when red checker is selected and target is within range', () => {
        const result = checkBaseRules([5,2], [4,3], initialBoard, true)
        
        expect(result).toBe(true)
    }); 

    test('Returns true when blue checker is selected and target is within range', () => {
        const result = checkBaseRules([2,3], [3,2], initialBoard, false)
        
        expect(result).toBe(true)
    }); 

    test('Returns true when red checker is selected, target is two moves away and there is a blue checker in path', () => {
        const board = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, "blue", null, null, null, null, null],
            [null, "red", null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ];

        const result = checkBaseRules([4,1], [2,3], board, true)
        
        expect(result).toBe(true)
    }); 

    test('Returns true when blue checker is selected, target is two moves away and there is a blue checker in path', () => {
        const board = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, "blue", null, null, null, null, null],
            [null, "red", null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ];
        const result = checkBaseRules([3,2], [5,0], board, false)
        
        expect(result).toBe(true)
    }); 

    test('Returns true when moving a king backwards', () => {
        const board = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, "blue", null, null, null, null, null],
            [null, "RED", null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ];
        const result = checkBaseRules([4,1], [5,0], board, true)
        
        expect(result).toBe(true)
    });
    
    // False cases
    test('Returns false when target is a white square', () => {
        const result = checkBaseRules([5,2], [4,4], initialBoard, true)
        
        expect(result).toBe(false)
    });

    test('Returns false when target is three rows away or more', () => {
        const result = checkBaseRules([6,1], [3,4], initialBoard, true)
        
        expect(result).toBe(false)
    }); 

    test('Returns false when there is no checker on selected square', () => {
        const result = checkBaseRules([0,0], [1,2], initialBoard, true)
        
        expect(result).toBe(false)
    }); 

    test('Returns false when turn is true && blue checker is selected', () => {
        const result = checkBaseRules([2,3], [3,2], initialBoard, true)
        
        expect(result).toBe(false)
    });

    test('Returns false when turn is false && red checker is selected', () => {
        const result = checkBaseRules([5,2], [4,3], initialBoard, false)
        
        expect(result).toBe(false)
    });

    test('Returns false when trying to move backwards', () => {
        const result = checkBaseRules([4,1], [5,0], initialBoard, true)
        
        expect(result).toBe(false)
    });
});

describe("canMove: ", () => {
    test('Returns true when red checker is moving one diagonal square away', () => {
        const result= canMove([5,0], [4,1], initialBoard)

        expect(result).toBe(true)
    }); 

    test('Returns false when square is occupied by a checker', () => {
        const board = [
            [null, null, null, null, null, null, null, null],
            [null, null, "red", null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, "blue", null, null, null, null, null],
            [null, "red", null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ]
        const result= canMove([4,1], [3,2], board)

        expect(result).toBe(false)
    });

    test('Returns true when making a double move with checker inbetween', () => {
        const board = [
            [null, null, null, null, null, null, null, null],
            [null, null, "red", null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, "blue", null, null, null, null, null],
            [null, "red", null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ]
        const result= canMove([4,1], [2,3], board)

        expect(result).toBe(true)
    });

    test('Returns false when trying to jump two spaces', () => {
        const board = [
            [null, null, null, null, null, null, null, null],
            [null, null, "red", null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, "blue", null, null, null, null, null],
            [null, "red", null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ]
        const result= canMove([3,2], [5,4], board)

        expect(result).toBe(false)
    });

    test('Returns false when king tries to move over another blue checker', () => {
        const board = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, "BLUE", null, null, null],
            [null, null, null, "blue", null, "blue", null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ]
        const result = canMove([3,4], [5,2], board)
        
        expect(result).toBe(false)
    });
});

describe("calcNewBoard: ", () => {
    test('Can return an updated board', () => {
        const result = calcNewBoard([5,2], [4,3], initialBoard)
        
        expect(result[4][3]).toBe(redChecker)
    }); 

    test('Can return an updated board when a checker has been taken', () => {
        const board = [
            [null, null, null, null, null, null, null, null],
            [null, null, "red", null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, "blue", null, null, null, null, null],
            [null, "red", null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ]
        const result = calcNewBoard([4,1], [2,3], board)
        
        expect(result[3][2]).toBe(null)
    }); 
});

// checkForSecondTurn(
//     target: Coordinates,
//     board: BoardLayout,
//     oldPosition: Coordinates
//   )
describe("checkForSecondTurn", () => {
    test('returns false if last turn was a single diagonal move', () => {
        const act = checkForSecondTurn([4,1], emptyBoard, [3,0])
        
        expect(act).toBe(false)
    }); 

    test('returns false if checker has landed on bottom or top two rows of board', () => {
        const bottomOfBoard = checkForSecondTurn([6,1], emptyBoard, [0,0])
        const topOfBoard = checkForSecondTurn([2,1], emptyBoard, [0,0])
        
        expect(bottomOfBoard).toBe(false)
        expect(topOfBoard).toBe(false)
    }); 
// CHECKER Behaviour assetions
    test('returns true if blue checker lands within range of a red checker and can take it', () => {
        const board: BoardLayout = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, "blue", null, null, null],
            [null, null, null, "red", null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ];
        const act = checkForSecondTurn([5,4], board, [3,2])
               
        expect(act).toBe(true)
    }); 

    test('returns FALSE if blue checker lands within range of a red checker but target is blocked', () => {
        const board: BoardLayout = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, "blue", null, null, null],
            [null, null, null, "red", null, null, null, null],
            [null, null, "red", null, null, null, null, null],
          ];
        const act = checkForSecondTurn([5,4], board, [3,2])
               
        expect(act).toBe(false)
    }); 

    test('returns false if blue checker lands and has a red checker behind it', () => {
        const board: BoardLayout = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, "red", null, null],
            [null, null, null, null, "blue", null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ];
        const act = checkForSecondTurn([5,4], board, [3,2])
               
        expect(act).toBe(false)
    });

    test('returns true if red checker lands within range of a blue checker and can take it', () => {
        const board: BoardLayout = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, "blue", null, null],
            [null, null, null, null, "red", null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ];

        const bottomOfBoard = checkForSecondTurn([5,4], board, [7,2])
               
        expect(bottomOfBoard).toBe(true)
    }); 

    test('returns true if red checker lands within range of a blue checker and can take it', () => {
        const board: BoardLayout = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, "blue", null],
            [null, null, null, null, null, "blue", null, null],
            [null, null, null, null, "red", null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ];
        const act = checkForSecondTurn([5,4], board, [7,2])
               
        expect(act).toBe(false)
    });

    test('returns false if red checker lands and has a red checker behind it', () => {
        const board: BoardLayout = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, "red", null, null, null, null],
            [null, null, null, null, "blue", null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ];
        const act = checkForSecondTurn([6,1], board, [4,3])
               
        expect(act).toBe(false)
    });

// King Behaviour assetions
test('returns true if blue checker lands within range of a red checker and can take it', () => {
    const board: BoardLayout = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, blueChecker, null, null, null],
        [null, null, null, redKing, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ];
    const act = checkForSecondTurn([5,4], board, [3,2])
           
    expect(act).toBe(true)
}); 

test('returns TRUE if blue checker lands and has a red checker behind it', () => {
    const board: BoardLayout = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, "red", null, null],
        [null, null, null, null, "BLUE", null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ];
    const act = checkForSecondTurn([5,4], board, [3,2])
           
    expect(act).toBe(true)
});

test('returns FALSE if blue king lands and has a red checker behind it but target is blocked', () => {
    const board: BoardLayout = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, redChecker, null],
        [null, null, null, null, null, redChecker, null, null],
        [null, null, null, null, blueKing, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ];
    const act = checkForSecondTurn([5,4], board, [3,2])
           
    expect(act).toBe(false)
});



});


