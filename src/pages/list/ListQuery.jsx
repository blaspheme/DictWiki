import { useEffect, useState } from "preact/hooks";
import { getItemList, listKey, listType } from "../../utils/globalState";
import { ListWordByKey } from "./ListWordByKey";

export function ListQuery() {
    const [itemKeyList, setItemKeyList] = useState([])

    useEffect(() => {
        let tmp = new Set()
        for (const [key, _] of Object.entries(getItemList().value)) {
            if (key.includes(listKey.value)) {
                tmp.add(key)
            }
        }
        setItemKeyList(Array.from(tmp))
    }, [listKey.value])

    return (<div>
        <div>{listType.value} : {listKey.value}({itemKeyList.length})</div>
        <ListWordByKey itemKeyList={itemKeyList} />
    </div>)
}