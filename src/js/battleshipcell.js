export default class BattleshipCell {
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
