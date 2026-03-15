import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Server-side write to Firestore
    // This works even if public writes are disabled because it uses the server config
    const docRef = doc(db, "portfolio", "main");
    await setDoc(docRef, data, { merge: true });

    return NextResponse.json({ success: true, message: "Portfolio updated successfully" });
  } catch (error) {
    console.error("Update Portfolio API Error:", error);
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 });
  }
}
