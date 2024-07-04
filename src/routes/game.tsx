import { RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";
import { produce, createStore } from "solid-js/store";
import Board from "~/components/Board";
import Domino from "~/components/Domino";
import Hand from "~/components/Hand";
import HeldDomino from "~/components/HeldDomino";
import {
  Direction,
  GameContext,
  createEmptyBoard,
  generateDominoes,
  getSiblingCoordinates,
} from "~/lib/game-context";

export default function GamePage(props: RouteSectionProps) {
  const [ctx, setCtx] = createStore<GameContext>({
    board: createEmptyBoard(12),
    //dominoes: generateDominoes(),
    dominoes: generateDominoes().toSorted(() => Math.random() - 0.5),
    gridSize: 36,
    addDomino: (domino, row, col) => {
      if (domino.row !== null || domino.column !== null) {
        console.log("cannot place in two places");
        return;
      }

      if (ctx.board[row][col] !== null) {
        console.error("cannot place on top of another domino");
        return;
      }
      let [siblingRow, siblingCol] = getSiblingCoordinates(
        row,
        col,
        domino.direction,
      );

      if (ctx.board[siblingRow][siblingCol] !== null) {
        console.error("cannot place on top of another domino");
        return;
      }

      domino.row = row;
      domino.column = col;

      setCtx("board", row, col, domino.tile1);
      setCtx("board", siblingRow, siblingCol, domino.tile2);
    },
    heldDomino: null,
    holdDomino: (domino) => setCtx("heldDomino", domino),
  });

  return (
    <GameContext.Provider value={ctx}>
      <main class="mx-auto block w-fit my-4">
        <Board size={15}></Board>
        <Hand pieces={ctx.dominoes.slice(0, 8)}></Hand>
      </main>
      <HeldDomino />
    </GameContext.Provider>
  );
}
