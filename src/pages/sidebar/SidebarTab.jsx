// @ts-nocheck
import { useState } from "preact/hooks";
import { SidebarCategory } from "./SidebarCategory"
import { SidebarTag } from "./SidebarTag";
import { SidebarSetting } from "./SidebarSetting";

export function SidebarTab(props) {
    const [tab, setTab] = useState("radio-category");


    async function switchTab(event) {
        console.log(event.target.id)
        setTab(event.target.id)
    }

    return (<>
        <div class="main">
            <input type="radio" id="radio-category" onClick={switchTab} name="radiogroup" />
            <label for="radio-category">Category</label>

            <input type="radio" id="radio-tag" onClick={switchTab} name="radiogroup" />
            <label for="radio-tag">Tag</label>

            <input type="radio" id="radio-setting" onClick={switchTab} name="radiogroup" />
            <label for="radio-setting">Setting</label>
        </div>

        <div class="sidebar-content">
            {tab == "radio-category" && <SidebarCategory />}
            {tab == "radio-tag" && <SidebarTag />}
            {tab == "radio-setting" && <SidebarSetting setTitle={props.setTitle} />}
        </div>
    </>)
}