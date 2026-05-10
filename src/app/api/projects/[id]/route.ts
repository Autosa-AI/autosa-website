import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { logAction } from "@/lib/auditLog";
import { ObjectId } from "mongodb";
import type { Project } from "@/lib/models";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAdminFromRequest(req);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });

    const db = await getDb();
    const target = await db.collection<Project>("projects").findOne({ _id: new ObjectId(id) });
    if (!target) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });

    const $set: Record<string, unknown> = { updatedAt: new Date() };
    if (typeof body.name === "string" && body.name.trim()) $set.name = body.name.trim();
    if (typeof body.description === "string" && body.description.trim()) $set.description = body.description.trim();
    if (typeof body.githubUrl === "string") $set.githubUrl = body.githubUrl.trim() || undefined;
    if (typeof body.backendGithubUrl === "string") $set.backendGithubUrl = body.backendGithubUrl.trim() || undefined;
    if (typeof body.uiUrl === "string") $set.uiUrl = body.uiUrl.trim() || undefined;
    if (typeof body.backendServerUrl === "string") $set.backendServerUrl = body.backendServerUrl.trim() || undefined;

    if (body.responsibleAdminId && ObjectId.isValid(body.responsibleAdminId)) {
      const admin = await db.collection("admins").findOne({ _id: new ObjectId(body.responsibleAdminId) }, { projection: { name: 1 } });
      $set.responsibleAdminId = new ObjectId(body.responsibleAdminId);
      $set.responsibleAdminName = (admin as { name?: string })?.name;
    }

    await db.collection<Project>("projects").updateOne({ _id: new ObjectId(id) }, { $set });

    await logAction({
      adminId: payload.sub,
      adminName: payload.name,
      action: "update",
      collection: "projects",
      documentId: id,
      details: `Updated project: ${target.name}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("PATCH project error:", err);
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

    const { id } = await params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });

    const db = await getDb();
    const target = await db.collection<Project>("projects").findOne({ _id: new ObjectId(id) });
    if (!target) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });

    await db.collection<Project>("projects").deleteOne({ _id: new ObjectId(id) });

    await logAction({
      adminId: payload.sub,
      adminName: payload.name,
      action: "delete",
      collection: "projects",
      documentId: id,
      details: `Deleted project: ${target.name}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE project error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
