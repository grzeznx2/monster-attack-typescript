import { canvas } from './Canvas'
import { Entity } from './Entity'

export class Projectile extends Entity {
  power: number = 20
  protected _maxSpeed: number = 5
  protected _currentSpeed: number = this._maxSpeed
  protected _maxHealth: number = 1
  protected _health: number = this._maxHealth
  protected _width: number = 10
  protected _height: number = 10
  protected _x: number
  protected _y: number

  constructor(x: number, y: number) {
    super()
    this._x = x
    this._y = y
  }

  update() {
    this.move({ deltaX: +this.currentSpeed })
  }

  draw() {
    if (canvas.ctx) {
      canvas.ctx.fillStyle = 'black'
      canvas.ctx.beginPath()
      canvas.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2)
      canvas.ctx.fill()
    }
  }
}
