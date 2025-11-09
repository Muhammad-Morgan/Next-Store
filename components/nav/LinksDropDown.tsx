import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/lib/utils";
import Link from "next/link";
import { LuAlignLeft } from "react-icons/lu";
import { Button } from "../ui/button";
const LinksDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <LuAlignLeft className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        {links.map((link) => {
          const { href, label } = link;
          return (
            <DropdownMenuItem asChild key={label}>
              <Link
                className="capitalize cursor-pointer hover:bg-neutral-200 duration-200"
                href={href}
              >
                {label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropDown;
