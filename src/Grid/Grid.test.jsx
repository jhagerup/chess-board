import { render, screen } from '@testing-library/react';
import reactDom from 'react-dom';
import Grid from './Grid';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

describe('renders 5x5 grid', () => {
	const [width, height] = [5, 5]
	const contents = Array(5*5).fill(0).map((_, i) => ({img: 'aaa' + Math.random(), events: {}}))

	const root = document.createElement('div')
	reactDom.render(<DndProvider backend={HTML5Backend} options={{enableMouseEvents: true}}>
		<Grid grid={contents} width={width} height={height} checkered={true} />
	</DndProvider>, root);
	

	// render(<Grid grid={contents} width={5} height={5} />);
	contents.forEach((gridCell, i) => {
		test(`check if cell ${i+1} rendered sucessfully`, () => {
			const cellElm = root.querySelector(`.grid > div.cell:nth-child(${i+1})`);

			expect(cellElm.style.backgroundImage).toBe(`url(${contents[i].img})`)
			if ((i % 5 + Math.floor(i / 5) % 2) % 2) {
				expect(cellElm).toHaveClass('checkered')
			} else {
				expect(cellElm).not.toHaveClass('checkered')
			}
		})
		// const cellElm = screen.getByText(gridCell.value);
	})
});

describe('renders 3x8 grid', () => {
	const [width, height] = [3, 8]

	const contents = Array(width*height).fill(0).map((_, i) => ({img: 'aaa' + Math.random(), events: {}}))

	const root = document.createElement('div')
	reactDom.render(<DndProvider backend={HTML5Backend} options={{enableMouseEvents: true}}>
		<Grid grid={contents} width={width} height={height} checkered={true} />
	</DndProvider>, root);
	
	contents.forEach((gridCell, i) => {
		test(`if cell ${i+1} rendered sucessfully`, () => {
			const cellElm = root.querySelector(`.grid > div.cell:nth-child(${i+1})`);

			
			expect(cellElm.children.item(0).style.backgroundImage).toBe(`url(${gridCell.img})`)
			if ((i % width + Math.floor(i / width) % 2) % 2) {
				expect(cellElm).toHaveClass('checkered')
			} else {
				expect(cellElm).not.toHaveClass('checkered')
			}
		})
		// const cellElm = screen.getByText(gridCell.value);
	})
});
