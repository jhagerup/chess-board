// <reference href="./types.d.ts">

/**
 * Checks if any player has won
 * @param {Game} game The board to check
 * @returns {string} "" if no, "t" if tie, "w1" if player 1 win, "w2" if player 2 win
 */

export default function is_finished(game) {
    const amntOfPlayer1 = {
        rocks: 0,
        paper: 0,
        scissors: 0
    }
    const amntOfPlayer2 = {
        rocks: 0,
        paper: 0,
        scissors: 0
    }

    game.board.forEach((cell, i) => {
        const player = cell.team ? amntOfPlayer1 : amntOfPlayer2
        switch (cell.img) {
            case game.rockImg:
                player.rocks++
                break;
            case game.paperImg:
                player.paper++
                break;
            case game.scissorsImg:
                player.scissors++
                break;
            default:
                break;
        }
    })

    if (Object.values(amntOfPlayer1).reduce((prev, curr) => prev * curr, 1) === 0) return "w2"
    if (Object.values(amntOfPlayer1).reduce((prev, curr) => prev * curr, 1) === 0) return "w1"

    return ""
}