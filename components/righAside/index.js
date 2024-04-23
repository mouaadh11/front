
export default function ({ children, hiddenElement} ) {
  return (
    <div
      className={`relative w-full h-full overflow-auto px-6 py-4 bg-white text-black ${
        ! hiddenElement ? "hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}
