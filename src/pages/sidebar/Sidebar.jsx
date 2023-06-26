// @ts-nocheck
import { SidebarTab } from './SidebarTab';
import { changeSaveState, downloadHTML } from '../../utils/save';
import { useEffect, useState } from 'preact/hooks';

export function Sidebar() {
    const [title, setTitle] = useState(""); // Wiki Title

    function save() {
        // 下载页面
        downloadHTML()
        // 保存成功
        changeSaveState("sidebar-saved")
    }

    function add() {

    }

    useEffect(() => {
        setTitle(document.getElementsByTagName('title')[0].innerText)
    }, [title])

    return (
        <>
            <div class="sidebar">
                <button id="add" onClick={add}>➕</button>
                <button id="save" class="sidebar-saved" onClick={save}>保存</button>
                <h1 class="sidebar-title">{title}</h1>
            </div>

            <SidebarTab setTitle={setTitle} />
        </>
    );
}
