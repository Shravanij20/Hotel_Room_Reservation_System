# GitHub Setup Instructions

Your code is already committed locally! Now follow these steps:

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `hotel-room-reservation-system` (or any name you prefer)
4. Description: "Hotel Room Reservation System - Unstop Assessment"
5. Choose **Public** (or Private - either works)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

**Option A: If you created the repo with a README (unlikely):**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**Option B: If you created an empty repo (recommended):**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name!

## Step 3: Verify

Check your GitHub repository - you should see all your files there!

## Next: Deploy to Vercel

Once your code is on GitHub, proceed with Vercel deployment (see below).

