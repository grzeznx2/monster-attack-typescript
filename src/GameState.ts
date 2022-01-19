import { controlBar } from './ControlBar'
import { Defender } from './Defender'
import { Enemy } from './Enemy'
import { FloatingMessage } from './FloatingMessage'
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
}
