# Golf Charity Platform

A modern full-stack web application that combines golf score tracking with charitable giving. Players compete in monthly draws to win real cash prizes while automatically contributing to causes they care about.

## Overview

The Golf Charity Platform is a complete web application built with:
- **Frontend**: React 19+ with Vite, React Router, and Stripe payments
- **Backend**: Node.js/Express with MongoDB and JWT authentication
- **Database**: MongoDB for data persistence
- **Payments**: Stripe integration for subscription management

## Key Features

- **Play**: Submit golf scores for monthly draws
- **Win**: Compete with other players for real cash prizes
- **Give**: Automatically donate a portion of subscriptions to your chosen charity
- **Track**: Monitor your scores, winnings, and donations
- **Manage**: Admin dashboard for platform management

## Quick Links

- [Frontend Setup](Golf-Charity-frontend/README.md)
- [Backend Setup](Golf-Charity-backend/README.md)
- [Complete Setup Guide](SETUP_GUIDE.md) - Recommended starting point

## Architecture

### Frontend (React)
```
Golf-Charity-frontend/
├── src/
│   ├── pages/         # 19 page components
│   ├── components/    # Reusable UI components
│   ├── context/       # Global state (auth)
│   ├── hooks/         # Custom hooks
│   ├── api/           # API client
│   └── utils/         # Utilities
├── index.html
├── package.json
└── vite.config.js
```

### Backend (Node.js + Express)
```
Golf-Charity-backend/
├── models/            # MongoDB schemas (6 models)
├── controllers/       # Business logic
├── routes/            # API endpoints
├── middleware/        # Auth & error handling
├── server.js          # Entry point
├── package.json
└── .env               # Configuration
```

### Database (MongoDB)
- Users (authentication & profiles)
- Charities (partner organizations)
- Scores (golf scores)
- Draws (monthly competitions)
- Winnings (prize tracking)
- Transactions (payment history)

## Getting Started

### 1. Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- Stripe account (free tier works)
- Git

### 2. Quick Setup (2 minutes)

**Backend:**
```bash
cd Golf-Charity-backend
npm install
# Configure .env with MongoDB URI and Stripe keys
npm run dev
```

**Frontend (new terminal):**
```bash
cd Golf-Charity-frontend
npm install
# Configure .env with backend URL
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 3. Complete Setup Guide

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions including:
- Database setup
- Environment configuration
- Testing procedures
- Deployment options

## Platform Pages

### Public Pages (No Authentication Required)
- **Home** - Landing page with features
- **How It Works** - 3-step process explanation
- **Charities** - Browse partner organizations
- **Pricing** - Subscription plans

### User Pages (Authentication Required)
- **Dashboard** - Quick stats and navigation
- **Scores** - Add and manage golf scores (1-45 Stableford)
- **My Charity** - Select preferred charity and donation %
- **Draws** - View active and past draws
- **Winnings** - Track prizes and donations
- **Profile** - Edit personal info and manage account
- **Checkout** - Stripe payment for subscriptions

### Admin Pages (Admin Role Required)
- **Dashboard** - System analytics
- **Users** - Manage all registered users
- **Draws** - Create/manage monthly competitions
- **Charities** - Add/update partner charities
- **Payouts** - Process winner payments
- **Subscriptions** - Monitor subscription status

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Change password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/stats` - Get user statistics
- `GET /api/users` - List all users (admin)
- `PUT /api/users/:id` - Update user (admin)

### Scores
- `POST /api/scores` - Submit score
- `GET /api/scores/user/scores` - Get user scores
- `GET /api/scores/:drawId` - Get draw scores
- `PUT /api/scores/:id` - Update score
- `PUT /api/scores/:id/verify` - Verify score (admin)

### Draws
- `GET /api/draws` - List draws
- `GET /api/draws/active` - Get active draw
- `POST /api/draws` - Create draw (admin)
- `POST /api/draws/:id/announce` - Announce winners (admin)

