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
			board[x][y].value = minesCount;
		},

		revealAllMines: (state, action: PayloadAction<Tile>) => {
			const { x, y } = action.payload;
			state.board.map((row) =>
				row.map((tile) => {
					if (tile.mine) {
						tile.status = 'revealed';
						tile.value = 'X';
					}
					if (tile.x === x && tile.y === y) {
						tile.status = 'bomb';
					}
				})
			);
		},
	},
});

export const { setBoard, flagTile, revealTile, revealAllMines } = gameSlice.actions;

export default gameSlice.reducer;
