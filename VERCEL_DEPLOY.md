# Deploy to Vercel - Quick Guide

## Prerequisites
✅ Your code must be pushed to GitHub first

## Step-by-Step Vercel Deployment

### Step 1: Sign Up / Sign In to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Log In"** if you have an account)
3. Choose **"Continue with GitHub"** - this is the easiest option
4. Authorize Vercel to access your GitHub repositories

### Step 2: Import Your Project
1. After logging in, click **"Add New..."** button
2. Select **"Project"**
3. You'll see a list of your GitHub repositories
4. Find and click on `hotel-room-reservation-system` (or whatever you named it)
5. Click **"Import"**

### Step 3: Configure Build Settings
Vercel will auto-detect Vite settings, but verify:
- **Framework Preset**: Vite (should be auto-detected)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist` (default)
- **Install Command**: `npm install` (default)

**Usually, you don't need to change anything!** Just click **"Deploy"**

### Step 4: Deploy!
1. Click the **"Deploy"** button
2. Wait 1-2 minutes for the build to complete
3. Your app will be live automatically!

### Step 5: Get Your Live URL
- After deployment, Vercel will show you a URL like:
  - `https://hotel-room-reservation-system.vercel.app`
  - Or a custom one if you configured it
- **Copy this URL** - you'll need it for your submission!

## Automatic Deployments

✅ **Future updates**: Every time you push to GitHub, Vercel will automatically redeploy your app!

## Troubleshooting

**Build failed?**
- Check the build logs in Vercel dashboard
- Make sure `npm run build` works locally first
- Verify all dependencies are in `package.json`

**App not loading?**
- Check browser console for errors
- Verify the deployment completed successfully
- Check Vercel logs for any errors

## Custom Domain (Optional)

You can add a custom domain in Vercel settings if you want, but the default `.vercel.app` URL works perfectly for your submission!

---

**Need help?** Check the Vercel documentation or ask me!

