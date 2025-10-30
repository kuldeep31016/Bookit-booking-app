# 🚀 QUICK REFERENCE CARD

## 15-Minute Setup

### 1️⃣ MongoDB Atlas (5 min)
```
→ https://mongodb.com/cloud/atlas
→ Create free M0 cluster
→ Create user (save credentials!)
→ Whitelist 0.0.0.0/0
→ Copy connection string
```

### 2️⃣ Backend (5 min)
```bash
cd backend
npm install
# Edit .env with your MongoDB URL
npm run prisma:generate
npx prisma db push
npm run seed
npm run dev
```
✅ Running on http://localhost:5000

### 3️⃣ Frontend (2 min)
```bash
cd frontend  # New terminal!
npm install
npm run dev
```
✅ Running on http://localhost:5173

### 4️⃣ Test (3 min)
```
→ Open http://localhost:5173
→ Browse → Click → Book → Checkout
→ Apply SAVE10 → Confirm
→ See success! 🎉
```

---

## 📁 Project Structure

```
BookIt/
├── backend/           Express API + MongoDB
│   ├── src/
│   │   ├── controllers/   Request handlers
│   │   ├── services/      Business logic
│   │   ├── routes/        API routes
│   │   └── seed/          Sample data
│   └── .env              🔑 Add MongoDB URL here!
│
├── frontend/          React + TypeScript
│   ├── src/
│   │   ├── pages/        4 pages
│   │   ├── components/   UI components
│   │   └── services/     API calls
│   └── .env             ✅ Already configured
│
└── 📚 Documentation
    ├── START_HERE.md          ← Read first!
    ├── SETUP.md               Detailed setup
    ├── DEPLOYMENT.md          Deploy guide
    ├── README.md              Full docs
    ├── ASSIGNMENT_CHECKLIST.md Requirements ✅
    └── PROJECT_OVERVIEW.md    Tech details
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/experiences` | List all experiences |
| GET | `/api/experiences/:id` | Get experience details |
| GET | `/api/experiences/:id/slots` | Get available slots |
| POST | `/api/bookings` | Create booking |
| POST | `/api/promo/validate` | Validate promo code |

---

## 🎯 Test Promo Codes

- **SAVE10** → 10% discount
- **FLAT100** → ₹100 flat discount
- **WELCOME20** → 20% discount

---

## 🌐 Deployment URLs

### Before Deployment
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Database: MongoDB Atlas (cloud)

### After Deployment
- Frontend: https://______.vercel.app
- Backend: https://______.onrender.com
- Database: MongoDB Atlas (same)

---

## ⚡ Common Commands

### Backend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run seed         # Seed database
npm run prisma:generate  # Generate Prisma client
npx prisma db push   # Push schema to database
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🐛 Quick Fixes

### MongoDB Error
```bash
# Check backend/.env
DATABASE_URL="mongodb+srv://USER:PASS@cluster.net/bookit?..."
# Replace USER, PASS with actual credentials
```

### Port In Use
```bash
# Kill process on port
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:5173 | xargs kill -9  # Frontend
```

### No Data Showing
```bash
cd backend
npm run seed
```

### Build Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Pre-Submission Checklist

- [ ] Runs locally without errors
- [ ] All 4 pages work (Home → Details → Checkout → Result)
- [ ] Promo codes work (SAVE10, FLAT100, WELCOME20)
- [ ] Mobile responsive (test on phone or DevTools)
- [ ] .env files NOT committed to git
- [ ] README.md updated with live URLs
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Live site tested end-to-end

---

## 📱 Test on Mobile

```bash
# Find your local IP
ipconfig getifaddr en0  # Mac
ipconfig               # Windows

# Access from phone on same WiFi
http://YOUR-IP:5173
```

---

## 🆘 Help Resources

| Issue | Solution |
|-------|----------|
| Setup Issues | Read `SETUP.md` |
| Deployment Issues | Read `DEPLOYMENT.md` |
| MongoDB Issues | Check Atlas dashboard + network access |
| API Not Working | Check backend terminal for errors |
| Frontend Errors | Check browser console |

---

## 🎯 Assignment Requirements

**Status**: ✅ ALL MET (see ASSIGNMENT_CHECKLIST.md)

- ✅ React + TypeScript + TailwindCSS
- ✅ All 4 pages implemented
- ✅ Responsive design
- ✅ Node.js + Express backend
- ✅ MongoDB database
- ✅ All API endpoints
- ✅ Form validation
- ✅ Promo codes
- ✅ Deployment ready
- ✅ Complete documentation

---

## 🚀 Deploy in 30 Minutes

### Render (Backend)
```
1. Push to GitHub
2. New Web Service on Render
3. Root: backend
4. Build: npm install && npx prisma generate && npm run build
5. Start: npm start
6. Add DATABASE_URL env var
7. Deploy!
```

### Vercel (Frontend)
```
1. Import GitHub repo
2. Root: frontend
3. Framework: Vite
4. Add VITE_API_URL env var (Render URL)
5. Deploy!
```

Full guide: `DEPLOYMENT.md`

---

## 📞 Quick Links

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render**: https://render.com
- **Vercel**: https://vercel.com
- **Unsplash** (images): https://unsplash.com

---

## 🎓 Tech Stack

### Frontend
React 18 · TypeScript · Vite · TailwindCSS · React Router · Axios · React Hook Form · Zod

### Backend
Node.js · Express · TypeScript · Prisma · MongoDB · Zod · CORS

### Database
MongoDB Atlas · Prisma ORM

### Deployment
Vercel (Frontend) · Render (Backend) · MongoDB Atlas (Database)

---

## 💡 Pro Tips

1. **Keep terminals open** - Need both backend and frontend running
2. **Check browser console** - Errors show here first
3. **Check backend terminal** - API errors show here
4. **Use .env.example** - Never commit .env files
5. **Test locally first** - Before deploying
6. **Read error messages** - They usually tell you what's wrong
7. **Use MongoDB Atlas UI** - View data directly
8. **Commit often** - Small commits are easier to debug

---

## 🎉 Success Indicators

✅ Backend terminal: "Backend running on http://localhost:5000"
✅ Frontend terminal: "Local: http://localhost:5173/"
✅ Browser: See 15 experiences on homepage
✅ Can click experience and see details
✅ Can select date and see slots
✅ Can complete booking with promo code
✅ See confirmation page

---

**Print this card and keep it handy while working! 📌**

For detailed explanations, see the full documentation files.
