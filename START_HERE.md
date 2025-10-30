# 🎯 START HERE - BookIt Project

Welcome! This is your complete BookIt travel experience booking application.

## 📖 What This Project Is

BookIt is a **full-stack web application** that allows users to:
- Browse travel experiences across India
- View detailed information and available time slots
- Book experiences with real-time availability
- Apply promotional discount codes
- Receive instant booking confirmations

## 🏗 What's Already Built

✅ **Complete Frontend** (React + TypeScript + TailwindCSS)
- Home page with experience listings
- Experience detail page with slot selection
- Checkout page with form validation
- Result page with confirmation/error states
- Fully responsive design

✅ **Complete Backend** (Node.js + Express + TypeScript)
- REST API with 7 endpoints
- MongoDB integration with Prisma ORM
- Booking system with transaction support
- Promo code validation system
- Error handling and validation

✅ **Database** (MongoDB with Prisma)
- 15 travel experiences pre-loaded
- 1,350 time slots (30 days worth)
- 3 promo codes (SAVE10, FLAT100, WELCOME20)
- Proper relationships and indexes

✅ **Documentation**
- Complete setup instructions
- Deployment guides
- API documentation
- Troubleshooting help

## 🚦 Quick Start (Choose Your Path)

### 👨‍💻 Path 1: Run Locally (Development)

**Time: ~15 minutes**

1. **Get MongoDB Atlas** (free, 5 min)
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free M0 cluster
   - Get your connection string
   - Save username and password

2. **Setup Backend** (5 min)
   ```bash
   cd backend
   npm install
   # Edit backend/.env with your MongoDB connection string
   npm run prisma:generate
   npx prisma db push
   npm run seed
   npm run dev
   ```
   Keep this terminal open ✓

3. **Setup Frontend** (3 min)
   ```bash
   # New terminal
   cd frontend
   npm install
   npm run dev
   ```
   Keep this terminal open ✓

4. **Open Browser**
   - Go to http://localhost:5173
   - Start booking experiences! 🎉

📚 **Need detailed steps?** → See [SETUP.md](./SETUP.md)

---

### 🌐 Path 2: Deploy to Cloud (Production)

**Time: ~30 minutes**

1. **Prerequisites**
   - GitHub account
   - Vercel account (free)
   - Render account (free)
   - MongoDB Atlas cluster with data

2. **Deploy Backend to Render**
   - Push code to GitHub
   - Import repository in Render
   - Set environment variables
   - Deploy!

3. **Deploy Frontend to Vercel**
   - Import repository in Vercel
   - Set backend API URL
   - Deploy!

📚 **Need detailed steps?** → See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📁 Project Structure

```
BookIt/
│
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Error handling
│   │   ├── seed/              # Sample data
│   │   └── server.ts          # Entry point
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── package.json
│   └── .env                   # Environment variables
│
├── frontend/                   # React + TypeScript
│   ├── src/
│   │   ├── pages/             # Home, Details, Checkout, Result
│   │   ├── components/        # Reusable UI components
│   │   ├── services/          # API calls
│   │   └── App.tsx            # Main app
│   ├── package.json
│   └── .env                   # Environment variables
│
├── README.md                   # Main documentation
├── SETUP.md                   # Local setup guide
├── DEPLOYMENT.md              # Cloud deployment guide
├── ASSIGNMENT_CHECKLIST.md    # Requirements verification
└── START_HERE.md              # This file!
```

## 🔑 Key Features

### Frontend
- **Home Page** - Browse all experiences with search
- **Details Page** - View experience details, select date/slot
- **Checkout Page** - Enter details, apply promo codes
- **Result Page** - Booking confirmation or error
- **Responsive** - Works on mobile, tablet, desktop
- **Form Validation** - Real-time validation with helpful errors

### Backend
- **GET /api/experiences** - List experiences (with filters)
- **GET /api/experiences/:id** - Get experience details
- **GET /api/experiences/:id/slots** - Get available slots
- **POST /api/bookings** - Create new booking
- **POST /api/promo/validate** - Validate promo code
- **Transaction Safety** - No double bookings
- **Data Validation** - All inputs validated

### Database
- **15 Experiences** - Diverse travel experiences
- **1,350 Slots** - 30 days × 3 slots/day × 15 experiences
- **3 Promo Codes** - SAVE10 (10%), FLAT100 (₹100), WELCOME20 (20%)
- **Real-time Updates** - Slot availability updates immediately

## 🧪 Testing the App

