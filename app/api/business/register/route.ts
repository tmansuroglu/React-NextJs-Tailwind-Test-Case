import { NextResponse } from "next/server";
import { RegisterBusinessRequestPayload } from "../../../types/payload";
import { readBusinesses, writeBusinesses } from "../utils";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as RegisterBusinessRequestPayload;

    const newData = { ...data, id: crypto.randomUUID() };

    const responseData = {
      success: true,
      message: `Registered business successfully`,
      data: newData,
    };

    const existingBusinesses = await readBusinesses();

    await writeBusinesses([...existingBusinesses, newData]);

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.log("Failed to register business", error);
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 400 }
    );
  }
}
