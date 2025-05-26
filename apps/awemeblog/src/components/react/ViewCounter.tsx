import {useEffect, useState} from "react";
import {useAsyncEffect} from "@hanhan9449/react-hooks";

// TODO 工具函数通用化
export async function incCount(key: string): Promise<number> {
    const res = await fetch('https://inc-count.w.hanhan9449.top',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key
        })
    })
    const json = await res.json()
    return json.data || 0
}

export function ReactViewCounter() {
    const [count, setCount] = useState(0)

    useAsyncEffect(async () => {
        const key = window.location.pathname
        const res = await incCount(key)
        setCount(res)
    }, [])
    return <div>当前页面已经被访问{count}次</div>
}