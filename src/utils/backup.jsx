import { compressCategories, decompressCategories, decompressItemType, compressItemType, decompressItemData, compressItemData } from './compress'
import { wikiTitle } from './globalState'

async function exportData() {
    let resultCategoryList = decompressCategories()
    let resultItemTypeList = decompressItemType()
    let resultItemDataList = decompressItemData()
    let settingObject = {
        "title": wikiTitle.value,
        "icon": document.getElementsByTagName('link')[0].getAttribute('href')
    }

    let jsonData = {
        "resultCategoryList": resultCategoryList,
        "resultItemTypeList": resultItemTypeList,
        "resultItemDataList": resultItemDataList,
        "setting": settingObject
    }

    let link = document.createElement("a");
    link.setAttribute('href', 'data:text/json;charset=utf-8,' + JSON.stringify(jsonData));
    let fileName = "export.json"
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importData(importJson) {
    let importJsonObject = JSON.parse(importJson)
    if (importJsonObject.hasOwnProperty("resultCategoryList")) {
        compressCategories(importJsonObject["resultCategoryList"]);
    }
    if (importJsonObject.hasOwnProperty("resultItemTypeList")) {
        compressItemType(importJsonObject["resultItemTypeList"]);
    }
    if (importJsonObject.hasOwnProperty("resultItemDataList")) {
        compressItemData(importJsonObject["resultItemDataList"]);
    }
    if (importJsonObject.hasOwnProperty("setting")) {
        let settingObject = importJsonObject["setting"]
        wikiTitle.value = settingObject['title']
        document.getElementsByTagName('link')[0].setAttribute("href", settingObject['icon'])
    }
}

export { exportData, importData };