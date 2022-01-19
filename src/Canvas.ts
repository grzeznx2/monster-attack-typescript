import { Common } from './Common'
import { mouse } from './MouseController'

export const CANVAS_WIDTH = 900
export const CANVAS_HEIGHT = 600
const CANVAS_ID = 'canvas'

export class Canvas extends Common<HTMLCanvasElement> {
  public ctx: CanvasRenderingContext2D | null = null
  public width: number = CANVAS_WIDTH
  public height: number = CANVAS_HEIGHT
  public position: DOMRect | undefined

  constructor() {
    super(CANVAS_ID)
    this.configure()
  }

  private configure() {
    this.configureContext()
    this.setPosition()
    this.setListeners()
  }

  private configureContext() {
    this.ctx = this.element?.getContext('2d')!
    this.ctx.canvas.width = CANVAS_WIDTH
    this.ctx.canvas.height = CANVAS_HEIGHT
  }

  private setListeners() {
    this.element?.addEventListener('mousemove', e => {
      mouse.setPosition({
        x: e.x - this.position!.left,
        y: e.y - this.position!.top,
      })
    })

    this.element?.addEventListener('mouseleave', () => {
      mouse.setPosition({
        x: 0,
        y: 0,
      })
    })

    window.addEventListener('resize', () => {
      this.setPosition()
    })
  }

  private setPosition() {
    this.position = this.element?.getBoundingClientRect()
  }

  clearAll() {
    this.ctx?.clearRect(0, 0, this.width, this.height)
  }

  write(
    value: string,
    {
      fillStyle,
      fontSize,
      font,
      x,
      y,
    }: { fillStyle: string; fontSize: number; font: string; x: number; y: number }
  ) {
    if (canvas.ctx) {
      canvas.ctx.fillStyle = fillStyle
      canvas.ctx.font = `${fontSize}px ${font}`
      canvas.ctx.fillText(value, x, y)
    }
  }
}
export const canvas = new Canvas()
