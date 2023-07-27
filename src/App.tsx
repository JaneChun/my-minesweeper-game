import { styled } from 'styled-components';
import Board from './components/Board';
import Nav from './components/Nav';

function App() {
	return (
		<Background>
			<Container>
				<Nav />
				<Title>Minesweeper 💣</Title>
				<Board />
			</Container>
		</Background>
	);
}
const Title = styled.h1``;

const Background = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: black;
`;

const Container = styled.div`
	background-color: #c0c0c0;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 320px;
`;

export default App;
