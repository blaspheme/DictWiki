// @ts-nocheck
import { SidebarTab } from './SidebarTab';
import { saveData } from '../../utils/save';
import { changeState, wikiTitle, addNewWord, setSelectedListProperty } from '../../utils/globalState';

export function Sidebar() {
    function queryValue(event) {
        let value = document.getElementById('query-input').value
        if (value.length == 0) {
            return
        }
        setSelectedListProperty(value, "Query")
    }

    function add() {
        addNewWord()
    }

    return (
        <>
            <div class="sidebar">
                <h3>{wikiTitle}</h3>
                <small>({document.getElementById('version').innerText})</small>
            </div>
            <div>
                <div class="display: flex;">
                    <input id="query-input" class="flex-grow: 1;"></input>
                    <button onClick={queryValue}>Query</button>
                </div>
                <button id="add" onClick={add}>Add Item</button>
                <button id="save" class={changeState.value ? "sidebar-no-save" : "sidebar-saved"} onClick={saveData}>Save</button>
            </div>

            <SidebarTab />
        </>
    );
}
