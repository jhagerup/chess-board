/**
 * Checks if the move is valid
 * @param {{pos: {x: number, y: number}, team: boolean, type: 'rock'|'paper'|'scissors'}} from The from position
 * @param {{pos: {x: number, y: number}, team: boolean, type: 'rock'|'paper'|'scissors'}} to The to position
 * @returns {boolean} If the move is valid
 */

export default function isValidMove(from, to) {
    console.log(from, to)
    if (!to.type) return true
    if (from.team === to.team) return false

    if (from.type === 'rock' && to.type === 'scissors') return true
    if (from.type === 'paper' && to.type === 'rock') return true
    if (from.type === 'scissors' && to.type === 'paper') return true
    console.log(false)
    return false
}