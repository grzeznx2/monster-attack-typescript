import { canvas } from './Canvas'
import { CELL_SIZE } from './Cell'

export const AMOUNTS = [20, 30, 40]

export class Resource {
  x: number = Math.random() * canvas.width - CELL_SIZE
  y: number = (Math.floor(Math.random() * 5) + 1) * CELL_SIZE + 25
  width: number = CELL_SIZE * 0.6
  height: number = CELL_SIZE * 0.6
  amount: number = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)]

  draw() {
    if (canvas.ctx) {
      canvas.ctx.fillStyle = 'yellow'
      canvas.ctx.fillRect(this.x, this.y, this.width, this.height)
      canvas.ctx.fillStyle = 'black'
      canvas.ctx.font = '20px Orbitron'
      canvas.ctx.fillText(`${this.amount}`, this.x + 15, this.y + 25)
    }
  }
}
