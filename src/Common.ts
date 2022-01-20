export const HIDDEN_CLASS = 'hidden'
export enum ScreenVisibility {
  Visible,
  Hidden,
}

export abstract class Common<T extends HTMLElement> {
  public element: T | null = null

  constructor(id: string) {
    if (typeof id === 'undefined') return
    this.element = this.bindToElement(id) as T
  }

  bindToElement<U extends HTMLElement = T>(id: string): U {
    const element = document.getElementById(id) as U
    if (!element) throw new Error(`COMMON: Cannot find the element with id: ${id}`)
    return element
  }

  changeVisibilityScreen(element: HTMLElement, mode: ScreenVisibility) {
    mode === ScreenVisibility.Visible
      ? element.classList.remove(HIDDEN_CLASS)
      : element.classList.add(HIDDEN_CLASS)
  }
}
