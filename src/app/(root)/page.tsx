import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <p>You are not signed in.</p>;
  }

  return (
    <div>
      <Button>Click me</Button>

      <UserButton />

      <p>
        Hello, {user.fullName}! Your email is{" "}
        {user.primaryEmailAddress?.emailAddress}
      </p>
    </div>
  );
}
