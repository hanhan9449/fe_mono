import { SenderItemDataType } from "@hanhan9449/common-types";

export type TestConstantSendDataType = { value: number; background: string };

interface TestConstantItemProps {
  sendItem: SenderItemDataType<TestConstantSendDataType>;
}
export function TestConstantItem(props: TestConstantItemProps) {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        background: props.sendItem.itemData.background,
      }}
    >
      {props.sendItem.itemData.value}
    </div>
  );
}
