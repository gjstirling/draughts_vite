import { describe, expect, test, vi } from "vitest";
import {initialBoard, useBoardState} from "../useBoardState";
import {renderHook, act} from "@testing-library/react";

describe("Move Action: ", () => {
    test('Does nothing when no checker is selected', () => {
        const { result } = renderHook(() => useBoardState());
        act(() => {
            result.current.moveAction([4,3])
        });
        expect(result.current.moveAction([4,3])[4][3]).toBe(null)
    });

    test('Can authorise a red checker to be moved on the board when selected', () => {
        const { result } = renderHook(() => useBoardState());
        act(() => {
            result.current.setSelectedChecker([5,2])
            result.current.moveAction([4,3])
        });
        expect(result.current.moveAction([4,3])[4][3]).toBe("red")
    });

    test('Blocks a blue checker from moving on the board when turn === true', () => {
        const { result } = renderHook(() => useBoardState());
        act(() => {
            result.current.setSelectedChecker([1,2])
            result.current.moveAction([3,2])
        });
        expect(result.current.moveAction([4,3])[4][3]).toBe(null)
    });

    test('Moves a blue checker when turn === false', () => {
        const { result } = renderHook(() => useBoardState());
        act(() => {
            result.current.setSelectedChecker([1,2])
            result.current.setTurn(false)
            result.current.moveAction([3,2])
        });
        expect(result.current.moveAction([4,3])[4][3]).toBe("blue")
    });
});
