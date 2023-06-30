import { setSelectedWord } from "../../utils/globalState"

export function WordButton(props) {
    function queryItem(event) {
        setSelectedWord(event.target.value)
    }
    return (<button onClick={queryItem} value={typeof props.value == 'undefined' ? props.word : props.value}>
        {props.word}
    </button>)
}