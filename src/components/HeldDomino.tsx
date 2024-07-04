import { onMount, onCleanup, createSignal, Show } from "solid-js";
import { Domino, useGameContext } from "~/lib/game-context";
import { TileSquare } from "./Board";

export default function HeldDomino() {
  const ctx = useGameContext();

  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);

  function handleMouseMove(e: MouseEvent) {
    setX(e.x);
    setY(e.y);
  }

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);
  });

  onCleanup(() => {
    if (!globalThis.window) return;
    window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <Show when={ctx.heldDomino}>
      {(domino) => (
        <div
          class="absolute left-2 top-2"
          style={{
            transform: `translate3d(${x()}px, ${y()}px, 0px)`,
          }}
        >
          <div class="flex">
            <TileSquare tile={domino().tile1}></TileSquare>
            <TileSquare tile={domino().tile2}></TileSquare>
          </div>
        </div>
      )}
    </Show>
  );
}
