# Golf Charity Platform - API Documentation

Complete API reference for the Golf Charity Platform backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```
POST /auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "charityId": "charity_id_here"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "subscription": {
      "plan": "free",
      "status": "inactive"
    }
  }
}
```

### Login User
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Current User
```
GET /auth/me
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "city": "Mumbai",
    "role": "user",
    "charityId": "charity_id",
    "donationPercentage": 30,
    "totalSpent": 5000,
    "totalWinnings": 50000
  }
}
```

### Update Password
```
PUT /auth/password
Headers: Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully",
  "token": "new_jwt_token"
}
```

---

## User Endpoints

### Get User Profile
```
GET /users/profile
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "city": "Mumbai",
    "state": "Maharashtra",
    "charityId": "charity_id",
    "donationPercentage": 30
  }
}
```

### Update User Profile
```
PUT /users/profile
Headers: Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+91-9876543210",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "charityId": "charity_id",
  "donationPercentage": 35
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "updated": true
  }
}
```

### Get User Statistics
```
GET /users/stats
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalSpent": 5000,
    "totalWinnings": 50000,
    "subscription": {
      "plan": "monthly",
      "status": "active",
      "endDate": "2025-02-15"
    },
    "charity": {
      "id": "charity_id",
      "name": "Teach For India"
    }
  }
}
```

### Get All Users (Admin)
```
GET /users?page=1&limit=10&role=user&isActive=true
Headers: Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 10)
- `role` (optional): 'user' or 'admin'
- `isActive` (optional): 'true' or 'false'

**Response (200):**
```json
{
  "success": true,
  "users": [...],
  "totalPages": 5,
  "currentPage": 1,
  "total": 50
}
```

### Get User by ID (Admin)
```
GET /users/:id
Headers: Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true
  }
}
```

### Update User (Admin)
```
PUT /users/:id
Headers: Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+91-9876543210",
  "role": "admin",
  "isActive": true
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "updated": true
  }
}
```

### Delete User (Admin)
```
DELETE /users/:id
Headers: Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Score Endpoints

### Create Score
```
POST /scores
Headers: Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "playerName": "John Doe",
  "tournamentName": "PGA Championship",
  "score": 35,
  "drawId": "draw_id",
  "notes": "Great game"
}
```

**Response (201):**
```json
{
  "success": true,
  "score": {
    "id": "score_id",
    "userId": "user_id",
    "drawId": "draw_id",
    "score": 35,
    "verified": false
  }
}
```

### Get User Scores
```
GET /scores/user/scores?page=1&limit=10&drawId=draw_id
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "scores": [
    {
      "id": "score_id",
      "playerName": "John Doe",
      "score": 35,
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "totalPages": 1,
  "currentPage": 1,
  "total": 5
}
```

### Get Draw Scores
```
GET /scores/:drawId?page=1&limit=100
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "scores": [
    {
      "id": "score_id",
      "playerName": "John Doe",
      "score": 35,
      "userId": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "total": 100
}
```

### Update Score
```
PUT /scores/:id
Headers: Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "score": 40,
  "notes": "Corrected score"
}
```

**Response (200):**
```json
{
  "success": true,
  "score": {
    "id": "score_id",
    "score": 40
  }
}
```

### Delete Score
```
DELETE /scores/:id
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Score deleted successfully"
}
```

### Verify Score (Admin)
```
PUT /scores/:id/verify
Headers: Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "score": {
    "id": "score_id",
    "verified": true,
    "verifiedBy": "admin_id"
  }
}
```

---

## Draw Endpoints

