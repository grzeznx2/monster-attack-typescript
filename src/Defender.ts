import { canvas } from './Canvas'
import { CELL_SIZE, GAP_SIZE } from './Cell'
import { Entity } from './Entity'

export class Defender extends Entity {
  protected _width: number = CELL_SIZE - GAP_SIZE * 2
  protected _height: number = CELL_SIZE - GAP_SIZE * 2
  protected _maxHealth: number = 100
  protected _health = this.maxHealth
  protected _x: number
  protected _y: number
  protected _maxSpeed: number = 0
  protected _currentSpeed: number = this._maxSpeed
  seesEnemy: boolean = false
  shootingTimer: number = 0
  shootingInterval: number = 100

  constructor(x: number, y: number) {
    super()
    this._x = x
    this._y = y
  }

  get shouldShoot() {
    return this.shootingTimer % this.shootingInterval === 0 && this.seesEnemy
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

  update() {
    if (this.seesEnemy) {
      this.shootingTimer++
    } else {
      this.shootingTimer = 0
    }
  }
}
