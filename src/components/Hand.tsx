import { Domino, useGameContext } from "~/lib/game-context";
import { TileSquare } from "./Board";
import { For } from "solid-js";

export default function Hand(props: { pieces: Array<Domino> }) {
  const ctx = useGameContext();

  return (
    <ul class="grid gap-2 m-8">
      <For each={props.pieces}>
        {(domino) => (
          <button class="flex" onclick={() => ctx.holdDomino(domino)}>
            <TileSquare tile={domino.tile1}></TileSquare>
            <TileSquare tile={domino.tile2}></TileSquare>
          </button>
        )}
      </For>
    </ul>
  );
}
