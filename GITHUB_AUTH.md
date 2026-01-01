# GitHub Authentication Required

GitHub requires authentication to push code. Here are your options:

## Option 1: Personal Access Token (Recommended - Quickest)

### Step 1: Create a Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Direct link: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Name it: "Vercel Deployment" (or any name)
4. Select expiration: **90 days** (or "No expiration" if you prefer)
5. Check these permissions:
   - ✅ `repo` (Full control of private repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 2: Push Using Token
When you run `git push`, use the token as your password:
- Username: `Shravanij20`
- Password: `[paste your token here]`

Or run this command (replace YOUR_TOKEN):
```bash
git push https://YOUR_TOKEN@github.com/Shravanij20/Hotel_Room_Reservation_System.git main
```

## Option 2: GitHub CLI (gh)

1. Install GitHub CLI: https://cli.github.com/
2. Run: `gh auth login`
3. Follow the prompts
4. Then: `git push -u origin main`

## Option 3: Use GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Add your local repository
4. Push from the GUI

## Option 4: SSH (For future use)

Set up SSH keys for passwordless authentication (better for long-term use).

---

**Once authenticated, your code will push successfully!**

