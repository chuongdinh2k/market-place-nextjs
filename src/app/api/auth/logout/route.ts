import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Delete the auth cookie
    (
      await // Delete the auth cookie
      cookies()
    ).delete("auth_token");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 }
    );
  }
}
