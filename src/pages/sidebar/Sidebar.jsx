// @ts-nocheck
import { SidebarTab } from './SidebarTab';
import { saveData } from '../../utils/save';
import { useEffect, useState } from 'preact/hooks';
import PubSub from 'pubsub-js';
import { PUBSUB_KEY } from '../../constant/PUBSUB';


export function Sidebar() {
    const [title, setTitle] = useState(""); // Wiki Title

    function add() {

    }

    useEffect(() => {
        setTitle(document.getElementsByTagName('title')[0].innerText);
        PubSub.subscribe(PUBSUB_KEY.TITLE, (msg, data) => {
            if (PUBSUB_KEY.TITLE == msg) {
                setTitle(data)
            }
        });
        
        return () => {
            PubSub.unsubscribe(PUBSUB_KEY.TITLE); // 组件卸载时候取消订阅
        }
    }, [title])

    return (
        <>
            <div class="sidebar">
                <button id="add" onClick={add}>➕</button>
                <button id="save" class="sidebar-saved" onClick={saveData}>保存</button>
                <h3 class="sidebar-title">{title}</h3>
            </div>
            <span>{document.getElementById('version').innerText}</span>

            <SidebarTab />
        </>
    );
}
