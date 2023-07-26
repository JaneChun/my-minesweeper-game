import { styled } from 'styled-components';
import Board from './components/Board';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

function App() {
	return (
		<Container>
			<Board />
		</Container>
	);
}

export default App;
