export default class Player {
    constructor(game, attibute) {
        this.x = attibute.x
        this.y = attibute.y
        this.width = attibute.width
        this.height = attibute.height
        this.speedX = 2
        this.speedY = 2
        this.game = game
        this.status = 'walking'
        game.registerAction('Space', () => {
            this.jump()
        })
    }

    jump() {
        // 跳跃
        this.status = 'jumping'
    }

    move() {
        const p = this
        const g = this.game
        if (p.x >= g.canvas.width - p.width) {
            p.speedX *= -1
        }
        if (p.x < 0) {
            p.speedX *= -1
        }
        p.x += p.speedX
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
