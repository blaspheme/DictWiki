import { ItemEdit } from './ItemEdit';
import { ItemShow } from './ItemShow';
import { itemEditFlag } from '../../utils/globalState';

export function Item() {

	return (<>
		{!itemEditFlag.value && <ItemShow />}
		{itemEditFlag.value && <ItemEdit />}
	</>)
}