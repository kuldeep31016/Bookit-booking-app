# BookIt - Experience Booking Platform 🎫

A full-stack travel experience booking application built with React, TypeScript, Node.js, and MongoDB.

## 🌐 Live Deployment

- **Frontend:** https://bookit-booking-app-q2cn.vercel.app/
- **Backend API:** https://bookit-booking-app.onrender.com/api
- **Database:** MongoDB Atlas

## 📸 Screenshots

### Homepage
![Homepage Screenshot](./screenshots/image1.png)
*Browse and search through curated travel experiences*

### Experience Details
![Experience Details Screenshot](./screenshots/image2.png)
*View detailed information about each experience*

### Checkout Page
![Checkout Screenshot](./screenshots/image3.png)
*Complete booking with promo code support*

### Confirmation Page
![Confirmation Screenshot](./screenshots/image4.png)
*Booking confirmation with reference number*

## ✨ Features

- 🔍 **Browse & Search** - Explore curated travel experiences across India
- 📅 **Real-time Slot Availability** - View and book available time slots
- 💰 **Promo Code System** - Apply discount codes (SAVE10, FLAT100, WELCOME20)
- ✅ **Booking Confirmation** - Instant booking confirmation with details
- 📱 **Responsive Design** - Mobile-first UI built with TailwindCSS
- 🎨 **Clean UI/UX** - Following Figma design specifications

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Zod** - Schema validation

### Backend
- **Node.js** with Express
- **TypeScript** - Type-safe code
- **Prisma ORM** - Database toolkit
- **MongoDB** - NoSQL database (via Atlas)
- **Zod** - Runtime validation

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** (free tier) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd BookIt
```

### 2. Set Up MongoDB Atlas

1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier is sufficient)
3. Create a database user with username and password
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string (it looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your MongoDB Atlas connection string
# Replace <username>, <password>, and <cluster-url> with your actual values
# Example: DATABASE_URL="mongodb+srv://myuser:mypass@cluster0.abc123.mongodb.net/bookit?retryWrites=true&w=majority"

# Generate Prisma Client
npm run prisma:generate

# Push schema to MongoDB (creates collections)
npx prisma db push

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

Open a **new terminal** and:

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# The default .env should work for local development:
# VITE_API_URL=http://localhost:5000/api

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and go to: **http://localhost:5173**

## 📁 Project Structure

```
BookIt/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Error handling, etc.
│   │   ├── config/           # Database config
│   │   ├── seed/             # Database seed data
│   │   └── server.ts         # Entry point
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API calls
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔌 API Endpoints

### Experiences
- `GET /api/experiences` - List all experiences (with optional filters)
- `GET /api/experiences/:id` - Get experience details
- `GET /api/experiences/:id/slots` - Get available slots for an experience

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking details

### Promo Codes
- `POST /api/promo/validate` - Validate and apply promo code

## 🎯 Available Promo Codes

- **SAVE10** - 10% discount
- **FLAT100** - ₹100 flat discount
- **WELCOME20** - 20% discount

## 🧪 Testing the Application

1. **Browse Experiences** - Home page displays all available experiences
2. **Search** - Use the search bar to filter experiences
3. **View Details** - Click on any experience to see details and available slots
4. **Select Slot** - Choose a date and time slot
5. **Checkout** - Fill in your details, add participants, apply promo code
6. **Confirmation** - View your booking confirmation

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variable**: `VITE_API_URL` = your backend URL
5. Deploy

### Backend (Render)

1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `DATABASE_URL` = your MongoDB Atlas connection string
     - `NODE_ENV` = production
     - `PORT` = 10000 (or leave default)
5. Deploy

### Update Frontend Environment

After deploying the backend, update your frontend's `VITE_API_URL` environment variable in Vercel to point to your Render backend URL.

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct in `.env`
- Ensure you've run `npm run prisma:generate`
- Try running `npx prisma db push` again

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Look for CORS errors in browser console

### Database is empty
- Run `npm run seed` in backend directory
- Check MongoDB Atlas network access settings

### Port already in use
- Backend: Change `PORT` in backend `.env`
- Frontend: Vite will auto-assign a different port

## 📝 Development Scripts

### Backend
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm start            # Start production server
npm run seed         # Seed database with sample data
npm run prisma:generate  # Generate Prisma Client
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🎨 Design

The UI follows the Figma design specifications with:
- Consistent spacing and typography
- Responsive layouts (mobile, tablet, desktop)
- Interactive states (hover, loading, error)
- Clean and modern aesthetic

## 📄 License

MIT

## 👨‍💻 Author

Built as a fullstack internship assignment demonstrating:
- React + TypeScript frontend development
- Node.js + Express backend development
- MongoDB database design with Prisma
- RESTful API design
- Responsive UI with TailwindCSS
- Full deployment workflow


