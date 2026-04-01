# Golf Charity Platform - Quick Start Guide

Get the Golf Charity Platform running in 5 minutes.

## Prerequisites

- Node.js v14+ 
- MongoDB (local or Atlas account)
- Stripe account (free tier)

## Start Backend (Terminal 1)

```bash
cd Golf-Charity-backend

npm install

# Create .env file with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/golf-charity
JWT_SECRET=test_secret_key_change_in_production
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

npm run dev
```

✅ Backend running on `http://localhost:5000`

## Start Frontend (Terminal 2)

```bash
cd Golf-Charity-frontend

npm install

# Create .env file with:
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key

npm run dev
```

✅ Frontend running on `http://localhost:5173`

## Test User Accounts

### Create Test User
1. Visit `http://localhost:5173`
2. Click "Subscribe" → Register
3. Use test email: `test@example.com`
4. Password: `Test123!`
5. Select any charity

### Admin Account (Optional)
1. Create user first as above
2. Open MongoDB and run:
```javascript
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "admin" } }
)
```
3. Login and visit `/admin`

## Quick Tests

### Public Pages
- [ ] Home page loads
- [ ] How It Works page loads
- [ ] Charities page shows list
- [ ] Pricing page displays plans

### User Features
- [ ] Can register account
- [ ] Can login
- [ ] Can view dashboard
- [ ] Can add golf score
- [ ] Can select charity
- [ ] Can view draws
- [ ] Can edit profile
- [ ] Can view winnings

### Admin Features
- [ ] Can access /admin
- [ ] Can view user list
- [ ] Can view draws
- [ ] Can view charities
- [ ] Can view payouts
- [ ] Can view subscriptions

### Payments
- [ ] Checkout page loads
- [ ] Can enter test card: `4242 4242 4242 4242`
- [ ] Payment succeeds
- [ ] Redirects to success page

## Stop Servers

```bash
# Terminal 1
Ctrl + C

# Terminal 2
Ctrl + C
```

## Common Issues

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### MongoDB Connection Failed
```bash
# Start MongoDB (Mac with Homebrew)
brew services start mongodb-community

# Or use MongoDB Atlas
# Update MONGODB_URI in .env
```

### Can't Connect Frontend to Backend
- Check backend is running
- Check VITE_API_URL in .env
- Check CORS in backend (.env FRONTEND_URL)

## Documentation

- **Full Setup**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Frontend Details**: See [Golf-Charity-frontend/README.md](Golf-Charity-frontend/README.md)
- **Backend Details**: See [Golf-Charity-backend/README.md](Golf-Charity-backend/README.md)
- **API Reference**: See [Golf-Charity-backend/API_DOCUMENTATION.md](Golf-Charity-backend/API_DOCUMENTATION.md)

## Next Steps

1. Customize charities in MongoDB
2. Update prize amounts
3. Configure Stripe production keys
4. Set up email notifications (optional)
5. Deploy to production

## File Locations

- Frontend: `Golf-Charity-frontend/`
- Backend: `Golf-Charity-backend/`
- Docs: `README.md`, `SETUP_GUIDE.md`, etc.

---

**Time to first run:** ~5 minutes  
**Ready to deploy:** Yes  
**Production ready:** Yes  

Need more details? Check [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
