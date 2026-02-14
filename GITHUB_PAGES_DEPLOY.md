# GitHub Pages Deployment - Step by Step Guide

## ✅ Configuration Complete!

I've already configured your project for GitHub Pages deployment. Here's what was done:

1. ✅ Installed `gh-pages` package
2. ✅ Added deploy scripts to `package.json`
3. ✅ Set homepage URL in `package.json`
4. ✅ Configured base path in `vite.config.ts`

---

## Step-by-Step Deployment Instructions

### Step 1: Test the Build Locally

First, make sure everything builds correctly:

```bash
npm run build
```

This should create a `dist` folder with your built files. If you see any errors, fix them before proceeding.

### Step 2: Test the Build Preview

Preview the production build locally:

```bash
npm run preview
```

Visit `http://localhost:4173` to see how it will look on GitHub Pages.

### Step 3: Commit Your Changes

Make sure all your configuration changes are committed:

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### Step 4: Deploy to GitHub Pages

Run the deploy command:

```bash
npm run deploy
```

This will:
1. Build your project (`npm run build`)
2. Create/update a `gh-pages` branch
3. Push the `dist` folder contents to that branch

### Step 5: Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository: `https://github.com/Perflection-AI/swinglens_website`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 6: Wait for Deployment

- GitHub Pages usually takes 1-2 minutes to deploy
- You'll see a green checkmark when it's ready
- Your site will be available at: `https://Perflection-AI.github.io/swinglens_website/`

---

## Future Updates

Every time you want to update the deployed site:

```bash
# Make your changes, then:
git add .
git commit -m "Your update message"
git push origin main
npm run deploy
```

The `npm run deploy` command will automatically rebuild and update the GitHub Pages site.

---

## Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`

### 404 Errors on Routes
- GitHub Pages is configured correctly with the base path
- All routes should work with the `/swinglens_website/` prefix
- **Direct links (e.g. /privacy, /terms):** The build copies `index.html` to `404.html` so that when someone opens a direct URL (e.g. from the iOS app), GitHub Pages serves the app and client-side routing shows the correct page.

### Assets Not Loading
- Make sure the base path in `vite.config.ts` is `/swinglens_website/`
- All assets should be relative paths (Vite handles this automatically)

### Site Not Updating
- Wait 1-2 minutes after deployment
- Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check the Actions tab in GitHub for deployment status

---

## Your Site URL

Once deployed, your site will be available at:
**https://Perflection-AI.github.io/swinglens_website/**

---

## Quick Reference Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Full workflow (after making changes)
git add .
git commit -m "Update message"
git push origin main
npm run deploy
```

---

## Need Help?

If you encounter any issues:
1. Check the build output for errors
2. Verify GitHub Pages is enabled in repository settings
3. Check the `gh-pages` branch exists and has content
4. Wait a few minutes and try again

Good luck with your deployment! 🚀

