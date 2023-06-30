import { useEffect, useState } from "preact/hooks"
import { WordButton } from './WordButton'

export function WikiComponent(props) {
    const [result, setResult] = useState([])

    useEffect(() => {
        if (typeof props.content == 'undefined') { // 没有数据
            return
        }

        let wikiList = props.content.match(/\[{2}[^\]]+\]{2}/g)
        if (wikiList == null) { // 没有匹配结果
            // @ts-ignore
            setResult([{ "type": "plain", "value": props.content }])
            return
        }

        let _tmpContent = props.content
        let _result = []
        for (const _ of wikiList) {
            let _tmpList = _tmpContent.split(_)
            _result = _result.concat([{ "type": "plain", "value": _tmpList[0] }, { "type": "wiki", "value": _ }])
            _tmpContent = _tmpList[1]
        }
        if (_tmpContent.length > 0) {
            _result = _result.concat([{ "type": "plain", "value": _tmpContent }])
        }
        setResult(_result)
    }, [props.content])

    return (<>{result.length > 0 && result.map(e => <SwitchRender type={e.type} value={e.value} />)}</>)
}

function SwitchRender(props) {
    return (<>
        {props.type == 'plain' && <Plain value={props.value} />}
        {props.type == 'wiki' && <Wiki value={props.value} />}
    </>)
}


function Plain(props) {
    return (<span>{props.value}</span>)
}

function Wiki(props) {
    const [displayName, setDisplayName] = useState("")
    const [queryName, setQueryName] = useState("")

    useEffect(() => {
        let reList = /\[{2}([^\]]+)\]{2}/.exec(props.value)
        let result = reList[1].split("|")
        setDisplayName(result[0])
        if (result.length > 1) {
            setQueryName(result[1])
        } else {
            setQueryName(result[0])
        }
    }, [props.value])

    return (<WordButton value={queryName} word={displayName} />)
}