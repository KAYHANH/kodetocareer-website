import React from "react";

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 contain-strict select-none" aria-hidden="true" suppressHydrationWarning>
      {/* Cool Slate Light Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-80 pointer-events-none" />

      {/* Top Left Soft Blue Orb */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] max-w-[80vw] rounded-full bg-blue-400/10 blur-3xl pointer-events-none transform-gpu" />

      {/* Center Right Soft Purple Orb */}
      <div className="absolute top-[35%] -right-20 w-[450px] h-[450px] max-w-[80vw] rounded-full bg-purple-400/10 blur-3xl pointer-events-none transform-gpu" />

      {/* Bottom Left Soft Accent/Teal Orb */}
      <div className="absolute bottom-[10%] -left-20 w-[450px] h-[450px] max-w-[80vw] rounded-full bg-accent/10 blur-3xl pointer-events-none transform-gpu" />

      {/* Bottom Right Soft Rose Orb */}
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] max-w-[80vw] rounded-full bg-pink-400/8 blur-3xl pointer-events-none transform-gpu" />
    </div>
  );
}
