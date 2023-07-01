// @ts-nocheck
import { useEffect, useState } from "preact/hooks"
import { itemEditFlag, selectedWord, setSelectedListProperty, getItemTypeList, getItemList } from '../../utils/globalState';
import { WordButton } from '../component/WordButton'
import { WikiComponent } from '../component/WikiComponent'

export function ItemShow() {
    const [itemData, setItemData] = useState()
    const [itemTypeFieldList, setItemTypeFieldList] = useState([]) // Item Type Field 的所有数据

    useEffect(() => {
        let _itemDataList = getItemList().value

        if (_itemDataList.hasOwnProperty(selectedWord.value)) {
            setItemData(_itemDataList[selectedWord.value])

            for (const _ of getItemTypeList().value) {
                if (_.itemTypeId == _itemDataList[selectedWord.value].ItemTypeId) {
                    setItemTypeFieldList(_.fieldList);
                    break
                }
            }
        }
    }, [selectedWord.value])

    return (<>
        {selectedWord.value.length > 0 &&
            <div>
                <h3>{selectedWord.value}</h3>
                <button class="right" onClick={() => itemEditFlag.value = true}>编辑</button>
            </div>
        }
        <div>
            {selectedWord.value.length > 0 && <>Categories:</>}
            {typeof itemData != 'undefined' && itemData.hasOwnProperty("Categories")
                && itemData.Categories.length > 0 && itemData.Categories.split(',').map(e => <ItemCategory category={e.trim()} />)}
        </div>

        {typeof itemTypeFieldList != 'undefined' && itemTypeFieldList.map(field => <ItemRow field={field} typeId={itemData.ItemTypeId} fieldData={itemData.Fields} />)}
    </>)
}

function ItemCategory(props) {
    function clickCategory(event) {
        setSelectedListProperty(event.target.innerText, "Category")
    }

    return (<button onClick={clickCategory}>{props.category}</button>)
}

function ItemRow(props) {
    return (<div>
        <label>{props.field.fieldName}:</label><SwitchRender field={props.field} fieldData={props.fieldData} fieldId={props.typeId + "-" + props.field.fieldId} />
    </div>)
}

function SwitchRender(props) {
    return (<>
        {props.field.fieldType == 'string' && <WikiComponent content={props.fieldData[props.fieldId]} />}
        {props.field.fieldType == 'list' && <SwitchRenderList data={props.fieldData[props.fieldId]} />}

    </>)
}

function SwitchRenderList(props) {
    return (<>
        <span>{typeof props.data != "undefined" && props.data.length > 0 && props.data.split(',').map(e => <WordButton word={e.trim()} />)}</span>
    </>)
}