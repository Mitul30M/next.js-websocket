import { auth, currentUser } from "@clerk/nextjs/server";

async function ServerPage() {
  const { userId, sessionClaims, ...authInfo } = await auth();
  const user = await currentUser();

  console.log(authInfo, "\n", userId, "\n\n");
  console.log(user);
  console.log("session claims: ", sessionClaims);

  return (
    <main className="flex flex-col w-full gap-6 row-start-2 items-center sm:items-start">
      <h1>Server</h1>
      <p className=" font-bold text-primary">auth()</p>
      <p>
        MongoDB ID:{" "}
        {sessionClaims?.public_metadata
          ? (sessionClaims.public_metadata as PublicMetadataType).userDB_id
          : "No session claims available"}
      </p>
      <p>Clerk ID: {userId}</p>
      <p className="font-bold text-primary">currentUser()</p>
      {user &&
        Object.entries(user).map(([key, value]) => (
          <p key={key}>
            <span className="font-bold">{key}:</span> {String(value)}
          </p>
        ))}
    </main>
  );
}

export default ServerPage;
