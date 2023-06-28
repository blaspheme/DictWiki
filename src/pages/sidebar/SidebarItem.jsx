import { useEffect, useState } from "preact/hooks";
import { compressItemType } from "../../utils/compress";
import { deepCopy } from "../../utils/object";
import { getItemTypeListMaxId, getItemTypeList, reloadItemTypeListFromHTML } from "../../utils/globalState";

export function SidebarItem() {
    const [isEdit, setIsEdit] = useState(false); // 编辑页面
    const [itemTypeId, setItemTypeId] = useState(-1) // Item Type Id

    return (<>
        {!isEdit && <SidebarItemShow setIsEdit={setIsEdit} setItemTypeId={setItemTypeId} />}
        {isEdit && <SidebarItemEdit setIsEdit={setIsEdit} itemTypeId={itemTypeId} />}
    </>)
}

function SidebarItemShow(props) {

    function addNewType() {
        props.setItemTypeId(-1)
        props.setIsEdit(true)
    }

    function edit(event) {
        props.setItemTypeId(event.target.value)
        props.setIsEdit(true)
    }

    return (<>
        {getItemTypeList().value.map(item => <div><span>{item.itemTypeName}</span>
            <button value={item.itemTypeId} onClick={edit}>Edit</button></div>)}
        <button onClick={addNewType}>Add New Type</button>
    </>)
}

function SidebarItemEdit(props) {
    const [itemTypeName, setItemTypeName] = useState(""); // 编辑页面
    const [itemTypeFields, setItemTypeFields] = useState([]); // 编辑页面


    function save() {
        // itemTypeId赋值
        let itemTypeId = props.itemTypeId > 0 ? props.itemTypeId : -1

        // 保存字段Id
        let fieldIdList = itemTypeFields.map(e => e.fieldId);
        let maxFieldId = Math.max.apply(null, fieldIdList);

        let fieldList = []
        for (const fieldItem of itemTypeFields) {
            if (fieldItem.fieldId > -1) {
                fieldList.push(fieldItem)
            } else {
                maxFieldId = maxFieldId + 1
                fieldList.push({ "fieldId": maxFieldId, "fieldName": fieldItem.fieldName, "fieldType": fieldItem.fieldType, "fieldOrder": parseInt(fieldItem.fieldOrder) })
            }
        }

        // 保存 & 更新list
        if (props.itemTypeId > -1) { // 更新
            let tmp = []
            for (const _ of getItemTypeList().value) {
                if (_.itemTypeId == props.itemTypeId) {
                    tmp.push({ "itemTypeId": itemTypeId, "itemTypeName": itemTypeName, "fieldList": fieldList })
                } else {
                    tmp.push(_)
                }
            }
            compressItemType(tmp)
        } else { // 新建
            compressItemType([...getItemTypeList().value, { "itemTypeId": getItemTypeListMaxId().value + 1 + "", "itemTypeName": itemTypeName, "fieldList": fieldList }])
        }
        reloadItemTypeListFromHTML()
        // 显示
        props.setIsEdit(false)
    }

    function addNewColumn() {
        setItemTypeFields([...itemTypeFields, { "fieldId": -1, "fieldName": "", "fieldType": "string", "fieldOrder": 0, }])
    }

    function changeTypeName(event) {
        setItemTypeName(event.target.value)
    }

    useEffect(() => {
        if (props.itemTypeId > -1) {
            for (const _ of getItemTypeList().value) {
                if (_.itemTypeId == props.itemTypeId) {
                    setItemTypeName(_.itemTypeName)
                    setItemTypeFields(_.fieldList)
                    break
                }
            }
        }


    }, [])

    return (<>
        <div>
            Type Name: <input title="itemTypeName" value={itemTypeName} onChangeCapture={changeTypeName} />
        </div>

        <h4>Fields</h4>
        {itemTypeFields.map((item, index) => <ItemRow item={item} index={index} itemTypeFields={itemTypeFields} setItemTypeFields={setItemTypeFields} />)}
        <button onClick={addNewColumn}>Add New Column</button>
        <button onClick={save}>Save</button>
    </>)
}

function ItemRow(props) {

    function changeValue(event) {
        let newItemTypeFields = deepCopy(props.itemTypeFields)
        newItemTypeFields[props.index][event.target.title] = event.target.value
        props.setItemTypeFields(newItemTypeFields)
    }

    return (<div class="div-inline">
        Id: <span>{props.item.fieldId}</span>
        Name: <input title="fieldName" value={props.item.fieldName} onChangeCapture={changeValue}></input>
        Type:<select title="fieldType" value={props.item.fieldType} onChangeCapture={changeValue}>
            <option value="string">string</option>
            <option value="html">html</option>
            <option value="list">list</option>
        </select>
        Order: <input title="fieldOrder" value={props.item.fieldOrder} onChangeCapture={changeValue}></input>
    </div>)
}