// @ts-nocheck
import { SidebarTab } from './SidebarTab';
import { saveData } from '../../utils/save';
import { wikiTitle, addNewWord } from '../../utils/globalState';

export function Sidebar() {
    function add() {
        addNewWord()
    }

    return (
        <>
            <div class="sidebar">
                <button id="add" onClick={add}>➕</button>
                <button id="save" class="sidebar-saved" onClick={saveData}>保存</button>
                <h3 class="sidebar-title">{wikiTitle}</h3>
            </div>
            <span>{document.getElementById('version').innerText}</span>

            <SidebarTab />
        </>
    );
}
