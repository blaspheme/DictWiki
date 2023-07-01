import { WordButton } from "../component/WordButton";

export function ListWordByKey(props) {
    return (<ul class="vertical-ul">
        {typeof props.itemKeyList != 'undefined' && props.itemKeyList.length > 0 &&
            props.itemKeyList.map(e => <li><WordButton word={e} />  </li>)
        }
    </ul>)
}