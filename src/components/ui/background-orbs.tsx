import React from "react";

export default function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" suppressHydrationWarning>
      {/* Cool Slate Light Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-80" suppressHydrationWarning />

      {/* Top Left Soft Blue Orb */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] max-w-[80vw] rounded-full bg-blue-400/8 blur-3xl animate-float-delayed pointer-events-none transform-gpu" suppressHydrationWarning />

      {/* Center Right Soft Purple Orb */}
      <div className="absolute top-[35%] right-[-15%] w-[550px] h-[550px] max-w-[80vw] rounded-full bg-purple-400/8 blur-3xl animate-float pointer-events-none transform-gpu" suppressHydrationWarning />

      {/* Bottom Left Soft Accent/Teal Orb */}
      <div className="absolute bottom-[10%] left-[-15%] w-[500px] h-[500px] max-w-[80vw] rounded-full bg-accent/8 blur-3xl animate-float-delayed pointer-events-none transform-gpu" suppressHydrationWarning />

      {/* Bottom Right Soft Rose Orb */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] max-w-[80vw] rounded-full bg-pink-400/6 blur-3xl animate-float pointer-events-none transform-gpu" suppressHydrationWarning />
    </div>
  );
}
