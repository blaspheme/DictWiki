import { setSelectedWord } from "./globalState";

export function clickWord(event) {
    setSelectedWord(event.target.innerText)
}