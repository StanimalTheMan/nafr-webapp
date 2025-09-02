"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "notes";

export default function NotesPage() {
  const router = useRouter();
  const [content, setContent] = useState("");

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved !== null) setContent(saved);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (typeof window !== "undefined")
        localStorage.setItem(STORAGE_KEY, content);
    }, 300);
    return () => clearTimeout(id);
  }, [content]);

  function handleLogout() {
    document.cookie = "session=; Path=/; Max-Age=0";
    router.replace("/login");
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Your Notes</h1>
        <button onClick={handleLogout} className="text-sm underline">
          Log out
        </button>
      </div>
      <textarea
        className="w-full h-[60vh] border rounded p-3 font-mono"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
      />
      <div className="text-sm text-gray-500 mt-2">
        Autosaved locally in your browser
      </div>
    </div>
  );
}
