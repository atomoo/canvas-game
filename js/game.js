import log from './utils'

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
        this.status = 'running'
        this.run()
    }

    run() {
        this.id = window.requestAnimationFrame(() => this.run())
        if (this.status !== 'pause') {
            this.player.update()
            this.obstacle.update()
            this.render()
        }
    }

    toggle() {
        if (this.status === 'pause') {
            this.status = 'running'
        }
        else if (this.status === 'running') {
            this.status = 'pause'
        }
    }

    pause() {
        this.status = 'pause'
    }

    continue() {
        this.status = 'running'
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