### Test Flow
1. **Home** - See 15 experiences
2. **Search** - Try "Mumbai" or "Adventure"
3. **Click** - Select any experience
4. **Details** - View full information
5. **Select Date** - Pick today or tomorrow
6. **Choose Slot** - Click a time slot
7. **Add Participants** - Use +/- buttons
8. **Book Now** - Go to checkout
9. **Fill Form** - Enter your details
10. **Apply Promo** - Try "SAVE10"
11. **Confirm** - Complete booking
12. **Success!** - See confirmation

### Promo Codes to Test
- **SAVE10** → 10% discount
- **FLAT100** → ₹100 off
- **WELCOME20** → 20% discount

## 📝 Documentation Guide

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **START_HERE.md** (this file) | Quick overview | First time setup |
| **SETUP.md** | Detailed local setup | Running locally |
| **DEPLOYMENT.md** | Cloud deployment | Going to production |
| **README.md** | Complete documentation | Reference guide |
| **ASSIGNMENT_CHECKLIST.md** | Requirements verification | Before submission |

## 🐛 Common Issues

### Issue: MongoDB Connection Error
**Fix**: Update `backend/.env` with correct connection string
- Make sure password is correct
- Check network access in Atlas
- Ensure database name is "bookit"

### Issue: Port Already in Use
**Fix**: Change port or stop other services
```bash
# Backend: Change PORT in backend/.env
# Frontend: Vite will auto-assign new port
```

### Issue: No Experiences Showing
**Fix**: Seed the database
```bash
cd backend
npm run seed
```

### Issue: Promo Code Not Working
**Fix**: Check backend logs
- Ensure promo codes are seeded
- Verify date ranges are valid
- Check minimum amount requirements

## 🎓 Understanding the Codebase

### Backend Flow
```
Request → Route → Controller → Service → Database
         ↓
      Middleware (Error Handling)
```

### Frontend Flow
```
User Action → Page Component → API Service → Backend
            ↓
    State Update → UI Re-render
```

### Database Models
- **Experience** - Travel experiences (title, price, location, etc.)
- **Slot** - Time slots (date, time, capacity, booked count)
- **Booking** - User bookings (user info, participants, total price)
- **PromoCode** - Discount codes (code, type, value, validity)

## 🚀 What You Can Do

### Modify Features
- Add new experiences in `backend/src/seed/seedData.ts`
- Change colors in `frontend/tailwind.config.js`
- Add filters on home page
- Create new promo codes

### Extend Functionality
- Add user authentication
- Implement payment gateway
- Add booking history
- Create admin dashboard
- Add reviews and ratings
- Implement email notifications

### Improve UI
- Customize design to match Figma more closely
- Add animations
- Improve loading states
- Add more interactive elements

## 📦 Tech Stack Summary

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Validation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **MongoDB** - Database
- **Zod** - Validation
- **CORS** - Cross-origin support

## 🆘 Need Help?

1. **Read the error message** - Most errors are self-explanatory
2. **Check the logs** - Both terminals show useful information
3. **Review the docs** - Setup and deployment guides cover most issues
4. **Check environment variables** - Most issues are configuration related
5. **Verify MongoDB** - Ensure Atlas cluster is running and accessible

## ✅ Before Submission

- [ ] Test locally - Complete booking flow works
- [ ] Deploy to cloud - Both frontend and backend live
- [ ] Test deployment - Live site works correctly
- [ ] Update README - Add your live URLs
- [ ] Push to GitHub - All code committed
- [ ] Verify .env files - Not committed (in .gitignore)
- [ ] Test on mobile - Responsive design works
- [ ] Review checklist - See ASSIGNMENT_CHECKLIST.md

## 🎯 Assignment Requirements Met

✅ All requirements completed (see ASSIGNMENT_CHECKLIST.md for details):
- React + TypeScript frontend
- TailwindCSS styling (mandatory)
- All 4 pages implemented
- Node.js + Express backend
- MongoDB database
- All API endpoints
- Complete booking flow
- Promo code system
- Responsive design
- Ready for deployment
- Complete documentation

## 📞 Next Actions

Choose your path:

1. **🏃‍♂️ Quick Start** → Follow Path 1 above (15 min)
2. **📖 Detailed Setup** → Read [SETUP.md](./SETUP.md)
3. **☁️ Deploy Now** → Read [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **✅ Verify Requirements** → Read [ASSIGNMENT_CHECKLIST.md](./ASSIGNMENT_CHECKLIST.md)
5. **📚 Full Documentation** → Read [README.md](./README.md)

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just follow the Quick Start above, and you'll have a working booking platform in 15 minutes.

**Happy Coding! 🚀**

---

**Questions?** Check the other documentation files or the inline comments in the code!
