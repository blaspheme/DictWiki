// @ts-nocheck
import { useState } from "preact/hooks";
import { SidebarCategory } from "./SidebarCategory"
import { SidebarItem } from "./SidebarItem";
import { SidebarSetting } from "./SidebarSetting";

export function SidebarTab() {
    const [tab, setTab] = useState("radio-category");


    async function switchTab(event) {
        setTab(event.target.id)
    }

    return (<>
        <div class="main">

            <input type="radio" id="radio-category" onClick={switchTab} name="radiogroup" />
            <label for="radio-category">Category</label>

            <input type="radio" id="radio-item" onClick={switchTab} name="radiogroup" />
            <label for="radio-item">Item</label>

            <input type="radio" id="radio-setting" onClick={switchTab} name="radiogroup" />
            <label for="radio-setting">Setting</label>
        </div>

        <div class="sidebar-content">
            {tab == "radio-category" && <SidebarCategory />}
            {tab == "radio-item" && <SidebarItem />}
            {tab == "radio-setting" && <SidebarSetting />}
        </div>
    </>)
}