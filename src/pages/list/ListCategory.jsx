// @ts-nocheck
import { useEffect, useState } from "preact/hooks"
import { listKey, getCategoriesObject, getItemList, listType } from "../../utils/globalState";
import {ListWordByKey} from './ListWordByKey'

export function ListCategory() {
    const [category, setCategory] = useState() // category的属性
    const [itemKeyList, setItemKeyList] = useState([])

    useEffect(() => {
        for (const _ of getCategoriesObject().value) {
            if (_.title == listKey.value) {
                setCategory(_)
                break
            }
        }
        // 查询值
        let tmp = []
        for (const [key, _] of Object.entries(getItemList().value)) {
            let _categoriesList = _.Categories.split(',')
            if (_categoriesList.includes(listKey.value)) {
                tmp.push(key)
            }
        }
        setItemKeyList(tmp)
    }, [listKey.value])



    return (<div>
        {typeof category != 'undefined' && <div>
            <span>{typeof listType.value != 'undefined' && listType.value} : </span>
            <span>{category.title}({itemKeyList.length})</span>
            <div>{category.description}</div>
        </div>}

        <ListWordByKey itemKeyList={itemKeyList} />
    </div>)
}