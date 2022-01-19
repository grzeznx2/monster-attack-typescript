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
}
