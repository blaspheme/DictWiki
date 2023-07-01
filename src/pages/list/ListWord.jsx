import { ListCategory } from "./ListCategory";
import { listType } from "../../utils/globalState";
import { ListQuery } from "./ListQuery";

export function ListWord() {

    return (<div>
        {listType.value == "Category" && <ListCategory />}
        {listType.value == "Query" && <ListQuery />}
    </div>)
}