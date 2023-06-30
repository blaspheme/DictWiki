import { signal } from "@preact/signals";
import { decompressCategories, decompressItemData, decompressItemType } from "./compress";

// Wiki 是否修改的标记
export const changeState = signal(false)

// Wiki Title: Wiki 标题
export const wikiTitle = signal(document.getElementsByTagName('title')[0].innerText);

/***
 * List 部分
 * listKey: key 名称
 * listType: 渲染类型; 取值 : Category
*/
export const listKey = signal(""); // 包含: 选择的Category
export const listType = signal("");

// 选择的词
export const selectedWord = signal("") // 选择的 Word
export const itemEditFlag = signal(false) // Item 页面是否编辑

// Item Type 相关全局变量
export const itemTypeList = signal(null)
export const itemTypeListMaxId = signal(-1)

// Category 相关全局变量
export const categoriesObject = signal(null)

// Item 相关全局变量
export const itemList = signal(null)

export const setWikiTitle = (title) => {
    document.getElementsByTagName('title')[0].innerText = title;
    wikiTitle.value = document.getElementsByTagName('title')[0].innerText
}

export const setSelectedListProperty = (listKeyValue, listTypeValue) => {
    listKey.value = listKeyValue
    listType.value = listTypeValue
}

export const setSelectedWord = (newSelectedWord) => {
    selectedWord.value = newSelectedWord;
    itemEditFlag.value = false
}

export const addNewWord = () => {
    selectedWord.value = "";
    itemEditFlag.value = true
}

export const getItemTypeList = () => {
    if (itemTypeList.value == null) {
        itemTypeList.value = decompressItemType()
    }
    return itemTypeList
}

export const getItemTypeListMaxId = () => {
    if (itemTypeList.value.length > 0) {
        // @ts-ignore
        let itemTypeIdList = itemTypeList.value.map(e => e.itemTypeId)
        itemTypeListMaxId.value = Math.max.apply(null, itemTypeIdList)
    }
    return itemTypeListMaxId
}

export const reloadItemTypeListFromHTML = () => {
    itemTypeList.value = null
    getItemTypeList()
}

export const getCategoriesObject = () => {
    if (categoriesObject.value == null || categoriesObject.value.length < 1) {
        categoriesObject.value = decompressCategories()
    }
    return categoriesObject
}

export const reloadCategoriesObject = () => {
    categoriesObject.value = null
    getCategoriesObject()
}

export const getItemList = () => {
    if (itemList.value == null || Object.keys(itemList.value).length == 0) {
        itemList.value = decompressItemData()
    }
    return itemList
}