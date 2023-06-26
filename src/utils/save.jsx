function getFileNameByURL() {
    let fileName = window.location.pathname.split("/").pop();
    if (fileName == '') {
        fileName = `index.html`
    }
    return fileName;
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


function changeSaveState(className) {
    document.getElementById("save").setAttribute("class", className);
}

export { downloadHTML, changeSaveState };