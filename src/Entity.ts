export abstract class Entity {
  protected abstract _x: number
  protected abstract _y: number
  protected abstract _width: number
  protected abstract _height: number
  protected abstract _currentSpeed: number
  protected abstract _maxSpeed: number
  protected abstract _health: number
  protected abstract _maxHealth: number

  abstract draw(): void
  abstract update(): void

  get x() {
    return this._x
  }
  get y() {
    return this._y
  }
  get width() {
    return this._width
  }
  get height() {
    return this._height
  }
  get currentSpeed() {
    return this._currentSpeed
  }
  get maxSpeed() {
    return this._maxSpeed
  }
  get health() {
    return this._health
  }
  get maxHealth() {
    return this._maxHealth
  }

  get shouldBeRemoved() {
    return this._health <= 0
  }

  private set health(value) {
    this._health = value
  }
  private set currentSpeed(value) {
    this._currentSpeed = value
  }

  private updateX(value: number) {
    this._x += value
  }

  private updateY(value: number) {
    this._y += value
  }

  kill() {
    this.health = 0
  }

  updateHealth(value: number) {
    this._health += value
  }

  updateSpeed(value: number) {
    this._currentSpeed += value
  }

  move({ deltaX, deltaY }: { deltaX?: number; deltaY?: number }) {
    if (deltaX) this.updateX(deltaX)
    if (deltaY) this.updateY(deltaY)
  }

  go() {
    this.currentSpeed = this.maxSpeed
  }

  stop() {
    this.currentSpeed = 0
  }
}
