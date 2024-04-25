import { describe, expect, test } from "vitest";
import {checkBaseRules, initialBoard, calcNewBoard, canMove, checkForSecondTurn} from "../useBoardState";
import { testBoard, testBoardWithKing, testBoardForSecondTurn, errorBoard, kingNextToChecker } from "./testBoards";


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
        const result = checkBaseRules([4,1], [2,3], testBoard, true)
        
        expect(result).toBe(true)
    }); 

    test('Returns true when blue checker is selected, target is two moves away and there is a blue checker in path', () => {
        const result = checkBaseRules([3,2], [5,0], testBoard, false)
        
        expect(result).toBe(true)
    }); 

    test('Returns true when moving a king backwards', () => {
        const result = checkBaseRules([4,1], [5,0], testBoardWithKing, true)
        
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
        const result = checkBaseRules([0,0], [1,2], testBoard, true)
        
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
        const result = checkBaseRules([4,1], [5,0], testBoard, true)
        
        expect(result).toBe(false)
    });
});

describe("canMove: ", () => {
    test('Returns true when red checker is moving one diagonal square away', () => {
        const result= canMove([1,2], [0,1], testBoard)

        expect(result).toBe(true)
    }); 

    test('Returns false when square is occupied by a checker', () => {
        const result= canMove([4,1], [3,2], testBoard)

        expect(result).toBe(false)
    });

    test('Returns true when making a double move with checker inbetween', () => {
        const result= canMove([4,1], [2,3], testBoard)

        expect(result).toBe(true)
    });

    test('Returns false when trying to jump two spaces', () => {
        const result= canMove([3,2], [5,4], testBoard)

        expect(result).toBe(false)
    });

    test('Returns false when king tries to move over another blue checker', () => {
        const result = canMove([3,4], [5,2], kingNextToChecker)
        
        expect(result).toBe(false)
    });
});

describe("calcNewBoard: ", () => {
    test('Can return an updated board', () => {
        const result = calcNewBoard([5,2], [4,3], initialBoard)
        
        expect(result[4][3]).toBe("red")
    }); 

    test('Can return an updated board when a checker has been taken', () => {
        const result = calcNewBoard([4,1], [2,3], testBoard)
        
        expect(result[3][2]).toBe(null)
    }); 
});

describe("checkForSecondTurn", () => {
    test('returns false if last turn was only a single move', () => {
        const result = checkForSecondTurn([4,1], initialBoard, true, [3,0])
        
        expect(result).toBe(false)
    }); 

    test('returns false if target is in first two rows of board', () => {
        const result = checkForSecondTurn([1,1], initialBoard, true, [0,0])
        
        expect(result).toBe(false)
    }); 

    test('returns true if target is in last two rows of board', () => {
        const result = checkForSecondTurn([6,1], initialBoard, false, [0,0])
        
        expect(result).toBe(false)
    });

    test('returns true if checker has an opposing checker NE', () => {
        const result = checkForSecondTurn([3,2], testBoardForSecondTurn, true, [5,0])
        
        expect(result).toBe(true)
    });

    test('returns false if target is in first two rows of board', () => {
        const result = checkForSecondTurn([2,1], errorBoard, true, [4,3])
        
        expect(result).toBe(false)
    }); 

    test('returns false when last move has taken a checker and only two of the same colour are within range', () => {
        const result = checkForSecondTurn([5,2], errorBoard, false, [1,6])
        
        expect(result).toBe(false)
    });

});


