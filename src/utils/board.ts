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

// 보드의 가로, 세로 길이, 지뢰 개수를 인자로 받아, 보드판을 생성하고 지뢰를 심어 보드판을 반환한다.
export function createBoard(width: number, height: number, numberOfMines: number) {
	const board: Tile[][] = getInitialBoard(width, height); // 빈 보드판
	const minePositions: minePostion[] = getMinePositions(width, height, numberOfMines); // 지뢰 좌표 배열

	// 보드판에 지뢰를 심어서 반환한다.
	for (const { x, y } of minePositions) {
		board[x][y].mine = true;
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

// 지뢰를 심을 좌표 배열을 생성해 반환하는 함수
export function getMinePositions(width: number, height: number, numberOfMines: number): minePostion[] {
	const positions: minePostion[] = [];

	while (positions.length < numberOfMines) {
		const newPosition = {
			x: getRandomNumber(width),
			y: getRandomNumber(height),
		};

		// 생성한 좌표가 배열에 이미 존재하는 좌표와 중복되지 않는지 체크한다.
		if (!positions.some((p) => checkDuplicates(p, newPosition))) {
			positions.push(newPosition);
		}
	}

	return positions;
}

function getRandomNumber(size: number): number {
	return Math.floor(Math.random() * size);
}

// 두 좌표가 일치하는지 확인하여 true, false를 반환한다.
function checkDuplicates(a: minePostion, b: minePostion): boolean {
	return a.x === b.x && a.y === b.y;
}
