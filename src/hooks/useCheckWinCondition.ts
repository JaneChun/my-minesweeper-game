import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/config';

// board가 업데이트될 때마다 우승 조건을 체크한다.
export const useCheckWinCondition = () => {
	const board = useAppSelector((state) => state.game.board);
	const { mines: NUMBER_OF_MINES } = useAppSelector((state) => state.game.level);
	const [winning, setWinning] = useState<boolean>(false);

	useEffect(() => {
		checkWinCondition();
	}, [board]);

	// 깃발 표시된 총 타일의 수 = 깃발 표시된 지뢰의 수 = 게임에서 지정한 지뢰의 수가 일치할 때 게임에서 우승한다.
	function checkWinCondition() {
		let flaggedTilesCount = 0;
		let flaggedMinesCount = 0;

		board.forEach((row) =>
			row.forEach((tile) => {
				if (tile.status === 'flagged') {
					flaggedTilesCount++;
				}
				if (tile.mine && tile.status === 'flagged') {
					flaggedMinesCount++;
				}
			})
		);
		if (flaggedTilesCount === NUMBER_OF_MINES && flaggedMinesCount === NUMBER_OF_MINES) {
			setWinning(true);
		}
	}

	return { winning };
};
