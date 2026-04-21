# Netlify Deployment Guide

This project is configured to automatically deploy to Netlify via GitHub Actions whenever you push to the `main` branch.

## Setup Instructions

### 1. Connect Netlify to GitHub
1. Go to [Netlify](https://app.netlify.com/)
2. Click "New site from Git"
3. Select GitHub and authorize Netlify
4. Select the `trotta` repository
5. Netlify will detect the build settings automatically

### 2. Set GitHub Secrets

Add these secrets to your GitHub repository settings:

**Repository Settings → Secrets and variables → Actions**

#### Required Secrets:
- `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
- `NETLIFY_SITE_ID`: Your Netlify site ID

#### How to get these values:

**NETLIFY_AUTH_TOKEN:**
1. Go to Netlify Dashboard
2. User Settings (avatar) → Applications
3. Generate new personal access token
4. Copy and paste into GitHub Secrets

**NETLIFY_SITE_ID:**
1. Go to Netlify Dashboard
2. Select your site
3. Go to Site Settings → General
4. Find "Site ID" in the Site Information section
5. Copy and paste into GitHub Secrets

### 3. Verify Configuration

After adding secrets, the next push to `main` will:
1. Trigger the GitHub Action workflow
2. Build the Next.js project
3. Deploy to Netlify automatically

Check the deployment status:
- **GitHub:** Actions tab → Deploy to Netlify workflow
- **Netlify:** Deployments section

## Build Configuration

The deployment uses these key settings:

- **Node Version:** 18
- **Build Command:** `npm run build`
- **Publish Directory:** `.next` (Next.js static export)
- **Environment:** Automatically configured via GitHub Actions

## Environment Variables

If you need environment variables for the build:

1. Add them to `.env.local` in the repository
2. Or set them in Netlify Site Settings → Build & Deploy → Environment

Common variables needed:
- `NEXT_PUBLIC_THEME_DIR` - Theme direction (ltr/rtl)
- `NEXT_PUBLIC_*` - Any public environment variables

## Manual Deployment (if needed)

### Deploy via Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy specific branch:
```bash
git push origin your-branch-name
```

The workflow will deploy preview builds for pull requests.

## Troubleshooting

### Deployment failed?
1. Check GitHub Actions logs: Actions → Deploy to Netlify
2. Check Netlify deployment logs
3. Verify secrets are set correctly
4. Ensure `npm run build` succeeds locally

### Build times out?
- Increase timeout in workflow file (currently 30 minutes)
- Check for large dependencies slowing down installation

### Site shows old content?
- Netlify caches assets; clear cache in Site Settings → Deploys → Clear cache and redeploy
- Wait 5-10 minutes for CDN cache to clear

## Monitoring Deployments

### Real-time status:
- GitHub: View Actions workflow logs
- Netlify: View Deployments timeline
- PR Comments: Netlify comments on PRs with preview URLs

### Automatic notifications:
- GitHub: Email notifications on workflow completion
- Netlify: Email notifications on deployment completion

## Advanced Configuration

For advanced features, edit:
- `.github/workflows/deploy.yml` - CI/CD workflow
- `netlify.toml` - Netlify build settings

## Support

For issues:
1. Check GitHub Actions logs
2. Check Netlify deployment logs
3. Verify environment variables
4. Run `npm run build` locally to test
