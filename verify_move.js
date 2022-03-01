const valid_moves = {
    r: 's',
    p: 'r',
    s: 'p',
}

if ('window' in this) exports = {}

/**
 * @description Verifys a move
 * @param {String} board The board to check the move on
 * @param {Number} _from The starting position
 * @param {Number} _to The ending position
 * @param {Number} turn The turn of the player, who can move
 * @param {Number} playerIndex The index of the player, that is currently playing
 * @returns {Boolean} Is the move valid
 */

exports.verify = (board, _from, _to, turn, playerIndex) => {
    size = Math.sqrt(board.length)
    from = board[_from]
    fromxy = to_xy(_from, size)
    to = board[_to]
    toxy = to_xy(_to, size)
    console.log(_from, from, _to, to, turn, playerIndex)
    
    if (from == from.toLowerCase() == !turn && turn+1 == playerIndex)

    if(!to) {
        if (!((fromxy.x === toxy.x && (Math.abs(fromxy.y-toxy.y) <= 2)) ||
            (fromxy.y === toxy.y && (Math.abs(fromxy.x-toxy.x) <= 2)))) return false
        console.log(fromxy.x + (fromxy.x - toxy.x < 0 ? 1 : -1, fromxy.y))
        if (Math.abs(fromxy.x - toxy.x) === 2 && board[from_xy(fromxy.x + (fromxy.x - toxy.x < 0 ? 1 : -1), fromxy.y, size)]) return false
        if (Math.abs(fromxy.y - toxy.y) === 2 && board[from_xy(fromxy.x, fromxy.y + (fromxy.y - toxy.y < 0 ? 1 : -1), size)]) return false
        return true
    } else if (valid_moves[from.toLowerCase()] == to.toLowerCase() && getCase(from) != getCase(to)) {
        const xDiff = Math.abs(fromxy.x - toxy.x)
        const yDiff = Math.abs(fromxy.y - toxy.y)

        return xDiff === yDiff && xDiff === 1
    }

    
    return false
}

verify = exports.verify

function getCase(char) {
    return char === char.toLowerCase()
}

function to_xy(index, size) {
    return {
        x: index % size,
        y: Math.floor(index/size)
    }
}

function from_xy(x, y, size) {
    return x+y*size
}