### Charities
- `GET /api/charities` - List charities
- `GET /api/charities/:id` - Get charity details
- `POST /api/charities` - Add charity (admin)
- `PUT /api/charities/:id` - Update charity (admin)

### Payments
- `POST /api/payments/payment-intent` - Create payment
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/transactions` - View transactions

## Tech Stack Details

### Frontend
- React 19.2+ for UI
- React Router v6 for navigation
- Axios for HTTP requests
- Recharts for analytics
- CSS-in-JS + Tailwind CSS for styling
- Stripe React for payments
- Vite for build tooling

### Backend
- Express.js for server
- MongoDB + Mongoose for database
- JWT for authentication
- bcryptjs for password hashing
- Stripe SDK for payments
- Helmet for security
- Morgan for logging
- CORS for cross-origin requests

## Features Breakdown

### User Features
- Email/password authentication
- JWT token-based sessions
- Profile management
- Score submission (monthly draws)
- Charity selection (10-40% donation)
- Draw participation tracking
- Prize history and donations
- Subscription management

### Admin Features
- Dashboard with analytics
- User management
- Draw operations
- Charity CRUD
- Payment tracking
- Subscription monitoring
- Score verification
- Winner announcement

### Payment Features
- Stripe payment processing
- Monthly and yearly subscriptions
- Automatic renewal
- Subscription cancellation
- Transaction history
- Tax documentation

## Data Flow

```
User → Frontend (React) → Backend API (Express) → Database (MongoDB)
                ↓
            Stripe (Payments)
```

1. User interacts with frontend
2. Frontend sends API requests to backend
3. Backend validates, processes, and stores data in MongoDB
4. Stripe processes payments securely
5. Backend updates user subscription status

## Security

- JWT token authentication
- Password hashing with bcryptjs
- CORS protection
- Helmet.js security headers
- Input validation on all endpoints
- Role-based access control
- Secure Stripe integration
- MongoDB injection prevention via Mongoose

## Performance

- Frontend code splitting with React Router
- API request caching
- Lazy loading components
- Efficient state management
- Database indexing on frequently queried fields
- Gzip compression
- CDN ready

## Monitoring & Logging

- Morgan request logging (backend)
- Console error tracking
- Transaction logging
- User activity tracking
- Admin audit logs

## Testing

### Manual Testing
See SETUP_GUIDE.md for step-by-step testing procedures

### Automated Testing (To be implemented)
```bash
npm test  # Frontend
npm test  # Backend
```

## Deployment

### Frontend
- Ready for: Vercel, Netlify, AWS S3, GitHub Pages
- Build: `npm run build`
- Output: Static files in `dist/`

### Backend
- Ready for: Railway, Render, Heroku, AWS, DigitalOcean
- Start: `npm start`
- Port: Configurable via PORT env var

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/golf-charity
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## Project Statistics

| Metric | Count |
|--------|-------|
| Frontend Pages | 19 |
| Components | 8+ |
| Backend Routes | 40+ |
| Models | 6 |
| API Endpoints | 25+ |
| Lines of Code | 7,500+ |

## File Structure

```
Golf-Charity/
├── Golf-Charity-frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── Golf-Charity-backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── README.md
├── SETUP_GUIDE.md
└── README.md
```

## Contributing

1. Create a branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Troubleshooting

### Issue: Backend won't start
- Check if MongoDB is running
- Verify .env configuration
- Check if port 5000 is available

### Issue: Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend .env
- Verify CORS settings in backend

### Issue: Login not working
- Check JWT_SECRET matches between .env files
- Verify MongoDB has user records
- Check browser console for errors

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more troubleshooting.

## Support

For detailed setup instructions, see:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup instructions
- [Frontend README](Golf-Charity-frontend/README.md) - Frontend documentation
- [Backend README](Golf-Charity-backend/README.md) - Backend documentation

## License

ISC

## Next Steps

1. Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete setup
2. Test all features using provided test accounts
3. Customize charities and prizes
4. Configure Stripe for production
5. Deploy to your chosen platform

---

**Ready to build?** Start with [SETUP_GUIDE.md](SETUP_GUIDE.md)!
