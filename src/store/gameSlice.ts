import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tile } from '../utils/board';
import { RootState } from './config';

const initialState: RootState = {
	board: [],
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		// 게임 초기에 생성한 보드를 state에 저장한다.
		setBoard: (state, action: PayloadAction<Tile[][]>) => {
			state.board = action.payload;
		},

		// 타일에 깃발을 표시하거나 해제한다.
		flagTile: (state, action: PayloadAction<Tile>) => {
			const { x, y } = action.payload;
			const { board } = state;

			if (board[x][y].status === 'hidden') {
				board[x][y].status = 'flagged';
				board[x][y].value = '🚩';
			} else if (board[x][y].status === 'flagged') {
				board[x][y].status = 'hidden';
				board[x][y].value = '';
			}
		},

		// 타일을 드러내고, 주위의 지뢰 개수를 표시한다.
		revealTile: (state, action: PayloadAction<{ tile: Tile; minesCount: number }>) => {
			const { tile, minesCount } = action.payload;
			const { x, y } = tile;
			const { board } = state;

			board[x][y].status = 'revealed';
			board[x][y].value = minesCount;
		},

		// 모든 지뢰를 드러낸다.
		revealAllMines: (state, action: PayloadAction<Tile>) => {
			const { x, y } = action.payload;
			state.board.map((row) =>
				row.map((tile) => {
					if (tile.mine) {
						tile.status = 'revealed';
						tile.value = '💣';
					}
					if (tile.x === x && tile.y === y) {
						tile.status = 'bomb'; // 유저가 클릭해서 터진 지뢰
					}
				})
			);
		},
	},
});

export const { setBoard, flagTile, revealTile, revealAllMines } = gameSlice.actions;

export default gameSlice.reducer;
