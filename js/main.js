import Game from './game/game'
import Player from './obj/player'
import { GAME_STATUS } from './constant/constant'

function main() {
    const game = new Game('#canvas')
    const player = new Player(game, {
        x: 100,
        y: 429,
        width: 20,
        height: 20
    })
    game.addPlayer(player)
    game.registerAction('Space', () => {
        if (game.status === GAME_STATUS.DEAD) {
            game.addPlayer(player)
            game.restart()
        }
    })
    game.start()
}

main()
