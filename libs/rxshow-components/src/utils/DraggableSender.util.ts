import { SenderItemBaseProps } from "@hanhan9449/common-types";
import { FC } from "react";

const senderItemMap = new Map<string, FC<SenderItemBaseProps<any>>>();
export function registerDraggableSenderItem(
  key: string,
  component: FC<SenderItemBaseProps<any>>,
) {
  senderItemMap.set(key, component);
}
export function getDraggableSenderItem(key: string) {
  return senderItemMap.get(key);
}
