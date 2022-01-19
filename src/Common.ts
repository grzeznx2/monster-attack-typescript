export abstract class Common<T extends HTMLElement> {
  public element: T | null = null

  constructor(id: string) {
    if (typeof id === 'undefined') return
    this.element = this.bindToElement(id)
  }

  bindToElement(id: string): T {
    const element = document.getElementById(id) as T
    if (!element) throw new Error(`COMMON: Cannot find the element with id: ${id}`)
    return element
  }
}
