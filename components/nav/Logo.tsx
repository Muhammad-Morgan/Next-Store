import React from "react";
import { Button } from "../ui/button";
import { VscCode } from "react-icons/vsc";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Button size="icon" asChild>
        <Link href="/">
          <VscCode />
        </Link>
      </Button>
    </div>
  );
};

export default Logo;
