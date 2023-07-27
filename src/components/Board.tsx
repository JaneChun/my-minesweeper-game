import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/config';
import { flagTile, revealAllMines, revealTile, setBoard } from '../store/gameSlice';
import { Tile, createBoard } from '../utils/board';
import { getSurroundingTiles } from '../utils/tile';

const WIDTH = 8;
const HEIGHT = 8;
const NUMBER_OF_MINES = 10;

interface TileProps {
	tile: Tile;
}

function Board() {
	const dispatch = useAppDispatch();
	const board = useAppSelector((state) => state.game.board);
	const [winning, setWinning] = useState<boolean>(false);

	// 초기 게임보드를 생성하고, store에 저장한다.
	useEffect(() => {
		const initialBoard = createBoard(WIDTH, HEIGHT, NUMBER_OF_MINES);
		dispatch(setBoard(initialBoard));
	}, []);

	// board가 업데이트될 때마다 우승 조건을 체크한다.
	useEffect(() => {
		checkWinCondition();
	}, [board]);

	// 오른쪽 마우스 클릭 핸들러
	function onRightClick(e: React.MouseEvent<HTMLDivElement>, clickedTile: Tile) {
		e.preventDefault();
		// 클릭한 타일이 이미 드러나있거나('revealed'), 깃발로 표시된 경우('flagged')에는 리턴한다.
		if (clickedTile.status !== 'hidden' && clickedTile.status !== 'flagged') return;

		dispatch(flagTile(clickedTile));
	}

	// 왼쪽 마우스 클릭 이벤트 핸들러
	function onLeftClick(clickedTile: Tile) {
		if (clickedTile.status !== 'hidden') return; // 클릭한 타일의 상태가 'hidden'일 때만 로직을 수행한다.

		// 지뢰 찾은 경우 게임을 종료한다.
		if (clickedTile.mine) {
			gameOver(clickedTile);
			return;
		}

		// 지뢰가 아닌 경우,
		// 클릭한 타일을 스택에 넣는다.
		const stack: Tile[] = [clickedTile];
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

	// 게임 오버시, 모든 지뢰를 드러낸다.
	function gameOver(clickedTile: Tile) {
		dispatch(revealAllMines(clickedTile));
	}

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

	return (
		<>
			{winning && <h1>성공!</h1>}
			<Grid>
				{board.map((row) =>
					row.map((tile) => (
						<TileItem onClick={() => onLeftClick(tile)} onContextMenu={(e) => onRightClick(e, tile)} key={`${tile.x}-${tile.y}`} tile={tile}>
							{tile.status === 'revealed' && tile.value !== 0 && tile.value}
							{tile.status === 'flagged' && tile.value !== '' && tile.value}
							{tile.status === 'bomb' && tile.value}
						</TileItem>
					))
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
	background-color: ${(props) => {
		const { status } = props.tile;
		if (status === 'hidden') return 'gray';
		if (status === 'flagged') return 'yellow';
		if (status === 'revealed') return 'white';
		if (status === 'bomb') return 'red';
	}};
	border: 1px solid ${(props) => (props.tile.mine ? 'red' : 'gray')};
`;
