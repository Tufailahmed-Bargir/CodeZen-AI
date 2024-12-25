import Image from "next/image";
import { ButtonProps } from "@/lib/types";

export default function Button({
  ImageSrc,
  text,
  onClick,
  bgColor = "bg-white",
  textColor = "text-black",
}: ButtonProps) {
  return (
    <button
      className={`flex flex-row gap-2 h-max rounded-lg p-2 ${bgColor} ${textColor} items-center justify-start`}
      onClick={onClick}
    >
      <Image src={ImageSrc} alt="Button icon" width={20} height={20} />
      {text}
    </button>
  );
}
