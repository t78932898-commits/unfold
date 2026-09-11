import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    orders: [],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      status: "CONFIRMED",
      paymentStatus: "PENDING",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 400 }
    );
  }
}
