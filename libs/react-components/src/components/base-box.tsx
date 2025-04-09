import { BoxProps } from "../interfaces";
import { BoxImplManager } from "../utils/boxImplManager";

function BoxHeading(props: BoxProps) {
    return <h1>{props.children}</h1>
}
function BoxRoot(props: BoxProps) {
    return  <div>{props.children}</div>
}
function BoxParagraph(props: BoxProps) {
    return <p>{props.children}</p>
}
function BoxText(props: BoxProps) {
    return <span>{props.data?.value}</span>
}
function BoxStrong(props: BoxProps) {
    return <strong>{props.children}</strong>
}
function BoxEmphasis(props: BoxProps) {
    return <em>{props.children}</em>
}
function BoxList(props: BoxProps) {
    return <ul>{props.children}</ul>
}
function BoxListItem(props: BoxProps) {
    return <li>{props.children}</li>
}
function BoxCode(props: BoxProps) {
    return <pre>
        <code>{props.data?.value}</code>
    </pre>
}
function BoxLink(props: BoxProps) {
    return <a href={props.data?.url}>{props.children}</a>
}
function BoxThematicBreak(_props: BoxProps) {
    return <hr />
}
function BoxInlineCode(props: BoxProps) {
    return <code>{props.data?.value}</code>
}
function BoxBlockQuote(props: BoxProps) {
    return <blockquote>{props.children}</blockquote>
}
export function registerBaseBoxImpl() {
    BoxImplManager.getInstance().registerBoxImplByRecord({
        heading: BoxHeading,
        root: BoxRoot,
        paragraph: BoxParagraph,
        text: BoxText,
        strong: BoxStrong,
        emphasis: BoxEmphasis,
        list: BoxList,
        listItem: BoxListItem,
        code: BoxCode,
        link: BoxLink,
        thematicBreak: BoxThematicBreak,
        inlineCode: BoxInlineCode,
        blockquote: BoxBlockQuote
    })
}