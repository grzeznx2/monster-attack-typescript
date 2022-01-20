import { Common, ScreenVisibility } from './Common'
import { game } from './Game'

const MAIN_MENU_ID = 'main-menu'
const NEW_GAME_BUTTON_ID = 'new-game-button'
const SETTINGS_BUTTON_ID = 'new-game-button'

export class MainMenu extends Common<HTMLDivElement> {
  newGameButton: HTMLButtonElement
  settingsButton: HTMLButtonElement
  constructor() {
    super(MAIN_MENU_ID)
    this.newGameButton = this.bindToElement<HTMLButtonElement>(NEW_GAME_BUTTON_ID)
    this.settingsButton = this.bindToElement<HTMLButtonElement>(SETTINGS_BUTTON_ID)
    this.newGameButton.addEventListener('click', () => this.play())
  }

  showNextLevelMenu() {
    this.changeVisibilityScreen(this.element!, ScreenVisibility.Visible)
    this.newGameButton.innerHTML = 'Next Level'
  }

  showGameLostMenu() {
    this.changeVisibilityScreen(this.element!, ScreenVisibility.Visible)
    this.newGameButton.innerHTML = 'Try Again'
  }

  play() {
    this.changeVisibilityScreen(this.element!, ScreenVisibility.Hidden)
    game.start()
  }
}
