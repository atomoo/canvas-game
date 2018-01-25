export default class Player {
    constructor(game, attibute) {
        this.x = attibute.x
        this.y = attibute.y
        this.width = attibute.width
        this.height = attibute.height
        this.speedX = 2
        this.speedY = 3
        this.game = game
        this.status = 'sliding'
        game.registerAction('Space', () => {
            this.jump()
        })
    }

    jump() {
        // 跳跃
        this.status = 'jumping'
    }

    move() {
        this.moveX()
        if (this.status === 'jumping') {
            this.moveY()
        }
        if (this.status === 'jumping' && this.y >= 450 - this.width) {
            this.y = 450 - this.width
            this.status = 'sliding'
        }
    }

    moveX() {
        const p = this
        const g = this.game
        if (p.x >= g.canvas.width - p.width || p.x < 0) {
            p.speedX *= -1
        }
        p.x += p.speedX
    }

    moveY() {
        const p = this
        if (p.y >= 450 - p.width || p.y <= 350) {
            p.speedY *= -1
        }
        p.y -= p.speedY
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
