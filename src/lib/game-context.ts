import { createContext, useContext } from "solid-js";

export type Direction = (typeof Direction)[keyof typeof Direction];
export const Direction = {
  up: 1,
  left: 2,
  right: 3,
  down: 4,
} as const;

export class Domino {
  row: null | number = null;
  column: null | number = null;
  //direction: Direction = Math.random() > 0.5 ? Direction.right : Direction.left;
  direction: Direction = Direction.right;
  #tile1: Tile;
  #tile2: Tile;

  constructor(value1: number, value2: number) {
    this.#tile1 = new Tile(this, 1, value1);
    this.#tile2 = new Tile(this, 2, value2);
  }

  get tile1() {
    return this.#tile1;
  }

  get tile2() {
    return this.#tile2;
  }
}

export class Tile {
  #parent: Domino;
  #side: 1 | 2;
  #value: number;

  constructor(domino: Domino, side: 1 | 2, value: number) {
    this.#parent = domino;
    this.#side = side;
    this.#value = value;
  }

  get parent(): Domino {
    return this.#parent;
  }

  get value(): number {
    return this.#value;
  }

  get direction(): Direction {
    switch (this.#side) {
      case 1:
        return this.parent.direction;
      case 2:
        return reverseDirection(this.parent.direction);
    }
  }

  get sibling(): Tile {
    switch (this.#side) {
      case 1:
        return this.parent.tile2;
      case 2:
        return this.parent.tile1;
    }
  }
}

function reverseDirection(direction: Direction): Direction {
  switch (direction) {
    case Direction.up:
      return Direction.down;
    case Direction.left:
      return Direction.right;
    case Direction.right:
      return Direction.left;
    case Direction.down:
      return Direction.up;
  }
}

type Board = Array<Array<Tile | null>>;

export type GameContext = {
  board: Board;
  dominoes: Array<Domino>;
  addDomino: (domino: Domino, row: number, col: number) => void;
  heldDomino: Domino | null;
  holdDomino: (domino: Domino | null) => void;
  gridSize: number;
};

export const GameContext = createContext<GameContext>({
  board: [],
  dominoes: [],
  addDomino: () => {},
  heldDomino: null,
  holdDomino: () => {},
  gridSize: 16,
});

export const useGameContext = () => useContext(GameContext);

export function createEmptyBoard(size: number): Board {
  let board: Board = [];
  for (let row = 0; row < size; row++) {
    let columns: Array<Tile | null> = [];
    for (let col = 0; col < size; col++) {
      columns.push(null);
    }
    board.push(columns);
  }

  return board;
}

export function generateDominoes(
  min: number = 0,
  max: number = 9,
): Array<Domino> {
  const dominoes: Array<Domino> = [];
  for (let i = min; i <= max; i++) {
    for (let j = i; j <= max; j++) {
      dominoes.push(new Domino(i, j));
    }
  }

  return dominoes;
}

export function getSiblingCoordinates(
  row: number,
  col: number,
  direction: Direction,
): [row: number, col: number] {
  switch (direction) {
    case Direction.up:
      return [row - 1, col];
    case Direction.left:
      return [row, col - 1];
    case Direction.right:
      return [row, col + 1];
    case Direction.down:
      return [row + 1, col];
  }
}
