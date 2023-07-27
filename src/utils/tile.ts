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

// 주변 8개 타일 반환
export function getSurroundingTiles(board: Tile[][], clickedTile: Tile) {
	const { x, y } = clickedTile;
	const surroundingTiles: Tile[] = [];

	for (let xOffset = -1; xOffset <= 1; xOffset++) {
		for (let yOffset = -1; yOffset <= 1; yOffset++) {
			if (xOffset === 0 && yOffset === 0) continue; // 자기 자신은 추가하지 않는다.

			const tile = board[x + xOffset]?.[y + yOffset]; // x + xOffset과 y + yOffset 두 값 중 하나라도 유효하지 않으면
			if (tile) surroundingTiles.push(tile); // undefined가 할당되어 추가되지 않는다.
		}
	}

	return surroundingTiles;
}
