import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { AuditLog } from "@/lib/models";

export async function GET(req: NextRequest) {
  try {
    const payload = await getAdminFromRequest(req);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
    const action = searchParams.get("action");

    const db = await getDb();

    const filter: Record<string, unknown> = {};
    if (payload.role !== "owner") {
      filter.adminId = new ObjectId(payload.sub);
    }
    if (action && ["create", "update", "delete", "login", "logout"].includes(action)) {
      filter.action = action;
    }

    const total = await db.collection<AuditLog>("audit_logs").countDocuments(filter);
    const logs = await db
      .collection<AuditLog>("audit_logs")
      .find(filter)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json(
      { success: true, data: logs, meta: { total, page, limit, pages: Math.ceil(total / limit) } },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET audit error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
