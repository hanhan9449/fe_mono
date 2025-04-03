import { BoxProps } from "../interfaces";
import { BoxImplManager } from "../utils/boxImplManager";
import { registerBaseBoxImpl } from "./base-box";
import { registerTodoBoxImpl } from "./todo-box";


 function Box(props: BoxProps ) {
    const Wrapper = BoxImplManager.getInstance().getBoxImpl(props.data)
    if (!Wrapper) {
        return null
    }
    return <Wrapper data={props.data}>
        {props.data?.children?.map((child: any) => {
            return <Box data={child} key={child.id} />
        })}
    </Wrapper>
}
registerTodoBoxImpl()
registerBaseBoxImpl()
export const MarkdownBox = Box