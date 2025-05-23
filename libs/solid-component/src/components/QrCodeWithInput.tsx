import type { Component } from "solid-js";
import { QrCode } from "./QrCode";
import { createSignal, onMount } from "solid-js";
import copy from "copy-to-clipboard";
import { JBColumn, JBButton, JBTextarea, JBRow } from "@hanhan9449/solidjs-ui";
import "@hanhan9449/solidjs-ui/style.css";
import styles from "./QrCodeWithInput.module.pcss";

export const QrCodeWithInput: Component = () => {
  const [input, setInput] = createSignal("");
  onMount(() => {
    const u = new URL(location.href);
    let share = u.searchParams.get("share");
    console.log("share", share);
    if (share) {
      setInput(share);
    }
  });
  let canvasEl = document.createElement("canvas");
  return (
    <div class={styles.container}>
      <h2>二维码生成</h2>
      <JBColumn space={4}>
        <div>
          <JBTextarea
            class={styles.textarea}
            value={input()}
            onInput={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
        <div>
          <JBRow space={4}>
            <JBButton
              onClick={() => {
                copy(input());
              }}
            >
              Copy Text
            </JBButton>
            <JBButton
              onClick={async () => {
                canvasEl.toBlob((blob) => {
                  if (blob) {
                    navigator.clipboard.write([
                      new ClipboardItem({
                        "image/png": blob,
                      }),
                    ]);
                  }
                });
              }}
            >
              Copy Image
            </JBButton>
            <JBButton
              onClick={() => {
                const u = new URL(location.href);
                u.searchParams.set("share", input());
                copy(String(u));
              }}
            >
              Share Config link
            </JBButton>
          </JBRow>
        </div>
        <div>
          <QrCode value={input()} canvas={canvasEl} />
        </div>
      </JBColumn>
    </div>
  );
};
