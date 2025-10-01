# Vercel Backend Deployment Guide - Step by Step

## 📦 Package Contents
- `/api/gold-price.ts` - Gold price API endpoint
- `/api/config.ts` - Configuration API endpoint  
- `vercel.json` - Vercel configuration
- `package.json` - Dependencies
- `.gitignore` - Git ignore file

## 🚀 Deployment Steps

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up" (FREE)
3. Sign up with GitHub, GitLab, or Email

### Step 2: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 3: Deploy via Vercel Dashboard (EASIEST)

#### A. Upload Files
1. Login to Vercel Dashboard
2. Click "Add New" → "Project"
3. Click "Deploy without Git"
4. Drag and drop the `vercel-backend` folder
5. Click "Deploy"

#### B. Via GitHub (Recommended)
1. Create new GitHub repository
2. Upload all files from `vercel-backend` folder
3. Go to Vercel Dashboard
4. Click "Add New" → "Project"
5. Import your GitHub repo
6. Click "Deploy"

### Step 4: Get Your API URL
After deployment, you'll get a URL like:
```
https://your-project-name.vercel.app
```

Your API endpoints will be:
- `https://your-project-name.vercel.app/api/gold-price`
- `https://your-project-name.vercel.app/api/config`

### Step 5: Optional - Add Premium API Key
1. In Vercel Dashboard → Your Project
2. Click "Settings" → "Environment Variables"
3. Add:
   - Name: `METAL_PRICE_API_KEY`
   - Value: Your API key from metalpriceapi.com
4. Redeploy

### Step 6: Test Your API
Visit in browser:
```
https://your-project-name.vercel.app/api/gold-price
```

You should see JSON response with gold prices!

### Step 7: Update WordPress Frontend
In your WordPress site, update API URL to your Vercel URL.

## 🔧 Troubleshooting

**Problem:** 404 Error
- Make sure `/api/` folder structure is correct
- Check vercel.json is present

**Problem:** CORS Error
- vercel.json already has CORS headers
- Clear browser cache

**Problem:** Old prices showing
- Vercel caches responses for 60 seconds
- Wait a minute or purge cache

## 💰 Pricing
- **FREE**: 100GB bandwidth/month
- **Perfect for**: Gold calculator (very low bandwidth)
- **Cost**: $0 for normal usage

## ✅ Benefits
- Automatic HTTPS
- Global CDN
- Auto-scaling
- Zero maintenance
