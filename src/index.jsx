import { render } from 'preact';
import { Sidebar } from './pages/sidebar/Sidebar.jsx';
import { ListWord } from './pages/list/ListWord.jsx';
import { Item } from './pages/item/Item.jsx';
import { changeState } from './utils/globalState.jsx'
import './style.css';

window.addEventListener('beforeunload', function (e) {
	// @ts-ignore
	if (changeState.value == true) { // 如果未保存，显示提示消息
		e.preventDefault();
		e.returnValue = ''; // 兼容旧版浏览器
		return ''; // 现代浏览器
	}
});

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
