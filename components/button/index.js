"use client";
import React from "react";
import Image from "next/image";

export default function Button({
  handler,
  title,
  imgSrc,
  styling,
  buttontype,
}) {
  return (
    <button
      type={buttontype ? buttontype : ""}
      onClick={handler && handler}
      className={`${
        styling ? styling : ""
      } w-fit h-fit  bg-[#0374db] hover:bg-[#fb7c32] px-2 py-2 rounded text-white font-semibold`}
    >
      <div className="flex flex-row justify-center gap-2">
        {imgSrc ? (
          <Image src={imgSrc} alt="Note Icon" width={24} height={24} />
        ) : (
          ""
        )}
        {title ? title : ""}
      </div>
    </button>
  );
}
