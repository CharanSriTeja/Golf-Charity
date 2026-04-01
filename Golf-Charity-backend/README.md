# Golf Charity Platform - Backend API

A comprehensive Node.js/Express backend for the Golf Charity Platform with MongoDB database integration, Stripe payments, and role-based access control.

## Features

- **Authentication**: JWT-based user authentication with password hashing
- **User Management**: User profiles, subscription management, and admin controls
- **Score Management**: Track golf scores for monthly draws
- **Draw Management**: Create and manage monthly draws with winners announcement
- **Charity Management**: Manage partner charities and track donations
- **Payment Integration**: Stripe integration for subscription payments
- **Admin Dashboard**: Full admin capabilities for user and draw management
- **Role-Based Access Control**: User and Admin roles with different permissions

## Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Payments**: Stripe
- **Security**: Helmet, CORS
- **Logging**: Morgan

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe account for payment processing

### Setup

1. **Clone the repository**
```bash
cd Golf-Charity-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/golf-charity
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. **Start the server**
```bash
npm run dev  # Development mode with auto-reload
npm start   # Production mode
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/password` - Update password (protected)
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `GET /api/users/stats` - Get user stats (protected)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Scores
- `POST /api/scores` - Create score (protected)
- `GET /api/scores/user/scores` - Get user scores (protected)
- `GET /api/scores/:drawId` - Get draw scores (protected)
- `PUT /api/scores/:id` - Update score (protected)
- `DELETE /api/scores/:id` - Delete score (protected)
- `PUT /api/scores/:id/verify` - Verify score (admin only)

### Draws
- `GET /api/draws` - Get all draws (protected)
- `GET /api/draws/active` - Get active draw (protected)
- `GET /api/draws/:id` - Get draw by ID (protected)
- `POST /api/draws` - Create draw (admin only)
- `PUT /api/draws/:id` - Update draw (admin only)
- `POST /api/draws/:id/announce` - Announce draw winners (admin only)
- `DELETE /api/draws/:id` - Delete draw (admin only)

### Charities
- `GET /api/charities` - Get all charities (public)
- `GET /api/charities/:id` - Get charity by ID (public)
- `GET /api/charities/:id/stats` - Get charity stats (public)
- `POST /api/charities` - Create charity (admin only)
- `PUT /api/charities/:id` - Update charity (admin only)
- `DELETE /api/charities/:id` - Delete charity (admin only)

### Payments
- `POST /api/payments/payment-intent` - Create payment intent (protected)
- `POST /api/payments/confirm` - Confirm payment (protected)
- `GET /api/payments/transactions` - Get transactions (protected)
- `POST /api/payments/cancel-subscription` - Cancel subscription (protected)
- `POST /api/payments/webhook` - Stripe webhook (public)

## Database Models

### User
- Personal information (name, email, phone, address)
- Authentication credentials (password - hashed)
- Subscription status and details
- Role-based access (user/admin)
- Charity preferences
- Statistics (total spent, total winnings)

### Charity
- Basic information (name, category, description)
- Contact details and website
- Bank details for donations
- Impact metrics
- Donation tracking

### Score
- User golf scores
- Draw association
- Verification status
- Tournament/player information

### Draw
- Monthly draw management
- Status tracking (upcoming, active, closed, completed)
- Prize distribution
- Winner announcement
- Charity contribution tracking

### Winning
- Prize tracking
- Donation calculations
- Payment status management
- Tax receipt generation

### Transaction
- Payment records
- Subscription history
- Refund tracking
- Charity donations

## Authentication Flow

1. User registers with email and password
2. Password is hashed using bcryptjs
3. On login, credentials are verified
4. JWT token is generated valid for 7 days
5. Token must be included in Authorization header: `Bearer <token>`
6. Protected routes verify token validity
7. Admin routes verify both token and user role

## Error Handling

All errors follow a consistent format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS enabled for frontend
- Helmet.js for security headers
- MongoDB injection prevention via Mongoose
- Role-based access control
- Input validation

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Deployment

The backend is ready for deployment on platforms like:
- Heroku
- Railway
- Render
- AWS
- DigitalOcean

Update environment variables in your deployment platform.

## Support

For issues or questions, please contact the development team or create an issue in the repository.

## License

ISC
