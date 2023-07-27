import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './config';
import { Tile } from '../utils/board';
import { getSurroundingTiles } from '../utils/tile';

const initialState: RootState = {
	board: [],
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setBoard: (state, action: PayloadAction<Tile[][]>) => {
			state.board = action.payload;
		},

		flagTile: (state, action: PayloadAction<Tile>) => {
			const { x, y } = action.payload;
			const { board } = state;

			if (board[x][y].status === 'hidden') {
				board[x][y].status = 'flagged';
			} else if (board[x][y].status === 'flagged') {
				board[x][y].status = 'hidden';
			}
		},

		revealTile: (state, action: PayloadAction<{ tile: Tile; minesCount: number }>) => {
			const { tile, minesCount } = action.payload;
			const { x, y } = tile;
			const { board } = state;

			board[x][y].status = 'revealed';
			board[x][y].number = minesCount;
		},

		gameOver: () => {},
	},
});

export const { setBoard, flagTile, revealTile } = gameSlice.actions;

export default gameSlice.reducer;
