import { Button } from "@/components/ui/button";
import WebSocketConnect from "@/components/web-socket-connect-btn";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { SignOutButton } from "../components/SignOutButton";
import { PlugZap, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import {
  LockKeyhole,
  LockKeyholeOpen,
  LogIn,
  LogOut,
  ShieldCheck,
  Unplug,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const { userId } = await auth();

  return (
    <>
      <header className="">
        <Alert className="w-full flex flex-row justify-between items-center gap-4">
          <AlertTitle className="text-md">
            Coded by{" "}
            <Link
              href={"https://github.com/Mitul30M"}
              className="hover:underline hover:underline-offset-2"
            >
              Mitul30M
            </Link>
          </AlertTitle>
          <AlertDescription className="text-left hidden sm:block sm:w-full">
            A Unique and Effective way to implement WebSockets when using
            Next.js (v15)
          </AlertDescription>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Alert>
      </header>

      <main className="flex text-center flex-col gap-8 items-center justify-center w-full">
        <div className="flex flex-row gap-6 items-center justify-center">
          <Link
            href={"/protected/client"}
            className="flex items-center justify-center gap-2 font-semibold hover:underline hover:underline-offset-4"
          >
            {!userId ? <LockKeyhole /> : <LockKeyholeOpen />}
            Client Page
          </Link>
          <Link
            href={"/protected/server"}
            className=" flex items-center justify-center font-semibold gap-2 hover:underline hover:underline-offset-4"
          >
            {!userId ? <LockKeyhole /> : <LockKeyholeOpen />}
            Server Page
          </Link>
        </div>

        {userId && <WebSocketConnect />}
      </main>

      <footer className="row-start-3 flex gap-2 flex-wrap items-center justify-center">
        <SignedIn>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button>
              <LogIn />
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button variant="outline">
              <LogIn />
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
      </footer>
    </>
  );
}
