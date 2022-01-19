import { Rectangle } from './types'

export abstract class Physics {
  static detectCollision(first: Rectangle, second: Rectangle) {
    if (
      !(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
      )
    ) {
      return true
    }
  }
}
