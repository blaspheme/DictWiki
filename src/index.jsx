import { render } from 'preact';
import { Sidebar } from './pages/sidebar/Sidebar.jsx';
import { changeState } from './utils/globalState.jsx'
import { Main } from './Main.jsx';
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
				<div class="container-column container-content"><Main /></div>
				<div class="container-column container-sidebar"><Sidebar /></div>
			</div>
		</>
	);
}

render(<App />, document.getElementById('app'));
