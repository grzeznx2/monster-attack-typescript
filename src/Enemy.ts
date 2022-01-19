import { canvas, CANVAS_WIDTH } from './Canvas'
import { GAP_SIZE, CELL_SIZE } from './Cell'

export class Enemy {
  x: number = CANVAS_WIDTH
  y: number
  width: number = CELL_SIZE - GAP_SIZE * 2
  height: number = CELL_SIZE - GAP_SIZE * 2
  speed: number = Math.random() * 0.2 + 0.4
  movement: number = this.speed
  health: number = 100
  maxHealth: number = this.health

  constructor(verticalPosition: number) {
    this.y = verticalPosition
  }

  draw() {
    if (canvas.ctx) {
      canvas.ctx.fillStyle = 'red'
      canvas.ctx.fillRect(this.x, this.y, this.width, this.height)
      canvas.ctx.fillStyle = 'black'
      canvas.ctx.font = '30px Orbitron'
      canvas.ctx.fillText(`${Math.floor(this.health)}`, this.x + 15, this.y + 30)
    }
  }
}
