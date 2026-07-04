# Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run `backend/supabase/schema.sql`.
3. Add these values to `backend/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Use the service role key only in the backend. Do not expose it to Next.js.

4. Seed the current mock catalog:

```bash
cd backend
npm run seed:supabase
```

5. Start the backend:

```bash
npm run dev
```

`backend/database.js` uses Supabase when both env vars exist. If they are
missing, it falls back to the local mock data in `backend/data.js`.
