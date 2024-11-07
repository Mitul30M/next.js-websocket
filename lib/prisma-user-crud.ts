import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import prisma from "./prisma-client";

// Generate a random secret
function generateSecret() {
  return crypto.randomBytes(16).toString("hex");
}

// Function to create a user in MongoDB through Prisma
export async function createUser(data: {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImg: string;
}) {
  const secret = generateSecret();
  const user = await prisma.user.create({
    data: {
      clerkId: data.clerkId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      profileImg: data.profileImg,
      secret,
    },
  });

  return { user, secret }; // Return the user and secret to save in Clerk's private metadata
}

// Function to update a user in MongoDB through Prisma using either clerkId or userId
export async function updateUser(
  data: {
    email?: string;
    firstName?: string;
    lastName?: string;
    profileImg?: string;
  },
  clerkId?: string,
  userId?: string
) {
  const whereClause = clerkId ? { clerkId } : { id: userId };

  const user = await prisma.user.update({
    where: whereClause,
    data,
  });

  return user;
}

// Function to delete a user in MongoDB through Prisma using either clerkId or userId
export async function deleteUser(clerkId?: string, userId?: string) {
  const whereClause = clerkId ? { clerkId } : { id: userId };

  const user = await prisma.user.delete({
    where: whereClause,
  });

  return user;
}
