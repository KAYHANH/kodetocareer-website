import React from "react";

export default function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Cool Slate Light Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-80" />

      {/* Top Left Soft Blue Orb */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-blue-400/8 blur-[120px] animate-float-delayed pointer-events-none" />

      {/* Center Right Soft Purple Orb */}
      <div className="absolute top-[35%] right-[-15%] w-[45vw] h-[45vw] max-w-[550px] rounded-full bg-purple-400/8 blur-[130px] animate-float pointer-events-none" />

      {/* Bottom Left Soft Accent/Teal Orb */}
      <div className="absolute bottom-[10%] left-[-15%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-accent/8 blur-[120px] animate-float-delayed pointer-events-none" />

      {/* Bottom Right Soft Rose Orb */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] max-w-[450px] rounded-full bg-pink-400/6 blur-[110px] animate-float pointer-events-none" />
    </div>
  );
}
