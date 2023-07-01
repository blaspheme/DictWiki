import { Item } from "./pages/item/Item";
import { ListWord } from "./pages/list/ListWord";

export function Main() {
    return (<div class="main-container">
        <div class="container-column container-list-item full-width"><ListWord /></div>
        <div class="container-column"><Item /></div>
    </div>)
}