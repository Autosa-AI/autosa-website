/**
 * Autosa — Create Owner Account
 * Usage: node scripts/seed-owner.mjs
 *
 * Set MONGODB_URI in your .env.local or environment before running.
 * Edit the OWNER config below before first run.
 */

import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// ── Edit these before running ────────────────────────────────────────
const OWNER = {
  name: "Osama Alaa",
  email: "osama@autosa.net",
  password: "autosa@1245*",   // change this to your desired password
};
// ─────────────────────────────────────────────────────────────────────

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set. Export it or create a .env.local file.");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db("autosa");
  const admins = db.collection("admins");

  const existing = await admins.findOne({ email: OWNER.email.toLowerCase() });
  if (existing) {
    console.log(`ℹ️  Owner already exists: ${existing.email} (role: ${existing.role})`);
    await client.close();
    return;
  }

  const passwordHash = await bcrypt.hash(OWNER.password, 12);
  const now = new Date();

  const result = await admins.insertOne({
    name: OWNER.name,
    email: OWNER.email.toLowerCase(),
    passwordHash,
    role: "owner",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });

  console.log(`✅  Owner created!`);
  console.log(`    ID    : ${result.insertedId}`);
  console.log(`    Email : ${OWNER.email}`);
  console.log(`    Role  : owner`);
  console.log(`\n⚠️  Change your password after first login.`);
  await client.close();
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
