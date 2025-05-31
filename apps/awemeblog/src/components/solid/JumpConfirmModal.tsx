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
      className="bg-[#fff6f6] p-2 border border-red-500 flex flex-col rounded-lg max-w-[500px]"
    >
      <div>你接下来要访问的网页非本站内容，请注意安全</div>
      <div
        className="mt-2 mb-1 text-xs"
      >
        {targetUrl()}
      </div>
      <button onClick={handleVisit}>确定访问</button>
    </div>
  );
}
