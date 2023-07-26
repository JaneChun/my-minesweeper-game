import React, { useState } from 'react';
import { getBoard } from '../utils/board';
import { styled } from 'styled-components';

const WIDTH = 8;
const HEIGHT = 8;
const NUMBER_OF_MINES = 10;

const Grid = styled.div`
	display: grid;
	grid-template-rows: repeat(${WIDTH}, 20vmin);
	grid-template-columns: repeat(${WIDTH}, 20vmin);
`;

const Tile = styled.div`
	background-color: gray;
`;

function Board() {
	const [board, setBoard] = useState(getBoard(WIDTH, HEIGHT, NUMBER_OF_MINES));

	return <Grid>{board.map((row) => row.map((tile) => <Tile>{`${tile.mine}`}</Tile>))}</Grid>;
}

export default Board;
