import { describe, expect, test } from "vitest";
import {checkBaseRules, initialBoard, calcNewBoard, canMove} from "../useBoardState";

type BoardLayout = (string | null)[][];

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


describe("checkBaseRules: ", () => {
    // true cases:
    test('Returns true when red checker is selected and target is correct', () => {
        const result = checkBaseRules([5,2], [4,3], initialBoard, true)
        
        expect(result).toBe(true)
    }); 

    test('Returns true when blue checker is selected and target is correct', () => {
        const result = checkBaseRules([2,3], [3,2], initialBoard, false)
        
        expect(result).toBe(true)
    }); 

    // in [progress]
    test('Returns true when red checker is selected, target is two moves away and there is a blue checker in path', () => {
        const result = checkBaseRules([4,1], [2,3], testBoard, true)
        
        expect(result).toBe(true)
    }); 
    
    // False cases
    test('Returns false when target is a white square', () => {
        const result = checkBaseRules([5,2], [4,4], initialBoard, true)
        
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

    test('Returns false on red turn when target has a blue checker in path', () => {
        const result = checkBaseRules([4,1], [3,2], testBoard, false)
        
        expect(result).toBe(false)
    }); 

    test('Returns false on blue turn when target has a red checker in path', () => {
        const result = checkBaseRules([3,2], [4,1], testBoard, true)
        
        expect(result).toBe(false)
    }); 

    test('Returns false when target is three rows away or more', () => {
        const result = checkBaseRules([6,1], [3,4], testBoard, true)
        
        expect(result).toBe(false)
    }); 

});

describe("canMove: ", () => {
    // SINGLE SQUARE MOVES
    test('Returns true when one right side diagonal square away', () => {
        const result= canMove([5,0], [4,1], initialBoard)

        expect(result).toBe(true)
    }); 

    test('Returns true when Red checker has one left side diagonal square away', () => {
        const result= canMove([5,2], [4,1], initialBoard)

        expect(result).toBe(true)
    }); 

    test('Returns true when Blue checker has one left side diagonal square away', () => {
        const result= canMove([2,1], [3,0], initialBoard)

        expect(result).toBe(true)
    });

    test('Returns true when Blue checker has one right side diagonal square away', () => {
        const result= canMove([2,1], [3,2], initialBoard)

        expect(result).toBe(true)
    });

    // DOUBLE SQUARE MOVES
    test('Returns true when Red checker has blue checker in between its target', () => {
        const result= canMove([4,1], [2,3], testBoard)

        expect(result).toBe(true)
    });

    test('Returns false when Red checker has no blue checker in between its target', () => {
        const result= canMove([5,2], [3,4], initialBoard)

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
