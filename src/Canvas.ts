import { Common } from './Common'

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
  }

  private configureContext() {
    this.ctx = this.element?.getContext('2d')!
    this.ctx.canvas.width = CANVAS_WIDTH
    this.ctx.canvas.height = CANVAS_HEIGHT
  }

  private setPosition() {
    this.position = this.element?.getBoundingClientRect()
  }
}
export const canvas = new Canvas()
