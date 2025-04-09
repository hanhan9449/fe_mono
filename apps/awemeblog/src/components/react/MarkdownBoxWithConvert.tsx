import { convertMarkdownToMdAst } from "@hanhan9449/common-utils";
import { MarkdownBox } from "@hanhan9449/react-components";
import {useAsyncEffect} from '@hanhan9449/react-hooks'
import {useEffect, useId, useRef, useState} from "react";
import {Input} from '@fluentui/react-components'
import {useStateWithLocalStorage} from "@hanhan9449/react-hooks";

export function MarkdownBoxWithConvert(props: {data: string}) {
    const [ast, setAst] = useState(null)
    const [url, setUrl] = useStateWithLocalStorage<string | null>(null, 'MarkdownBoxWithConvert@url')
    const [isBegin, setIsBegin] = useState(false)
    const [loop, setLoop] = useStateWithLocalStorage(false, 'MarkdownBoxWithConvert@loop')
    const id = useId()
    const [loopUpdater, setLoopUpdater] = useState(0)
    useAsyncEffect(async () => {
        if (!url) {
            return
        }
        if (isBegin) {
            const resp = await fetch(url)
            if (!resp.ok) {
                console.error('bad url', url, resp)
                return
            }
            const text = await resp.text()
            console.log('text==', text)

        const ast1 =await  convertMarkdownToMdAst(text)
            setAst(ast1)
        }

    }, [url, isBegin, loopUpdater])
    const intervalIdRef = useRef<any>(null)
    useEffect(() => {

        if (loop) {
            intervalIdRef.current = setInterval(() => {
                setLoopUpdater(p => p + 1)
            }, 1000)

        } else {
            clearInterval(intervalIdRef.current)
        }
    }, [loop]);
    return <div>
        <div>
            <div>isBegin status: {String(isBegin)}</div>
        </div>
        <label htmlFor={id}>远程地址：</label>

        <input id={id} style={{width: 'fit-content'}} value={url!} onChange={(e) => setUrl(e.target.value)} />
        <div>
            <label>loop</label>
            <input checked={loop} onChange={() => setLoop(p => !p)} type={'checkbox'}/>
        </div>
        <div>
            <button onClick={() => setIsBegin(true)}>开始</button>
            <button onClick={() => setIsBegin(false)}>结束</button>
        </div>
        <hr/>
        <MarkdownBox data={ast} />
    </div>
}

