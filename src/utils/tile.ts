import { Dispatch } from '@reduxjs/toolkit';
import { HEIGHT, WIDTH } from '../components/Board';
import { revealTile } from '../store/gameSlice';
import { Tile } from './board';

// 타일을 클릭했을 때 해당 타일과 주위 타일을 드러내는 함수 (1개 혹은 여러 개)
export function revealTiles(clickedTile: Tile, board: Tile[][], dispatch: Dispatch) {
	const stack: Tile[] = [clickedTile]; // 클릭한 타일을 스택에 넣는다.
	const revealedTiles: Tile[] = []; // 이미 처리한 타일을 저장할 배열 (같은 타일을 중복으로 push하는 것 방지)

	while (stack.length > 0) {
		const tile = stack.pop()!;
		const { x, y } = tile;
		const minesCount = getSurroundingTiles(board, tile).filter((tile) => tile.mine).length; // 주위 지뢰 개수

		// 이미 처리한 타일인지 확인하고, 아니라면
		if (!revealedTiles.includes(tile)) {
			revealedTiles.push(tile); // 처리한 타일 배열에 추가한다.

			// 타일의 상태가 'hidden'이라면 'revealed' 처리한다.
			if (tile.status !== 'revealed') {
				dispatch(revealTile({ tile, minesCount }));
			}

			if (minesCount !== 0) continue; // 지뢰가 0개가 아니라면 다음 타일로 넘어간다.

			// 주위에 지뢰가 0개라면 주위 8개 타일을 스택에 추가한다.
			if (x > 0) {
				const upperTile: Tile = board[x - 1][y];
				if (upperTile.status !== 'revealed') {
					stack.push(upperTile);
				}
			}

			if (x < WIDTH - 1) {
				const lowerTile: Tile = board[x + 1][y];
				if (lowerTile.status !== 'revealed') {
					stack.push(lowerTile);
				}
			}

			if (y > 0) {
				const leftTile: Tile = board[x][y - 1];
				if (leftTile.status !== 'revealed') {
					stack.push(leftTile);
				}
			}

			if (y < HEIGHT - 1) {
				const rightTile: Tile = board[x][y + 1];
				if (rightTile.status !== 'revealed') {
					stack.push(rightTile);
				}
			}

			if (x > 0 && y > 0) {
				const upperLeftTile: Tile = board[x - 1][y - 1];
				if (upperLeftTile.status !== 'revealed') {
					stack.push(upperLeftTile);
				}
			}

			if (x > 0 && y < HEIGHT - 1) {
				const upperRightTile: Tile = board[x - 1][y + 1];
				if (upperRightTile.status !== 'revealed') {
					stack.push(upperRightTile);
				}
			}

			if (x < WIDTH - 1 && y > 0) {
				const lowerLeftTile: Tile = board[x + 1][y - 1];
				if (lowerLeftTile.status !== 'revealed') {
					stack.push(lowerLeftTile);
				}
			}

			if (x < WIDTH - 1 && y < HEIGHT - 1) {
				const lowerRightTile: Tile = board[x + 1][y + 1];
				if (lowerRightTile.status !== 'revealed') {
					stack.push(lowerRightTile);
				}
			}
		}
	}
}

// 주위 타일 8개를 배열에 담아 반환하는 함수
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
