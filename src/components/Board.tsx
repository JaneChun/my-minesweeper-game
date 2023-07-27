import { useEffect } from 'react';
import { styled } from 'styled-components';
import { useCheckWinCondition } from '../hooks/useCheckWinCondition';
import { useAppDispatch, useAppSelector } from '../store/config';
import { flagTile, revealAllMines, setBoard } from '../store/gameSlice';
import { Tile, createBoard } from '../utils/board';
import { revealTiles } from '../utils/tile';

function Board() {
	const dispatch = useAppDispatch();
	const { board, setting } = useAppSelector((state) => state.game);
	const { width: WIDTH, height: HEIGHT, mines: NUMBER_OF_MINES } = setting;
	const { winning } = useCheckWinCondition();

	// 초기 게임보드를 생성하고, store에 저장한다.
	useEffect(() => {
		const initialBoard = createBoard(WIDTH, HEIGHT, NUMBER_OF_MINES);
		dispatch(setBoard(initialBoard));
	}, [setting]);

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
		} else {
			// 지뢰가 아니라면, 타일을 드러낸다.
			revealTiles(clickedTile, board, dispatch, WIDTH, HEIGHT);
		}
	}

	// 게임 오버시, 모든 지뢰를 드러낸다.
	function gameOver(clickedTile: Tile) {
		dispatch(revealAllMines(clickedTile));
	}

	return (
		<>
			{winning && <SuccessMessage>SUCCESS!</SuccessMessage>}
			<Grid width={WIDTH} height={HEIGHT}>
				{board.map((row) =>
					row.map((tile) => (
						<TileButton onClick={() => onLeftClick(tile)} onContextMenu={(e) => onRightClick(e, tile)} key={`${tile.x}-${tile.y}`} tile={tile}>
							{tile.status === 'revealed' && tile.value !== 0 && tile.value}
							{tile.status === 'flagged' && tile.value !== '' && tile.value}
							{tile.status === 'bomb' && tile.value}
						</TileButton>
					))
				)}
			</Grid>
		</>
	);
}

export default Board;

interface GridProps {
	width: number;
	height: number;
}

interface TileProps {
	tile: Tile;
}

const Grid = styled.div<GridProps>`
	display: inline-grid;
	grid-template-rows: repeat(${(props) => props.height}, 20px);
	grid-template-columns: repeat(${(props) => props.width}, 20px);
	gap: 1px;
	background-color: #707070;

	border-top: 3px solid #707070;
	border-left: 3px solid #707070;

	border-right: 3px solid white;
	border-bottom: 3px solid white;
`;

const TileButton = styled.div<TileProps>`
	background-color: ${(props) => {
		const { status } = props.tile;
		if (status === 'bomb') return 'red';
		return '#bfbfbf';
	}};
	color: ${(props) => (props.tile.value === 1 ? '#0000FF' : props.tile.value === 2 ? '#008000' : props.tile.value === 3 ? '#FF0000' : '#000')};
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	cursor: pointer;
	border-top: 3px solid white;
	border-left: 3px solid white;
	border-right: 3px solid #707070;
	border-bottom: 3px solid #707070;
	border: ${(props) => {
		const { status } = props.tile;
		if (status === 'revealed' || status === 'bomb') return 'none';
	}};
`;

const SuccessMessage = styled.p`
	font-weight: bold;
	font-size: 20px;
`;
