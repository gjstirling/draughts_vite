import Square from "./Square";
import { useBoardState } from "../hooks/useBoardState";

function Board() {
  const {
    board,
    moveAction,
    selectedChecker,
    setSelectedChecker,
    turn,
    isGameOver,
  } = useBoardState();

  const gameFinish = isGameOver ? (
    <div>
      <h1 className="heading">
        The {turn ? "Red" : "Blue"} player has won the game !!!!
      </h1>
    </div>
  ) : (
    <div></div>
  );

  return (
    <>
      {}
      <div>
        <h1 className="heading">REACT Checkers {gameFinish}</h1>
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
