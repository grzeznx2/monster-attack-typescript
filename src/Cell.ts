import { canvas } from './Canvas'

export const CELL_SIZE = 100
export const GAP_SIZE = 3

export class Cell {
  x: number
  y: number
  width: number
  height: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.width = CELL_SIZE
    this.height = CELL_SIZE
  }

  draw() {
    canvas.ctx!.strokeStyle = 'black'
    canvas.ctx!.strokeRect(this.x, this.y, this.width, this.height)
  }
}
