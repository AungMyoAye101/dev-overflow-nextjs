import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, updateUser } from "@/src/lib/actions/create.user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
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
    return new Response("Error: Missing Svix headers", {
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
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console

  const eventType = evt.type;

  if (eventType === "user.created") {
    console.log(evt.data);
    const { id, username, first_name, last_name, image_url, email_addresses } =
      evt.data;

    const newUser = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name ? last_name : ""}`,
      username,
      email: email_addresses[0].email_address,
      picture: image_url,
    });

    return NextResponse.json({ message: "ok", user: newUser });
  }

  if (eventType === "user.updated") {
    console.log("update user");
    const { id, username, first_name, last_name, image_url, email_addresses } =
      evt.data;

    const updatedUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name} ${last_name ? last_name : ""}`,
        username,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
    });

    return NextResponse.json({ message: "ok", user: updatedUser });
  }

  return new Response("Webhook received", { status: 200 });
}
