# 🌐 DEPLOYMENT GUIDE - BookIt Application

This guide will help you deploy your BookIt application to the cloud for free.

## 📋 Overview

- **Frontend**: Deploy to Vercel (Free)
- **Backend**: Deploy to Render (Free)
- **Database**: MongoDB Atlas (Already set up, Free M0 tier)

## 🎯 Prerequisites

- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub)
- [ ] Render account (sign up with GitHub)
- [ ] MongoDB Atlas cluster running with data seeded
- [ ] Your code pushed to GitHub

## 🚀 PART 1: Deploy Backend to Render

### Step 1: Prepare Your Backend

Ensure your backend has these files ready:
- `package.json` with proper scripts
- `.env.example` (but NOT `.env` - never commit this!)
- Built successfully locally

### Step 2: Push to GitHub

```bash
# From project root
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 3: Deploy on Render

1. **Go to** https://render.com and sign in
2. **Click** "New +" → "Web Service"
3. **Connect** your GitHub repository
4. **Configure the service**:
   - **Name**: `bookit-backend` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: 
     ```
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**: 
     ```
     npm start
     ```
   - **Instance Type**: `Free`

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable"
   
   Add these:
   ```
   DATABASE_URL = mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/bookit?retryWrites=true&w=majority
   NODE_ENV = production
   PORT = 10000
   ```
   
   ⚠️ **IMPORTANT**: Use your actual MongoDB Atlas connection string!

6. **Click** "Create Web Service"

### Step 4: Wait for Deployment

- Render will build and deploy your backend
- Takes 5-10 minutes for first deployment
- Watch the logs for any errors
- Once deployed, you'll get a URL like: `https://bookit-backend-xxxx.onrender.com`

### Step 5: Test Your Backend

Visit: `https://your-backend-url.onrender.com/api/health`

You should see: `{"status":"ok"}`

Test experiences endpoint: `https://your-backend-url.onrender.com/api/experiences`

✅ **Copy your backend URL** - you'll need it for frontend!

## 🎨 PART 2: Deploy Frontend to Vercel

### Step 1: Configure Frontend Environment

Update `frontend/.env.example` to show production format:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 2: Deploy on Vercel

1. **Go to** https://vercel.com and sign in
2. **Click** "Add New..." → "Project"
3. **Import** your GitHub repository
4. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variable**:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   ```
   
   ⚠️ **Replace** with your actual Render backend URL from Part 1!

6. **Click** "Deploy"

### Step 3: Wait for Deployment

- Vercel builds very fast (1-2 minutes)
- Once done, you'll get a URL like: `https://bookit-xxxx.vercel.app`

### Step 4: Test Your Frontend

1. Visit your Vercel URL
2. Should see the homepage with experiences
3. Try clicking an experience
4. Try booking flow
5. Test promo codes

✅ **Your app is now live!**

## 🔧 PART 3: Configure MongoDB Atlas for Production

### Update Network Access

1. Go to MongoDB Atlas
2. Navigate to "Network Access"
3. Add IP: `0.0.0.0/0` (allows access from anywhere)
   - This is needed because Render's IP can change
   - For production, consider using Render's static IP (paid plan)

### Verify Connection

Check Render logs to ensure backend connects to MongoDB successfully.

## 📊 PART 4: Post-Deployment Checks

### ✅ Checklist

- [ ] Backend health check works: `/api/health`
- [ ] Backend returns experiences: `/api/experiences`
- [ ] Frontend loads and displays experiences
- [ ] Can view experience details
- [ ] Can see available slots
- [ ] Can complete booking flow
- [ ] Promo codes work
- [ ] Booking confirmation displays

### 🧪 Test Complete Flow

1. **Browse**: Visit homepage, see all experiences
2. **Search**: Try searching for "Mumbai" or "Adventure"
3. **Details**: Click an experience
4. **Slots**: Select today's date, see time slots
5. **Book**: Click a slot, proceed to checkout
6. **Checkout**: Fill form, add 2 participants
7. **Promo**: Apply "SAVE10" code
8. **Confirm**: Complete booking
9. **Result**: See confirmation page

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Build fails on Render
- Check Node.js version (should be 18+)
- Verify package.json scripts are correct
- Check Render logs for specific error

