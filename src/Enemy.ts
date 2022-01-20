import { canvas, CANVAS_WIDTH } from './Canvas'
import { GAP_SIZE, CELL_SIZE } from './Cell'
import { Entity } from './Entity'

export class Enemy extends Entity {
  protected _x: number = CANVAS_WIDTH
  protected _y: number
  protected _width: number = CELL_SIZE - GAP_SIZE * 2
  protected _height: number = CELL_SIZE - GAP_SIZE * 2
  protected _maxSpeed: number = Math.random() * 0.2 + 0.4
  protected _currentSpeed: number = this._maxSpeed
  protected _health: number = 100
  protected _maxHealth: number = this.health

  constructor(verticalPosition: number) {
    super()
    this._y = verticalPosition
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

  update() {
    this.move({ deltaX: -this.currentSpeed })
  }

  get amountOfResources() {
    return Math.floor(this.maxHealth / 10)
  }
}
