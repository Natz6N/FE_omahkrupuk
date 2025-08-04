import { Link } from "react-router-dom";

export default function ErrorTemplate({
  title = "Page Not Found",
  code = "404",
}) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden px-4">
      {/* Animated Background Circles */}
      <div className="absolute w-[1000px] h-[1000px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-20 rounded-full blur-3xl animate-pulse -top-60 -left-60"></div>
      <div className="absolute w-[1000px] h-[1000px] bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 opacity-20 rounded-full blur-3xl animate-pulse top-80 -right-60"></div>

      {/* Glass Card */}
      <div className="relative z-10 p-10 max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-center">
        <h1 className="text-7xl font-bold text-red-500 drop-shadow-lg">{code}</h1>
        <h2 className="mt-4 text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-gray-300">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <p className="mt-4 text-sm italic text-gray-400">
          Created by{" "}
          <Link
            to="https://github.com/Natz6N"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Natz6N
          </Link>
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}
