import { Subject } from "rxjs";
import { SenderItemDataType } from "@hanhan9449/common-types";

export const dragStartSendItem$ = new Subject<SenderItemDataType<any>>();
export const globalDrop$ = new Subject<SenderItemDataType<any>>();
