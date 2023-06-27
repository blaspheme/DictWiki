import * as LZString from 'lz-string'

function decompressData(compressedString) {
    let originString = LZString.decompress(compressedString);
    return originString
}

function compressData(originString) {
    let compressedString = LZString.compress(originString);
    return compressedString;
}

function decompressCategories() {
    let resultList = []
    let compressedString = document.getElementById("DictWiki-Category").innerText;
    if (compressedString != '') {
        let originString = decompressData(compressedString)
        resultList = JSON.parse(originString)
    }
    return resultList
}

function compressCategories(resultList) {
    let compressedString = "";
    if (resultList.length > 0) {
        compressedString = compressData(JSON.stringify(resultList))
    }
    document.getElementById("DictWiki-Category").innerText = compressedString
}


export { compressCategories, decompressCategories };