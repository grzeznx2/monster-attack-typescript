import { canvas } from './Canvas'
import { Cell, CELL_SIZE } from './Cell'
import { mouse } from './MouseController'
import { Physics } from './Physics'

export class Grid {
  cells: Cell[] = []

  constructor() {
    this.create()
  }

  create() {
    for (let y = CELL_SIZE; y < canvas.height; y += CELL_SIZE) {
      for (let x = 0; x < canvas.width; x += CELL_SIZE) {
        this.cells.push(new Cell(x, y))
      }
    }
  }

  draw() {
    for (let cell of this.cells) {
      if (mouse.x && mouse.y && Physics.detectCollision(cell, mouse)) {
        cell.draw()
      }
    }
  }
}

export const grid = new Grid()
