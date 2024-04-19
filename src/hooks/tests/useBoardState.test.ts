import { describe, expect, test } from "vitest";
import {canMove, initialBoard, calcNewBoard} from "../useBoardState";

describe("canMove: ", () => {
    // true cases:
    test('Returns true when checker is selected and target is correct', () => {
        const result = canMove([5,2], [4,3], initialBoard, true)
        
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
