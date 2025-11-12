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
import UserIcon from "./UserIcon";
import { SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import SignOutLink from "./SignOutLink";
import { auth } from "@clerk/nextjs/server";
const LinksDropDown = () => {
  const { userId } = auth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex justify-between gap-x-4">
          <LuAlignLeft className="w-6 mr-2" />
          {""}
          {/* IMAGE */}
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        {/* Checks if the user is signed out  */}
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Sign Up</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        {/* Checks if the user is signed in  */}
        <SignedIn>
          {links.map((link) => {
            const { href, label } = link;
            if (link.label === "dashboard" && !isAdmin) return null;
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
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropDown;
