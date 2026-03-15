import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Server-side validation against Firestore
    const docRef = doc(db, "admin-credential", "Admin-credential");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.Email === email && data.Password === password) {
        // In a production app, you would sign a JWT or set a secure cookie here.
        // For now, we return success to allow the dashboard redirect.
        return NextResponse.json({ success: true, message: "Login successful" });
      }
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
