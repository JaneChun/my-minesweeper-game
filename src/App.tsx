import { styled } from 'styled-components';
import Board from './components/Board';
import Nav from './components/Nav';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

function App() {
	return (
		<Container>
			<Nav />
			<Board />
		</Container>
	);
}

export default App;
