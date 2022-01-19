import { canvas } from './Canvas'
import { grid } from './Grid'

export class Game {
  constructor() {}

  animate() {
    canvas.clearAll()
    grid.draw()
  }
}

export const game = new Game()
