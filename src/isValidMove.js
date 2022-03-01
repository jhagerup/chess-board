/**
 * Checks if the move is valid
 * @param {{pos: {x: number, y: number}, team: boolean, type: 'rock'|'paper'|'scissors'}} from The from position
 * @param {{pos: {x: number, y: number}, team: boolean, type: 'rock'|'paper'|'scissors'}} to The to position
 * @returns {boolean} If the move is valid
 */

export default function isValidMove(from, to) {
    // console.log(from, to)
    
    const dist = {
        x: Math.abs(from.pos.x - to.pos.x),
        y: Math.abs(from.pos.y - to.pos.y)
    }
    
    if (!to.type) {
        if (validate_movement(from, to, dist)) return true
    }
    else {
        if (validate_attack(from, to, dist)) return true
    }
    
    
    
    return false
}

/**
 * Checks if the attact is valid
 * @param {{pos: {x: number, y: number}, team: boolean, type: 'rock'|'paper'|'scissors'}} from The from position
 * @param {{pos: {x: number, y: number}, team: boolean, type: 'rock'|'paper'|'scissors'}} to The to position
 * @param {{x: number, y: number}} dist The difference between the two positions
 * @returns {boolean} If the movement is valid
 */

function validate_attack(from, to, dist) {
    let isValid = false

    if (from.team === to.team) return false
    if (from.type === 'rock' && to.type === 'scissors') isValid = true
    if (from.type === 'paper' && to.type === 'rock') isValid = true
    if (from.type === 'scissors' && to.type === 'paper') isValid = true

    if (!(dist.x === dist.y && dist.x === 1)) isValid = false

    return isValid
}

/**
 * Checks if the movement is valid
 * @param {{pos: {x: number, y: number}, team: boolean, type: 'rock'|'paper'|'scissors'}} from The from position
 * @param {{pos: {x: number, y: number}, team: boolean, type: 'rock'|'paper'|'scissors'}} to The to position
 * @param {{x: number, y: number}} dist The difference between the two positions
 * @returns {boolean} If the movement is valid
 */

function validate_movement(from, to, dist) {
    

    if ((dist.x + dist.y) === 1) return true
    return false
}

// /**
//  * 
//  * @param {{x: number, y: number}} fromPos 
//  * @param {{x: number, y: number}} toPos 
//  */

// function check_space_inbetween_x(fromPos, toPos) {
//     function check_space(pos) {
        
//     }

//     if ((fromPos.x - toPos.x) >= 0 )
//         for (let i = fromPos.x; i < toPos.x; i++)  check_space
// }


// function validate_board(board, from) {
    
// }