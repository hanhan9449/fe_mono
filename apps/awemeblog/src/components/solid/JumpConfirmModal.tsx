import { createSignal, onMount } from "solid-js";

export function JumpConfirmModal() {
  const [targetUrl, setTargetUrl] = createSignal("");
  onMount(() => {
    const url = new URL(window.location.href).searchParams.get("target_url");
    if (url) {
      setTargetUrl(url);
    }
  });
  const handleVisit = () => {
    window.location.href = targetUrl();
  };
  return (
    <div
      style={{
        background: "#fff6f6",
        padding: "8px",
        border: "1px solid red",
        display: "flex",
        "flex-direction": "column",
        "border-radius": "8px",
        "max-width": "500px",
      }}
    >
      <div>你接下来要访问的网页非本站内容，请注意安全</div>
      <div
        style={{
          "margin-top": "8px",
          "margin-bottom": "4px",
          "font-size": "10px",
        }}
      >
        {targetUrl()}
      </div>
      <button onClick={handleVisit}>确定访问</button>
    </div>
  );
}
