import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(rootDir, "prisma", "dev.db");
const backupDir = join(rootDir, "prisma", "backups");

if (!existsSync(source)) {
  console.error("Không tìm thấy prisma/dev.db — chưa có database để backup.");
  process.exit(1);
}

mkdirSync(backupDir, { recursive: true });

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const dest = join(backupDir, `dev-${today}.db`);

copyFileSync(source, dest);
console.log(`Đã backup database vào: prisma/backups/dev-${today}.db`);
