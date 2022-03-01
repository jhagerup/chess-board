/**
 * 
 * @param {{
 * 		img: string,
 * 		team: boolean,
 *  	events: React.HTMLAttributes<HTMLDivElement>
 * 	}[]} board 
 * @param {Number} from 
 * @param {*} to 
 * @param {*} turn 
 * @returns 
 */

function verify(board, from, to, turn) {
    const params = { board, from, to, turn }

    if (!verify_attack(params)) {
        console.log('fail attack')
        return false
    }
    if (!verify_movement(params)) {
        console.log('fail movement')
        return false
    }

    console.log('success')
    return true
}

function verify_attack({ board, from, to, turn }) {
    
}

function verify_movement({ board, from, to, turn }) {
    
}