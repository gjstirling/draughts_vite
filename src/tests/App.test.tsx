import { render, screen } from "@testing-library/react"
import App from "../App"
import {expect, test} from "vitest";

test('render app', () => {
    render(<App/>)
    expect(screen.getByText(/REACT Checkers/i)).toBeInTheDocument()
})