// Import statements
import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/prisma-user-crud";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  try {
    switch (eventType) {
      case "user.created": {
        const {
          email_addresses,
          first_name,
          last_name,
          image_url,
          id: clerkId,
        } = evt.data;
        const email = email_addresses[0]?.email_address ?? "";
        const firstName = first_name || ""; // Default to an empty string if null
        const lastName = last_name || ""; // Default to an empty string if null

        const { user, secret } = await createUser({
          clerkId,
          email,
          firstName,
          lastName,
          profileImg: image_url,
        });

        if (user) {
          try {
            const client = await clerkClient(); // Call the function to get the instance
            await client.users.updateUser(clerkId, {
              privateMetadata: { secret, userDB_id: user.id },
            });
            await client.users.updateUser(clerkId, {
              publicMetadata: { userDB_id: user.id },
            });
          } catch (err) {
            console.error("Error updating Clerk metadata:", err);
          }
        }

        console.log(`User created: ${user.id}`);
        break;
      }

      case "user.updated": {
        const {
          email_addresses,
          first_name,
          last_name,
          image_url,
          id: clerkId,
        } = evt.data;
        const email = email_addresses[0]?.email_address;
        const firstName = first_name || ""; // Default to an empty string if null
        const lastName = last_name || ""; // Default to an empty string if null
        const updatedUser = await updateUser(
          {
            email,
            firstName,
            lastName,
            profileImg: image_url,
          },
          clerkId
        );
        console.log(`User updated: ${updatedUser.id}`);
        break;
      }

      case "user.deleted": {
        const { id: clerkId } = evt.data;
        const deletedUser = await deleteUser(clerkId);
        console.log(`User deleted: ${deletedUser.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${evt.type}`);
    }
  } catch (err) {
    console.error("Error handling webhook event:", err);
    return new Response("Error processing event", { status: 500 });
  }

  return new Response("", { status: 200 });
}
