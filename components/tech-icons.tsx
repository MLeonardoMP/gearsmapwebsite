import React from "react"

export const TechIcons = {
  Python: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77V9.7l.01.12.04.28.08.26.12.23.16.19.18.15.2.1.22.07.24.03h4.26l1.27.04.69.11.59.17.5.23.4.28.3.32.2.35.12.37.04.37v1.61l-.04.36-.12.37-.2.35-.3.32-.4.28-.5.23-.59.17-.69.11-1.27.04H4.28a4.3 4.3 0 0 1-2.21-.61 4.25 4.25 0 0 1-1.66-1.7 4.3 4.3 0 0 1-.46-1.97V8.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02H13.47V4.3l-.01-.12-.04-.28-.08-.26-.12-.23-.16-.19-.18-.15-.2-.1-.22-.07-.24-.03H8.04l-1.27-.04-.69-.11-.59-.17-.5-.23-.4-.28-.3-.32-.2-.35-.12-.37-.04-.37V.18h10.36zm-3.2 1.7a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zm-6.35 12a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" transform="scale(0.8) translate(2,2)" />
    </svg>
  ),
  React: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c-1.1 0-2 .9-2 2v2.1C6.3 4.6 3.3 7.5 3.3 11.2c0 1.1.9 2 2 2h2.1c.5 3.7 3.4 6.7 7.1 6.7 1.1 0 2-.9 2-2v-2.1c3.7-.5 6.7-3.4 6.7-7.1 0-1.1-.9-2-2-2h-2.1C18.6 3 15.7 0 12 0zM12 2c2.6 0 4.8 1.6 5.9 3.9h-1.8c-.9-1.3-2.4-2.1-4.1-2.1-2.8 0-5 2.2-5 5 0 1.7.8 3.2 2.1 4.1v1.8c-2.3-1.1-3.9-3.3-3.9-5.9 0-3.6 2.9-6.5 6.5-6.5.1 0 .2 0 .3.1V2zm0 15.8c-2.6 0-4.8-1.6-5.9-3.9h1.8c.9 1.3 2.4 2.1 4.1 2.1 2.8 0 5-2.2 5-5 0-1.7-.8-3.2-2.1-4.1v-1.8c2.3 1.1 3.9 3.3 3.9 5.9 0 3.6-2.9 6.5-6.5 6.5-.1 0-.2 0-.3-.1v.4z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  ),
  TypeScript: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM13.5 6h3v9h-3V6zm-6 0h3v9H7.5V6z" />
      <path d="M11.25 15v3.75H6v-1.5h3v-2.25H6V15h5.25zm9 0v1.5h-3v.75h3v1.5h-5.25V15h5.25z" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  AWS: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 14.5c-.6.9-1.4 1.6-2.3 2.1-.9.5-2 .8-3.2.8-1.7 0-3.1-.5-4.2-1.6-1.1-1.1-1.6-2.5-1.6-4.2 0-1.6.5-3 1.6-4.1 1.1-1.1 2.5-1.6 4.2-1.6 1.1 0 2.1.3 3 .8.9.5 1.6 1.2 2.1 2.1l-1.6 1c-.4-.6-.8-1-1.3-1.3-.5-.3-1.1-.5-1.8-.5-1.1 0-2 .4-2.7 1.1-.7.7-1.1 1.6-1.1 2.7 0 1.1.4 2 1.1 2.7.7.7 1.6 1.1 2.7 1.1.7 0 1.3-.2 1.8-.5.5-.3 1-.8 1.3-1.3l1.6 1zM19.5 18.8c-1.5 1.1-3.3 1.7-5.2 1.7-2.4 0-4.6-.8-6.3-2.2l1.2-1.5c1.4 1.1 3.1 1.7 5.1 1.7 1.5 0 2.9-.5 4.1-1.3l1.1 1.6z" />
    </svg>
  ),
  PostgreSQL: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  ),
  Docker: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.98 8.65h-1.86v1.86h1.86V8.65zm-2.48 0H9.64v1.86h1.86V8.65zm-2.48 0H7.16v1.86h1.86V8.65zm7.44 2.48h-1.86v1.86h1.86v-1.86zm-2.48 0H12.12v1.86h1.86v-1.86zm-2.48 0H9.64v1.86h1.86v-1.86zm-2.48 0H7.16v1.86h1.86v-1.86zm-2.48 0H4.68v1.86h1.86v-1.86zm12.4 2.48h-1.86v1.86h1.86v-1.86zm-2.48 0H14.6v1.86h1.86v-1.86zm-2.48 0H12.12v1.86h1.86v-1.86zm-2.48 0H9.64v1.86h1.86v-1.86zm-2.48 0H7.16v1.86h1.86v-1.86zm-2.48 0H4.68v1.86h1.86v-1.86zM22.9 14.5c-.06-.6-.2-1.18-.42-1.74-.2-.5-.48-.96-.82-1.38-.34-.42-.74-.78-1.18-1.08-.44-.3-.92-.54-1.44-.72-.52-.18-1.06-.3-1.62-.36V8.65h-1.86v1.86h-1.86V8.65h-1.86v1.86H9.64V8.65H7.16v1.86H4.68v1.86H2.2v1.86h-.6c-.3 0-.58.06-.84.16-.26.1-.5.24-.72.42-.22.18-.4.4-.54.66-.14.26-.22.54-.22.84 0 .3.08.58.22.84.14.26.32.48.54.66.22.18.46.32.72.42.26.1.54.16.84.16h.6v.62c0 1.1.4 2.1 1.1 2.9.7.8 1.7 1.3 2.8 1.3h12.4c1.1 0 2.1-.5 2.8-1.3.7-.8 1.1-1.8 1.1-2.9v-.62h.6c.3 0 .58-.06.84-.16.26-.1.5-.24.72-.42.22-.18.4-.4.54-.66.14-.26.22-.54.22-.84 0-.3-.08-.58-.22-.84-.14-.26-.32-.48-.54-.66-.22-.18-.46-.32-.72-.42-.26-.1-.54-.16-.84-.16z" />
    </svg>
  ),
  NextJS: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.94 17.48L9.4 7.5H7.5v9h1.5V9.6l6.44 8.48c-.8.3-1.66.48-2.5.48zm1.56-.6l-5.5-7.24V7.5h5.5v9.38z" />
    </svg>
  ),
  Tailwind: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  Mapbox: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 1.5l-9 4.5v12l9 4.5 9-4.5v-12l-9-4.5zm0 2.2l6.8 3.4-6.8 3.4-6.8-3.4L12 3.7zm-7.5 5.6l6.5 3.2v7.2l-6.5-3.2V9.3zm8.5 10.4v-7.2l6.5-3.2v6.1l-6.5 3.2z" />
    </svg>
  ),
  QGIS: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  ),
  Git: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M2.6 10.59L8.38 4.8c.78-.78 2.05-.78 2.83 0l1.41 1.41c.78.78.78 2.05 0 2.83L6.83 14.8c-.78.78-2.05.78-2.83 0L2.6 13.42c-.78-.78-.78-2.05 0-2.83zM7 19h10v2H7v-2z" />
    </svg>
  ),
  LangChain: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" />
    </svg>
  ),
  LangGraph: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M8.5 7.5l7-1M8.5 8.5l3.5 7.5M15.5 8.5l-3.5 7.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  LlamaIndex: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
    </svg>
  ),
  OpenAI: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
    </svg>
  ),
  HuggingFace: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 9h2v2H8zm6 0h2v2h-2zm-4 6h4v2h-4z" fill="var(--background)" />
    </svg>
  ),
  PyTorch: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z" />
    </svg>
  ),
  TensorFlow: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l10 6v8l-10 6-10-6V8l10-6zm0 2.3L4.3 9v6l7.7 4.7 7.7-4.7V9L12 4.3z" />
    </svg>
  )
}
