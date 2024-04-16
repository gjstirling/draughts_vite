import { render, screen } from "@testing-library/react";
import Board from "../components/Board";
import { expect, test } from "vitest";

test("Board initial state is correct", () => {
  render(<Board />);
  const squares = screen.getAllByRole("button");
  expect(squares.length).toBe(64);
});


