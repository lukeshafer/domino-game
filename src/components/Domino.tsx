import { useGameContext } from "~/lib/game-context";

export default function Domino(props: { val1: number; val2: number }) {
  const ctx = useGameContext();

  return (
    <button
      onclick={() => {}}
      class="flex outline outline-gray-700 w-fit bg-amber-50"
      ref={(el) => {
        //
      }}
    >
      <DominoSquare value={props.val1} size={ctx.gridSize}></DominoSquare>
      <DominoSquare value={props.val2} size={ctx.gridSize}></DominoSquare>
    </button>
  );
}

function DominoSquare(props: { value: number; size: number }) {
  return (
    <div
      class="grid place-items-center outline-gray-700 outline-1 outline"
      style={{ width: `${props.size}px`, height: `${props.size}px` }}
    >
      {props.value}
    </div>
  );
}
