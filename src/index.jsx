import { render } from 'preact';
import { Sidebar } from './pages/sidebar/Sidebar.jsx';
import './style.css';
import { ListWord } from './pages/list/ListWord.jsx';

export function App() {
	return (
		<>
			<div class="container">
				<div class="container-content">content</div>
				<div class="container-list-item"><ListWord /></div>
				<div class="container-sidebar"><Sidebar /></div>
			</div>
		</>
	);
}

render(<App />, document.getElementById('app'));
