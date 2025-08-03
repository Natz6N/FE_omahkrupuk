import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function DashboardLayouts() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Function untuk toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Masuk fullscreen
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
    } else {
      // Keluar fullscreen
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
    }
  };

  // Listen untuk perubahan fullscreen (misalnya saat user tekan ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle keyboard shortcut F11 atau Ctrl+Shift+F
  useEffect(() => {
    const handleKeyPress = (event) => {
      // F11 key
      if (event.key === "F11") {
        event.preventDefault();
        toggleFullscreen();
      }
      // Ctrl+Shift+F
      if (event.ctrlKey && event.shiftKey && event.key === "F") {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Top Navbar dengan tombol fullscreen */}
      <div className="relative">
        {/* <Navbar /> */}
        {/* Tombol Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="fixed bottom-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-lg"
          title={
            isFullscreen ? "Exit Fullscreen (F11)" : "Enter Fullscreen (F11)"
          }
        >
          {isFullscreen ? (
            // Icon untuk exit fullscreen
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Icon untuk enter fullscreen
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Body: Sidebar + Page Content */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <aside className="w-67 bg-second-me h-screen pt-[90px]">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-screen overflow-y-scroll p-4">
          {/* Indikator fullscreen status */}
          {isFullscreen && (
            <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-40 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
              Fullscreen Mode Active - Press F11 or ESC to exit
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
