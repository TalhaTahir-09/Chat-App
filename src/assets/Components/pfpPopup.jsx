import React from "react";

const avatarOptions = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
  "/images/6.png",
];

export default function PfpPopup({
  saved,
  visible,
  selectedAvatar,
  selectedName,
  onSelectAvatar,
  onNameChange,
  onSubmit,
}) {
  if (!visible) return null;
  const isValid = selectedAvatar && selectedName?.trim().length > 0;
  if (!saved) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0f1226] p-6 text-white shadow-2xl">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                className="text-2xl font-semibold"
                style={{ fontWeight: 700 }}
              >
                Pick a name and avatar
              </h2>
              <p className="text-sm text-gray-400">
                Choose a display name and a profile picture before posting in
                the chat.
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-3xl border border-white/10 bg-white/5 p-4">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Display name
            </label>
            <input
              value={selectedName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter your chat name"
              className="w-full rounded-2xl border border-white/10 bg-[#0f1226] p-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
            {avatarOptions.map((avatarUrl, index) => {
              const isSelected = selectedAvatar === avatarUrl;
              return (
                <button
                  key={index}
                  type="button"
                  className={`group flex flex-col items-center justify-center rounded-3xl border p-2 transition ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-white/10 bg-white/5 hover:border-cyan-300 hover:bg-white/10"
                  }`}
                  onClick={() => onSelectAvatar(avatarUrl)}
                >
                  <img
                    src={avatarUrl}
                    alt={`Avatar ${index + 1}`}
                    className="h-20 w-20 rounded-3xl object-cover"
                  />
                  <div className="mt-3 text-center text-sm text-gray-300 group-hover:text-white">
                    {isSelected ? "Selected" : "Choose"}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                Required
              </p>
              <p className="mt-1 text-sm text-gray-200">
                You need to select both a name and an avatar before you can
                chat.
              </p>
            </div>
            <button
              type="button"
              disabled={!isValid}
              onClick={() => onSubmit(selectedAvatar, selectedName.trim())}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                isValid
                  ? "bg-cyan-600 text-white hover:bg-cyan-500"
                  : "cursor-not-allowed bg-white/10 text-gray-500"
              }`}
            >
              Save and continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}
