socket = io()

socket.on('board', data=>{
    const newGame = createGameObjectFromBoardString(data)

    updateGameObj(newGame)
    
    console.log('New game', data)
})

