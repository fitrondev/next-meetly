import { currentUser } from "@clerk/nextjs/server";

const RootPage = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }
  return (
    <div>
      <p>
        Hello, {user.fullName}! Your email is{" "}
        {user.primaryEmailAddress?.emailAddress}
      </p>
    </div>
  );
};
export default RootPage;
