import { signal } from "@preact/signals";

// Wiki Title: Wiki 标题
export const wikiTitle = signal(document.getElementsByTagName('title')[0].innerText);

/***
 * List 部分
 * listKey: key 名称
 * listType: 渲染类型; 取值 : Category
*/
export const listKey = signal("");
export const listType = signal("");

// 选择的词
export const selectedWord = signal("")
export const itemEditFlag = signal(false) // Item 页面是否编辑

export const setWikiTitle = (title) => {
    document.getElementsByTagName('title')[0].innerText = title;
    wikiTitle.value = document.getElementsByTagName('title')[0].innerText
}

export const setSelectedListProperty = (listKeyValue, listTypeValue) => {
    console.log(listKeyValue, listTypeValue)
    listKey.value = listKeyValue
    listType.value = listTypeValue
}

export const setSelectedWord = (newSelectedWord) => {
    selectedWord.value = newSelectedWord;
    itemEditFlag.value = false
}

export const addNewWord = ()=>{
    selectedWord.value = "";
    itemEditFlag.value = true
}