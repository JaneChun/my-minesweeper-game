import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch } from '../store/config';
import { changeLevel } from '../store/gameSlice';

export interface Setting {
	width: number;
	height: number;
	mines: number;
}

type Level = 'beginner' | 'intermediate' | 'expert' | 'custom';

function Nav() {
	const dispatch = useAppDispatch();
	const [level, setLevel] = useState<Level>('beginner');
	const [width, setWidth] = useState<number>(50);
	const [height, setHeight] = useState<number>(50);
	const [mines, setMines] = useState<number>(10);
	const [isCustom, setIsCustom] = useState<boolean>(false);

	useEffect(() => {
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
			default:
				setting = { width: 8, height: 8, mines: 10 };
		}

		dispatch(changeLevel(setting));
	}, [level]);

	const levelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		let value = (e.target as HTMLButtonElement).value as Level;
		if (value === 'custom') {
			setIsCustom(true);
			setLevel('custom');
		} else {
			setIsCustom(false);
			setLevel(value);
		}
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
		<Container>
			<ButtonsContainer>
				<Button onClick={(e) => levelHandler(e)} value='beginner' selected={level === 'beginner'}>
					Beginner
				</Button>
				<Button onClick={(e) => levelHandler(e)} value='intermediate' selected={level === 'intermediate'}>
					Intermediate
				</Button>
				<Button onClick={(e) => levelHandler(e)} value='expert' selected={level === 'expert'}>
					Expert
				</Button>
				<Button onClick={(e) => levelHandler(e)} value='custom' selected={level === 'custom'}>
					Custom
				</Button>
			</ButtonsContainer>
			{isCustom && (
				<CustomDiv>
					<InputContainer>
						<Label>WIDTH : </Label>
						<Input value={width} onChange={handleWidthChange} type='number' />
					</InputContainer>
					<InputContainer>
						<Label>HEIGHT : </Label>
						<Input value={height} onChange={handleHeightChange} type='number' />
					</InputContainer>
					<InputContainer>
						<Label>NUMBER_OF_MINES : </Label>
						<Input value={mines} onChange={handleMinesChange} type='number' />
					</InputContainer>
					<Button onClick={() => dispatch(changeLevel({ width, height, mines }))}>go</Button>
				</CustomDiv>
			)}
		</Container>
	);
}

export default Nav;

interface ButtonProps {
	selected?: boolean;
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ButtonsContainer = styled.div`
	display: flex;
	margin-bottom: 10px;
`;

const Button = styled.button<ButtonProps>`
	padding: 5px 10px;
	background: ${(props) => (props.selected ? 'darkblue' : 'transparent')};
	color: ${(props) => (props.selected ? 'white' : 'black')};
	border-style: solid;
	border-width: 4px;
	border-left-color: white;
	border-top-color: white;
	border-bottom-color: dimgrey;
	border-right-color: dimgrey;

	&:hover {
		background-color: darkblue;
		color: white;
		cursor: pointer;
	}
`;

const CustomDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
	margin-bottom: 10px;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	font-size: 14px;
`;

const Label = styled.label`
	margin-right: 10px;
`;

const Input = styled.input`
	padding: 3px;
	border: solid 1px black;
	border-style: inset;
	border: 1px solid #ccc;
`;
