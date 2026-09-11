import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: "CUSTOMER" | "ADMIN";
}

// Session validation placeholder for Milestone 1
export async function getCurrentUser(): Promise<SessionUser | null> {
  // Prepared for production JWT / session cookie extraction
  return null;
}
