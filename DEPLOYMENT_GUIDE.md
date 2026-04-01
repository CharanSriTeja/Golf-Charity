# Golf Charity Platform - Deployment Guide

## Overview

This guide covers deploying both the frontend (React) and backend (Node.js) components of the Golf Charity Platform to production environments.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Docker Deployment](#docker-deployment)
3. [Vercel Deployment (Frontend)](#vercel-deployment-frontend)
4. [Backend Deployment Options](#backend-deployment-options)
5. [Database Setup](#database-setup)
6. [Environment Configuration](#environment-configuration)
7. [Security Checklist](#security-checklist)

---

## Local Development Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/CharanSriTeja/Golf-Charity.git
cd Golf-Charity
```

2. **Setup Frontend**
```bash
cd Golf-Charity-frontend
cp .env.example .env
npm install
npm run dev
```

3. **Setup Backend**
```bash
cd Golf-Charity-backend
cp .env.example .env
npm install
npm run dev
```

4. **Configure environment variables**
   - Update `.env` files with your credentials
   - Set MongoDB URI
   - Add Stripe keys
   - Set JWT secret

Frontend runs on `http://localhost:5173`
Backend runs on `http://localhost:5000`

---

## Docker Deployment

### Using Docker Compose (Recommended for Development)

1. **Ensure Docker and Docker Compose are installed**

2. **Build and run all services**
```bash
docker-compose up --build
```

3. **Stop services**
```bash
docker-compose down
```

4. **View logs**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Production Docker Build

```bash
# Build frontend
docker build -t golf-charity-frontend:latest ./Golf-Charity-frontend

# Build backend
docker build -t golf-charity-backend:latest ./Golf-Charity-backend

# Run containers
docker run -p 3000:3000 golf-charity-frontend:latest
docker run -p 5000:5000 -e MONGODB_URI=... golf-charity-backend:latest
```

---

## Vercel Deployment (Frontend)

### Step 1: Prepare Repository

Ensure the frontend is in the root or correct directory structure.

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or login with GitHub
3. Click "Add New" → "Project"
4. Select your GitHub repository
5. Choose root directory: `Golf-Charity-frontend`

### Step 3: Configure Environment Variables

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add the following:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://api.yourdomain.com`)
   - `VITE_STRIPE_PUBLIC_KEY`: Your Stripe public key

### Step 4: Deploy

Click "Deploy" button. Vercel will automatically build and deploy on every push to main.

### Custom Domain

1. Go to Settings → Domains
2. Add your custom domain (e.g., www.golfcharity.com)
3. Follow DNS configuration instructions

---

## Backend Deployment Options

### Option 1: Railway.app (Recommended)

1. **Create Railway account** at [railway.app](https://railway.app)

2. **Connect GitHub repository**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize and select Golf-Charity-backend

3. **Configure environment variables**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secure_secret
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   FRONTEND_URL=https://yourfrontend.vercel.app
   ```

4. **Deploy**
   - Railway automatically deploys on push
   - Get API URL from Railway dashboard

### Option 2: Render.com

1. **Create Render account** at [render.com](https://render.com)

2. **Create new Web Service**
   - Select GitHub repository
   - Set runtime to Node
   - Root directory: `Golf-Charity-backend`

3. **Configure**
   - Build Command: `npm ci`
   - Start Command: `node server.js`
   - Add environment variables

4. **Deploy**
   - Click "Create Web Service"
   - Render handles deployments automatically

### Option 3: Heroku (Deprecated but still works)

1. **Install Heroku CLI**

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku app**
```bash
heroku create golf-charity-api
```

4. **Set environment variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=sk_live_...
```

5. **Deploy**
```bash
git push heroku main
```

### Option 4: AWS/DigitalOcean (VPS)

For VPS deployment:

1. **SSH into server**
2. **Install Node.js and MongoDB**
3. **Clone repository**
4. **Install dependencies**: `npm ci`
5. **Set environment variables**
6. **Use PM2 for process management**: `pm2 start server.js`
7. **Setup Nginx reverse proxy**
8. **Configure SSL with Let's Encrypt**

---

## Database Setup

### MongoDB Atlas (Cloud - Recommended)

1. **Create account** at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

2. **Create cluster**
   - Choose free tier (M0)
   - Select your region

3. **Create database user**
   - Username: `golfcharity_user`
   - Generate secure password

4. **Get connection string**
   ```
   mongodb+srv://golfcharity_user:password@cluster.mongodb.net/golf_charity
   ```

5. **Whitelist IP addresses**
   - Add your server IPs to IP Access List
   - Use 0.0.0.0/0 for development only

### Local MongoDB

```bash
# Install MongoDB Community Edition
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connect
mongosh mongodb://localhost:27017
```

---

## Environment Configuration

### Frontend (.env)

```env
# Production
VITE_API_URL=https://api.golfcharity.com
VITE_STRIPE_PUBLIC_KEY=pk_live_your_key

# Development
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```

### Backend (.env)

```env
# Environment
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Security
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook

# URLs
FRONTEND_URL=https://golfcharity.com

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_password

# Session
SESSION_EXPIRY=86400
```

---

## SSL/HTTPS Configuration

### For Vercel
- Automatic SSL via vercel.com

### For Railway/Render
- Automatic SSL via platform

### For Self-hosted
```bash
# Using Let's Encrypt
sudo apt-get install certbot
sudo certbot certonly -d yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## CDN Configuration

### Cloudflare (Recommended)

1. **Update nameservers** to Cloudflare
2. **Create DNS records** for your domain
3. **Enable SSL/TLS** → Full (Strict)
4. **Setup page rules** for caching
5. **Enable DDoS protection**

---

## Monitoring and Logging

### Backend Logs

```bash
# Railway
railway logs

# Render
render logs

# Local
npm run dev (shows logs in terminal)
```

### Health Check

Test API health:
```bash
curl https://api.golfcharity.com/api/health
```

### Monitoring Tools

- **Sentry** for error tracking
- **DataDog** for performance monitoring
- **New Relic** for comprehensive monitoring

---

## Security Checklist

- [ ] Change default MongoDB credentials
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS on all domains
- [ ] Setup CORS correctly (don't use *)
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable CSRF protection
- [ ] Setup rate limiting
- [ ] Enable request logging
- [ ] Regular backups of database
- [ ] Monitor for suspicious activity
- [ ] Keep dependencies updated
- [ ] Use security headers (Helmet.js)
- [ ] Test payment flows in test mode first
- [ ] Implement 2FA for admin accounts
- [ ] Setup SSL certificate with auto-renewal

---

## Troubleshooting

### Frontend not connecting to backend
- Check `VITE_API_URL` environment variable
- Verify backend is running
- Check CORS settings on backend
- Check browser console for errors

### Database connection errors
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Verify database user credentials
- Check network connectivity

### Stripe integration not working
- Verify API keys are correct
- Check webhook configuration
- Test with Stripe test keys first
- Review Stripe API logs

### High memory usage
- Check for memory leaks in code
- Review MongoDB query optimization
- Implement caching
- Monitor connection pooling

---

## Rollback Procedure

### Vercel
```bash
git revert <commit-hash>
git push origin main
# Vercel auto-deploys
```

### Railway/Render
- Use platform dashboard to rollback to previous deployment

### Self-hosted
```bash
# Stop current process
pm2 stop golf-charity-api

# Revert code
git revert <commit-hash>

# Reinstall dependencies
npm ci

# Restart
pm2 start golf-charity-api
```

---

## Performance Optimization

### Frontend
- Enable compression
- Optimize images
- Lazy load components
- Use CDN for static assets

### Backend
- Enable caching
- Optimize database queries
- Use connection pooling
- Implement pagination
- Add rate limiting

---

## Backup Strategy

### Database
```bash
# MongoDB backup
mongodump --uri="your_uri" --out=./backups

# MongoDB restore
mongorestore --uri="your_uri" ./backups
```

### Automated Backups
- Enable MongoDB Atlas automated backups
- Setup S3 bucket for file uploads
- Regular manual backups

---

## Support

For deployment issues, contact:
- Platform support (Railway, Render, Vercel)
- Check logs for specific error messages
- Review documentation specific to your platform

