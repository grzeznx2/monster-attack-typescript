import { canvas, CANVAS_WIDTH } from './Canvas'
import { CELL_SIZE, GAP_SIZE } from './Cell'
import { controlBar } from './ControlBar'
import { Defender } from './Defender'
import { Enemy } from './Enemy'
import { FloatingMessage } from './FloatingMessage'
import { mouse } from './MouseController'
import { Physics } from './Physics'
import { Projectile } from './Projectile'
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
  enemyPositions: number[] = []
  floatingMessages: FloatingMessage[] = []
  projectiles: Projectile[] = []
  resources: Resource[] = []
  resourcesCount: number = 0
  score: number = 0
  scoreToWin: number
  frame: number = 0
  status: GameStatus = GameStatus.Pending

  constructor({ scoreToWin, enemiesInterval }: { scoreToWin: number; enemiesInterval: number }) {
    this.scoreToWin = scoreToWin
    this.enemiesInterval = enemiesInterval

    canvas.element!.addEventListener('click', e => {
      const gridPositionX = mouse.x - (mouse.x % CELL_SIZE) + GAP_SIZE
      const gridPositionY = mouse.y - (mouse.y % CELL_SIZE) + GAP_SIZE

      if (gridPositionY < CELL_SIZE) return

      for (let defender of this.defenders) {
        if (defender.x === gridPositionX && defender.y === gridPositionY) return
      }

      let defenderCost = 100
      if (this.resourcesCount >= defenderCost) {
        this.defenders.push(new Defender(gridPositionX, gridPositionY))
        this.resourcesCount -= defenderCost
      } else {
        this.floatingMessages.push(
          new FloatingMessage('not enough resources', mouse.x, mouse.y, 15, 'red')
        )
      }
    })
  }

  get timeForEnemy() {
    return this.frame % this.enemiesInterval === 0
  }

  get scoreTooLow() {
    return this.score < this.scoreToWin
  }

  get shouldProduceEnemy() {
    return this.timeForEnemy && this.scoreTooLow
  }

  checkGameOver(condition: boolean) {
    if (condition) this.status = GameStatus.Lost
  }

  checkGameWon(condition: boolean) {
    if (condition) this.status = GameStatus.Won
  }

  private gainResources(amount: number) {
    this.floatingMessages.push(new FloatingMessage(`+${amount}`, 250, 50, 30, 'gold'))
    this.resourcesCount += amount
    this.score += amount
  }

  private handleEnemyCreation() {
    if (this.shouldProduceEnemy) {
      const verticalPosition = Math.floor(Math.random() * 5 + 1) * CELL_SIZE + GAP_SIZE
      this.enemies.push(new Enemy(verticalPosition))
      this.enemyPositions.push(verticalPosition)
      if (this.enemiesInterval > 120) this.enemiesInterval -= 50
    }
  }

  handleControlBar() {
    controlBar.draw(this.score, this.scoreToWin, this.resourcesCount)
  }

  handleDefenders() {
    for (let i = 0; i < this.defenders.length; i++) {
      const defender = this.defenders[i]
      defender.update()
      defender.draw()

      if (this.enemyPositions.indexOf(defender.y) !== -1) {
        defender.seesEnemy = true
      } else {
        defender.seesEnemy = false
      }

      if (defender.shouldShoot) {
        this.projectiles.push(new Projectile(defender.x + CELL_SIZE, defender.y + CELL_SIZE / 2))
      }

      for (let j = 0; j < this.enemies.length; j++) {
        const enemy = this.enemies[j]
        if (defender && Physics.detectCollision(defender, enemy)) {
          enemy.movement = 0
          defender.health -= 0.2
        }
        if (defender && defender.health <= 0) {
          this.defenders.splice(i, 1)
          i--
          enemy.movement = enemy.speed
        }
      }
    }
  }

  handleProjectiles() {
    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i]
      if (projectile) {
        projectile.update()
        projectile.draw()

        for (let j = 0; j < this.enemies.length; j++) {
          const enemy = this.enemies[j]
          if (enemy && projectile && Physics.detectCollision(projectile, enemy)) {
            enemy.health -= projectile.power
            this.projectiles.splice(i, 1)
            i--
          }
        }

        if (projectile && projectile.x > CANVAS_WIDTH - CELL_SIZE) {
          this.projectiles.splice(i, 1)
          i--
        }
      }
    }
  }

  handleEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i]
      enemy.update()
      enemy.draw()
      if (Physics.detectCollision(mouse, enemy)) {
        enemy.health = 0
      }
      this.checkGameOver(enemy.x <= 0)
      if (enemy.shouldBeRemoved) {
        const gainedResources = enemy.amountOfResources
        this.gainResources(gainedResources)
        this.floatingMessages.push(
          new FloatingMessage(`+${gainedResources}`, enemy.x, enemy.y, 30, 'black')
        )
        const index = this.enemyPositions.indexOf(enemy.y)
        this.enemyPositions.splice(index, 1)
        this.enemies.splice(i, 1)
        this.checkGameWon(this.score >= this.scoreToWin && this.enemies.length === 0)
        i--
      }
    }

    this.handleEnemyCreation()
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
  updateFrame() {
    this.frame++
  }
}
