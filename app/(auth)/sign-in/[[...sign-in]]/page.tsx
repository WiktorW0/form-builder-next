import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex container h-screen justify-center items-center"><SignIn /></div>

  );
}