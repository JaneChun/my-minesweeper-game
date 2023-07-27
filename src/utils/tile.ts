import { Tile } from './board';

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
