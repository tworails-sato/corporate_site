import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, padding: 10, background: "#111111" }}><span style={{ height: 9, background: "#E60023" }} /><span style={{ height: 9, background: "#7EC8E3" }} /></div>,
    size,
  );
}
