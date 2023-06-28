// @ts-nocheck
import { useEffect, useState } from 'preact/hooks';
import { decompressItemType, decompressItemData, compressItemData } from '../../utils/compress';
import { deepCopy } from "../../utils/object";
import { itemEditFlag, selectedWord } from '../../utils/globalState';

export function ItemEdit() {
    const [isAdd, setIsAdd] = useState(false)
    const [itemTypeId, setItemTypeId] = useState(""); // 选择的类型ID
    const [itemTypeList, setItemTypeList] = useState([]) // Item Type的所有数据
    const [itemDataList, setItemDataList] = useState({}) // Item Data 的所有数据
    const [fieldList, setFieldList] = useState([])
    const [itemTitle, setItemTitle] = useState(""); // Item 的标题，唯一
    const [itemCategories, setItemCategories] = useState(""); // Item 的 Categories
    const [itemFieldObject, setItemFieldObject] = useState({})

    function setFieldListByTypeId(typdId) {
        for (const _ of itemTypeList) {
            if (typdId == _.itemTypeId) {
                setFieldList(_.fieldList)
                break
            }
        }
    }

    function changeType(event) {
        setFieldListByTypeId(event.target.value)
        setItemTypeId(event.target.value)
    }

    function save() {
        if (isAdd) {
            if (Object.keys(itemDataList).includes(itemTitle)) {
                alert("已经存在...")
                return
            }
            itemDataList[itemTitle] = {}
        }
        itemDataList[itemTitle]["Categories"] = itemCategories
        itemDataList[itemTitle]["ItemTypeId"] = itemTypeId
        itemDataList[itemTitle]["Fields"] = itemFieldObject
        console.log(itemDataList)
        compressItemData(itemDataList)
        itemEditFlag.value = false
    }

    useEffect(() => {
        // Type List 加载
        let _itemTypeList = decompressItemType()
        setItemTypeList(_itemTypeList);
        let _itemDataList = decompressItemData()
        setItemDataList(_itemDataList)
        setItemTitle(selectedWord.value)
        if (selectedWord.value.length > 0 && _itemDataList.hasOwnProperty(selectedWord.value)) { // 需要读取数据, update
            setItemCategories(_itemDataList[selectedWord.value]["Categories"])
            setItemTypeId(_itemDataList[selectedWord.value]["ItemTypeId"])
            for (const _ of _itemTypeList) {
                if (_itemDataList[selectedWord.value]["ItemTypeId"] == _.itemTypeId) {
                    setFieldList(_.fieldList)
                    break
                }
            }
            setItemFieldObject(_itemDataList[selectedWord.value]["Fields"])
            setIsAdd(false)
        } else {
            setIsAdd(true)
        }
    }, [])

    return (
        <div>
            <div>类型: <select title="fieldType" value={itemTypeId} onChangeCapture={changeType}>
                {itemTypeList.length > 0 && itemTypeList.map(item => <option value={item.itemTypeId}>{item.itemTypeName}</option>)}
            </select></div>

            <div>Title(必填): <input title="itemTitle" value={itemTitle} onChangeCapture={(e) => setItemTitle(e.target.value)}></input></div>
            <div>Categories: <input title="itemCategories" value={itemCategories} onChangeCapture={(e) => setItemCategories(e.target.value)}></input></div>

            <h3>自定义字段</h3>

            {fieldList.length > 0 && fieldList.map(field => <FieldRow itemTypeId={itemTypeId} field={field} itemFieldObject={itemFieldObject} setItemFieldObject={setItemFieldObject} />)}
            <div>
                <button onClick={save}>保存</button>
            </div>
        </div>
    );
}


function FieldRow(props) {
    const [value, setValue] = useState()

    function changeValue(event) {
        let newItemFieldObject = deepCopy(props.itemFieldObject)
        newItemFieldObject[event.target.title] = event.target.value
        props.setItemFieldObject(newItemFieldObject)
        setValue(event.target.value)
    }

    useEffect(() => {
        setValue(props.itemFieldObject[props.itemTypeId + "-" + props.field.fieldId])
    }, [value])

    return (<div>{props.field.fieldName}: <input title={props.itemTypeId + "-" + props.field.fieldId} value={value} onChangeCapture={changeValue}></input></div>)
}