"use client";

import { useState } from "react";
import Link from "next/link";
import links from "@/app/links.json";

interface LinkItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
}

interface LinksModalProps {
  buttonText?: string;
  title?: string;
  links?: LinkItem[];
}

export default function LinksModal({
  title = "Quick Navigation",
}: LinksModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="absolute top-[73%] left-[40%] p-2 min-h-6 min-w-12 md:min-h-8 md:min-w-24 rounded-md hover:bg-blue-300 hover:opacity-[30%] cursor-pointer animate-pulse transition-all"
      ></button>

      {/* Blurred Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md transition-opacity"
          onClick={() => setIsOpen(false)} // Click outside to dismiss
        >
          {/* 50% Width & 50% Height Container */}
          <div
            className="w-1/2 h-1/2 flex flex-col bg-zinc-900/95 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
              <h2 className="text-lg font-semibold text-zinc-100 tracking-wide">
                {title}
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition cursor-pointer"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable Links Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between p-4 rounded-xl bg-zinc-800/60 border border-zinc-700/50 hover:bg-zinc-800 hover:border-blue-500/50 transition-all cursor-pointer"
                >
                  <div className="flex flex-col pr-4">
                    <span className="text-base font-medium text-zinc-100 group-hover:text-blue-400 transition-colors">
                      {link.label}
                    </span>
                    {link.description && (
                      <span className="text-xs text-zinc-400 mt-0.5">
                        {link.description}
                      </span>
                    )}
                  </div>

                  {/* Arrow Indicator */}
                  <div className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
