export default class Player {
    constructor(game, attibute) {
        this.x = attibute.x
        this.y = attibute.y
        this.width = attibute.width
        this.height = attibute.height
        this.speedX = 2
        this.speedY = 2
        this.game = game
    }

    jump() {
        // 跳跃
        this.y -= this.speedY
    }

    move() {
        if (this.x >= this.game.canvas.width - this.width) {
            this.speedX *= -1
        }
        if (this.x < 0) {
            this.speedX *= -1
        }
        this.x += this.speedX
    }

    render() {
        const { context: c } = this.game
        c.save()
        c.translate(this.x, this.y)
        c.strokeRect(
            0,
            0,
            this.width,
            this.height
        )
        c.restore()
    }
}
