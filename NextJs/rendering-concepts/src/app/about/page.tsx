import { cookies } from "next/headers";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  console.log(theme);
  console.log("About server component");
  return <h1>About page {new Date().toLocaleTimeString()}</h1>;
}
