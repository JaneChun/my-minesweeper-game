import { useState } from 'react';
import { styled } from 'styled-components';
import { Tile, getBoard } from '../utils/board';
import { flagTile } from '../utils/tile';

interface TileProps {
	tile: Tile;
}

const WIDTH = 8;
const HEIGHT = 8;
const NUMBER_OF_MINES = 10;

function Board() {
	const [board, setBoard] = useState<Tile[][]>(getBoard(WIDTH, HEIGHT, NUMBER_OF_MINES));
	const mineLeftCount = board.flat().filter((tile) => tile.mine).length;

	return (
		<>
			<div>남은 지뢰 개수 : {mineLeftCount}</div>
			<Grid>
				{board.map((row) =>
					row.map((tile) => <TileItem onContextMenu={(e) => flagTile(e, tile, board, setBoard)} key={`${tile.x}-${tile.y}`} tile={tile} />)
				)}
			</Grid>
		</>
	);
}

export default Board;

const Grid = styled.div`
	display: inline-grid;
	grid-template-rows: repeat(${WIDTH}, 20px);
	grid-template-columns: repeat(${WIDTH}, 20px);
	gap: 1px;
	background-color: black;
	border: 1px solid black;
`;

const TileItem = styled.div<TileProps>`
	background-color: ${(props) => (props.tile.status === 'hidden' ? 'gray' : 'yellow')};
	border: 1px solid ${(props) => (props.tile.mine ? 'red' : 'gray')};
`;
