import { NextResponse } from "next/server";
import { readBusinesses } from "./utils";

export async function GET() {
  try {
    const businesses = await readBusinesses();

    return NextResponse.json(
      {
        success: true,
        message: "Retrieved businesses successfully",
        data: businesses,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve businesses" },
      { status: 500 }
    );
  }
}
