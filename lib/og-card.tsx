import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

export type OgCardOptions = {
  /** Screenshot as a data: URL or absolute URL, rendered at 520x390 on the right. */
  image?: string
  /** Short status label rendered as a chip above the title (e.g. "En producción"). */
  status?: string
}

export function renderOgCard(title: string, kicker: string, opts: OgCardOptions = {}) {
  const { image, status } = opts

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: 24,
          backgroundColor: "#0c1520",
          color: "#f4f7f8",
          padding: image ? "72px 56px" : "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            maxWidth: image ? 560 : 1056,
            minWidth: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 42, height: 2, backgroundColor: "#2EB1C3" }} />
            <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#2EB1C3" }}>
              {kicker}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {status ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  gap: 10,
                  padding: "6px 16px",
                  border: "1px solid #2b4450",
                  borderRadius: 999,
                  fontSize: 20,
                  color: "#d8e6e8",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#3ccfa8" }} />
                {status}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                fontSize: image ? 44 : 52,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: -1.2,
                maxWidth: image ? 560 : 1000,
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28 }}>
            <div style={{ display: "flex" }}>GearsMap</div>
            <div style={{ display: "flex", color: "#9fb3b8" }}>gearsmap.com</div>
          </div>
        </div>
        {image ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
            <img
              src={image}
              alt=""
              width={520}
              height={390}
              style={{
                width: 520,
                height: 390,
                objectFit: "cover",
                border: "1px solid #2EB1C3",
                borderRadius: 12,
              }}
            />
          </div>
        ) : null}
      </div>
    ),
    { ...ogSize },
  )
}
