import { compressCategories, decompressCategories, decompressItemType, compressItemType, decompressItemData, compressItemData } from './compress'

async function exportData() {
    let resultCategoryList = decompressCategories()
    let resultItemTypeList = decompressItemType()
    let resultItemDataList = decompressItemData()


    let jsonData = {
        "resultCategoryList": resultCategoryList,
        "resultItemTypeList": resultItemTypeList,
        "resultItemDataList": resultItemDataList
    }

    console.log(jsonData)

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
}

export { exportData, importData };