"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";

interface TextImageProps {
  text: string;
  imageUrl: string;
  size?: string;
  className?: string;
}

export function CanvasTextImage({
  text,
  imageUrl,
  size = "3rem",
  className = "",
}: TextImageProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const t = useTranslations("home");

  // Determine translation key based on input text (case-insensitive)
  let displayText = text;
  const upperText = text.toUpperCase();
  if (upperText === "POPULAR GAMES") {
    displayText = t("popularGames", text);
  } else if (upperText === "POPULAR SELLERS") {
    displayText = t("popularSellers", text);
  } else if (upperText === "UPCOMING GAMES") {
    displayText = t("upcomingGames", text);
  } else if (upperText === "NEW ON DIFMARK") {
    displayText = t("newOnDifmark", text);
  } else if (upperText === "WEEKLY CHART") {
    displayText = t("weeklyChart", text);
  } else if (upperText.includes("UNDER")) {
    displayText = t("under100", text);
  }

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const fontSize = parseInt(size) || 48;
      canvas.width = displayText.length * fontSize * 0.8;
      canvas.height = fontSize * 1.5;

      // Vẽ ảnh
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Set composite mode để chỉ giữ lại phần text
      ctx.globalCompositeOperation = "destination-in";

      // Vẽ text
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(displayText.toUpperCase(), canvas.width / 2, canvas.height / 2);
    };

    img.src = imageUrl;
  }, [displayText, imageUrl, size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}
