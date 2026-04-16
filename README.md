# QualiFlow v4 (Vercel-safe)

This package is built for **Next.js 15.3.1** and uses **middleware.ts** for Supabase SSR auth, which is the safer choice for Vercel on Next 15.

## What changed in v4
- Replaced `proxy.ts` with **`middleware.ts`**
- Kept Supabase SSR auth with:
  - browser client
  - server client
  - request-time session refresh
- Added auth callback route
- Added server-protected dashboard route
- Included SQL for schema, RLS, audit trail, and seed data

## Setup

1. Create a Supabase project
2. Run SQL files in this order:
   - `sql/schema.sql`
   - `sql/rls.sql`
   - `sql/audit_trail.sql`
   - `sql/seed.sql`
3. Copy `.env.local.example` to `.env.local`
4. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Install dependencies
6. Run locally
7. Push to GitHub
8. Import into Vercel
9. Add the same env vars in Vercel
10. Redeploy

## Local commands

```bash
npm install
npm run dev
```

## Most likely previous Vercel issue
The earlier package used `proxy.ts` while still pinned to **Next.js 15.3.1**. This v4 package avoids that mismatch by using **`middleware.ts`**.

## Next upgrades
- tenant lookup from `profiles`
- role-based server actions
- complaint module
- billing
