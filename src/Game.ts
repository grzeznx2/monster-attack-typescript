import { canvas } from './Canvas'
import { GameState } from './GameState'
import { grid } from './Grid'
import { Level } from './types'

export class Game {
  state: GameState | null = null

  playLevel(level: Level) {
    this.state = new GameState(level)
  }

  animate() {
    canvas.clearAll()
    grid.draw()
    if (this.state) {
      this.state.updateFrame()
      this.state.handleControlBar()
    }
  }
}

export const game = new Game()
