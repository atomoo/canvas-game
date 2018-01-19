import Game from './game'
import Player from './player'

function main() {
    const game = new Game('#canvas')
    const player = new Player(game, {
        x: 0,
        y: 429,
        width: 20,
        height: 20
    })
    game.start(player)
    document.querySelector('#pause').addEventListener('click', () => {
        game.pause()
    })
    document.querySelector('#continue').addEventListener('click', () => {
        game.continue()
    })
}

main()
