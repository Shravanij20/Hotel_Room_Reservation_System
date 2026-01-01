# Deployment Guide

This guide will help you deploy your Hotel Room Reservation System to make it accessible via a live URL.

## Prerequisites

1. A GitHub account
2. Node.js and npm installed on your machine
3. A free account on one of these platforms:
   - [Vercel](https://vercel.com) (Recommended - easiest)
   - [Netlify](https://netlify.com)
   - [GitHub Pages](https://pages.github.com)

## Step-by-Step Deployment Instructions

### Option 1: Deploy to Vercel (Recommended - 5 minutes)

1. **Prepare your code:**
   ```bash
   # Make sure you're in the project directory
   cd unstop_project
   
   # Install dependencies (if not already done)
   npm install
   
   # Test the build locally
   npm run build
   ```

2. **Push to GitHub:**
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: Hotel Room Reservation System"
   
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"
   - Wait 1-2 minutes for deployment
   - Your app will be live at: `https://your-project-name.vercel.app`

### Option 2: Deploy to Netlify

1. **Push to GitHub** (same as Step 2 above)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign in with GitHub
   - Click "Add new site" > "Import an existing project"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"
   - Your app will be live at: `https://random-name-123456.netlify.app`

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   },
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
   ```

3. **Update vite.config.js:**
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/YOUR_REPO_NAME/'
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Settings > Pages
   - Source: Select "gh-pages" branch
   - Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Testing Your Deployment

After deployment, test these features:

1. ✅ Enter a number (1-5) and click "Book" - should book optimal rooms
2. ✅ Click "Random" - should generate random bookings
3. ✅ Click "Reset" - should clear all bookings
4. ✅ Verify room visualization displays all 97 rooms correctly
5. ✅ Check that travel time is displayed after booking

## Getting Your Live URL

After successful deployment, you'll receive a URL like:
- Vercel: `https://hotel-reservation-system.vercel.app`
- Netlify: `https://hotel-reservation-system.netlify.app`
- GitHub Pages: `https://yourusername.github.io/hotel-reservation-system`

**Copy this URL** - you'll need it for your submission!

## Troubleshooting

### Build Fails
- Make sure all dependencies are installed: `npm install`
- Check for errors: `npm run build`
- Ensure Node.js version is 16+

### 404 Error on GitHub Pages
- Make sure `base` path in `vite.config.js` matches your repository name
- Redeploy after changing the base path

### App Not Loading
- Check browser console for errors
- Verify all environment variables (if any) are set
- Make sure the build completed successfully

## Submission Checklist

Before submitting your assessment:

- [ ] Code is pushed to GitHub repository
- [ ] Repository is public OR set to "Anyone with the link"
- [ ] App is deployed and live URL is accessible
- [ ] All features work correctly on the live URL
- [ ] README.md includes the live URL
- [ ] Google Doc is created with:
  - Working app link
  - Code repository link
  - Solution explanation
  - Privacy set to "Anyone with the link"

## Need Help?

If you encounter issues:
- Check the platform's documentation
- Review build logs for errors
- Test locally first: `npm run build && npm run preview`

Good luck with your submission! 🚀

