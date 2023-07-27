import React, { useState } from 'react';
import { useAppDispatch } from '../store/config';
import { styled } from 'styled-components';
import { changeLevel } from '../store/gameSlice';

export interface Setting {
	width: number;
	height: number;
	mines: number;
}

function Nav() {
	const dispatch = useAppDispatch();
	const [width, setWidth] = useState<number>(50);
	const [height, setHeight] = useState<number>(50);
	const [mines, setMines] = useState<number>(10);

	const levelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		let level = (e.target as HTMLButtonElement).value as string;
		let setting: Setting = { width: 8, height: 8, mines: 10 };

		switch (level) {
			case 'beginner':
				setting = { width: 8, height: 8, mines: 10 };
				break;
			case 'intermediate':
				setting = { width: 16, height: 16, mines: 40 };
				break;
			case 'expert':
				setting = { width: 32, height: 16, mines: 100 };
				break;
			case 'custom':
				setting = { width, height, mines };
				break;
		}

		dispatch(changeLevel(setting));
	};

	const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWidth(parseInt(e.target.value));
	};

	const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHeight(parseInt(e.target.value));
	};

	const handleMinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMines(parseInt(e.target.value));
	};

	return (
		<>
			<button onClick={(e) => levelHandler(e)} value='beginner'>
				Beginner
			</button>
			<button onClick={(e) => levelHandler(e)} value='intermediate'>
				Intermediate
			</button>
			<button onClick={(e) => levelHandler(e)} value='expert'>
				Expert
			</button>
			<button onClick={(e) => levelHandler(e)} value='custom'>
				Custom
			</button>
			<InputContainer>
				<Input value={width} onChange={handleWidthChange} type='text' placeholder='가로' />
				<Input value={height} onChange={handleHeightChange} type='text' placeholder='세로' />
				<Input value={mines} onChange={handleMinesChange} type='text' placeholder='지뢰 개수' />
			</InputContainer>
		</>
	);
}

export default Nav;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input``;
