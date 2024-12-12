import Link from "next/link";

import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogOut, Monitor, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>
            {user.fullName ? user.fullName[0].toUpperCase() : "MY"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">
            <User className="size-5" /> Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="size-5" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>{children}</DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem>
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex items-center gap-2">
              <LogOut className="size-5" />
              Log Out
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
