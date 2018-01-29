import Game from './game'

function main() {
    const game = new Game('#canvas')
    game.start()
    document.querySelector('#pause').addEventListener('click', () => {
        game.pause()
    })
    document.querySelector('#continue').addEventListener('click', () => {
        game.continue()
    })
}

main()
