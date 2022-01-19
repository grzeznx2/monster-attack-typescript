import { canvas } from './Canvas'
import { CELL_SIZE, GAP_SIZE } from './Cell'

export class Defender {
  width: number = CELL_SIZE - GAP_SIZE * 2
  height: number = CELL_SIZE - GAP_SIZE * 2
  health = 100
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  draw() {
    if (canvas.ctx) {
      canvas.ctx.fillStyle = 'blue'
      canvas.ctx.fillRect(this.x, this.y, this.width, this.height)
      canvas.ctx.fillStyle = 'gold'
      canvas.ctx.font = '30px Orbitron'
      canvas.ctx.fillText(`${Math.floor(this.health)}`, this.x + 15, this.y + 30)
    }
  }
}
