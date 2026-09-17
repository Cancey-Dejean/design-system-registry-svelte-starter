import type { Action } from "svelte/action";

const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

function enhanceBlock(pre: HTMLPreElement) {
  if (pre.dataset.enhanced) return;
  pre.dataset.enhanced = "true";

  const code = pre.querySelector("code");
  if (!code) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy-button";
  button.setAttribute("aria-label", "Copy code");
  button.innerHTML = COPY_ICON;

  button.addEventListener("click", async () => {
    const clone = code.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(".line-number").forEach((el) => el.remove());
    try {
      await navigator.clipboard.writeText(clone.textContent ?? "");
    } catch {
      return;
    }
    button.innerHTML = CHECK_ICON;
    button.classList.add("copied");
    setTimeout(() => {
      button.innerHTML = COPY_ICON;
      button.classList.remove("copied");
    }, 1500);
  });

  pre.appendChild(button);
}

export const enhanceCodeBlocks: Action<HTMLElement> = (node) => {
  const scan = () => {
    node.querySelectorAll<HTMLPreElement>("pre.shiki").forEach(enhanceBlock);
  };

  scan();

  const observer = new MutationObserver(scan);
  observer.observe(node, { childList: true, subtree: true });

  return {
    destroy() {
      observer.disconnect();
    },
  };
};
