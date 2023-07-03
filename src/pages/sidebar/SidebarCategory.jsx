// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import { compressCategories } from "../../utils/compress";
import { deepCopy } from "../../utils/object";
import { changeState, setSelectedListProperty, getCategoriesObject, getItemList, reloadCategoriesObject } from '../../utils/globalState';
import { compressItemData } from '../../utils/compress'

export function SidebarCategory() {
    const [isEdit, setIsEdit] = useState(false); // 编辑页面

    return (<>
        {!isEdit && <SidebarCategoryShow setIsEdit={setIsEdit} />}
        {isEdit && <SidebarCategoryEdit setIsEdit={setIsEdit} />}
    </>)
}

/**
 * 显示界面
 * @param {*} props 
 * @returns 
 */
function SidebarCategoryShow(props) {
    const [categoriesTree, setCategoriesTree] = useState([]);

    function getChild(categoryKey, childSet, dataObject) {
        let _tmpChildObject = { "category": categoryKey }
        let _child = []
        for (const child of childSet) {
            _child.push(getChild(child, dataObject[child].child, dataObject))
        }
        _tmpChildObject["child"] = _child
        return _tmpChildObject
    }


    /**
     * 将 list 转换为 tree
     * @param {*} allCategoriesList 
     */
    function convertCategoriesTree(allCategoriesList) {
        let firstList = {} // 将parent转换为child
        let secondList = [] // 将 firstList 转换为Tree
        for (const category of allCategoriesList) {
            // title 字段处理
            if (!firstList.hasOwnProperty(category.title)) {
                firstList[category.title] = {}
                firstList[category.title]["isRoot"] = true
                firstList[category.title]["child"] = new Set()
            }
            // parent 字段处理
            if (category.parent.length > 0) {
                let parentList = category.parent.split(",")
                for (const parentItem of parentList) {
                    if (!firstList.hasOwnProperty(parentItem)) {
                        firstList[parentItem] = {}
                        firstList[parentItem]["isRoot"] = true
                        firstList[parentItem]["child"] = new Set()
                    }
                    firstList[parentItem]["child"].add(category.title)
                }
                firstList[category.title]["isRoot"] = false
            }
        }
        // 递归转换为Tree结构
        for (const [categoryKey, categoryValue] of Object.entries(firstList)) {
            if (!categoryValue.isRoot) {
                continue
            }
            let _root = getChild(categoryKey, categoryValue.child, firstList)
            secondList.push(_root)
        }
        return secondList
    }

    useEffect(() => {
        let _tree = convertCategoriesTree(getCategoriesObject().value)
        setCategoriesTree(_tree)
    }, [])

    return (<div>
        <button class="full-width" onClick={() => { props.setIsEdit(true) }}>编辑</button>
        {categoriesTree.length > 0 && <SidebarCategoryShowRow item={categoriesTree} />}
    </div>)
}


function SidebarCategoryShowRow(props) {
    return (<ul>
        {props.item.map(element => <SidebarCategoryShowRowLi liItem={element} />)}
    </ul>)
}

function SidebarCategoryShowRowLi(props) {

    function clickToggle(event) {
        const parentLi = event.target.parentElement;
        const nestedUl = parentLi.querySelector('ul');

        nestedUl.classList.toggle('active');
        event.target.innerText = nestedUl.classList.contains('active') ? '〰' : '✦';
    }



    return (
        <li>
            {props.liItem.child.length > 0 && <button class="toggle" onClick={clickToggle}>✦</button>}
            <SidebarCategoryShowRowLiTitle title={props.liItem.category} />
            {props.liItem.child.length > 0 && <SidebarCategoryShowRow item={props.liItem.child} />}
        </li>
    )
}

function SidebarCategoryShowRowLiTitle(props) {
    const [title, setTitle] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    function clickCategory(event) {
        setSelectedListProperty(event.target.innerText, "Category")
    }

    function changeName(event) {
        let oldValue = title
        let newValue = event.target.previousElementSibling.value

        // 修改 Category
        let _categoriesObject = getCategoriesObject().value
        for (const _ of _categoriesObject) {
            if (_.title == oldValue) {
                _.title = newValue
                break
            }
        }
        compressCategories(_categoriesObject)

        // 修改相关 Item
        let _itemList = getItemList().value
        for (const [key, _] of Object.entries(_itemList)) {
            if (!_.Categories.includes(oldValue)) {
                continue
            }
            let _categoriesList = _.Categories.split(',')
            _categoriesList = _categoriesList.filter((item) => item != oldValue)
            _categoriesList.push(newValue)
            _itemList[key]["Categories"] = _categoriesList.join(',')
        }
        compressItemData(_itemList)
        setTitle(newValue)
        setIsEdit(false)
        changeState.value = true
    }

    useEffect(() => {
        setTitle(props.title)
    }, [props.title])

    return (<span>
        {!isEdit && <span><span onClick={clickCategory}>{title}</span> <button onClick={() => setIsEdit(true)}>⚯</button></span>}
        {isEdit && <span><input value={title}></input><button onClick={changeName}>√</button></span>}
    </span>)
}


/**
 * Category 编辑部分
 * @param {*} props 
 * @returns 
 */
function SidebarCategoryEdit(props) {
    /**
     * categoriesList 真实数据结构
     * [{ uuid:"" ,title: "", description: "", parent: "" },]
     */
    const [categoriesList, setCategoriesList] = useState([]);

    function save() {
        compressCategories(categoriesList)
        reloadCategoriesObject()
        props.setIsEdit(false)
        changeState.value = true
    }

    function addNewRow() {
        setCategoriesList([...categoriesList, { title: "", description: "", parent: "" }])
    }

    useEffect(() => {
        setCategoriesList(getCategoriesObject().value)
    }, [])

    return (<div>
        <button class="full-width" onClick={save}>保存</button>
        {categoriesList.map((item, index) => (<SidebarCategoryEditRow item={item} index={index} categoriesList={categoriesList} setCategoriesList={setCategoriesList} />))}
        <button class="full-width" onClick={addNewRow}>增加新行</button>
    </div>)
}

function SidebarCategoryEditRow(props) {
    function changeValue(event) {
        let newCategoriesList = deepCopy(props.categoriesList)
        newCategoriesList[props.index][event.target.title] = event.target.value
        props.setCategoriesList(newCategoriesList)
    }

    return (<div class="div-inline">
        Title: <input title="title" value={props.item.title} onChangeCapture={changeValue} />
        Description: <input title="description" value={props.item.description} onChangeCapture={changeValue} />
        Parent: <input title="parent" value={props.item.parent} onChangeCapture={changeValue} />
    </div>)
}