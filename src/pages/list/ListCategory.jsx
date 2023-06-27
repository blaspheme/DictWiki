// @ts-nocheck
import { useEffect, useState } from "preact/hooks"
import { decompressCategories, decompressItemData } from "../../utils/compress";
import PubSub from 'pubsub-js';
import { PUBSUB_KEY } from '../../constant/PUBSUB';

export function ListCategory(props) {
    const [category, setCategory] = useState() // category的属性
    const [itemKeyList, setItemKeyList] = useState([])

    useEffect(() => {
        let _categoriesList = decompressCategories()
        for (const _ of _categoriesList) {
            if (_.title == props.keyword) {
                setCategory(_)
                break
            }
        }
        // 查询值
        let _itemData = decompressItemData()
        let tmp = []
        for (const [key, _] of Object.entries(_itemData)) {
            let _categoriesList = _.Categories.split(',')
            if (_categoriesList.includes(props.keyword)) {
                tmp.push(key)
            }
        }
        setItemKeyList(tmp)
    }, [props.keyword])

    function queryItem(event) {
        PubSub.publish(PUBSUB_KEY.ITEM_QUERY, event.target.innerText);
    }

    return (<div>
        {typeof category != 'undefined' && <div>
            <h5>{category.title}</h5>
            <span>{category.description}</span>
        </div>}

        <ul>
            {typeof itemKeyList != 'undefined' && itemKeyList.length > 0 &&
                itemKeyList.map(e => <li><button onClick={queryItem}>{e}</button></li>)
            }
        </ul>
    </div>)
}