import { InfoItemProps } from "@/lib/types";

export default function InfoItem({ text, icon }: InfoItemProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <p className="text-gray-500 text-sm">{text}</p>
      {icon}
    </div>
  );
}
