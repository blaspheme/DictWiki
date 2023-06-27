import { compressCategories, decompressCategories } from './compress'

async function exportData() {
    let resultCategoryList = decompressCategories()
    let jsonData = {
        "resultCategoryList": resultCategoryList,
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
    compressCategories(importJsonObject["resultCategoryList"]);
}

export { exportData, importData };