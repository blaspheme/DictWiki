import { ItemEdit } from './ItemEdit';
import { ItemShow } from './ItemShow';
import { itemEditFlag, itemList, selectedWordHistory, getPreviousWord } from '../../utils/globalState';

export function Item() {

	return (<>
		<span>Item Counter:{(typeof itemList != 'undefined' && itemList.value != null) ? Object.keys(itemList.value).length : 0}</span>
		{typeof selectedWordHistory.value != null && <button onClick={getPreviousWord}>上一个单词</button>}

		{!itemEditFlag.value && <ItemShow />}
		{itemEditFlag.value && <ItemEdit />}
	</>)
}