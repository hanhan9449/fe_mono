import {BoxProps} from "../interfaces";
import {BoxImplManager} from "../utils/boxImplManager.ts";
import {MermaidRenderer} from "./MermaidRenderer.tsx";

function BoxCodeMermaid(props: BoxProps) {
    return  <MermaidRenderer data={props.data.value}/>
}
export function registerExtraBoxImpl() {
    BoxImplManager.getInstance().registerExtraBoxImpl('code', BoxCodeMermaid, (data: { type: string; lang: string; }) => data.type === 'code' && data.lang === 'mermaid')
}