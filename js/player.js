export default class Player {
    constructor(game, attibute) {
        this.x = attibute.x
        this.y = attibute.y
        this.positionY = attibute.y
        this.width = attibute.width
        this.height = attibute.height
        this.angle = 0
        this.speedY = 0
        this.speedAngle = 15 * Math.PI / 180
        this.game = game
        this.maxY = this.positionY - 100
        this.speedVelocity = 1
        this.status = 'sliding'
        game.registerAction('Space', () => {
            this.jump()
        })
    }

    isCollideWithLine() {
        return this.y > this.positionY
    }

    isCollideWithMaxHeight() {
        return this.y <= this.maxY
    }

    jump() {
        // 跳跃
        if (!this.isJumping()) {
            this.status = 'jumping'
            this.speedY = -20
        }
    }

    isJumping() {
        return this.status === 'jumping'
    }

    revertSpeed() {
        this.y = this.positionY
        this.angle = 0
        this.status = 'sliding'
    }

    update() {
        if (this.status === 'jumping') {
            this.moveY()
            this.rotate()
            if (this.isCollideWithLine()) {
                this.revertSpeed()
            }
        }
    }

    moveY() {
        const p = this
        p.y += p.speedY
        p.speedY += p.speedVelocity
        if (p.isCollideWithLine()) {
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
