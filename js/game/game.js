import { log, random } from '../utils/utils'
import Obstacle from '../obj/obstacle'
import { GAME_STATUS } from '../constant/constant'

export default class Game {
    constructor(selector) {
        this.canvas = document.querySelector(selector)
        this.context = this.canvas.getContext('2d')
        this.actions = []
        this.obstacles = []
        this.score = 0
        document.addEventListener('keydown', (e) => {
            if (this.actions[e.code]) {
                this.actions[e.code].forEach((cb) => {
                    cb()
                })
            }
        })
    }

    registerAction(code, callback) {
        if (this.actions[code]) {
            this.actions[code].push(callback)
        }
        else {
            this.actions[code] = [callback]
        }
    }

    addPlayer(player) {
        this.player = player
    }

    addObstacle(obstacle) {
        if (!obstacle.isDead()) {
            this.obstacles.push(obstacle)
        }
    }

    restart() {
        this.score = 0
        this.obstacles = []
        this.start()
    }

    start() {
        this.status = GAME_STATUS.RUNNING
        this.run()
    }

    generateObstacle() {
        const { obstacles } = this
        const obstacle = new Obstacle(this, {
            x: this.canvas.width,
            y: 450,
            width: 15,
            height: 20
        })
        if (obstacles.length > 0) {
            const lastObstacle = obstacles[obstacles.length - 1]
            const range = random(60, 300)
            obstacle.x = lastObstacle.x + range
            this.addObstacle(obstacle)
        }
        else {
            this.addObstacle(obstacle)
        }
    }

    run() {
        this.id = window.requestAnimationFrame(() => this.run())
        log('running')
        if (this.status === GAME_STATUS.RUNNING) {
            this.generateObstacle()
            this.update()
            this.render()
        }
        else if (this.status === GAME_STATUS.DEAD) {
            window.cancelAnimationFrame(this.id)
        }
    }
    update() {
        const { obstacles, player: p } = this
        p.update()
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].update()
        }
        const o = obstacles[0]
        if (p.x + Math.sqrt(p.width ** 2 + p.height ** 2) >= o.x && p.isCollideWithObstacle(o)) {
            this.over()
        }
        else {
            this.score += 1
        }
    }

    over() {
        this.status = GAME_STATUS.DEAD
    }

    toggle() {
        if (this.status === GAME_STATUS.PAUSE) {
            this.continueGame()
        }
        else if (this.status === GAME_STATUS.RUNNING) {
            this.pause()
        }
    }

    pause() {
        this.status = GAME_STATUS.PAUSE
    }

    continueGame() {
        this.status = GAME_STATUS.RUNNING
    }

    renderObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            const o = this.obstacles[i]
            if (o.isDead()) {
                this.obstacles.splice(i, 1)
                i -= 1
            }
            else {
                o.render()
            }
        }
    }

    renderScore() {
        const { context: c } = this
        c.font = '24px serif'
        c.fillText(`distance: ${this.score}`, 600, 50)
    }

    renderGameOver() {
        const { context: c } = this
        c.font = '30px serif'
        c.fillText('Game Over ! ', this.canvas.width / 2, this.canvas.height / 2)
    }

    render() {
        const { canvas, context } = this
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.textBaseline = 'middle'
        context.textAlign = 'center'
        this.renderScore()
        if (this.status === GAME_STATUS.DEAD) {
            this.renderGameOver()
        }
        context.beginPath()
        context.moveTo(0, 450)
        context.lineTo(canvas.width, 450)
        context.stroke()
        this.player.render()
        this.renderObstacles()
    }
}
