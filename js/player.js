export default class Player {
    constructor(game, attibute) {
        this.x = attibute.x
        this.y = attibute.y
        this.positionY = attibute.y
        this.width = attibute.width
        this.height = attibute.height
        this.angle = 0
        this.speedX = 2
        this.speedY = 3
        this.speedAngle = 60 * Math.PI / 180
        this.game = game
        this.status = 'sliding'
        game.registerAction('Space', () => {
            this.jump()
        })
    }

    isAtLine() {
        return this.y > this.positionY
    }

    jump() {
        // 跳跃
        this.status = 'jumping'
    }

    move() {
        this.moveX()
        if (this.status === 'jumping') {
            this.moveY()
            this.rotate()
            if (this.y > this.positionY) {
                this.y = this.positionY
                this.angle = 0
                this.status = 'sliding'
            }
        }
    }

    moveX() {
        const p = this
        const g = this.game
        p.x += p.speedX
        if (p.x >= g.canvas.width - p.width || p.x < 0) {
            p.speedX *= -1
            this.speedAngle *= -1
        }
    }

    moveY() {
        const p = this
        p.y -= p.speedY
        if (p.y > p.positionY || p.y <= this.positionY - 100) {
            p.speedY *= -1
        }
    }

    rotate() {
        this.angle += this.speedAngle
    }

    render() {
        const { context: c } = this.game
        c.save()
        c.translate(this.x, this.y)
        c.rotate(this.angle)
        c.strokeRect(
            this.width / -2,
            this.height / -2,
            this.width,
            this.height
        )
        c.restore()
    }
}
