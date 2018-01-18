export default class Game {
    constructor(selector) {
        this.canvas = document.querySelector(selector)
        this.context = this.canvas.getContext('2d')
    }

    start(player) {
        this.id = window.requestAnimationFrame(() => this.start(player))
        this.render(player)
        player.move()
    }

    render(player) {
        const { canvas, context } = this
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.moveTo(0, 450)
        context.lineTo(canvas.width, 450)
        context.stroke()
        context.save()
        player.render()
        context.restore()
    }
}