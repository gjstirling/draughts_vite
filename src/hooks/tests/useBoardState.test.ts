import { describe, expect, test } from "vitest";
import {canMove, initialBoard, calcNewBoard} from "../useBoardState";

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

describe("canMove: ", () => {
    // true cases:
    test('Returns true when red checker is selected and target is correct', () => {
        const result = canMove([5,2], [4,3], initialBoard, true)
        
        expect(result).toBe(true)
    }); 

    test('Returns true when blue checker is selected and target is correct', () => {
        const result = canMove([2,3], [3,2], initialBoard, false)
        
        expect(result).toBe(true)
    }); 

    // in [progress]
    test('Returns true when red checker is selected, target is two moves away and there is a blue checker in path', () => {
        const result = canMove([4,1], [2,3], testBoard, false)
        
        expect(result).toBe(true)
    }); 
    
    // False cases
    test('Returns false when no checker is selected', () => {
        const result = canMove(null, [4,3], initialBoard, true)
        
        expect(result).toBe(false)
    });

    test('Returns false when target is a white square', () => {
        const result = canMove([5,2], [4,4], initialBoard, true)
        
        expect(result).toBe(false)
    });

    test('Returns false when turn is true && blue checker is selected', () => {
        const result = canMove([2,3], [3,2], initialBoard, true)
        
        expect(result).toBe(false)
    });

    test('Returns false when turn is false && red checker is selected', () => {
        const result = canMove([5,2], [4,3], initialBoard, false)
        
        expect(result).toBe(false)
    });

    test('Returns false when red chekcer target is two rows away', () => {
        const result = canMove([5,2], [3,4], initialBoard, true)
        
        expect(result).toBe(false)
    }); 

    test('Returns false when blue checker target is two rows away', () => {
        const result = canMove([2,3], [4,1], initialBoard, false)
        
        expect(result).toBe(false)
    }); 

    test('Returns false on red turn when target has a blue checker in path', () => {
        const result = canMove([4,1], [3,2], testBoard, false)
        
        expect(result).toBe(false)
    }); 

    test('Returns false on blue turn when target has a red checker in path', () => {
        const result = canMove([3,2], [4,1], testBoard, true)
        
        expect(result).toBe(false)
    }); 
});

describe("calcNewBoard: ", () => {
    test('Can return an updated board', () => {
        const result = calcNewBoard([5,2], [4,3], initialBoard)
        
        expect(result[4][3]).toBe("red")
    }); 

    test('No update when no checker selected', () => {
        const result = calcNewBoard(null, [4,3], initialBoard)
        
        expect(result).toBe(initialBoard)
    }); 
});
