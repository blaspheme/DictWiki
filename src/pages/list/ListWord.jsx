import { ListCategory } from "./ListCategory";
import { listType } from "../../utils/globalState";

export function ListWord() {

    return (<div>
        <span>List(可以包含自定义查询)</span>
        {listType.value == "Category" && <ListCategory />}
    </div>)
}