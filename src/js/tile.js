export default class Tile {
  #value
  constructor (value) {
    this.tiles = ['game_1', 'game_2', 'game_3', 'game_4', 'game_5', 'game_6', 'game_7', 'game_8']
    this.empty = 'none'
    this.#value = value
    this.complete = false
  }

  getEmpty () {
    return this.empty
  }

  getValue () {
    return this.tiles[this.#value]
  }

  setComplete () {
    this.complete = true
  }
}
