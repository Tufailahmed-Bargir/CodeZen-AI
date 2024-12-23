import { MouseEventHandler } from "react";

interface SidebarItemProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>; // Add onClick prop
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  // setActive,
  label,
  icon: Icon,
  href,
  onClick, // Destructure onClick
}) => {
  return (
    <a
      href={href}
      onClick={onClick} // Use onClick here
      className={`flex items-center gap-2 p-2 ${active === label ? "bg-blue-500 text-white" : ""}`}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </a>
  );
};

export default SidebarItem;
