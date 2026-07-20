import { ImageResponse } from "next/og";

export const alt = "Two Rails — 情熱が、放置されない世界を創る。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "78px 88px", background: "#ffffff", color: "#111111" }}>
      <div style={{ display: "flex", alignItems: "center", fontSize: 35, fontWeight: 800, letterSpacing: "-1px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 62, marginRight: 24 }}><span style={{ height: 7, background: "#E60023" }} /><span style={{ height: 7, background: "#7EC8E3" }} /></div>Two Rails
      </div>
      <div style={{ display: "flex", marginTop: 75, fontSize: 78, fontWeight: 900, lineHeight: 1.28 }}>Passion should never<br />be left behind.</div>
      <div style={{ display: "flex", marginTop: 52, width: 510, flexDirection: "column", gap: 10 }}><span style={{ height: 9, background: "#E60023" }} /><span style={{ height: 9, background: "#7EC8E3" }} /></div>
      <div style={{ display: "flex", marginTop: 38, color: "#6B6B6B", fontSize: 24, fontWeight: 600, letterSpacing: "3px" }}>ORGANIZATIONAL DIAGNOSTICS</div>
    </div>,
    size,
  );
}
