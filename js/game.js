import log from './utils'

const GAME_STATUS = {
    RUNNING: 'running',
    PAUSE: 'pause'
}

export default class Game {
    constructor(selector) {
        this.canvas = document.querySelector(selector)
        this.context = this.canvas.getContext('2d')
        this.actions = []
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
        this.obstacle = obstacle
    }

    start() {
        this.status = GAME_STATUS.RUNNING
        this.run()
    }

    run() {
        this.id = window.requestAnimationFrame(() => this.run())
        if (this.status !== GAME_STATUS.PAUSE) {
            this.player.update()
            this.obstacle.update()
            this.render()
        }
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

    render() {
        const { canvas, context } = this
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.moveTo(0, 450)
        context.lineTo(canvas.width, 450)
        context.stroke()
        this.player.render()
        this.obstacle.render()
    }
}
