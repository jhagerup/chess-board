import './Grid.css'
import { useDrag, useDrop } from 'react-dnd'
import Preview from 'react-dnd-preview';
import isValidMove from '../isValidMove';
import { useEffect, useRef, useState } from 'react';

const generatePreview = (params) => {
    // console.log(params)
    return <div className="item-list__item" style={{
        ...params.style,
        backgroundImage: `url(${params.item.img})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '80px',
        height: '80px'
    }}></div>;
};

/**
 * 
 * @param {{
 *  img: string,
 *  index: number,
 *  checkered: boolean,
 *  team: boolean,
 *  overlayCol: string,
 *  events: React.HTMLAttributes<HTMLDivElement>
 * }} params 
 * @returns 
 */

function Cell(params) {
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: 'cell',
            item: {
                img: params.img,
                index: params.index
            },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        }),
        [params.img, params.index]
    )

    const [, dropRef] = useDrop({
        accept: 'cell',
        drop: (item) => {
            mouseUp(['drop', item])
            window.game.movePiece(item.index, params.index)
        }
    })
    // console.log(params.type)

    function mouseDown() {
        const newBoard = [...window.game.board]

        newBoard.forEach((cell, i) => {
            const newCell = Object.assign({}, cell, {
                overlayCol: isValidMove({
                    pos: {
                        x: params.index % window.game.width,
                        y: Math.floor(params.index / window.game.width)
                    },
                    team: newBoard[params.index].team,
                    type: ['rock', 'paper', 'scissors'][[window.game.rockImg, window.game.paperImg, window.game.scissorsImg].indexOf(newBoard[params.index].img)]
                }, {
                    pos: {
                        x: i % window.game.width,
                        y: Math.floor(i / window.game.width)
                    },
                    team: newBoard[i].team,
                    type: [null, 'rock', 'paper', 'scissors'][[window.game.rockImg, window.game.paperImg, window.game.scissorsImg].indexOf(newBoard[i].img) + 1]
                }) ? '#00ff0060' : '#ff000060'
            })

            newBoard[i] = newCell
        });

        window.game.board = newBoard
    }

    function mouseUp() {
        const newBoard = [...window.game.board]

        newBoard.forEach((cell, i) => {
            const newCell = Object.assign({}, cell, {
                overlayCol: '#0000'
            })

            newBoard[i] = newCell
        });

        window.game.board = newBoard
    }

    return (
        <div
            {...params.events}
            className={`cell ${params.checkered ? 'checkered' : ''}`}
            style={{
                "--overlay": params.overlayCol
            }}
            ref={dropRef}>
            {params.img && <>
                {window.isMobile && <Preview generator={generatePreview} />}
                <div
                    style={{
                        backgroundImage: `url(${params.img})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        opacity,
                        "--team": params.team ? '#9369e060' : '#45beee60',
                        "--overlay": "#0005",
                        // backgroundColor: 
                    }}
                    ref={dragRef}
                    onMouseDown={mouseDown}
                    onTouchStart={mouseDown}
                    onMouseUp={mouseUp}
                    className='img' />
            </>}
        </div>
    )
}

function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

function Grid(params) {
    const mainRef = useRef()
    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0
    })
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            const size = mainRef.current.getBoundingClientRect()

            setDimensions({
                height: Math.min(size.width, size.height),
                width: Math.min(size.width, size.height)
            })
        }, 100)

        debouncedHandleResize()

        window.addEventListener('resize', debouncedHandleResize)

        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)

        }
    })
    

    return (
        <div className="main" ref={mainRef}>
            <div className='grid' style={{
                "--width": params.width,
                "--height": params.height,
                width: dimensions.width,
                height: dimensions.height
            }}>
                {params.grid.map(({ img, events, team, overlayCol }, i) => <Cell
                    events={events}
                    checkered={params.checkered && (i % params.width + Math.floor(i / params.width) % 2) % 2}
                    img={img}
                    index={i}
                    team={team}
                    overlayCol={overlayCol}
                    key={i} />)}
            </div>
        </div>
    )
}

export default Grid