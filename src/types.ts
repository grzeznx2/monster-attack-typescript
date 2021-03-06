export interface Level {
  scoreToWin: number
  enemiesInterval: number
}

export interface Position {
  x: number
  y: number
}

export interface Rectangle extends Position {
  width: number
  height: number
}
