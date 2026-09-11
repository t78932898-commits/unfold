/**
 * Production-Grade Image File Validation
 * 
 * Inspects binary magic bytes, file size, and extension to prevent
 * MIME spoofing, Stored XSS (e.g. through SVG), and remote code execution.
 */

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export interface ValidationResult {
  valid: boolean;
  error?: string;
  extension?: string;
  mime?: string;
}

/**
 * Inspects binary header bytes of an ArrayBuffer to verify genuine image types.
 */
export function validateImageBuffer(buffer: Buffer | Uint8Array, originalName?: string): ValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: "Empty or invalid image file buffer." };
  }

  if (buffer.length > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds the 5MB limit (provided ${Math.round(buffer.length / 1024 / 1024 * 10) / 10}MB).`,
    };
  }

  // Check for SVG signatures to strictly prevent SVG uploads (Stored XSS risk)
  const headerSlice = buffer.slice(0, 512).toString("utf-8").toLowerCase();
  if (
    headerSlice.includes("<svg") ||
    headerSlice.includes("<?xml") ||
    (originalName && originalName.toLowerCase().endsWith(".svg"))
  ) {
    return {
      valid: false,
      error: "SVG files are strictly disallowed for security reasons. Please upload JPG, PNG, or WEBP.",
    };
  }

  // 1. JPEG Magic Bytes: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, extension: ".jpg", mime: "image/jpeg" };
  }

  // 2. PNG Magic Bytes: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, extension: ".png", mime: "image/png" };
  }

  // 3. WEBP Magic Bytes: 'RIFF' .... 'WEBP'
  // Bytes 0-3: 52 49 46 46 ("RIFF")
  // Bytes 8-11: 57 45 42 50 ("WEBP")
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, extension: ".webp", mime: "image/webp" };
  }

  return {
    valid: false,
    error: "Invalid file content. Uploaded file does not match genuine JPEG, PNG, or WEBP binary signatures.",
  };
}
