import { BoxProps } from "../interfaces";
import { BoxImplManager } from "../utils/boxImplManager";
import { registerBaseBoxImpl } from "./base-box";
import { registerTodoBoxImpl } from "./todo-box";
import {registerExtraBoxImpl} from "./extra-box.tsx";


 function Box(props: BoxProps ) {

    const Wrapper = BoxImplManager.getInstance().getBoxImpl(props.data)
    if (!Wrapper) {
        return null
    }
    if (!props.data) {
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
registerExtraBoxImpl()
export const MarkdownBox = Box