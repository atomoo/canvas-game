import { log, random } from './utils'
import Obstacle from './obstacle'
import { GAME_STATUS } from './constant'

export default class Game {
    constructor(selector) {
        this.canvas = document.querySelector(selector)
        this.context = this.canvas.getContext('2d')
        this.actions = []
        this.obstacles = []
        this.score = 0
        document.addEventListener('keydown', (e) => {
            if (this.actions[e.code]) {
                this.actions[e.code]()
            }
        })
    }

    registerAction(code, callback) {
        this.actions[code] = callback
    }

    addPlayer(player) {
        this.player = player
    }

    addObstacle(obstacle) {
        if (!obstacle.isDead()) {
            this.obstacles.push(obstacle)
        }
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
        if (this.status === GAME_STATUS.RUNNING) {
            this.generateObstacle()
            this.update()
            this.render()
        }
    }
    update() {
        const { obstacles, player: p } = this
        p.update()
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].update()
        }
        // const o = obstacles[0]
        // if (o.x + o.width < p.x && !p.isCollideWithObstacle(o)) {
        //     this.score += 1
        // }
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

    render() {
        const { canvas, context } = this
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.moveTo(0, 450)
        context.lineTo(canvas.width, 450)
        context.stroke()
        context.font = '24px serif'
        context.fillText(this.score, 650, 50)
        this.player.render()
        this.renderObstacles()
    }
}
