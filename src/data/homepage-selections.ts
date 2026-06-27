import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "homepage-destinations.json");

export function readHomepageDestinationIds(): string[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    const json = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    return Array.isArray(json.documentIds) ? json.documentIds.slice(0, 6) : [];
  } catch {
    return [];
  }
}

export function writeHomepageDestinationIds(ids: string[]): void {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify({ documentIds: ids.slice(0, 6) }, null, 2), "utf-8");
}
