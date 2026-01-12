import { useEffect } from "react";
import "./snowfall.css";

export default function Snowfall() {
  useEffect(() => {
    const snowContainer = document.createElement("div");
    snowContainer.className = "snow-container";
    document.body.appendChild(snowContainer);

    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent = "❄";

      // Випадкова позиція, розмір і тривалість
      const size = Math.random() * 1.5 + 0.5; // 0.5rem – 2rem
      const duration = Math.random() * 5 + 5; // 5s – 10s
      const left = Math.random() * window.innerWidth;

      snowflake.style.left = `${left}px`;
      snowflake.style.fontSize = `${size}rem`;
      snowflake.style.animationDuration = `${duration}s`;

      snowContainer.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, duration * 1000);
    };

    const interval = setInterval(createSnowflake, 200);

    return () => {
      clearInterval(interval);
      snowContainer.remove();
    };
  }, []);

  return null;
}
