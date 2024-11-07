"use client";

import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketContext";
import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const { disconnectSocket } = useSocket()!;

  const handleSignOut = () => {
    disconnectSocket();
    signOut({ redirectUrl: "/" });
  };

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <Button onClick={handleSignOut}>
      <LogOut />
      Sign out
    </Button>
  );
};
