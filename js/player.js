import { PLAYER_STATUS } from './constant'

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
        this.status = PLAYER_STATUS.SLIDING
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

    isCollideWithObstacle(obstacle) {
        // TODO: 碰撞
        const { x: playerX, width } = this.x
        const playerRightX = playerX + width
        const obstacleRightX = obstacle.x + obstacle.width
        return (playerRightX > obstacle.x && playerRightX < obstacleRightX)
            || (playerX > obstacle.x && playerX < obstacleRightX)
    }

    jump() {
        // 跳跃
        if (!this.isJumping()) {
            this.status = PLAYER_STATUS.JUMPING
            this.speedY = -15
        }
    }

    isJumping() {
        return this.status === PLAYER_STATUS.JUMPING
    }

    revertSpeed() {
        this.y = this.positionY
        this.angle = 0
        this.status = PLAYER_STATUS.SLIDING
    }

    update() {
        if (this.status === PLAYER_STATUS.JUMPING) {
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
        c.translate(this.x + this.width / 2, this.y + this.height / 2)
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
