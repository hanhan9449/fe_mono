import { TestConstantItem } from "../test-components/TestConstantItem";
import { registerDraggableSenderItem } from "./DraggableSender.util";

export function registerAllTestComponent() {
  registerDraggableSenderItem("test-contant", TestConstantItem);
}
