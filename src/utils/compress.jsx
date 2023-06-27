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


export { compressCategories, decompressCategories };