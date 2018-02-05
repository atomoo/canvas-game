import Game from './game/game'
import Player from './obj/player'

function main() {
    const game = new Game('#canvas')
    game.addPlayer(new Player(game, {
        x: 100,
        y: 429,
        width: 20,
        height: 20
    }))
    game.start()
}

main()
