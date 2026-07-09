import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* ==========================================================================
   SERVER-SIDE SIGNUP ROUTE
   Uses the service role key to create users directly via Admin API,
   bypassing Supabase's email-sending flow entirely (no SMTP needed).
   ========================================================================== */

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { email, password, username } = parsed.data;

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey || serviceKey === "your-service-role-key-here") {
      console.error("❌ SUPABASE_SERVICE_ROLE_KEY is not set or is still the placeholder in .env.local!");
      return NextResponse.json(
        { error: "Server configuration error. Please check SUPABASE_SERVICE_ROLE_KEY in .env.local." },
        { status: 500 }
      );
    }

    // Use service role key — this runs server-side only, never exposed to client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Create user with email_confirm: true → no email is sent at all
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ← mark as confirmed immediately, skip all emails
      user_metadata: {
        display_name: username,
        username: username,
        full_name: username,
        avatar_url: "/avt-placeholder.jpg",
      },
    });

    if (error) {
      console.error("❌ Supabase Admin createUser error:", error);
      const errMsg = error.message || JSON.stringify(error);
      
      // Handle duplicate email gracefully
      if (errMsg.toLowerCase().includes("already been registered") ||
          errMsg.toLowerCase().includes("already exists")) {
        return NextResponse.json(
          { error: "An account with this email already exists. Please log in instead." },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: errMsg }, { status: 400 });
    }

    return NextResponse.json({ userId: data.user?.id }, { status: 201 });
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error("❌ Signup route crash:", err);
    return NextResponse.json(
      { error: err?.message || "Server error. Please try again." },
      { status: 500 }
    );
  }
}
