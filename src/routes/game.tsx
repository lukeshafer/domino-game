import { RouteSectionProps } from "@solidjs/router";
import { produce, createStore } from "solid-js/store";
import Board from "~/components/Board";
import Domino from "~/components/Domino";
import {
  Direction,
  GameContext,
  createEmptyBoard,
  generateDominoes,
} from "~/lib/game-context";

export default function GamePage(props: RouteSectionProps) {
  const [ctx, setCtx] = createStore<GameContext>({
    board: createEmptyBoard(15),
    dominoes: generateDominoes(),
    gridSize: 36,
    addDomino: (domino, row, col) => {
      domino.row = row;
      domino.column = col;
      setCtx("board", row, col, domino.tile1);
      switch (domino.direction) {
        case Direction.up:
          setCtx("board", row - 1, col, domino.tile2);
          break;
        case Direction.left:
          setCtx("board", row, col - 1, domino.tile2);
          break;
        case Direction.right:
          setCtx("board", row, col + 1, domino.tile2);
          break;
        case Direction.down:
          setCtx("board", row + 1, col, domino.tile2);
          break;
      }
    },
  });

  return (
    <GameContext.Provider value={ctx}>
      <main class="mx-auto block w-fit my-4">
        <Board size={15}></Board>
        <Domino val1={1} val2={8} />
      </main>
    </GameContext.Provider>
  );
}
