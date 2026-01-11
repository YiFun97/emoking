import { NextResponse } from "next/server";
import { UuidService } from "@/app/api/services/uuid-service";

export const runtime = 'edge';

export async function GET(request: Request) {
  // 1. Controller Layer: Parse Request
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get('prefix') || undefined;

  // 2. Service Layer: Execute Business Logic
  const result = UuidService.generate(prefix);
  
  // 3. Controller Layer: Return Response
  return NextResponse.json(result);
}
