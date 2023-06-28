export function decompressCategories() {
    let resultList = []
    let compressedString = document.getElementById("DictWiki-Category").innerText;
    if (compressedString != '') {
        resultList = JSON.parse(compressedString)
    }
    return resultList
}

export function compressCategories(resultList) {
    let compressedString = "";
    if (resultList.length > 0) {
        compressedString = JSON.stringify(resultList)
    }
    document.getElementById("DictWiki-Category").innerText = compressedString
}


export function decompressItemType() {
    let resultList = []
    let compressedString = document.getElementById("DictWiki-ItemType").innerText;
    if (compressedString != '') {
        resultList = JSON.parse(compressedString)
    }
    return resultList
}

export function compressItemType(resultList) {
    let compressedString = "";
    if (resultList.length > 0) {
        compressedString = JSON.stringify(resultList)
    }
    document.getElementById("DictWiki-ItemType").innerText = compressedString
}

export function decompressItemData() {
    let resultObject = {}
    let compressedString = document.getElementById("DictWiki-Data").innerText;
    if (compressedString != '') {
        resultObject = JSON.parse(compressedString)
    }
    return resultObject
}

export function compressItemData(resultObject) {
    document.getElementById("DictWiki-Data").innerText = JSON.stringify(resultObject)
}
