"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Link href={"/"}>
      {theme === "dark" ? (
        <Image
          src={"/assets/icons/logo-white.svg"}
          alt="logoipsum-white"
          width={100}
          height={35}
          className="h-9 w-16"
        />
      ) : (
        <Image
          src={"/assets/icons/logo.svg"}
          alt="logoipsum-dark"
          width={100}
          height={35}
          className="h-9 w-16"
        />
      )}
    </Link>
  );
};
export default Logo;
