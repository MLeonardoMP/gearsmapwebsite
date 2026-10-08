import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

export function renderOgCard(title: string, kicker: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c1520",
          color: "#f4f7f8",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 42, height: 2, backgroundColor: "#2EB1C3" }} />
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#2EB1C3" }}>
            {kicker}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 52, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.2, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28 }}>
          <div style={{ display: "flex" }}>GearsMap</div>
          <div style={{ display: "flex", color: "#9fb3b8" }}>gearsmap.com</div>
        </div>
      </div>
    ),
    { ...ogSize },
  )
}
