import { Position } from './types'

export class MouseController {
  x: number
  y: number
  width: number
  height: number

  constructor() {
    this.x = 0
    this.y = 0
    this.width = 0.1
    this.height = 0.1
  }

  setPosition({ x, y }: Position) {
    this.x = x
    this.y = y
  }
}

export const mouse = new MouseController()
