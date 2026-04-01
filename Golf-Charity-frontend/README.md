# Golf Charity Platform - Frontend

A modern React-based frontend for the Golf Charity Platform featuring user authentication, dashboard, scoring system, admin panel, and Stripe payment integration.

## Features

- **Public Pages**: Home, How It Works, Charities, Pricing
- **User Authentication**: Login, Signup, Password Reset
- **User Dashboard**: Personal stats, score tracking, charity selection
- **Score Management**: Submit and track golf scores for monthly draws
- **Draw Participation**: View active draws and past winners
- **Winnings Tracking**: Monitor prizes and donations
- **User Profile**: Edit profile and manage subscription
- **Admin Panel**: 
  - Dashboard with analytics
  - User management
  - Draw management
  - Charity management
  - Payout tracking
  - Subscription management
- **Payment Integration**: Stripe checkout and subscription management
- **Responsive Design**: Mobile, tablet, and desktop optimized

## Tech Stack

- **Framework**: React 19.2+
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Components**: Custom styled components
- **Styling**: CSS-in-JS + Tailwind CSS
- **Build Tool**: Vite
- **Payment**: Stripe
- **Charts**: Recharts

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
cd Golf-Charity-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```

4. **Start development server**
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Project Structure

```
src/
├── pages/               # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── ForgotPasswordPage.jsx
│   ├── DashboardPage.jsx
│   ├── ScoresPage.jsx
│   ├── MyCharityPage.jsx
│   ├── DrawParticipationPage.jsx
│   ├── WinningsPage.jsx
│   ├── ProfilePage.jsx
│   ├── CheckoutPage.jsx
│   ├── PaymentSuccessPage.jsx
│   ├── PaymentFailurePage.jsx
│   ├── AdminDashboardPage.jsx
│   ├── UserManagementPage.jsx
│   ├── DrawManagementPage.jsx
│   ├── CharityManagementPage.jsx
│   ├── PayoutManagementPage.jsx
│   └── SubscriptionsManagementPage.jsx
├── components/          # Reusable components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── LoadingSpinner.jsx
│   ├── ProtectedRoute.jsx
│   ├── DashboardSidebar.jsx
│   └── AdminSidebar.jsx
├── context/            # React Context for state management
│   └── AuthContext.jsx
├── hooks/              # Custom hooks
│   └── useAuth.js
├── api/                # API client and endpoints
│   ├── client.js
│   ├── auth.js
│   ├── user.js
│   ├── charities.js
│   ├── draws.js
│   ├── admin.js
│   ├── stripe.js
│   └── sports.js
├── utils/              # Utility functions
│   ├── formatters.js
│   ├── validators.js
│   └── constants.js
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Key Pages

### Public Pages
- **Home**: Landing page with hero, features, and charity showcase
- **How It Works**: 3-step process explanation
- **Charities**: Browse all partner charities
- **Pricing**: Subscription plans and features

### User Pages
- **Dashboard**: Quick stats and navigation hub
- **Scores**: Add and manage golf scores
- **My Charity**: Select and manage charity preference
- **Draws**: View active and past draws
- **Winnings**: Track prizes and donations
- **Profile**: Edit personal information and settings
- **Checkout**: Stripe payment integration

### Admin Pages
- **Admin Dashboard**: System analytics and overview
- **Users**: Manage all registered users
- **Draws**: Create and manage monthly draws
- **Charities**: Add and update charity information
- **Payouts**: Track winner payments and charities
- **Subscriptions**: Monitor subscription status

## API Integration

The frontend communicates with the backend API at `VITE_API_URL` (default: http://localhost:5000/api).

### Authentication
```javascript
// Login
POST /auth/login
{ email, password }

// Signup
POST /auth/signup
{ name, email, password, charityId }

// Get current user
GET /auth/me
Headers: { Authorization: Bearer <token> }
```

### User Dashboard
```javascript
// Get user profile
GET /users/profile

// Update profile
PUT /users/profile
{ name, phone, city, state, country, charityId, donationPercentage }

// Get user stats
GET /users/stats
```

### Scores
```javascript
// Create score
POST /scores
{ playerName, tournamentName, score, drawId, notes }

// Get user scores
GET /scores/user/scores

// Get draw scores
GET /scores/:drawId
```

### Draws
```javascript
// Get all draws
GET /draws

// Get active draw
GET /draws/active

// Get draw details
GET /draws/:id
```

### Charities
```javascript
// Get all charities
GET /charities

// Get charity details
GET /charities/:id
```

### Payments
```javascript
// Create payment intent
POST /payments/payment-intent
{ plan } // 'monthly' or 'yearly'

// Confirm payment
POST /payments/confirm
{ paymentIntentId, plan }

// Get transactions
GET /payments/transactions
```

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected requests
5. AuthContext manages global auth state
6. ProtectedRoute wraps pages requiring authentication
7. Admin routes require additional role check

## Styling

The app uses custom CSS-in-JS styling with predefined color variables:

```css
:root {
  --bg: #F9F6F1;              /* Background */
  --surface: #FFFFFF;         /* Cards/Surfaces */
  --ink: #1A1A18;             /* Text */
  --muted: #6B6B60;           /* Secondary text */
  --accent: #2D6A4F;          /* Primary accent */
  --accent-light: #D8F3DC;    /* Light accent */
  --gold: #C9A84C;            /* Secondary accent */
  --gold-light: #FFF8E7;      /* Light secondary */
  --border: #E8E4DC;          /* Borders */
}
```

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting with React Router
- Image optimization
- Lazy loading for components
- Efficient state management with Context API
- API request caching with Axios interceptors

## Security Best Practices

- JWT tokens stored securely
- XSS prevention with React
- CSRF protection on API calls
- Input validation on all forms
- Secure Stripe payment integration
- Role-based access control

## Deployment

The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Vercel Deployment
```bash
npm run build
vercel deploy
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 3000
```

### API Connection Issues
- Ensure backend is running on `localhost:5000`
- Check `VITE_API_URL` in `.env`
- Verify CORS settings on backend

### Authentication Issues
- Clear localStorage and retry login
- Check JWT token expiration
- Verify token in browser DevTools

## Support

For issues or questions, please contact the development team or create an issue in the repository.

## License

ISC
