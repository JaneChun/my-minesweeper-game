import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Tile } from '../utils/board';
import gameSlice from './gameSlice';
import { Setting } from '../components/Nav';

export const store = configureStore({
	reducer: {
		game: gameSlice,
	},
});

export interface RootState {
	level: Setting;
	board: Tile[][];
}

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
