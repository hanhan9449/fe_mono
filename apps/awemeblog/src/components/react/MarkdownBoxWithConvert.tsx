import { convertMarkdownToMdAst } from "@hanhan9449/common-utils";
import { MarkdownBox } from "@hanhan9449/react-components";
import {useAsyncEffect} from '@hanhan9449/react-hooks'
import { useEffect, useState } from "react";

export function MarkdownBoxWithConvert(props: {data: string}) {
    const [ast, setAst] = useState(null)
    useAsyncEffect(async () => {
        const ast1 =await  convertMarkdownToMdAst(props.data)
        setAst(ast1)
    }, [])
    return <MarkdownBox data={ast} />
}

