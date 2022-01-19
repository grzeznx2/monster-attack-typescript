import { controlBar } from './ControlBar'
import { Defender } from './Defender'
import { Enemy } from './Enemy'
import { FloatingMessage } from './FloatingMessage'
import { mouse } from './MouseController'
import { Physics } from './Physics'
import { Resource } from './Resource'

export enum GameStatus {
  Pending = 'PENDING',
  Lost = 'LOST',
  Won = 'WON',
}

export class GameState {
  defenders: Defender[] = []
  enemies: Enemy[] = []
  enemiesInterval: number
  enemiesPositions: number[] = []
  floatingMessages: FloatingMessage[] = []
  resources: Resource[] = []
  resourcesCount: number = 0
  score: number = 0
  scoreToWin: number
  frame: number = 0
  status: GameStatus = GameStatus.Pending

  constructor({ scoreToWin, enemiesInterval }: { scoreToWin: number; enemiesInterval: number }) {
    this.scoreToWin = scoreToWin
    this.enemiesInterval = enemiesInterval
  }

  handleControlBar() {
    controlBar.draw(this.score, this.scoreToWin, this.resourcesCount)
  }

  updateFrame() {
    this.frame++
  }

  handleResources() {
    if (this.frame % 100 === 0 && this.score < this.scoreToWin) {
      this.resources.push(new Resource())
    }

    for (let i = 0; i < this.resources.length; i++) {
      this.resources[i].draw()
      if (
        this.resources[i] &&
        mouse.x &&
        mouse.y &&
        Physics.detectCollision(this.resources[i], mouse)
      ) {
        this.resourcesCount += this.resources[i].amount
        this.floatingMessages.push(
          new FloatingMessage(
            `+${this.resources[i].amount}`,
            this.resources[i].x,
            this.resources[i].y,
            30,
            'black'
          )
        )
        this.floatingMessages.push(
          new FloatingMessage(`+${this.resources[i].amount}`, 250, 50, 30, 'gold')
        )
        this.resources.splice(i, 1)
        i--
      }
    }
  }

  handleFloatingMessages() {
    for (let i = 0; i < this.floatingMessages.length; i++) {
      const message = this.floatingMessages[i]
      message.update()
      message.draw()
      if (message.shouldBeRemoved) {
        this.floatingMessages.splice(i, 1)
        i--
      }
    }
  }
}
