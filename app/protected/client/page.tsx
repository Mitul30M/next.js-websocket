"use client";
import { useAuth, useUser } from "@clerk/nextjs";

function ClientPage() {
  const { isLoaded, userId, sessionId } = useAuth();
  const { user } = useUser();

  // Ensure that `user`, `publicMetadata`, and `userDB_id` exist before rendering
  const userDB_id = (user?.publicMetadata as PublicMetadataType)?.userDB_id;

  // If the user isn't loaded or doesn't exist, return null
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
      <h1>Client</h1>
      <p className="font-bold text-primary">useAuth()</p>
      <p>MongoDB User ID: {userDB_id ?? "-------------------------"}</p>
      <p>Clerk User ID: {userId}</p>
      <p>Session ID: {sessionId}</p>
    </main>
  );
}

export default ClientPage;
