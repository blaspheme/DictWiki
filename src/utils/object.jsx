function deepCopy(originObject) {
    // 使用 JSON 序列化和反序列化实现深拷贝
    return JSON.parse(JSON.stringify(originObject));
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getUniqueUUID(uuidSet) {
    let _uuid = generateUUID()
    while (uuidSet.has(_uuid)) {
        _uuid = getUniqueUUID(uuidSet)
    }
    return _uuid;
}

export { deepCopy, getUniqueUUID };