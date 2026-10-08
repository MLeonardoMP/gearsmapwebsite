/**
 * Inline, render-blocking theme bootstrap for <head>. Reads the "theme" key
 * (kept from next-themes so returning visitors keep their choice):
 * "light" -> light, "system" -> prefers-color-scheme, anything else -> dark.
 */
export const themeScript = `(function(){try{var e=document.documentElement,p=localStorage.getItem("theme"),d=p==="light"?false:p==="system"?matchMedia("(prefers-color-scheme: dark)").matches:true;e.classList.toggle("dark",d)}catch(_){}})()`