**Problem**: Backend starts but crashes
- Verify DATABASE_URL is correct
- Check MongoDB Atlas allows Render's IP
- Review Render logs for connection errors

**Problem**: 502 Bad Gateway
- Backend might still be starting (wait 2-3 minutes)
- Check if backend process is running in Render dashboard
- Verify start command is correct

### Frontend Issues

**Problem**: Frontend shows but "Failed to fetch"
- Verify VITE_API_URL environment variable in Vercel
- Check if backend URL is correct
- Must end with `/api` (no trailing slash)

**Problem**: CORS errors
- Backend CORS should allow all origins in production
- Check backend logs on Render

**Problem**: Old version showing
- Vercel caches aggressively
- Redeploy or clear cache
- Try incognito/private browser window

### Database Issues

**Problem**: No data showing
- Run seed script locally to verify data exists
- Check MongoDB Atlas dashboard for collections
- Verify connection string in Render env vars

## 🔄 Updating Your Deployment

### Update Backend

```bash
# Make changes
git add .
git commit -m "Update backend"
git push origin main
```

Render auto-deploys on push! (if enabled)

Or manually deploy:
- Go to Render dashboard
- Click your service
- Click "Manual Deploy" → "Deploy latest commit"

### Update Frontend

```bash
# Make changes
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel auto-deploys on push!

### Update Environment Variables

**Render**:
- Dashboard → Your service → Environment
- Edit variables → Save changes
- Redeploy

**Vercel**:
- Dashboard → Your project → Settings → Environment Variables
- Edit variables → Save
- Redeploy (Deployments → ... → Redeploy)

## 💰 Free Tier Limits

### Render Free Tier
- ✅ 750 hours/month (enough for one service)
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ Cold start takes 30-60 seconds
- 💡 First request might be slow

**Tip**: Use a service like UptimeRobot to ping your backend every 5 minutes to keep it awake.

### Vercel Free Tier
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Always on, no sleep
- ✅ Super fast CDN

### MongoDB Atlas Free Tier (M0)
- ✅ 512 MB storage
- ✅ Enough for 1000s of bookings
- ✅ Always on
- ✅ Automatic backups

## 🎯 Production Best Practices

### Security
- [ ] Never commit `.env` files
- [ ] Use strong MongoDB passwords
- [ ] Keep dependencies updated
- [ ] Review MongoDB Atlas audit logs

### Performance
- [ ] Enable Vercel Analytics
- [ ] Monitor Render logs
- [ ] Set up alerts in MongoDB Atlas
- [ ] Consider using Redis for caching (future)

### Monitoring
- [ ] Set up Render alerts
- [ ] Enable MongoDB Atlas monitoring
- [ ] Use Vercel Analytics
- [ ] Log errors to external service (future)

## 📝 Submission Checklist

For your assignment submission, include:

1. **Live URLs**:
   - Frontend: `https://your-app.vercel.app`
   - Backend: `https://your-api.onrender.com`

2. **GitHub Repository**:
   - Public repository URL
   - Clear README.md
   - Working setup instructions

3. **Demo Video** (optional but recommended):
   - Show full booking flow
   - Test promo codes
   - Mobile responsiveness

4. **Documentation**:
   - Environment variables needed
   - API endpoints
   - How to run locally

## 🎉 You're Done!

Your BookIt application is now:
- ✅ Live on the internet
- ✅ Accessible to anyone
- ✅ Using cloud database
- ✅ Free to run
- ✅ Auto-deploying on push

### Your Deployed URLs:
```
Frontend: https://______.vercel.app
Backend:  https://______.onrender.com
```

**Share these URLs in your assignment submission!**

---

## 🆘 Need Help?

Common commands:

```bash
# Check Render logs
# Go to Render Dashboard → Your Service → Logs

# Check Vercel logs
# Go to Vercel Dashboard → Your Project → Deployments → Click latest → View Function Logs

# Test backend locally
cd backend && npm run dev

# Test frontend locally
cd frontend && npm run dev

# Rebuild database
cd backend && npm run seed
```

**Pro tip**: Keep your local development environment working! Always test locally before deploying.

---

🚀 **Happy Deploying!**
