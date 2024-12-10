import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <p>You are not signed in.</p>;
  }

  return (
    <div>
      <Button>Click me</Button>

      <p>
        Hello, {user.fullName}! Your email is{" "}
        {user.primaryEmailAddress?.emailAddress}
      </p>
    </div>
  );
}
