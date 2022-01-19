import { canvas } from './Canvas'

export class Projectile {
  height: number = 10
  power: number = 20
  speed: number = 5
  width: number = 10
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  update() {
    this.x += this.speed
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
