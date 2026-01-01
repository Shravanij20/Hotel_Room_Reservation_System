# PowerShell Script to Push to GitHub
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values

$username = Read-Host "Enter your GitHub username"
$reponame = Read-Host "Enter your repository name"

Write-Host "Setting up remote..." -ForegroundColor Green
git remote add origin "https://github.com/$username/$reponame.git"

Write-Host "Renaming branch to main..." -ForegroundColor Green
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "Done! Check https://github.com/$username/$reponame" -ForegroundColor Green

