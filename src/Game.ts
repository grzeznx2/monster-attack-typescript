import { mainMenu } from '.'
import { canvas } from './Canvas'
import { GameState, GameStatus } from './GameState'
import { grid } from './Grid'
import { Level } from './types'

const levels: Level[] = [
  { scoreToWin: 50, enemiesInterval: 600 },
  { scoreToWin: 50, enemiesInterval: 100 },
  { scoreToWin: 50, enemiesInterval: 50 },
]

export class Game {
  state: GameState | null = null
  currentLevel: number = 0

  start() {
    this.playLevel(levels[this.currentLevel])
    this.animate()
  }

  playLevel(level: Level) {
    this.state = new GameState(level)
  }

  handleStatus() {
    if (this.state) {
      if (this.state.status === GameStatus.Pending) {
        requestAnimationFrame(() => this.animate())
      } else if (this.state.status === GameStatus.Won) {
        this.currentLevel++
        mainMenu.handleLevelWon()
      } else if (this.state.status === GameStatus.Lost) {
        mainMenu.handleLevelLost()
      }
    }
  }

  animate() {
    canvas.clearAll()
    grid.draw()
    if (this.state) {
      this.state.updateFrame()
      this.state.handleControlBar()
      this.state.handleResources()
      this.state.handleFloatingMessages()
      this.state.handleDefenders()
      this.state.handleEnemies()
      this.state.handleProjectiles()
      this.handleStatus()
    }
  }
}

export const game = new Game()
