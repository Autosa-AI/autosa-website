import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { logAction } from "@/lib/auditLog";
import { ObjectId } from "mongodb";
import type { SubProject, ServiceSlug, ErpProvider } from "@/lib/models";

const VALID_SERVICES: ServiceSlug[] = ["nova", "solvo", "yard"];
const VALID_ERP_PROVIDERS: ErpProvider[] = ["odoo", "sap", "oracle", "microsoft-dynamics", "salesforce", "netsuite", "infor", "epicor", "other"];

export async function GET(req: NextRequest) {
  try {
    const payload = await getAdminFromRequest(req);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const service = searchParams.get("service") as ServiceSlug | null;

    const db = await getDb();
    const filter = service && VALID_SERVICES.includes(service) ? { service } : {};
    const subProjects = await db
      .collection<SubProject>("sub_projects")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: subProjects }, { status: 200 });
  } catch (err) {
    console.error("GET sub-projects error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getAdminFromRequest(req);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });

    const { service, erpProviders, name, description, responsibleAdminId, githubUrl, backendGithubUrl, uiUrl, backendServerUrl } = body as {
      service?: string;
      erpProviders?: string[];
      name?: string;
      description?: string;
      responsibleAdminId?: string;
      githubUrl?: string;
      backendGithubUrl?: string;
      uiUrl?: string;
      backendServerUrl?: string;
    };

    if (!service || !VALID_SERVICES.includes(service as ServiceSlug)) {
      return NextResponse.json({ success: false, error: "Invalid service. Must be nova, solvo, or yard" }, { status: 400 });
    }
    if (service === "solvo" && (!Array.isArray(erpProviders) || erpProviders.length === 0)) {
      return NextResponse.json({ success: false, error: "At least one erpProvider is required for solvo sub-projects" }, { status: 400 });
    }
    const validatedErpProviders = Array.isArray(erpProviders)
      ? (erpProviders.filter((p) => VALID_ERP_PROVIDERS.includes(p as ErpProvider)) as ErpProvider[])
      : [];
    if (!name?.trim()) return NextResponse.json({ success: false, error: "name is required" }, { status: 400 });
    if (!description?.trim()) return NextResponse.json({ success: false, error: "description is required" }, { status: 400 });

    const db = await getDb();

    let responsibleAdminName: string | undefined;
    if (responsibleAdminId && ObjectId.isValid(responsibleAdminId)) {
      const admin = await db.collection("admins").findOne({ _id: new ObjectId(responsibleAdminId) }, { projection: { name: 1 } });
      responsibleAdminName = (admin as { name?: string })?.name;
    }

    const now = new Date();
    const doc: Omit<SubProject, "_id"> = {
      service: service as ServiceSlug,
      ...(validatedErpProviders.length > 0 ? { erpProviders: validatedErpProviders } : {}),
      name: name.trim(),
      description: description.trim(),
      responsibleAdminId: responsibleAdminId && ObjectId.isValid(responsibleAdminId) ? new ObjectId(responsibleAdminId) : undefined,
      responsibleAdminName,
      githubUrl: githubUrl?.trim() || undefined,
      backendGithubUrl: backendGithubUrl?.trim() || undefined,
      uiUrl: uiUrl?.trim() || undefined,
      backendServerUrl: backendServerUrl?.trim() || undefined,
      createdBy: new ObjectId(payload.sub),
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection<Omit<SubProject, "_id">>("sub_projects").insertOne(doc);

    await logAction({
      adminId: payload.sub,
      adminName: payload.name,
      action: "create",
      collection: "sub_projects",
      documentId: result.insertedId,
      details: `Created sub-project: ${name.trim()} under ${service}`,
    });

    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...doc } }, { status: 201 });
  } catch (err) {
    console.error("POST sub-projects error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
