# Contributing to Golf Charity Platform

Thank you for your interest in contributing to the Golf Charity Platform! This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and respect our code of conduct.

---

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/Golf-Charity.git
cd Golf-Charity
```

### 2. Create a Branch

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b bugfix/your-bug-name
```

### 3. Setup Development Environment

Follow the setup instructions in [QUICK_START.md](./QUICK_START.md) or [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## Development Guidelines

### Frontend Development

**Tech Stack:**
- React 19.2+
- React Router v6
- Tailwind CSS
- Vite
- Axios

**Best Practices:**
- Follow React hooks conventions
- Keep components small and reusable
- Use descriptive variable and function names
- Add PropTypes or TypeScript for type safety
- Write clean, commented code
- Test responsiveness on mobile devices

**File Structure:**
```
Golf-Charity-frontend/src/
├── pages/           # Page components
├── components/      # Reusable components
├── context/         # Context providers
├── hooks/           # Custom hooks
├── api/             # API calls
├── utils/           # Utility functions
└── styles/          # Global styles
```

### Backend Development

**Tech Stack:**
- Node.js 18+
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

**Best Practices:**
- Follow RESTful API conventions
- Use proper HTTP status codes
- Implement error handling
- Add request validation
- Use environment variables for config
- Write meaningful error messages
- Implement rate limiting
- Add comprehensive logging

**File Structure:**
```
Golf-Charity-backend/
├── models/          # MongoDB models
├── controllers/     # Business logic
├── routes/          # API routes
├── middleware/      # Custom middleware
├── config/          # Configuration files
└── utils/           # Helper functions
```

---

## Naming Conventions

### Variables and Functions
```javascript
// Use camelCase
const userEmail = 'user@example.com';
function getUserProfile() {}

// Avoid single letter variables (except in loops)
// Good
for (let index = 0; index < array.length; index++) {}

// Bad
for (let i = 0; i < array.length; i++) {}
```

### Files and Folders
```
// Use PascalCase for React components
UserProfile.jsx
DashboardLayout.jsx

// Use camelCase for utilities and configs
formatters.js
validators.js

// Use lowercase for folders
components/
pages/
api/
```

### Database Collections
```javascript
// Use singular, lowercase names
users
scores
charities
draws
winnings
transactions
```

---

## Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, semicolons, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Dependency updates, build config, etc.

**Examples:**
```
feat(auth): add password reset functionality
fix(dashboard): fix chart data rendering issue
docs(api): update payment endpoint documentation
refactor(scores): simplify score validation logic
```

---

## Pull Request Process

### Before Submitting

1. **Update your branch**
```bash
git fetch origin
git rebase origin/main
```

2. **Test your changes**
```bash
# Frontend
npm run dev
npm run build

# Backend
npm run dev
```

3. **Run linting** (if available)
```bash
npm run lint
```

### Submit PR

1. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

2. **Create Pull Request**
   - Use clear title describing the change
   - Reference related issues (#123)
   - Describe what and why in the description
   - Add before/after screenshots for UI changes

3. **PR Description Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## How to Test
1. Step 1
2. Step 2
3. Step 3

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

---

## Code Review Guidelines

### What We Look For

- **Functionality**: Does it work as intended?
- **Code Quality**: Is it clean and maintainable?
- **Performance**: Are there optimization opportunities?
- **Security**: Are there any security concerns?
- **Testing**: Is adequate testing included?
- **Documentation**: Is it well documented?

### Review Process

1. Automated checks must pass
2. At least 2 maintainers must review
3. All comments must be addressed
4. PR can be merged after approval

---

## Testing Guidelines

### Frontend Testing

```javascript
// Example test structure
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile Component', () => {
  it('should render user name', () => {
    render(<UserProfile name="John" />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

### Backend Testing

```javascript
// Example test structure
import request from 'supertest';
import app from '../app';

describe('POST /api/auth/login', () => {
  it('should login user with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(200);
  });
});
```

---

## Reporting Issues

### Bug Reports

Include:
1. Description of the bug
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots/logs
6. Environment (OS, browser, Node version)

### Feature Requests

Include:
1. Clear description of feature
2. Use case/motivation
3. Possible implementation approach
4. Any additional context

---

## Documentation

### Update Documentation When

- Adding new features
- Changing existing functionality
- Fixing bugs that are unclear
- Improving setup/deployment process

### Documentation Files to Update

- `README.md` - For overview changes
- Feature-specific docs
- API documentation (for backend)
- Deployment guides (if applicable)

---

## Branching Strategy

```
main (production)
├── staging (testing)
└── feature branches
    ├── feature/auth-improvements
    ├── feature/dashboard-redesign
    └── bugfix/login-issue
```

---

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag release on GitHub
5. Deploy to production

---

## Community

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Report bugs and request features via Issues
- **Slack/Discord**: Join our community channel
- **Email**: contact@golfcharity.com for urgent matters

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## Questions?

- Check existing issues/discussions
- Read the documentation
- Reach out to maintainers
- Join our community chat

Thank you for contributing to Golf Charity Platform!
