# 🚀 QUICK SETUP GUIDE - BookIt Application

Follow these steps to get the application running on your local machine.

## ⚡ Prerequisites Check

Make sure you have these installed:
- [ ] Node.js v18+ → Run `node --version` to check
- [ ] npm → Run `npm --version` to check

## 📝 Step-by-Step Setup

### STEP 1: Get MongoDB Atlas Ready (5 minutes)

1. **Sign up** for free at https://www.mongodb.com/cloud/atlas
2. **Create a cluster**:
   - Choose "Free Shared" (M0) tier
   - Select a cloud provider and region close to you
   - Click "Create"
3. **Create a database user**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set role as "Read and write to any database"
4. **Whitelist your IP**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP
5. **Get connection string**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://...`)
   - **IMPORTANT**: Replace `<password>` with your actual password

### STEP 2: Setup Backend (5 minutes)

```bash
# Navigate to backend folder
cd backend

# Install all packages
npm install

# Create environment file
cp .env.example .env

# Open .env file in any text editor and paste your MongoDB connection string
# Update the DATABASE_URL line with your connection string from Step 1
# Example: DATABASE_URL="mongodb+srv://myuser:mypass123@cluster0.abc.mongodb.net/bookit?retryWrites=true&w=majority"

# Generate Prisma client (this creates database helpers)
npm run prisma:generate

# Push database schema to MongoDB
npx prisma db push

# Seed database with sample data (experiences, slots, promo codes)
npm run seed

# Start the backend server
npm run dev
```

✅ You should see: `Backend running on http://localhost:5000`

**Keep this terminal open!**

### STEP 3: Setup Frontend (3 minutes)

Open a **NEW terminal** window:

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install all packages
npm install

# Create environment file
cp .env.example .env

# The default .env works for local development, no changes needed!

# Start the frontend
npm run dev
```

✅ You should see: `Local: http://localhost:5173/`

### STEP 4: Open the App

Open your browser and go to: **http://localhost:5173**

🎉 You should see the BookIt homepage with travel experiences!

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Homepage shows 15 experiences
- [ ] Can click on an experience to see details
- [ ] Can see available slots when selecting a date
- [ ] Can proceed to checkout
- [ ] Promo codes work (try: SAVE10, FLAT100, WELCOME20)

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: 
- Check your DATABASE_URL in `backend/.env`
- Ensure password doesn't contain special characters (or URL encode them)
- Verify network access in MongoDB Atlas allows your IP

### Issue: "Port 5000 already in use"
**Solution**:
- Stop other apps using port 5000
- OR change PORT in `backend/.env` to 5001
- Update VITE_API_URL in `frontend/.env` to match

### Issue: "No experiences showing"
**Solution**:
- Make sure you ran `npm run seed` in backend
- Check backend terminal for errors
- Verify backend is running on port 5000

### Issue: Frontend can't connect to backend
**Solution**:
- Check VITE_API_URL in `frontend/.env` points to http://localhost:5000/api
- Make sure backend is running
- Check browser console for CORS errors

## 🧪 Testing Features

### Test 1: Browse Experiences
- Homepage should show 15 experiences
- Try searching: type "Mumbai" or "Adventure"

### Test 2: View Details
- Click any experience
- Should show description, highlights, included items

### Test 3: Book a Slot
- Select a date (today or future)
- Choose a time slot
- Click "Book Now"

### Test 4: Checkout
- Fill in: First name, Last name, Email, Phone
- Select number of participants
- Try promo code: **SAVE10** (should give 10% discount)
- Click "Confirm Booking"

### Test 5: Confirmation
- Should see success message
- Booking details displayed

## 📂 Project Structure at a Glance

```
BookIt/
├── backend/          → Node.js + Express API
│   ├── src/
│   │   ├── controllers/  → Handle requests
│   │   ├── services/     → Business logic
│   │   ├── routes/       → API endpoints
│   │   └── seed/         → Sample data
│   └── prisma/
│       └── schema.prisma → Database models
├── frontend/         → React + TypeScript
│   └── src/
│       ├── pages/        → Home, Details, Checkout, Result
│       ├── components/   → Reusable UI components
│       └── services/     → API calls
└── README.md         → Full documentation
```

## 🎯 API Endpoints You Can Test

Using Postman or browser:

1. **Get all experiences**:
   ```
   GET http://localhost:5000/api/experiences
   ```

2. **Get specific experience**:
   ```
   GET http://localhost:5000/api/experiences/{experienceId}
   ```

3. **Get slots**:
   ```
   GET http://localhost:5000/api/experiences/{experienceId}/slots?date=2025-11-01
   ```

4. **Validate promo**:
   ```
   POST http://localhost:5000/api/promo/validate
   Body: {"code": "SAVE10", "totalAmount": 1000}
   ```

5. **Create booking**:
   ```
   POST http://localhost:5000/api/bookings
   Body: {
     "experienceId": "...",
     "slotId": "...",
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com",
     "phone": "9876543210",
     "participants": 2,
     "promoCode": "SAVE10"
   }
   ```

## 💡 Tips

- **Backend changes**: The server auto-restarts when you save files
- **Frontend changes**: The page auto-refreshes when you save files
- **Database changes**: After modifying `schema.prisma`, run `npx prisma db push` in backend
- **Reset database**: Delete cluster in Atlas and start over, or drop collections

## 🆘 Still Having Issues?

1. Check both terminal windows for error messages
2. Make sure you're in the correct directory
3. Try deleting `node_modules` and running `npm install` again
4. Ensure your Node.js version is 18 or higher
5. Check if ports 5000 and 5173 are available

## 📞 Next Steps

- Explore the code in VS Code
- Try modifying experiences in `backend/src/seed/seedData.ts`
- Customize colors in `frontend/tailwind.config.js`
- Deploy to Vercel (frontend) and Render (backend) - see main README.md

---

**Ready to build?** Happy coding! 🚀
