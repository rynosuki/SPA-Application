import battleshipback from '../img/battleship/battleshipback.png'
import battleshipfront from '../img/battleship/battleshipfront.png'
import battleshipmiddle from '../img/battleship/battleshipmiddle.png'
import cargoback from '../img/battleship/cargoback.png'
import cargofront from '../img/battleship/cargofront.png'
import cargomiddle from '../img/battleship/cargomiddle.png'
import carrierback from '../img/battleship/carrierback.png'
import carrierfront from '../img/battleship/carrierfront.png'
import carriermiddle from '../img/battleship/carriermiddle.png'
import checked from '../img/battleship/checked.png'
import none from '../img/battleship/none.png'

export default class BattleshipCell {
  /**
   * BattleshipCell constructor.
   *
   * @param {*} x X coordinate.
   * @param {*} y Y coordinate.
   */
  constructor (x, y) {
    this.x = x
    this.y = y
    this.isHit = false
    this.isShip = false
    this.ship = undefined
    this.shipPart = undefined
    this.rotation = undefined

    this.imgSrc = {
      carrier: {
        front: carrierfront,
        back: carrierback,
        middle: carriermiddle
      },
      battleship: {
        front: battleshipfront,
        back: battleshipback,
        middle: battleshipmiddle
      },
      cargo: {
        front: cargofront,
        back: cargoback,
        middle: cargomiddle
      },
      none,
      checked
    }
  }

  getImageSrc () {
    return this.imgSrc[this.ship][this.shipPart]
  }
}
