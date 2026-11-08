import { ImageResponse } from "next/og";
import invitationData from "@/data/invitation.json";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const alt = "Deivendran & Akshaya Wedding Invitation - 22 Nov 2026";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  const { save_the_date, venue } = invitationData;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2D051B 0%, #4A0E2E 40%, #700938 75%, #B0125B 100%)",
          fontFamily: "serif",
          color: "#FFF8E7",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Outer Gold Border */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            bottom: "24px",
            left: "24px",
            right: "24px",
            border: "2px solid #C9A227",
            borderRadius: "20px",
            display: "flex",
          }}
        />

        {/* Inner Dotted Border */}
        <div
          style={{
            position: "absolute",
            top: "32px",
            bottom: "32px",
            left: "32px",
            right: "32px",
            border: "1px dashed #E8D9A0",
            borderRadius: "14px",
            opacity: 0.6,
            display: "flex",
          }}
        />

        {/* Top Header - Save The Date */}
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#C9A227",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          SAVE THE DATE
        </div>

        {/* Invitation Type */}
        <div
          style={{
            display: "flex",
            fontSize: "36px",
            fontStyle: "italic",
            color: "#E8D9A0",
            marginBottom: "20px",
          }}
        >
          Wedding Invitation
        </div>

        {/* Couple Names */}
        <div
          style={{
            fontSize: "68px",
            fontWeight: "bold",
            color: "#FFF8E7",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <span>Deivendran</span>
          <span style={{ color: "#C9A227", fontSize: "44px" }}>&</span>
          <span>Akshaya</span>
        </div>

        {/* Date & Time Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "12px 32px",
            borderRadius: "999px",
            background: "rgba(201, 162, 39, 0.2)",
            border: "1px solid #C9A227",
            fontSize: "22px",
            fontWeight: "600",
            color: "#FFF8E7",
            marginBottom: "18px",
          }}
        >
          <span>{`${save_the_date.day}, ${save_the_date.date}`}</span>
          <span>•</span>
          <span>{`Muhurtham: ${save_the_date.time.from} to ${save_the_date.time.to}`}</span>
        </div>

        {/* Venue */}
        <div
          style={{
            display: "flex",
            fontSize: "18px",
            color: "#E8D9A0",
            letterSpacing: "1px",
          }}
        >
          {`${venue.name}, ${venue.location}`}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
