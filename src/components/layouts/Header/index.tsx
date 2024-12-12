import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";

import SearchField from "./SearchField";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-4">
          <Logo />
          <SearchField />
        </div>

        <div>
          <UserMenu>
            <ThemeToggle />
          </UserMenu>
        </div>
      </div>
    </header>
  );
};
export default Header;
