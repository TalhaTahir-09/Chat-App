import React from "react";

export default function LoadingScreen() {
  return (
    <div className="bg-chat flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-24 w-24 sm:h-32 sm:w-32">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-cyan-300 animate-spin"></div>

          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-400 border-l-cyan-300 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "3s" }}
          ></div>

          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-600/20 to-cyan-400/10 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-cyan-400 animate-pulse"></div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Chat Room</h2>
          <p className="mt-2 text-sm text-cyan-300">Loading your profile...</p>

          <div className="mt-3 flex justify-center gap-1">
            <div
              className="h-2 w-2 rounded-full bg-cyan-400"
              style={{
                animation: "pulse 1.4s infinite",
                animationDelay: "0s",
              }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-cyan-400"
              style={{
                animation: "pulse 1.4s infinite",
                animationDelay: "0.2s",
              }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-cyan-400"
              style={{
                animation: "pulse 1.4s infinite",
                animationDelay: "0.4s",
              }}
            ></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

