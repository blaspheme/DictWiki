// @ts-nocheck
import { useEffect, useState } from "preact/hooks"
import { listKey, getCategoriesObject, getItemList } from "../../utils/globalState";
import { WordButton } from '../component/WordButton'

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
            <h5>{category.title}({itemKeyList.length})</h5>
            <span>{category.description}</span>
        </div>}

        <ul>
            {typeof itemKeyList != 'undefined' && itemKeyList.length > 0 &&
                itemKeyList.map(e => <li><WordButton word={e} />  </li>)
            }
        </ul>
    </div>)
}