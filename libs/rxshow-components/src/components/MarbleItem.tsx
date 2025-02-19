import { useEffect, useRef } from "react";
import { MarbleItemType } from "../types";
import { useSlideable } from "@hanhan9449/rxshow-hooks";
import styles from "./MarbleItem.module.scss";

interface ItemProps {
  item: MarbleItemType;
  onUpdate?: (next: MarbleItemType) => void;
}

export function DraggableItem(props: ItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = itemRef.current;
    if (!el) {
      return;
    }
    el.style.setProperty("--x-percent", String(props.item.xPercent));
    el.style.setProperty("--y-percent", String(props.item.yPercent));
    el.style.setProperty("background", props.item.color);
  }, [itemRef]);
  const move$ = useSlideable(itemRef, {
    slideType: "x",
  });
  useEffect(() => {
    move$?.subscribe((e) => {
      const el = itemRef.current;
      if (!el) {
        return;
      }
      props.onUpdate?.({
        ...props.item,
        xPercent: e.xPercent,
      });
      el.style.setProperty("--x-percent", String(e.xPercent));
    });
  }, [move$]);
  return (
    <div
      ref={itemRef}
      className={styles.item}
      data-item-name={props.item.itemName}
    ></div>
  );
}
export function ViewItem(props: ItemProps) {
  return (
    <div
      className={styles.item}
      style={
        {
          "--x-percent": String(props.item.xPercent),
          "--y-percent": String(props.item.yPercent),
          background: props.item.color,
        } as any
      }
      data-item-name={props.item.itemName}
    ></div>
  );
}
