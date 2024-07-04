import { For, JSXElement, ParentProps, Show, createMemo } from "solid-js";
import { Tile, useGameContext } from "~/lib/game-context";
import Domino from "./Domino";

export default function Board(props: { size: number }) {
  const ctx = useGameContext();

  const rows = () => {
    let rows = [];

    for (let r = 0; r < props.size; r++) {
      let cols = [];
      for (let c = 0; c < props.size; c++) {
        cols.push(c);
      }
      rows.push(cols);
    }
    return rows;
  };

  return (
    <div class="mx-auto outline-black outline">
      <For each={ctx.board}>
        {(cols, i) => (
          <Row>
            <For each={cols}>
              {(tile, j) => (
                <Square
                  size={ctx.gridSize}
                  addDomino={() =>
                    ctx.addDomino(
                      ctx.dominoes[Math.floor(Math.random() * ctx.dominoes.length)],
                      i(),
                      j(),
                    )
                  }
                >
                  <Show when={tile}>
                    {(tile) => (
                      <TileSquare
                        tile={tile()}
                        size={ctx.gridSize}
                      ></TileSquare>
                    )}
                  </Show>
                </Square>
              )}
            </For>
          </Row>
        )}
      </For>
    </div>
  );
}

function Row(props: ParentProps) {
  return <div class="flex">{props.children}</div>;
}

function TileSquare(props: ParentProps<{ tile: Tile; size: number }>) {
  return (
    <div
      class="grid place-items-center outline-gray-700 bg-stone-200 outline-1 outline"
      style={{ width: `${props.size}px`, height: `${props.size}px` }}
    >
      {props.tile.value}
    </div>
  );
}

function Square(props: {
  children?: JSXElement;
  size: number;
  addDomino: () => void;
}) {
  return (
    <button
      onclick={() => props.addDomino()}
      class="outline-gray-900 w-12 h-12 outline outline-1 grid place-items-center"
      style={{ width: `${props.size}px`, height: `${props.size}px` }}
    >
      {props.children}
    </button>
  );
}
