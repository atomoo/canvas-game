import Game from './game'
import Player from './player'
import Obstacle from './obstacle'

function main() {
    const game = new Game('#canvas')
    game.addPlayer(new Player(game, {
        x: 100,
        y: 429,
        width: 20,
        height: 20
    }))
    game.start()
    const btn = document.querySelector('#toggle')
    btn.addEventListener('click', () => {
        // = = !
        btn.innerText = game.status.replace('ning', '')
        game.toggle()
    })
}

main()
