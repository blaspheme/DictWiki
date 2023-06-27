function decompressCategories() {
    let resultList = []
    let compressedString = document.getElementById("DictWiki-Category").innerText;
    if (compressedString != '') {
        resultList = JSON.parse(compressedString)
    }
    return resultList
}

function compressCategories(resultList) {
    let compressedString = "";
    if (resultList.length > 0) {
        compressedString = JSON.stringify(resultList)
    }
    document.getElementById("DictWiki-Category").innerText = compressedString
}


function decompressItemType() {
    let resultList = []
    let compressedString = document.getElementById("DictWiki-ItemType").innerText;
    if (compressedString != '') {
        resultList = JSON.parse(compressedString)
    }
    return resultList
}

function compressItemType(resultList) {
    let compressedString = "";
    if (resultList.length > 0) {
        compressedString = JSON.stringify(resultList)
    }
    document.getElementById("DictWiki-ItemType").innerText = compressedString
}

function decompressItemData() {
    let resultObject = {}
    let compressedString = document.getElementById("DictWiki-Data").innerText;
    if (compressedString != '') {
        resultObject = JSON.parse(compressedString)
    }
    return resultObject
}

function compressItemData(resultObject) {
    document.getElementById("DictWiki-Data").innerText = JSON.stringify(resultObject)
}


export { compressCategories, decompressCategories, decompressItemType, compressItemType, decompressItemData, compressItemData };