### Get All Draws
```
GET /draws?page=1&limit=10&status=active&year=2025
Headers: Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional)
- `limit` (optional)
- `status` (optional): 'upcoming', 'active', 'closed', 'completed'
- `year` (optional)

**Response (200):**
```json
{
  "success": true,
  "draws": [
    {
      "id": "draw_id",
      "month": "January",
      "year": 2025,
      "status": "active",
      "prizePool": 107500,
      "totalParticipants": 500
    }
  ],
  "totalPages": 1,
  "total": 12
}
```

### Get Active Draw
```
GET /draws/active
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "draw": {
    "id": "draw_id",
    "month": "January",
    "year": 2025,
    "status": "active",
    "startDate": "2025-01-01T00:00:00Z",
    "endDate": "2025-01-31T23:59:59Z",
    "prizePool": 107500,
    "prizes": [
      {
        "position": 1,
        "amount": 50000
      }
    ]
  }
}
```

### Get Draw by ID
```
GET /draws/:id
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "draw": {
    "id": "draw_id",
    "month": "January",
    "year": 2025,
    "status": "active",
    "winners": [
      {
        "userId": {
          "name": "John Doe",
          "email": "john@example.com"
        },
        "position": 1,
        "score": 42,
        "prizeAmount": 50000
      }
    ]
  }
}
```

### Create Draw (Admin)
```
POST /draws
Headers: Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "month": "February",
  "year": 2025,
  "startDate": "2025-02-01T00:00:00Z",
  "endDate": "2025-02-28T23:59:59Z",
  "prizePool": 107500,
  "prizes": [
    {
      "position": 1,
      "amount": 50000
    },
    {
      "position": 2,
      "amount": 25000
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "draw": {
    "id": "new_draw_id",
    "month": "February",
    "status": "upcoming"
  }
}
```

### Update Draw (Admin)
```
PUT /draws/:id
Headers: Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "active",
  "prizes": [...]
}
```

### Announce Draw (Admin)
```
POST /draws/:id/announce
Headers: Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Draw announced successfully",
  "winners": [
    {
      "userId": "user_id",
      "position": 1,
      "prizeAmount": 50000
    }
  ]
}
```

---

## Charity Endpoints

### Get All Charities
```
GET /charities?page=1&limit=10&category=Education&isActive=true
```

**Query Parameters:**
- `page` (optional)
- `limit` (optional)
- `category` (optional)
- `isActive` (optional)

**Response (200):**
```json
{
  "success": true,
  "charities": [
    {
      "id": "charity_id",
      "name": "Teach For India",
      "category": "Education",
      "description": "Bridging education gaps",
      "totalDonated": 500000,
      "subscriberCount": 2500
    }
  ],
  "totalPages": 1,
  "total": 6
}
```

### Get Charity by ID
```
GET /charities/:id
```

**Response (200):**
```json
{
  "success": true,
  "charity": {
    "id": "charity_id",
    "name": "Teach For India",
    "category": "Education",
    "description": "Bridging education gaps",
    "website": "https://www.teachforindia.org",
    "email": "contact@teachforindia.org",
    "impact": "12,000+ students impacted"
  }
}
```

### Get Charity Stats
```
GET /charities/:id/stats
```

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "name": "Teach For India",
    "totalDonated": 500000,
    "subscriberCount": 2500,
    "impact": "12,000+ students impacted"
  }
}
```

### Create Charity (Admin)
```
POST /charities
Headers: Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "New Charity",
  "category": "Education",
  "description": "Description here",
  "website": "https://example.com",
  "email": "contact@example.com",
  "phone": "+91-1234567890",
  "impact": "Impact statement"
}
```

### Update Charity (Admin)
```
PUT /charities/:id
Headers: Authorization: Bearer <admin_token>
```

### Delete Charity (Admin)
```
DELETE /charities/:id
Headers: Authorization: Bearer <admin_token>
```

---

## Payment Endpoints

### Create Payment Intent
```
POST /payments/payment-intent
Headers: Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "plan": "monthly"
}
```

**Response (200):**
```json
{
  "success": true,
  "clientSecret": "pi_xxxxx_secret_xxxxx",
  "transactionId": "transaction_id"
}
```

### Confirm Payment
```
POST /payments/confirm
Headers: Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "paymentIntentId": "pi_xxxxx",
  "plan": "monthly"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Subscription activated successfully",
  "user": {
    "subscription": {
      "plan": "monthly",
      "status": "active",
      "endDate": "2025-02-15"
    }
  }
}
```

### Get Transactions
```
GET /payments/transactions?page=1&limit=10&type=subscription&status=success
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "transaction_id",
      "type": "subscription",
      "amount": 999,
      "status": "success",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "total": 5
}
```

### Cancel Subscription
```
POST /payments/cancel-subscription
Headers: Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Subscription cancelled successfully"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Status Codes:**
- 400 - Bad Request (validation error)
- 401 - Unauthorized (no token or invalid token)
- 403 - Forbidden (insufficient permissions)
- 404 - Not Found (resource doesn't exist)
- 500 - Server Error

**Example Error:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. Recommended for production deployment.

---

## CORS

CORS is enabled for the frontend URL specified in `FRONTEND_URL` environment variable.

---

## Testing with cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get profile (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"

# Create score
curl -X POST http://localhost:5000/api/scores \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"playerName":"John","score":35,"drawId":"draw_id"}'
```

---

## API Status

Health check endpoint:
```
GET /api/health
```

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Support

For issues with the API, check:
1. Backend logs in terminal
2. MongoDB connection
3. Environment variables
4. Stripe keys configuration
5. CORS settings
