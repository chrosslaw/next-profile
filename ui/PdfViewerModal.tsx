"use client";

import { useState } from "react";

interface PdfViewerModalProps {
  fileUrl: string;
  downloadName?: string;
}

export default function PdfViewerModal({
  fileUrl,
  downloadName = "document.pdf",
}: PdfViewerModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="absolute top-[73%] left-[65%] min-h-6 min-w-4 md:min-h-8 md:min-w-6 rounded-md hover:bg-blue-100 hover:opacity-[3%] cursor-pointer animate-pulse transition-all"
      ></button>

      {/* Screen Overlay Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setIsOpen(false)} // Click outside to close
        >
          {/* Modal Container */}
          <div
            className="relative flex flex-col w-full max-w-5xl h-[90vh] bg-zinc-900 rounded-xl shadow-2xl border border-zinc-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Top Bar with Controls */}
            <div className="flex items-center justify-between px-6 py-3 border-b bg-zinc-800 border-zinc-700">
              <span className="text-sm font-semibold tracking-wide text-zinc-200">
                Document Viewer
              </span>

              <div className="flex items-center gap-3">
                {/* Download Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white transition bg-emerald-600 rounded-md hover:bg-emerald-500 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 text-sm font-bold text-zinc-400 transition rounded-md hover:text-white hover:bg-zinc-700 cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded PDF Frame */}
            <div className="flex-1 w-full bg-zinc-800">
              <iframe
                src={`${fileUrl}#view=FitH`}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
