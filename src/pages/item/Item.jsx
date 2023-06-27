import { useEffect, useState } from 'preact/hooks';
import { ItemEdit } from './ItemEdit';
import PubSub from 'pubsub-js';
import { PUBSUB_KEY } from '../../constant/PUBSUB';
import { ItemShow } from './ItemShow';

export function Item() {
	const [isEdit, setIsEdit] = useState(false); // 编辑页面
	const [itemTitle, setItemTitle] = useState("");

	useEffect(() => {
		PubSub.subscribe(PUBSUB_KEY.ITEM_ADD, (msg, data) => { // 新增
			if (PUBSUB_KEY.ITEM_ADD == msg) {
				setItemTitle("")
				setIsEdit(true)
			}
		});

		PubSub.subscribe(PUBSUB_KEY.ITEM_QUERY, (msg, data) => { // 查询
			if (PUBSUB_KEY.ITEM_QUERY == msg) {
				setItemTitle(data)
				setIsEdit(false)
			}
		});

		return () => {
			PubSub.unsubscribe(PUBSUB_KEY.ITEM_ADD); // 组件卸载时候取消订阅
			PubSub.unsubscribe(PUBSUB_KEY.ITEM_QUERY);
		}
	}, [])

	return (<>
		{!isEdit && <ItemShow setIsEdit={setIsEdit} itemTitle={itemTitle} />}
		{isEdit && <ItemEdit setIsEdit={setIsEdit} itemTitle={itemTitle} />}
	</>)
}