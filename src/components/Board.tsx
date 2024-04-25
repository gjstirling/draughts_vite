import Square from "./Square";
import { useBoardState } from "../hooks/useBoardState";

function Board() {
  const { board, moveAction, selectedChecker, setSelectedChecker, turn } = useBoardState();

  if(board.length === 1) return <div style={{ color: 'white' }}>
      <h1>GAME OVER </h1>
      <h3>{turn ? "red" : "blue"} checker player has won the game</h3>
  </div>

  return (
    <>
        <div>
            <h1 className="heading">Message board: Let the game begin</h1>
            <h3 className={"heading"}> {turn ? "red" : "blue"} checkers turn</h3>
        </div>
        <div>
            {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((_, cellIndex) => {
              const isSelected =
                selectedChecker != null &&
                selectedChecker[0] === rowIndex &&
                selectedChecker[1] === cellIndex;

              return (
                <Square
                  key={`${rowIndex}-${cellIndex}`}
                  coordinates={[rowIndex, cellIndex]}
                  checker={board[rowIndex][cellIndex] || ""}
                  isSelected={isSelected}
                  onCheckerSelected={(coordinates) =>
                    setSelectedChecker(coordinates)
                  }
                  moveAction={moveAction}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
