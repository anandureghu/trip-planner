import axios from "axios";
import console from "console";
import { NextRequest, NextResponse } from "next/server";

const PEXELS_API = "https://api.pexels.com/v1/search";
const API_KEY = process.env.PEXELS_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.get(PEXELS_API, {
      params: body,
      headers: { Authorization: API_KEY },
    });
    const { data } = response;

    return NextResponse.json({ ...data });
  } catch (err) {
    console.error("Error getting pexels:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
