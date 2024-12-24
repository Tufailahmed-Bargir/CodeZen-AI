import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const UserDropdown = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-full h-[40px]">
          <SelectValue placeholder="Utkarsh Dhairya Panwar" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="Tufailahmed">Tufailahmed</SelectItem>
            <SelectItem value="MOhammed Tayeb">MOhammed Tayeb</SelectItem>
            <SelectItem value="Bargir">Bargir</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserDropdown;
