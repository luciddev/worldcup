# Deployment Guide - World Cup 2026

## Quick Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy (Easiest)
1. Push your code to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository `luciddev/worldcup`
5. Vercel will auto-detect React and configure everything
6. Click "Deploy"
7. Your app will be live in ~2 minutes! 🚀

### Option 2: Using Vercel CLI
```bash
# 1. Login to Vercel (one-time setup)
vercel login

# 2. Deploy to production
npm run deploy

# Or use the full command
vercel --prod
```

### Option 3: Connect GitHub for Auto-Deploy
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Select your GitHub repository
4. Enable "Auto-deploy" on the main branch
5. Every push will automatically deploy! ✨

## Deploy to Other Platforms

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=build
```

Or use Netlify's drag & drop:
1. Build the app: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `build` folder
4. Done! 🎉

### GitHub Pages
```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add to package.json
"homepage": "https://yourusername.github.io/worldcup",
"predeploy": "npm run build",
"deploy:gh-pages": "gh-pages -d build"

# 3. Deploy
npm run deploy:gh-pages
```

### Firebase Hosting
```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting

# 4. Build and deploy
npm run build
firebase deploy
```

## Environment Variables (if needed)

If you need to add environment variables (API keys, etc.):

### Vercel
1. Go to your project settings on vercel.com
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy

### .env File (Local Development)
Create a `.env` file in the root:
```
REACT_APP_API_URL=your_api_url
REACT_APP_ANALYTICS_ID=your_analytics_id
```

**Important**: Never commit `.env` to git! It's already in `.gitignore`

## Custom Domain

### Vercel
1. Go to your project on vercel.com
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Configure DNS records

## Performance Tips

### Enable Caching
The `vercel.json` is already configured for optimal caching:
- Static assets: 1 year cache
- HTML: No cache (for updates)

### Enable Compression
Both Vercel and Netlify enable Brotli/Gzip automatically.

### CDN
All these platforms serve your app from a global CDN for fast worldwide access.

## Monitoring

### Analytics Options
- **Vercel Analytics**: Built-in, just enable in settings
- **Google Analytics**: Add to `public/index.html`
- **Plausible**: Privacy-friendly alternative
- **Cloudflare Analytics**: If using Cloudflare

### Error Tracking
- **Sentry**: Add Sentry SDK for error tracking
- **LogRocket**: Session replay and error tracking
- **Bugsnag**: Automatic error detection

## SSL/HTTPS

All platforms provide free SSL certificates automatically:
- ✅ Vercel: Auto SSL
- ✅ Netlify: Auto SSL
- ✅ GitHub Pages: Auto SSL
- ✅ Firebase: Auto SSL

## Build Settings

### Vercel (Auto-detected)
```
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### Netlify
```
Build command: npm run build
Publish directory: build
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 Errors
Make sure your `vercel.json` routes are configured (already done ✅)

### Slow Loading
- Check bundle size: `npm run build` shows gzipped sizes
- Enable compression (automatic on Vercel/Netlify)
- Use CDN (automatic on Vercel/Netlify)

## Post-Deployment Checklist

- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Verify PWA installation works
- [ ] Check SEO meta tags are rendering
- [ ] Test social sharing (Open Graph)
- [ ] Verify analytics is working
- [ ] Test error boundary (try causing an error)
- [ ] Check lighthouse score
- [ ] Test offline functionality (if service worker added)

## Recommended: Vercel Setup

Vercel is recommended because:
1. **Zero config** - Works out of the box
2. **Fast** - Global CDN, edge network
3. **Free tier** - Perfect for this project
4. **Auto-deploy** - Push to GitHub = automatic deployment
5. **Preview URLs** - Every PR gets a preview URL
6. **Analytics** - Built-in performance analytics

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Firebase Docs: https://firebase.google.com/docs/hosting

---

**Ready to deploy!** Choose your platform and follow the steps above. 🚀
