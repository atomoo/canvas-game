import { drawTriangleInCanvasContext } from './utils'

export default class Obstacle {
    constructor(game, attibute) {
        this.game = game
        this.x = attibute.x
        this.y = attibute.y
        this.width = attibute.width
        this.height = attibute.height
        this.speedX = 2
    }

    update() {
        this.x -= this.speedX
    }

    render() {
        if (this.x > 0) {
            const { context: c } = this.game
            c.save()
            c.beginPath()
            c.moveTo(this.x, this.y)
            c.lineTo(this.x + this.width / 2, this.y - this.height)
            c.lineTo(this.x + this.width, this.y)
            c.closePath()
            c.stroke()
            c.restore()
        }
    }
}
