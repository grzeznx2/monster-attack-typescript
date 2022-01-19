import { canvas } from './Canvas'

export class FloatingMessage {
  color: string
  health: number = 50
  opacity: number = 1
  size: number
  value: string
  x: number
  y: number

  constructor(value: string, x: number, y: number, size: number, color: string) {
    this.value = value
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.opacity = 1
    this.health = 50
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

  private updateHealth(value: number) {
    this.health += value
  }

  private updateX(value: number) {
    this.x += value
  }

  private updateY(value: number) {
    this.y += value
  }

  update() {
    this.move({ deltaY: -0.3 })
    this.updateHealth(-1)
    if (this.opacity > 0.02) this.opacity -= 0.02
  }

  move({ deltaX, deltaY }: { deltaX?: number; deltaY?: number }) {
    if (deltaX) this.updateX(deltaX)
    if (deltaY) this.updateY(deltaY)
  }

  get shouldBeRemoved() {
    return this.health <= 0
  }
}
