import { useAppDispatch } from '../store/config';

interface minePostion {
	x: number;
	y: number;
}

export interface Tile {
	x: number;
	y: number;
	mine: boolean;
	value: number | string;
	status: 'hidden' | 'revealed' | 'flagged' | 'bomb';
}

export function createBoard(width: number, height: number, numberOfMines: number) {
	const board: Tile[][] = getInitialBoard(width, height); // 빈 보드판
	const minePositions: minePostion[] = getMinePositions(width, height, numberOfMines); // 지뢰 좌표 배열

	// 보드판에 지뢰를 심어서 반환한다.
	for (const { x, y } of minePositions) {
		board[y][x].mine = true;
	}

	return board;
}

export function getInitialBoard(width: number, height: number) {
	const board: Tile[][] = [];

	for (let x = 0; x < width; x++) {
		const row: Tile[] = [];
		for (let y = 0; y < height; y++) {
			const tile: Tile = { x, y, mine: false, value: 0, status: 'hidden' };
			row.push(tile);
		}
		board.push(row);
	}

	return board;
}

export function getMinePositions(width: number, height: number, numberOfMines: number): minePostion[] {
	const positions: minePostion[] = [];

	while (positions.length < numberOfMines) {
		const newPosition = {
			x: getRandomNumber(width),
			y: getRandomNumber(height),
		};

		if (!positions.some((p) => checkDuplicates(p, newPosition))) {
			positions.push(newPosition);
		}
	}

	return positions;
}

function getRandomNumber(size: number): number {
	return Math.floor(Math.random() * size);
}

function checkDuplicates(a: minePostion, b: minePostion): boolean {
	return a.x === b.x && a.y === b.y;
}
