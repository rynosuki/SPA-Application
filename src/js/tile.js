export default class Tile {
  #value
  constructor (value) {
    this.tiles = ['ball', 'cherry', 'coin', 'flower', 'gem', 'heart', 'star', 'thunder']
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
