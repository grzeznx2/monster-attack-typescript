import { game } from './Game'

game.playLevel({ scoreToWin: 50, enemiesInterval: 600 })

function animate() {
  game.animate()
  requestAnimationFrame(animate)
}

animate()
