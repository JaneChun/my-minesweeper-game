import { SetStateAction } from 'react';
import { Tile } from './board';

// 깃발 표시 / 해제
export function flagTile(
	e: React.MouseEvent<HTMLDivElement>,
	clickedTile: Tile,
	board: Tile[][],
	setBoard: React.Dispatch<SetStateAction<Tile[][]>>
) {
	e.preventDefault();
	if (clickedTile.status !== 'hidden' && clickedTile.status !== 'flagged') return;

	const updatedBoard: Tile[][] = board.map((row) =>
		row.map((tile) => (tile === clickedTile ? { ...tile, status: tile.status === 'flagged' ? 'hidden' : 'flagged' } : tile))
	);
	setBoard(updatedBoard);
}
