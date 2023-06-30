// @ts-nocheck
import { useEffect, useState } from 'preact/hooks';
import { compressItemData } from '../../utils/compress';
import { deepCopy } from "../../utils/object";
import { listKey, listType, changeState, selectedWord, getItemTypeList, getItemList, setSelectedWord } from '../../utils/globalState';

export function ItemEdit() {
    const [isAdd, setIsAdd] = useState(false)
    const [itemTypeId, setItemTypeId] = useState(""); // 选择的类型ID
    const [fieldList, setFieldList] = useState([])
    const [itemTitle, setItemTitle] = useState(""); // Item 的标题，唯一
    const [itemCategories, setItemCategories] = useState(""); // Item 的 Categories
    const [itemFieldObject, setItemFieldObject] = useState({})

    function setFieldListByTypeId(typdId) {
        for (const _ of getItemTypeList().value) {
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
            if (Object.keys(getItemList().value).includes(itemTitle)) {
                alert("已经存在...")
                return
            }
            selectedWord.value = itemTitle
            getItemList().value[itemTitle] = {}
        }
        getItemList().value[itemTitle]["Categories"] = itemCategories
        getItemList().value[itemTitle]["ItemTypeId"] = itemTypeId
        getItemList().value[itemTitle]["Fields"] = itemFieldObject
        compressItemData(getItemList().value)
        setSelectedWord(itemTitle)
        changeState.value = true
    }

    useEffect(() => {
        // Type List 加载
        let _itemDataList = getItemList().value
        setItemTitle(selectedWord.value)
        if (selectedWord.value.length > 0 && _itemDataList.hasOwnProperty(selectedWord.value)) { // 需要读取数据, update
            setItemCategories(_itemDataList[selectedWord.value]["Categories"])
            setItemTypeId(_itemDataList[selectedWord.value]["ItemTypeId"])
            for (const _ of getItemTypeList().value) {
                if (_itemDataList[selectedWord.value]["ItemTypeId"] == _.itemTypeId) {
                    setFieldList(_.fieldList)
                    break
                }
            }
            setItemFieldObject(_itemDataList[selectedWord.value]["Fields"])
            setIsAdd(false)
            // 修改 不可以修改 Title
            document.getElementById('itemTitle').readOnly = true
        } else { // 新增
            if (listType.value == 'Category') { // Category 赋值默认值
                setItemCategories(listKey.value)
            }
            setIsAdd(true)
        }
    }, [])

    return (
        <div>
            <div>类型: <select title="fieldType" value={itemTypeId} onChangeCapture={changeType}>
                {getItemTypeList().value.length > 0 && getItemTypeList().value.map(item => <option value={item.itemTypeId}>{item.itemTypeName}</option>)}
            </select></div>

            <div>Title(必填): <input id="itemTitle" title="itemTitle" value={itemTitle} onChangeCapture={(e) => setItemTitle(e.target.value)}></input></div>
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

    return (<div>{props.field.fieldName}: <textarea title={props.itemTypeId + "-" + props.field.fieldId} class="item-textarea" value={value} onChangeCapture={changeValue}></textarea></div>)
}