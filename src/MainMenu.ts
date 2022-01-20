import { Common, ScreenVisibility } from './Common'
import { game } from './Game'

const MAIN_MENU_ID = 'main-menu'
const NEW_GAME_BUTTON_ID = 'new-game-button'
const GAME_STATUS_ID = 'game-status'

export class MainMenu extends Common<HTMLDivElement> {
  newGameButton: HTMLButtonElement
  gameStatus: HTMLParagraphElement
  constructor() {
    super(MAIN_MENU_ID)
    this.newGameButton = this.bindToElement<HTMLButtonElement>(NEW_GAME_BUTTON_ID)
    this.gameStatus = this.bindToElement<HTMLParagraphElement>(GAME_STATUS_ID)
    this.newGameButton.addEventListener('click', () => this.play())
  }

  setGameStatusText(value: string) {
    this.gameStatus.innerHTML = value
  }

  handleLevelWon() {
    this.setGameStatusText('You Won!')
    this.changeVisibilityScreen(this.element!, ScreenVisibility.Visible)
    this.newGameButton.innerHTML = 'Next Level'
  }

  handleLevelLost() {
    this.setGameStatusText('You Lost!')
    this.changeVisibilityScreen(this.element!, ScreenVisibility.Visible)
    this.newGameButton.innerHTML = 'Try Again'
  }

  play() {
    this.setGameStatusText('')
    this.changeVisibilityScreen(this.element!, ScreenVisibility.Hidden)
    game.start()
  }
}
