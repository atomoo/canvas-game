import Point from '../shape/point'
import Polygon from '../shape/polygon'

export default class Obstacle {
    constructor(game, attribute) {
        this.game = game
        this.x = attribute.x
        this.y = attribute.y
        this.width = attribute.width
        this.height = attribute.height
        this.speedX = 2
    }

    isDead() {
        return this.x < 0
    }

    isInGame() {
        return this.x > 0 && this.x < this.game.canvas.width
    }

    update() {
        this.x -= this.speedX
    }

    getPolygon() {
        return new Polygon([
            new Point(this.x, this.y),
            new Point(this.x + this.width, this.y),
            new Point(this.x + this.width / 2, this.y - this.height)
        ])
    }

    render() {
        if (this.isInGame()) {
            const { context: c } = this.game
            c.save()
            c.beginPath()
            c.moveTo(this.x, this.y)
            c.lineTo(this.x + this.width, this.y)
            c.lineTo(this.x + this.width / 2, this.y - this.height)
            c.closePath()
            c.stroke()
            c.restore()
        }
    }
}
