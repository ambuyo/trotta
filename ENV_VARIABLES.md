# Environment Variables Documentation

## 🔒 PRIVATE VARIABLES (Server-side only)
These are sensitive and must NEVER be exposed to the frontend. Keep them in `.env` or `.env.local`.

```env
# Directus CMS
DIRECTUS_ADMIN_TOKEN=epq_e8Y6m_caIjKprAKDtjmP1i6QN6iE
DIRECTUS_FORM_TOKEN=nxv0HcsZ4ukbJGQW7kZ4e5cC0uxi_am2

# Draft Mode
DRAFT_MODE_SECRET=HLslnmg_DsAvDSwrPjNamZYgMvjXRbgp

# WordPress Credentials
WORDPRESS_APP_USERNAME=Amukune
WORDPRESS_APP_PASSWORD=jYwP q5wz HR0L 0fqd Q81P 63PM
```

| Variable | Purpose | Type |
|----------|---------|------|
| `DIRECTUS_ADMIN_TOKEN` | Admin access to Directus CMS | Secret |
| `DIRECTUS_FORM_TOKEN` | Form submission authentication | Secret |
| `DRAFT_MODE_SECRET` | Draft/preview mode access control | Secret |
| `WORDPRESS_APP_USERNAME` | WordPress API authentication | Credential |
| `WORDPRESS_APP_PASSWORD` | WordPress API authentication | Credential |

---

## 🌐 PUBLIC VARIABLES (Frontend accessible)
These are safe to expose and prefixed with `NEXT_PUBLIC_`. Available in the browser.

```env
# Directus CMS
NEXT_PUBLIC_DIRECTUS_URL=https://api.trotta.co
NEXT_PUBLIC_ASSETS_URL=https://api.trotta.co
DIRECTUS_PUBLIC_TOKEN=1aHVc2kf3_tlsLtAvBowq79-IWTFit2R

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://trotta.co
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-2BYJLCP43M

# Feature Flags
PUBLIC_ENABLE_VISUAL_EDITING=true

# WordPress
WORDPRESS_BLOG_URL=https://blog.trotta.co
```

| Variable | Purpose | Type |
|----------|---------|------|
| `NEXT_PUBLIC_DIRECTUS_URL` | Directus API endpoint | Public URL |
| `NEXT_PUBLIC_ASSETS_URL` | Asset/image CDN endpoint | Public URL |
| `DIRECTUS_PUBLIC_TOKEN` | Public API token (limited access) | Public Token |
| `NEXT_PUBLIC_SITE_URL` | Application site URL | Public URL |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics tracking ID | Tracking ID |
| `PUBLIC_ENABLE_VISUAL_EDITING` | Enable visual editing mode | Feature Flag |
| `WORDPRESS_BLOG_URL` | WordPress blog URL | Public URL |

---

## Setup Instructions

1. **Copy `.env.example`** as a template:
   ```bash
   cp .env.example .env.local
   ```

2. **Add private variables** to `.env.local` (gitignored):
   - Fill in all secrets and credentials
   - Never commit this file

3. **Public variables** can be hardcoded or in `.env`:
   - Prefixed with `NEXT_PUBLIC_` for frontend access
   - Safe in source code/git
   - Available in browser console

4. **Verify `.env.local` is in `.gitignore`**:
   ```
   .env.local
   .env*.local
   ```
