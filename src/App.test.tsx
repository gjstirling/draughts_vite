import { render, screen } from "@testing-library/react"
import App from "./App"
import {expect, test} from "vitest";

export function sum(a, b) {
    return a + b
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('render app', () => {
    render(<App/>)

    expect(screen.getByText(/Message board: Let the game begin/i)).toBeInTheDocument()

    const message = screen.queryByText(/Message board: Let the game begin/i);
    expect(message).toBeDefined();
})