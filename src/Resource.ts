import { canvas } from './Canvas'
import { CELL_SIZE } from './Cell'
import { Entity } from './Entity'

export const AMOUNTS = [20, 30, 40]

export class Resource extends Entity {
  protected _x: number = Math.random() * canvas.width - CELL_SIZE
  protected _y: number = (Math.floor(Math.random() * 5) + 1) * CELL_SIZE + 25
  protected _width: number = CELL_SIZE * 0.6
  protected _height: number = CELL_SIZE * 0.6
  protected _maxSpeed: number = 0
  protected _currentSpeed: number = this._maxSpeed
  protected _maxHealth: number = 100
  protected _health = this.maxHealth
  amount: number = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)]

  update(): void {}

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
