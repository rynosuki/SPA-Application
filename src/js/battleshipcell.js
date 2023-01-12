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
  }
}
