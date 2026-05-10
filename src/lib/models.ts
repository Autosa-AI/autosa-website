import { ObjectId } from "mongodb";

export interface Admin {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: "owner" | "admin";
  isActive: boolean;
  createdBy?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export type AdminWithoutPassword = Omit<Admin, "passwordHash">;

export type ServiceSlug = "nova" | "solvo" | "yard";

export interface SubProject {
  _id: ObjectId;
  service: ServiceSlug;
  name: string;
  description: string;
  responsibleAdminId?: ObjectId;
  responsibleAdminName?: string;
  githubUrl?: string;
  backendGithubUrl?: string;
  uiUrl?: string;
  backendServerUrl?: string;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id: ObjectId;
  subProjectId: ObjectId;
  service: ServiceSlug;
  name: string;
  description: string;
  responsibleAdminId?: ObjectId;
  responsibleAdminName?: string;
  githubUrl?: string;
  backendGithubUrl?: string;
  uiUrl?: string;
  backendServerUrl?: string;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  _id: ObjectId;
  adminId: ObjectId;
  adminName: string;
  action: "create" | "update" | "delete" | "login" | "logout";
  collection: string;
  documentId?: ObjectId;
  details: string;
  timestamp: Date;
}

export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  role: "owner" | "admin";
  iat?: number;
  exp?: number;
}
