import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest, hashPassword } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { logAction } from "@/lib/auditLog";
import { ObjectId } from "mongodb";
import type { Admin } from "@/lib/models";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAdminFromRequest(req);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    if (payload.role !== "owner") return NextResponse.json({ success: false, error: "Forbidden: owner only" }, { status: 403 });

    const { id } = await params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });

    const db = await getDb();
    const target = await db.collection<Admin>("admins").findOne({ _id: new ObjectId(id) });
    if (!target) return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });

    // Prevent deactivating own account
    if (id === payload.sub && body.isActive === false) {
      return NextResponse.json({ success: false, error: "Cannot deactivate your own account" }, { status: 400 });
    }

    const $set: Record<string, unknown> = { updatedAt: new Date() };
    if (typeof body.name === "string" && body.name.trim()) $set.name = body.name.trim();
    if (typeof body.email === "string" && body.email.trim()) $set.email = body.email.toLowerCase().trim();
    if (typeof body.isActive === "boolean") $set.isActive = body.isActive;
    if (typeof body.password === "string" && body.password.length >= 8) {
      $set.passwordHash = await hashPassword(body.password);
    }

    await db.collection<Admin>("admins").updateOne({ _id: new ObjectId(id) }, { $set });

    await logAction({
      adminId: payload.sub,
      adminName: payload.name,
      action: "update",
      collection: "admins",
      documentId: id,
      details: `Updated admin: ${target.name}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("PATCH admin error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAdminFromRequest(req);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    if (payload.role !== "owner") return NextResponse.json({ success: false, error: "Forbidden: owner only" }, { status: 403 });

    const { id } = await params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    if (id === payload.sub) return NextResponse.json({ success: false, error: "Cannot delete your own account" }, { status: 400 });

    const db = await getDb();
    const target = await db.collection<Admin>("admins").findOne({ _id: new ObjectId(id) });
    if (!target) return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
    if (target.role === "owner") return NextResponse.json({ success: false, error: "Cannot delete another owner" }, { status: 400 });

    await db.collection<Admin>("admins").deleteOne({ _id: new ObjectId(id) });

    await logAction({
      adminId: payload.sub,
      adminName: payload.name,
      action: "delete",
      collection: "admins",
      documentId: id,
      details: `Deleted admin: ${target.name} (${target.email})`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE admin error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
