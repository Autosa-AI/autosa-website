import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";
import type { Admin } from "@/lib/models";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });

    const { name, email, password, seedSecret } = body as {
      name?: string;
      email?: string;
      password?: string;
      seedSecret?: string;
    };

    if (seedSecret !== process.env.SEED_SECRET) {
      return NextResponse.json({ success: false, error: "Invalid seed secret" }, { status: 403 });
    }

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ success: false, error: "name, email, and password are required" }, { status: 400 });
    }

    const db = await getDb();

    const existingOwner = await db.collection<Admin>("admins").findOne({ role: "owner" });
    if (existingOwner) {
      return NextResponse.json({ success: false, error: "Owner already exists. Seed aborted." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const now = new Date();

    const result = await db.collection<Omit<Admin, "_id">>("admins").insertOne({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: "owner",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    // Create indexes
    await db.collection("admins").createIndex({ email: 1 }, { unique: true });
    await db.collection("sub_projects").createIndex({ service: 1, createdAt: -1 });
    await db.collection("projects").createIndex({ subProjectId: 1, createdAt: -1 });
    await db.collection("audit_logs").createIndex({ timestamp: -1 });
    await db.collection("audit_logs").createIndex({ adminId: 1, timestamp: -1 });

    return NextResponse.json(
      { success: true, data: { ownerId: result.insertedId, message: "Autosa database seeded successfully" } },
      { status: 201 }
    );
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
