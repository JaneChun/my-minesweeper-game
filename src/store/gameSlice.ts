import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './config';
import { Tile } from '../utils/board';

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

		revealTile: () => {},

		gameOver: () => {},
	},
});

export const { setBoard, flagTile } = gameSlice.actions;

export default gameSlice.reducer;
