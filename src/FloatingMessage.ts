import { canvas } from './Canvas'
import { Entity } from './Entity'

export class FloatingMessage extends Entity {
  protected _width: number
  protected _height: number
  protected _maxHealth: number = 50
  protected _health = this.maxHealth
  protected _x: number
  protected _y: number
  protected _maxSpeed: number = 0.3
  protected _currentSpeed: number = this._maxSpeed
  size: number
  color: string
  opacity: number = 1
  value: string

  constructor(value: string, x: number, y: number, size: number, color: string) {
    super()
    this.value = value
    this._x = x
    this._y = y
    this.size = size
    this._width = size
    this._height = size
    this.color = color
    this.opacity = 1
  }

  draw() {
    if (canvas.ctx) {
      canvas.ctx.globalAlpha = this.opacity
      canvas.ctx.fillStyle = this.color
      canvas.ctx.font = `${this.size}px Orbitron`
      canvas.ctx.fillText(this.value, this.x, this.y)
      canvas.ctx.globalAlpha = 1
    }
  }

  update() {
    this.move({ deltaY: -this._currentSpeed })
    this.updateHealth(-1)
    if (this.opacity > 0.02) this.opacity -= 0.02
  }
}
