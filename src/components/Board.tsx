import { styled } from 'styled-components';
import { Tile, createBoard } from '../utils/board';
import { useAppDispatch, useAppSelector } from '../store/config';
import { useEffect } from 'react';
import { flagTile, setBoard } from '../store/gameSlice';

const WIDTH = 8;
const HEIGHT = 8;
const NUMBER_OF_MINES = 10;

interface TileProps {
	tile: Tile;
}

function Board() {
	const dispatch = useAppDispatch();
	const board = useAppSelector((state) => state.game.board);

	useEffect(() => {
		const initialBoard = createBoard(WIDTH, HEIGHT, NUMBER_OF_MINES);
		dispatch(setBoard(initialBoard));
	}, [dispatch]);

	function onRightClick(e: React.MouseEvent<HTMLDivElement>, clickedTile: Tile) {
		e.preventDefault();
		if (clickedTile.status !== 'hidden' && clickedTile.status !== 'flagged') return;

		dispatch(flagTile(clickedTile));
	}

	return (
		<>
			<Grid>
				{board.map((row) => row.map((tile) => <TileItem onContextMenu={(e) => onRightClick(e, tile)} key={`${tile.x}-${tile.y}`} tile={tile} />))}
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
