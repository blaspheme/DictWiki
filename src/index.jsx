import { render } from 'preact';
import { Sidebar } from './pages/sidebar/Sidebar.jsx';
import { ListWord } from './pages/list/ListWord.jsx';
import { Item } from './pages/item/Item.jsx';
import './style.css';

export function App() {
	return (
		<>
			<div class="container">
				<div class="container-content"><Item /></div>
				<div class="container-list-item"><ListWord /></div>
				<div class="container-sidebar"><Sidebar /></div>
			</div>
		</>
	);
}

render(<App />, document.getElementById('app'));
