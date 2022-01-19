import { canvas, CANVAS_WIDTH } from './Canvas.js'
import { CELL_SIZE } from './Cell'

export class ControlBar {
  x: number = 0
  y: number = 0
  width: number = CANVAS_WIDTH
  height: number = CELL_SIZE

  draw(score: number, scoreToWin: number, resourcesCount: number) {
    this.drawBackground()
    this.drawProgress(score, scoreToWin, resourcesCount)
  }

  private drawBackground() {
    if (canvas.ctx) {
      canvas.ctx.fillStyle = 'blue'
      canvas.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  private drawProgress(score: number, scoreToWin: number, resourcesCount: number) {
    if (canvas.ctx) {
      canvas.write(`Score: ${score}`, {
        fillStyle: 'gold',
        fontSize: 30,
        font: 'Orbitron',
        x: 20,
        y: 40,
      })

      canvas.write(`Score To Win: ${scoreToWin}`, {
        fillStyle: 'gold',
        fontSize: 30,
        font: 'Orbitron',
        x: 300,
        y: 40,
      })

      canvas.write(`Resources: ${resourcesCount}`, {
        fillStyle: 'gold',
        fontSize: 30,
        font: 'Orbitron',
        x: 20,
        y: 80,
      })
    }
  }
}

export const controlBar = new ControlBar()
