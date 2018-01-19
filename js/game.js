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

    start(player) {
        this.id = window.requestAnimationFrame(() => this.start(player))
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
