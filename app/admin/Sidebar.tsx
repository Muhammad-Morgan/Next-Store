"use client";
import { adminLinks } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside>
      {adminLinks.map((link) => {
        const isAdtivePage = pathName === link.href;
        const variant = isAdtivePage ? "default" : "ghost";
        return (
          <Button
            key={link.href}
            asChild
            className="w-full mb-2 capitaloze font-normal justify-start"
            variant={variant}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
