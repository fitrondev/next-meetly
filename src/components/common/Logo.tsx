import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={"/assets/icons/logo.svg"}
        alt="logoipsum"
        width={100}
        height={35}
        className="w-16 h-9"
      />
    </Link>
  );
};
export default Logo;
