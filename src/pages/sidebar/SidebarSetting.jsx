// @ts-nocheck
import { exportData, importData } from '../../utils/backup'
import { changeState, wikiTitle, setWikiTitle } from '../../utils/globalState';

export function SidebarSetting() {
    async function update() {
        let title = document.getElementById('setting-input-title').value;
        setWikiTitle(title)

        // Icon更新
        let icon = document.getElementById('setting-input-icon').value;
        document.getElementsByTagName('link')[0].setAttribute("href", icon)
        changeState.value = true
    }

    function clickImport() {
        const file = document.getElementById('importFile').files[0];
        if (typeof file == 'undefined') {
            alert("没有选择文件...")
            return
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const contents = event.target.result;
            importData(contents);
            alert("Import Successfully!");
            changeState.value = true
        };

        reader.readAsText(file);
    }

    return (<div>
        <div>
            Title: <input id="setting-input-title" value={wikiTitle} />
        </div>
        <div>
            Icon: <input id="setting-input-icon" value={document.getElementsByTagName('link')[0].getAttribute('href')} />
        </div>
        <div>
            <button onClick={update}>Update</button>
        </div>
        <h3>Backup</h3>
        <div>
            <div>
                <button onClick={exportData}>导出</button>
            </div>
            <div>
                <button onClick={clickImport}>导入</button>
                <input type="file" id="importFile" accept=".json" ></input>
            </div>
        </div>
    </div>)
}