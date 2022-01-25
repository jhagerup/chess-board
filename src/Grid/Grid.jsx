import './Grid.css'
import { useDrag, useDrop } from 'react-dnd'
import Preview from 'react-dnd-preview';

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
        drop: (item) => window.game.movePiece(item.index, params.index)
    })
    // console.log(params.type)

    return (
        <div
            {...params.events}
            className={`cell ${params.checkered ? 'checkered' : ''}`}
            ref={dropRef}>
            {params.img && <>
                {window.isMobile && <Preview generator={generatePreview} />}
                <div
                    style={{
                        backgroundImage: `url(${params.img})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        opacity
                    }}
                    ref={dragRef}
                    className={'img' + (params.team ? ' top' : '')} />
            </>}
        </div>
    )
}

function Grid(params) {
    return (
        <div className='grid' style={{ "--width": params.width, "--height": params.height }}>
            {params.grid.map(({ img, events, team }, i) => <Cell
                events={events}
                checkered={params.checkered && (i % params.width + Math.floor(i / params.width) % 2) % 2}
                img={img}
                index={i}
                team={team}
                key={i} />)}
        </div>
    )
}

export default Grid