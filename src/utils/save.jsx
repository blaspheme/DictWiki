import { changeState } from "./globalState";

function getFileNameByURL() {
    let fileName = window.location.pathname.split("/").pop();
    if (fileName == '') {
        fileName = `index.html`
    }
    return fileName;
}

/**
 * 保存按钮的功能
 * 下载HTML & WebDav保存
 */
function saveData() {
    if (window.location.protocol.includes('file')) {
        downloadHTML() // 下载页面
    } else {
        saveByWebDAV()
    }
}

/**
 * 通过WebDAV保存
 */
function saveByWebDAV() {
    // 保存的URL名称
    let pathURL = window.location.origin + window.location.pathname;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", pathURL, true);
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert("保存成功！");
                changeState.value = false
            } else {
                alert("保存失败：" + xhr.status);
            }
        }
    };
    xhr.send(document.documentElement.outerHTML);
}


function downloadHTML() {
    let htmlContent = document.documentElement.outerHTML;
    let link = document.createElement("a");
    link.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    let fileName = getFileNameByURL()
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    changeState.value = false
}

export { saveData };