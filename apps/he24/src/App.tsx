import { useState} from 'react'
import './App.css'
import {Solution} from '@hanhan9449/he24_algorithm'
import {Button, Input} from "antd-mobile";

function App() {
    const [data, setData] = useState<any>({})
    const [result, setResult] = useState<string[]>([])

    function handleOkButton() {
        const solution = new Solution()
        solution.real_solution(24,[Number(data[0]),Number(data[1]),Number(data[2]),Number(data[3])])
        if (solution.result_list2?.length) {

            setResult(Array.from(new Set(solution.result_list2.map(it => solution.map_str_v2(it)))))
        } else {
            setResult(['no solution'])
        }
    }
  return (
    <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            {new Array(4).fill(0).map((_, i) => (<div style={{display: "flex"}}>
                <div>{i+ 1}:</div>
                <Input
                    placeholder='请输入内容'
                    type={'number'}
                    value={data[i]}
                    clearable
                    onChange={val => {
                        setData((p: any) => ({...p, [i]: val}))
                    }}
                />
            </div>))}
            <Button onClick={handleOkButton}>计算</Button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' } }>
                {result.slice(0,5).map((it) => (
                    <div style={{fontSize: '2em'}}>{it}</div>
                ))}
            </div>

        </div>
    </>
  )
}

export default App
