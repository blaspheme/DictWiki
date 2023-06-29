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
    downloadHTML() // 下载页面
    changeState.value = false
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
}

export { saveData };