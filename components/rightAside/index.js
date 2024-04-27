
export default function RightAside ({ children, hiddenElement} ) {
  return (
    <div
      className={`relative w-full h-fill  bg-white text-black ${
        ! hiddenElement ? "hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}
