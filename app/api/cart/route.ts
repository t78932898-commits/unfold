import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Cart API session endpoint ready for database sync",
    items: [],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: "Item added to cart state",
      item: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid cart item payload" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: "Cart item quantity updated",
      update: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update cart item" },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  return NextResponse.json({
    success: true,
    message: "Cart cleared",
  });
}
