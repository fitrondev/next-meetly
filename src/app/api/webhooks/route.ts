import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return NextResponse.json("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;

  try {
    let user = null;

    switch (eventType) {
      case "user.created":
        user = await prisma.user.create({
          data: {
            clerkId: id,
          },
        });
        break;
      case "user.updated":
        user = await prisma.user.update({
          where: {
            clerkId: id,
          },
          data: {
            clerkId: id,
          },
        });
        break;
      case "user.deleted":
        user = await prisma.user.delete({
          where: {
            clerkId: id,
          },
        });
        break;
      default:
        break;
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error: Could not process webhook:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
