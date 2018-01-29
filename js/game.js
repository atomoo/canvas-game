import log from './utils'
import Player from './player'

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

    start() {
        const player = new Player(this, {
            x: 0,
            y: 439,
            width: 20,
            height: 20
        })
        this.run(player)
    }

    run(player) {
        this.id = window.requestAnimationFrame(() => this.run(player))
        if (this.status !== 'pause') {
            this.render(player)
            player.move()
        }
    }

    pause() {
        this.status = 'pause'
    }

    continue() {
        this.status = 'running'
    }

    render(player) {
        const { canvas, context } = this
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.moveTo(0, 450)
        context.lineTo(canvas.width, 450)
        context.stroke()
        player.render()
    }
}
