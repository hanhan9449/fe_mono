import remarkParse from "remark-parse";
import { unified } from "unified";

export async function convertMarkdownToMdAst(markdown: string): Promise<any> {
    // 解析 Markdown 为 AST
    const ast = await unified()
    .use(remarkParse)
    .parse(markdown)
    return ast
}