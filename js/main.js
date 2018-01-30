import Game from './game'
import Player from './player'
import Obstacle from './obstacle'

function main() {
    const game = new Game('#canvas')
    game.addPlayer(new Player(game, {
        x: 100,
        y: 439,
        width: 20,
        height: 20
    }))
    game.addObstacle(new Obstacle(game, {
        x: game.canvas.width,
        y: 450,
        width: 10,
        height: 50
    }))
    game.start()
    document.querySelector('#toggle').addEventListener('click', () => {
        game.toggle()
    })
}

main()
