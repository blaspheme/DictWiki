export function SidebarSetting(props) {
    async function update() {
        // @ts-ignore
        let title = document.getElementById('input-title').value;
        document.getElementsByTagName('title')[0].innerText = title;
        props.setTitle(title)
    }

    return (<div>
        Title: <input id="input-title" value={document.getElementsByTagName('title')[0].innerText} />
        <div>
            <button onClick={update}>Update</button>
        </div>
    </div>)
}