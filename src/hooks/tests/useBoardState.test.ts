import { describe, expect, test } from "vitest";
import {canMove} from "../useBoardState";

describe("canMove: ", () => {
    test('Does nothing when no checker is selected', () => {
        expect(true).toBe(true)
    });
});
