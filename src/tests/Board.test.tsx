import { render, screen } from "@testing-library/react";
import Board from "../components/Board";
import { expect, test } from "vitest";

test("render Board", () => {
  render(<Board />);
  const squares = screen.getAllByRole("button");
  expect(squares.length).toBe(64);
});
