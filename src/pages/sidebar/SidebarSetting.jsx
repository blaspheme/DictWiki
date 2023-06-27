// @ts-nocheck
import PubSub from 'pubsub-js';
import { useEffect } from 'preact/hooks';
import { PUBSUB_KEY } from '../../constant/PUBSUB';
import { exportData, importData } from '../../utils/backup'

export function SidebarSetting(props) {
    async function update() {
        let title = document.getElementById('setting-input-title').value;
        document.getElementsByTagName('title')[0].innerText = title;
        PubSub.publish(PUBSUB_KEY.TITLE, title);
        // Icon更新
        let icon = document.getElementById('setting-input-icon').value;
        document.getElementsByTagName('link')[0].setAttribute("href", icon)
    }

    useEffect(() => {
        // 导入按钮事件
        const fileInput = document.getElementById('fileInput');
        const importButton = document.getElementById('import');

        importButton.addEventListener('click', function () {
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                const contents = event.target.result;
                importData(contents);
                alert("Import Successfully!");
            };

            reader.readAsText(file);
        });

    }, [])

    return (<div>
        <div>
            Title: <input id="setting-input-title" value={document.getElementsByTagName('title')[0].innerText} />
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
                <button id="export" onClick={exportData}>导出</button>
            </div>
            <div>
                <button id="import">导入</button>
                <input type="file" id="fileInput" accept=".json" ></input>
            </div>
        </div>
    </div>)
}