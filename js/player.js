export default class Player {
    constructor(game, attibute) {
        this.x = attibute.x
        this.y = attibute.y
        this.width = attibute.width
        this.height = attibute.height
        this.speedX = 2
        this.speedY = 0
        this.game = game
    }

    jump() {
        // 跳跃
        this.y += this.speedY
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
        this.game.context.translate(this.x, this.y)
        this.game.context.strokeRect(
            0,
            0,
            this.width,
            this.height
        )
    }
}
