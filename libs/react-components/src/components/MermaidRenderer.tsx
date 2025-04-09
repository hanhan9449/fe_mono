import {useId, useState} from "react";
import mermaid from 'mermaid'
import {useAsyncEffect} from '@hanhan9449/react-hooks'

interface MermaidRendererProps {
    data: string
}
export function MermaidRenderer(props: MermaidRendererProps) {
    const id = useId().replaceAll(':', '')
    const [svg1, setSvg] = useState<string>(null!)
    useAsyncEffect(async () => {
        const {svg} =await mermaid.render(id, props.data)
        setSvg(svg)
    }, [props.data]);
    return <div dangerouslySetInnerHTML={{__html: svg1}}/>
}