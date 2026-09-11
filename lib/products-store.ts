import { promises as fs } from "fs";
import path from "path";
import { Product } from "@/types";

const STORE_PATH = path.join(process.cwd(), "data", "custom-products.json");

// Mutex promise queue to ensure atomic sequential writes
let writeQueue: Promise<void> = Promise.resolve();

/**
 * Loads custom products created by the administrator.
 */
export async function getCustomProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error: any) {
    // If file doesn't exist yet, return empty list
    if (error?.code === "ENOENT") {
      return [];
    }
    console.error("[ProductsStore] Error reading custom products store:", error);
    return [];
  }
}

/**
 * Persists a product atomically using temporary file swap and serialized execution.
 */
export async function saveCustomProduct(product: Product): Promise<void> {
  // Chain to write queue to prevent concurrent race conditions
  writeQueue = writeQueue.then(async () => {
    const current = await getCustomProducts();
    const existingIdx = current.findIndex((p) => p.slug === product.slug || p.id === product.id);

    if (existingIdx >= 0) {
      current[existingIdx] = product;
    } else {
      current.unshift(product);
    }

    const dir = path.dirname(STORE_PATH);
    await fs.mkdir(dir, { recursive: true });

    // Write to a temporary file first
    const tempPath = `${STORE_PATH}.tmp.${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const serialized = JSON.stringify(current, null, 2);

    await fs.writeFile(tempPath, serialized, "utf-8");

    // Atomic rename replaces the destination file safely
    await fs.rename(tempPath, STORE_PATH);
  });

  return writeQueue;
}
