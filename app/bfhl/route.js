import { NextResponse } from "next/server";
import { USER_ID, EMAIL_ID, COLLEGE_ROLL_NUMBER } from "@/lib/constants";
import { parseInput } from "@/lib/parser";
import { buildHierarchies } from "@/lib/graph";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  return NextResponse.json(
    { status: "ok", message: "POST /bfhl to analyse node hierarchies" },
    { status: 200, headers: CORS }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: CORS }
    );
  }

  const { data } = body ?? {};

  const { validEdges, invalidEntries, duplicateEdges } = parseInput(data);
  const { hierarchies, summary } = buildHierarchies(validEdges);

  return NextResponse.json(
    {
      user_id: USER_ID,
      email_id: EMAIL_ID,
      college_roll_number: COLLEGE_ROLL_NUMBER,
      hierarchies,
      invalid_entries: invalidEntries,
      duplicate_edges: duplicateEdges,
      summary,
    },
    { status: 200, headers: CORS }
  );
}
