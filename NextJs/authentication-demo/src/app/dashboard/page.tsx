import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();

  console.log({ authObj });
  console.log({ userObj });

  return <h1>Dashboard</h1>;
}
