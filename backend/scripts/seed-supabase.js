import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in backend/.env",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function clearTable(table) {
  const { error } = await supabase.from(table).delete().neq("id", "");
  if (error) {
    throw new Error(`Failed to clear table ${table}: ${error.message}`);
  }
}

console.log("Clearing all database tables to reset to a completely empty state...");
try {
  await clearTable("marketplace_products");
  await clearTable("seller_profiles");
  await clearTable("marketplace_users");
  console.log("Database reset successfully! All tables are now clean and empty.");
} catch (error) {
  console.error("Failed to reset database:", error.message);
}
