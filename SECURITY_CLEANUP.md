# Security Cleanup Instructions

## Issue
The `.env` file containing sensitive API keys was accidentally committed to git history and pushed to GitHub, triggering a GitGuardian security alert.

## What Was Exposed
- Google Maps API Key: `AIzaSyAgqy-abOB3ZSPLO9ErKwootu3nnQIw598`
- EmailJS Service ID: `service_9q985va`
- EmailJS Template ID: `template_ncfmkzo`
- EmailJS Public Key: `3Z9VoA_mIQaIBe3gn`

## Commits Affected
- `1cf0a94` - changes
- `a006400` - Merge branch 'develop'
- Current develop branch

## Steps Completed
1. ✅ Removed `.env` from git tracking using `git rm --cached .env`
2. ✅ Verified `.env` is in `.gitignore`
3. ✅ Local `.env` file preserved with working credentials

## Steps You MUST Complete

### 1. Revoke and Replace the Exposed API Keys

**Google Maps API Key (CRITICAL)**
1. Go to https://console.cloud.google.com/apis/credentials
2. Find the key `AIzaSyAgqy-abOB3ZSPLO9ErKwootu3nnQIw598`
3. Delete or regenerate it
4. Create a new API key with proper restrictions:
   - API restrictions: Only enable "Maps JavaScript API" and "Places API"
   - Application restrictions: Add your domains (vidanaelectric.com, etc.)
5. Update your local `.env` file with the new key
6. Add the new key to CloudFlare environment variables

**EmailJS Keys (MEDIUM PRIORITY)**
1. Go to https://dashboard.emailjs.com/
2. Regenerate your service and template keys if possible
3. Update your local `.env` file
4. Add new keys to CloudFlare environment variables

### 2. Remove .env from Git History (Optional but Recommended)

Since the keys are exposed in public git history, you have two options:

**Option A: Force push to rewrite history (RECOMMENDED for private repos)**
```bash
# Make sure you're on the develop branch
git checkout develop

# Remove .env from all git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push to overwrite remote history
git push origin develop --force
```

**Option B: Just move forward (SIMPLER but keys remain in history)**
The current commit removes .env from tracking, so future commits won't include it. The old keys in history are already compromised, so just revoke them and move on.

### 3. Commit the Current Changes

```bash
# Commit the removal of .env and code cleanup
git add .
git commit -m "Security: Remove .env from git tracking and clean up codebase

- Removed .env file from git tracking (keeps local copy)
- .env is already in .gitignore to prevent future commits
- Cleaned up unused dependencies and dead code
- IMPORTANT: Revoke exposed API keys and generate new ones

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to remote
git push origin develop
```

### 4. Update CloudFlare Environment Variables

Once you have new API keys:
1. Log in to CloudFlare dashboard
2. Go to your project settings
3. Add/update environment variables:
   - `VITE_GOOGLE_MAPS_API_KEY` = your_new_key
   - `VITE_EMAILJS_SERVICE_ID` = your_service_id
   - `VITE_EMAILJS_TEMPLATE_ID` = your_template_id
   - `VITE_EMAILJS_PUBLIC_KEY` = your_public_key

## Prevention
- ✅ `.env` is already in `.gitignore`
- ✅ `.env.example` template is provided without sensitive data
- ✅ All code uses `import.meta.env.VITE_*` for environment variables
- ✅ No hardcoded credentials in source code

## Files Modified in This Cleanup
- Removed 3 unused npm packages: framer-motion, lenis, react-intersection-observer
- Cleaned up ~300 lines of unused CSS and dead code
- Extracted reusable button styles to globals.css
- All environment variables properly configured

## Testing
After updating keys, test locally:
```bash
npm run dev
# Verify Google Maps loads on the Service Area section
# Verify contact form submission works
```
