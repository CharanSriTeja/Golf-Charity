# Golf Charity Platform - Complete Setup Guide

This guide will help you set up and run the entire Golf Charity Platform (Frontend + Backend).

## Project Structure

```
Golf-Charity/
├── Golf-Charity-frontend/    # React frontend
├── Golf-Charity-backend/     # Node.js/Express backend
├── SETUP_GUIDE.md           # This file
└── README.md                # Project overview
```

## Prerequisites

Before starting, ensure you have:

- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)
- MongoDB (local or Atlas cloud) - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- Stripe Account - [Sign Up](https://stripe.com)
- Git - [Download](https://git-scm.com/)

## Quick Start (Both Frontend & Backend)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd Golf-Charity-backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/golf-charity
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF

# Start the backend server
npm run dev
# Server will run on http://localhost:5000
```

### 2. Frontend Setup

In a new terminal:

```bash
# Navigate to frontend directory
cd Golf-Charity-frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
EOF

# Start the frontend server
npm run dev
# Frontend will run on http://localhost:5173
```

## Detailed Setup Instructions

### Backend Setup (Node.js + Express + MongoDB)

#### Step 1: Navigate to Backend Directory
```bash
cd Golf-Charity-backend
```

#### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- stripe (payment processing)
- cors (cross-origin requests)
- helmet (security headers)
- morgan (request logging)
- dotenv (environment variables)

#### Step 3: Configure MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Then start MongoDB service
# Default URI: mongodb://localhost:27017/golf-charity
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string (looks like: `mongodb+srv://user:password@cluster.mongodb.net/dbname`)
4. Add to .env file

#### Step 4: Configure Environment Variables

Create `.env` file in `Golf-Charity-backend/`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/golf-charity
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/golf-charity

# JWT
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Stripe (Get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Step 5: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

**Backend is now running at:** `http://localhost:5000`

API endpoints available at: `http://localhost:5000/api`

### Frontend Setup (React + Vite)

#### Step 1: Navigate to Frontend Directory
```bash
cd Golf-Charity-frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- react (UI library)
- react-dom (React DOM rendering)
- react-router-dom (client-side routing)
- axios (HTTP client)
- recharts (charts/graphs)
- date-fns (date formatting)
- stripe/react-stripe-js (Stripe integration)

#### Step 3: Configure Environment Variables

Create `.env` file in `Golf-Charity-frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
```

Get Stripe publishable key from: https://dashboard.stripe.com/apikeys

#### Step 4: Start Frontend Server

```bash
npm run dev
```

Expected output:
```
  VITE v... ready in ... ms
  ➜  Local:   http://localhost:5173/
```

**Frontend is now running at:** `http://localhost:5173`

## Testing the Application

### 1. Visit Frontend
Open `http://localhost:5173` in your browser

### 2. Test Public Pages
- Home page - should load with hero section
- How It Works - scroll through 3 steps
- Charities - browse partner charities
- Pricing - view subscription plans

### 3. Test Authentication
- Click "Subscribe" → "Subscribe" button
- Sign up with test email (e.g., test@example.com)
- Create password
- Select a charity
- Login with credentials

### 4. Test User Dashboard
- After login, navigate to Dashboard
- View stats
- Go to Scores → Add a score
- Go to My Charity → Select/update charity
- Go to Draws → View active draw
- Go to Winnings → View winning prizes
- Go to Profile → Update information

### 5. Test Admin Panel (Requires Admin Account)
- Create a user first
- Update in MongoDB to set role as 'admin':
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```
- Login and navigate to `/admin`
- Explore all admin features

### 6. Test Payments
- Click Subscribe → Checkout
- Use Stripe test card: `4242 4242 4242 4242`
- Any future expiry date and any CVC
- Complete payment

## Database Setup (MongoDB)

### Create Initial Data

Connect to MongoDB and run:

```javascript
// Add charities
db.charities.insertMany([
  {
    name: "Teach For India",
    category: "Education",
    description: "Bridging the education gap",
    impact: "12,000+ students impacted",
    totalDonated: 0,
    subscriberCount: 0,
    isActive: true
  },
  {
    name: "Goonj",
    category: "Relief",
    description: "Converting urban surplus into development",
    impact: "₹5Cr+ material distributed",
    totalDonated: 0,
    subscriberCount: 0,
    isActive: true
  }
  // Add more charities as needed
]);

// Add initial draw
db.draws.insertOne({
  month: "January",
  year: 2025,
  status: "active",
  startDate: new Date("2025-01-01"),
  endDate: new Date("2025-01-31"),
  minScore: 1,
  maxScore: 45,
  prizePool: 107500,
  prizes: [
    { position: 1, amount: 50000 },
    { position: 2, amount: 25000 },
    { position: 3, amount: 10000 },
    { position: 4, amount: 2500 },
    { position: 5, amount: 2500 }
  ],
  totalParticipants: 0,
  winners: [],
  charityContribution: 0
});
```

## Common Issues & Solutions

### Issue 1: Backend Won't Start
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Port 5000 is already in use
```bash
# Change port in .env or find and kill process
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Issue 2: MongoDB Connection Error
```
MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** MongoDB is not running
```bash
# On Mac (using Homebrew):
brew services start mongodb-community

# On Windows:
net start MongoDB

# Or use MongoDB Atlas (cloud) instead
```

### Issue 3: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Backend CORS not configured
- Ensure `FRONTEND_URL=http://localhost:5173` in backend .env
- Restart backend server

### Issue 4: Authentication Issues
```
Not authorized to access this route
```
**Solution:** 
- Check token in browser localStorage
- Clear browser cache and login again
- Verify JWT_SECRET matches in .env

### Issue 5: Stripe Errors
```
Invalid API Key provided
```
**Solution:**
- Use correct Stripe test keys from dashboard
- Keys must be between sk_test_ and pk_test_
- Restart backend after changing keys

## Project Statistics

### Frontend
- **Pages**: 19 (6 public, 7 user, 6 admin)
- **Components**: 8 reusable components
- **API Modules**: 6 (auth, user, scores, draws, charities, payments)
- **Lines of Code**: ~5,000+

### Backend
- **Routes**: 6 route files
- **Controllers**: 6 controllers (auth, user, score, draw, charity, payment)
- **Models**: 6 MongoDB models (User, Charity, Score, Draw, Winning, Transaction)
- **Middleware**: Authentication, error handling
- **Lines of Code**: ~2,500+

### Database
- **Collections**: 6 (users, charities, scores, draws, winnings, transactions)
- **Indexes**: User email, transaction dates, draw status

## Deployment

### Backend Deployment (Railway, Render, Heroku)

1. Push to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel, Netlify)

1. Push to GitHub
2. Connect to deployment platform
3. Set `VITE_API_URL` to production backend
4. Deploy

## Development Tips

### Useful MongoDB Queries
```javascript
// Find user by email
db.users.findOne({ email: "user@example.com" })

// Update user role to admin
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)

// View all transactions
db.transactions.find().sort({ createdAt: -1 })

// Reset database
db.dropDatabase()
```

### API Testing (using curl)

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get user profile
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Next Steps

1. **Customize Charities**: Update charity information in database
2. **Set Up Email**: Add email notifications for draws and winnings
3. **Add Analytics**: Enhance admin dashboard with more metrics
4. **Mobile App**: Consider React Native version
5. **Localization**: Add multiple language support
6. **Testing**: Write unit and integration tests

## Support & Documentation

- Frontend README: See `Golf-Charity-frontend/README.md`
- Backend README: See `Golf-Charity-backend/README.md`
- API Documentation: See `Golf-Charity-backend/API.md` (to be created)

## License

ISC
