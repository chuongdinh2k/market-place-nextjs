import { NextResponse } from "next/server";

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  // Default error response for unknown errors
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return NextResponse.json({ error: message }, { status: 500 });
}
