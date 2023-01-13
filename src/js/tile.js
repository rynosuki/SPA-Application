import rgame1 from '../img/memory/rgame1.png'
import rgame2 from '../img/memory/rgame2.png'
import rgame3 from '../img/memory/rgame3.png'
import rgame4 from '../img/memory/rgame4.png'
import rgame5 from '../img/memory/rgame5.png'
import rgame6 from '../img/memory/rgame6.png'
import rgame7 from '../img/memory/rgame7.png'
import rgame8 from '../img/memory/rgame8.png'
import vgame1 from '../img/memory/vgame1.png'
import vgame2 from '../img/memory/vgame2.png'
import vgame3 from '../img/memory/vgame3.png'
import vgame4 from '../img/memory/vgame4.png'
import vgame5 from '../img/memory/vgame5.png'
import vgame6 from '../img/memory/vgame6.png'
import vgame7 from '../img/memory/vgame7.png'
import vgame8 from '../img/memory/vgame8.png'
import rnone from '../img/memory/rnone.png'

export default class Tile {
  #value

  // Create a tile object.
  constructor (value) {
    this.tiles = [[rgame1, rgame2, rgame3, rgame4, rgame5, rgame6, rgame7, rgame8],
      [vgame1, vgame2, vgame3, vgame4, vgame5, vgame6, vgame7, vgame8]]
    this.empty = rnone
    this.#value = value
    this.complete = false
  }

  getEmpty () {
    return this.empty
  }

  getValue (style) {
    if (style === 'r') {
      return this.tiles[0][this.#value]
    } else if (style === 'v') {
      return this.tiles[1][this.#value]
    }
  }

  setComplete () {
    this.complete = true
  }
}
