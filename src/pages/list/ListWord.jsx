import { useEffect, useState } from "preact/hooks"
import PubSub from 'pubsub-js';
import { PUBSUB_KEY } from '../../constant/PUBSUB';
import { ListCategory } from "./ListCategory";

export function ListWord() {
    const [listType, setListType] = useState("");
    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        PubSub.subscribe(PUBSUB_KEY.LIST_CATEGORY, (msg, data) => {
            if (PUBSUB_KEY.LIST_CATEGORY == msg) {
                setKeyword(data.text)
                setListType(data.type)
            }
        });

        return () => {
            PubSub.unsubscribe(PUBSUB_KEY.LIST_CATEGORY); // 组件卸载时候取消订阅
        }
    }, [])

    return (<div>
        <h5>List(可以包含自定义查询)</h5>

        {listType == "Category" && <ListCategory keyword={keyword} />}
    </div>)
}