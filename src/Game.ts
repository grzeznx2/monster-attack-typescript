import { grid } from './Grid'

export class Game {
  constructor() {}

  animate() {
    grid.draw()
  }
}

export const game = new Game()
