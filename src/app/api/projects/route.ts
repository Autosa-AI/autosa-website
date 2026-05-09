import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { logAction } from "@/lib/auditLog";
import { ObjectId } from "mongodb";
import type { Project, SubProject } from "@/lib/models";

export async function GET(req: NextRequest) {
  try {
    const payload = await getAdminFromRequest(req);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const subProjectId = searchParams.get("subProjectId");

    const db = await getDb();
    const filter = subProjectId && ObjectId.isValid(subProjectId)
      ? { subProjectId: new ObjectId(subProjectId) }
      : {};

    const projects = await db
      .collection<Project>("projects")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (err) {
    console.error("GET projects error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getAdminFromRequest(req);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });

    const { subProjectId, name, description, responsibleAdminId, githubUrl, demoUrl } = body as {
      subProjectId?: string;
      name?: string;
      description?: string;
      responsibleAdminId?: string;
      githubUrl?: string;
      demoUrl?: string;
    };

    if (!subProjectId || !ObjectId.isValid(subProjectId)) {
      return NextResponse.json({ success: false, error: "Valid subProjectId is required" }, { status: 400 });
    }
    if (!name?.trim()) return NextResponse.json({ success: false, error: "name is required" }, { status: 400 });
    if (!description?.trim()) return NextResponse.json({ success: false, error: "description is required" }, { status: 400 });

    const db = await getDb();

    const subProject = await db.collection<SubProject>("sub_projects").findOne({ _id: new ObjectId(subProjectId) });
    if (!subProject) return NextResponse.json({ success: false, error: "Sub-project not found" }, { status: 404 });

    let responsibleAdminName: string | undefined;
    if (responsibleAdminId && ObjectId.isValid(responsibleAdminId)) {
      const admin = await db.collection("admins").findOne({ _id: new ObjectId(responsibleAdminId) }, { projection: { name: 1 } });
      responsibleAdminName = (admin as { name?: string })?.name;
    }

    const now = new Date();
    const doc: Omit<Project, "_id"> = {
      subProjectId: new ObjectId(subProjectId),
      service: subProject.service,
      name: name.trim(),
      description: description.trim(),
      responsibleAdminId: responsibleAdminId && ObjectId.isValid(responsibleAdminId) ? new ObjectId(responsibleAdminId) : undefined,
      responsibleAdminName,
      githubUrl: githubUrl?.trim() || undefined,
      demoUrl: demoUrl?.trim() || undefined,
      createdBy: new ObjectId(payload.sub),
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection<Omit<Project, "_id">>("projects").insertOne(doc);

    await logAction({
      adminId: payload.sub,
      adminName: payload.name,
      action: "create",
      collection: "projects",
      documentId: result.insertedId,
      details: `Created project: ${name.trim()} under sub-project ${subProject.name}`,
    });

    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...doc } }, { status: 201 });
  } catch (err) {
    console.error("POST projects error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
