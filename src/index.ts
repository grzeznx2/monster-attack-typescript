import { game } from './Game'

function animate() {
  game.animate()
  requestAnimationFrame(animate)
}

animate()
