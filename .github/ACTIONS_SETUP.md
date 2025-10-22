# GitHub Actions Auto-Deploy Setup

This repository is configured for automatic deployment to Vercel using GitHub Actions.

## 🚀 How It Works

- **Push to branch** → Automatically deploys to Vercel Production
- **Create Pull Request** → Automatically creates Vercel Preview deployment
- **Every commit** → Gets tested and deployed

## 📋 One-Time Setup (Required)

You need to add 3 secrets to your GitHub repository. Here's how:

### Step 1: Get Your Vercel Tokens

1. Go to [vercel.com](https://vercel.com) and sign in
2. Go to **Account Settings** → **Tokens**
3. Click **Create Token**
4. Name it "GitHub Actions"
5. Copy the token (you'll use this as `VERCEL_TOKEN`)

### Step 2: Create a Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `luciddev/worldcup`
3. Click **Deploy** (this creates the project)
4. Once deployed, go to **Project Settings**

### Step 3: Get Project & Org IDs

In your Vercel project settings:

1. Go to **Settings** → **General**
2. Scroll down to find:
   - **Project ID** (copy this)
   - **Organization ID** (copy this)

Or run this in your project directory:
```bash
# This creates .vercel folder with project info
vercel link
cat .vercel/project.json
```

### Step 4: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these 3 secrets:

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `VERCEL_TOKEN` | Your Vercel token | Step 1 above |
| `VERCEL_ORG_ID` | Your org/team ID | Step 3 above or from `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Your project ID | Step 3 above or from `.vercel/project.json` |

## ✅ After Setup

Once secrets are added:

1. **Push any commit** → Auto-deploys to production ✨
2. **Create a PR** → Auto-creates preview deployment 🔍
3. **Merge PR** → Auto-deploys to production 🚀

## 🔍 View Deployment Status

- Go to **Actions** tab in GitHub
- See real-time deployment progress
- Get deployment URLs in PR comments

## 🎯 Quick Setup Commands

```bash
# 1. Link to Vercel (run in project directory)
vercel link

# 2. Get your project details
cat .vercel/project.json

# 3. Output will show:
# {
#   "orgId": "team_xxxxx",      ← Use as VERCEL_ORG_ID
#   "projectId": "prj_xxxxx"    ← Use as VERCEL_PROJECT_ID
# }
```

## 🌐 Deployment URLs

After deployment, you'll get:
- **Production**: `https://worldcup-2026.vercel.app`
- **Preview** (PRs): `https://worldcup-2026-git-branch.vercel.app`

## 🔧 Troubleshooting

### "Secrets not found"
- Make sure you added all 3 secrets to GitHub
- Check spelling (they're case-sensitive)

### "Vercel token invalid"
- Generate a new token at vercel.com/account/tokens
- Update the `VERCEL_TOKEN` secret in GitHub

### "Project not found"
- Run `vercel link` to create `.vercel/project.json`
- Use the IDs from that file

## 📚 More Info

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/deployments/git/vercel-for-github)

## 🎉 Benefits

✅ **Automatic deployments** - Push and forget
✅ **Preview deployments** - Test PRs before merging
✅ **Rollback support** - Easy to revert if needed
✅ **Build logs** - See exactly what happened
✅ **No manual work** - Everything is automated

---

**Need help?** Check the Actions tab in GitHub for detailed logs of each deployment.
