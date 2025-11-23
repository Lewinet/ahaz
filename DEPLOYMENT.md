# Vercel Deployment Guide

## Environment Variables Setup

Your Vercel deployment failed because the Supabase environment variables are missing. Follow these steps to add them:

### Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Anon/Public Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Step 2: Add Environment Variables to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to your Vercel project: https://vercel.com/lewinet/ahaz
2. Click on **Settings** tab
3. Click on **Environment Variables** in the sidebar
4. Add the following variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `your_supabase_project_url`
   - Environment: Production, Preview, Development (check all)

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `your_supabase_anon_key`
   - Environment: Production, Preview, Development (check all)

5. Click **Save**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your Supabase URL when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your Supabase anon key when prompted
```

### Step 3: Redeploy

After adding the environment variables:

1. Go to your Vercel project dashboard
2. Click on **Deployments** tab
3. Find the latest deployment
4. Click the **three dots** menu → **Redeploy**
5. Check **Use existing Build Cache** (optional)
6. Click **Redeploy**

OR simply push a new commit to trigger a deployment:

```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

### Step 4: Verify Deployment

Once the deployment completes:

1. Visit your deployed app URL
2. Try signing in or creating an account
3. Verify all features work correctly

## OAuth Configuration (Optional)

If you want OAuth to work in production:

### Google OAuth

1. Go to Google Cloud Console
2. Add your Vercel domain to authorized redirect URIs:
   - `https://your-app.vercel.app/auth/callback`
3. Update Supabase OAuth settings with the same redirect URI

### GitHub OAuth

1. Go to GitHub OAuth App settings
2. Add your Vercel domain to authorized redirect URIs:
   - `https://your-app.vercel.app/auth/callback`
3. Update Supabase OAuth settings with the same redirect URI

## Troubleshooting

### Build Still Failing?

1. **Check environment variables are set correctly**
   - Go to Vercel → Settings → Environment Variables
   - Verify both variables are present
   - Check for typos

2. **Clear build cache**
   - Redeploy with "Clear Build Cache" option

3. **Check Supabase credentials**
   - Verify URL and key are correct
   - Make sure you're using the **anon/public** key, not the service role key

### Runtime Errors?

1. **Database not set up**
   - Run the SQL schema in Supabase SQL Editor
   - Execute migrations

2. **OAuth not working**
   - Add production URLs to OAuth provider settings
   - Update Supabase redirect URLs

## Quick Reference

### Required Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Deployment Checklist

- [ ] Environment variables added to Vercel
- [ ] Database schema applied in Supabase
- [ ] OAuth providers configured (if using)
- [ ] Deployment successful
- [ ] App accessible and functional

---

**Need help?** Check the Vercel deployment logs for specific error messages.
