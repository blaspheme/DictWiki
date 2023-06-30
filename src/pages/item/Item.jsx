import { ItemEdit } from './ItemEdit';
import { ItemShow } from './ItemShow';
import { itemEditFlag, itemList } from '../../utils/globalState';

export function Item() {

	return (<>
		<span>Item Counter:{(typeof itemList != 'undefined' && itemList.value != null) ? Object.keys(itemList.value).length : 0}</span>
		{!itemEditFlag.value && <ItemShow />}
		{itemEditFlag.value && <ItemEdit />}
	</>)
}