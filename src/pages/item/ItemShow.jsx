// @ts-nocheck
import { useEffect, useState } from "preact/hooks"
import { decompressItemType, decompressItemData } from '../../utils/compress';
import PubSub from 'pubsub-js';
import { PUBSUB_KEY } from '../../constant/PUBSUB';

export function ItemShow(props) {
    const [itemData, setItemData] = useState()
    const [itemTypeFieldList, setItemTypeFieldList] = useState([]) // Item Type Field 的所有数据

    useEffect(() => {
        let _itemTypeList = decompressItemType()
        let _itemDataList = decompressItemData()

        if (_itemDataList.hasOwnProperty(props.itemTitle)) {
            setItemData(_itemDataList[props.itemTitle])

            for (const _ of _itemTypeList) {
                if (_.itemTypeId == _itemDataList[props.itemTitle].ItemTypeId) {
                    setItemTypeFieldList(_.fieldList);
                    break
                }
            }
        }


    }, [props.itemTitle])

    return (<>
        <div>
            <h3>{props.itemTitle}</h3>
            <button class="right" onClick={() => props.setIsEdit(true)}>编辑</button>
        </div>
        <div>
            Categories: {typeof itemData != 'undefined' && itemData.hasOwnProperty("Categories")
            && itemData.Categories.length > 0 && itemData.Categories.split(',').map(e => <ItemCategory category={e} />)}
        </div>

        {typeof itemTypeFieldList != 'undefined' && itemTypeFieldList.map(field => <ItemRow field={field} typeId={itemData.ItemTypeId} fieldData={itemData.Fields} />)}
    </>)
}

function ItemCategory(props) {
    function clickCategory(event) {
        PubSub.publish(PUBSUB_KEY.LIST_CATEGORY, { type: "Category", text: event.target.innerText });
    }

    return (<button onClick={clickCategory}>{props.category}</button>)
}

function ItemRow(props) {
    return (<div>
        {props.field.fieldName}: <SwitchRender field={props.field} fieldData={props.fieldData} fieldId={props.typeId + "-" + props.field.fieldId} />
    </div>)
}

function SwitchRender(props) {
    return (<>
        {props.field.fieldType == 'string' && <span>{props.fieldData[props.fieldId]}</span>}
        {props.field.fieldType == 'list' && <SwitchRenderList data={props.fieldData[props.fieldId]} />}

    </>)
}

function SwitchRenderList(props) {
    function clickWord(event) {
        PubSub.publish(PUBSUB_KEY.ITEM_QUERY, event.target.innerText);
    }

    return (<>
        <span>{typeof props.data != "undefined" && props.data.length > 0 && props.data.split(',').map(e => <button onClick={clickWord}>{e}</button>)}</span>
    </>)
}