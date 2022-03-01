type Game = {
    width: number,
    height: number,
    update: Function,
    board: Board,
    raw_board: Board,
    movePiece: () => undefined,
    rockImg: string,
    paperImg: string,
    scissorsImg: string
}

type Board = {
    img?: string,
    team: boolean,
    events: React.HTMLAttributes<HTMLDivElement>,
    overlayCol: string
}[]