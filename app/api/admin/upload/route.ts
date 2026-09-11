import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import { validateImageBuffer } from "@/lib/file-validation";

export async function POST(request: Request) {
  try {
    // 1. Independent Route-Level Admin Session Verification
    const cookieStore = cookies();
    const adminToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const session = adminToken ? await verifyAdminToken(adminToken) : null;

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required to upload product images." },
        { status: 401 }
      );
    }

    // 2. CSRF / Origin Verification
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          return NextResponse.json(
            { success: false, error: "Cross-Origin request blocked." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid Origin header." },
          { status: 403 }
        );
      }
    }

    // 3. Parse Multipart Form Data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const rawSlug = (formData.get("slug") as string) || "custom-drops";
    const rawView = (formData.get("view") as string) || "front";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided in upload request." },
        { status: 400 }
      );
    }

    // 4. Inspect File Buffer & Binary Magic Bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const validation = validateImageBuffer(buffer, file.name);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // 5. Sanitize Slug & Prevent Path Traversal
    const safeSlug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const safeView = ["front", "back", "lookbook", "detail"].includes(rawView.toLowerCase())
      ? rawView.toLowerCase()
      : "view";

    // Target upload directory anchored strictly under public/images/products
    const baseUploadDir = path.resolve(process.cwd(), "public", "images", "products");
    const uploadDir = path.resolve(baseUploadDir, safeSlug || "general");

    // Enforce that uploadDir stays within baseUploadDir
    if (!uploadDir.startsWith(baseUploadDir)) {
      return NextResponse.json(
        { success: false, error: "Path traversal attempt detected and blocked." },
        { status: 400 }
      );
    }

    await fs.mkdir(uploadDir, { recursive: true });

    // 6. Safe Server-Generated Filename
    const extension = validation.extension || ".jpg";
    const fileName = `${safeView}-${Date.now()}${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/images/products/${safeSlug || "general"}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      mime: validation.mime,
    });
  } catch (error) {
    console.error("[Upload Handler Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process image upload." },
      { status: 500 }
    );
  }
}
