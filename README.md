# Market Bucks Backend

A TypeScript-based backend for a student financial dashboard and transaction system, built with Express.js, PostgreSQL, and Prisma ORM.
This system facilitates secure, ACID-compliant financial transactions between college students and farm producers, enabling balance tracking, transaction history, and email-verified user onboarding.

# Progress up until now: 

## Features

- Student Registration with hashed password storage
- Email verification using Nodemailer + Gmail SMTP
- Login with JWT-based authentication (coming up)
- Dashboard and Balance History API
- Create and fetch transactions
- CRUD operations for student data

## Tech Stack

- **TypeScript**
- **Express.js**
- **PostgreSQL** (hosted on [Neon](https://neon.tech))
- **Prisma ORM**
- **Nodemailer**
- **bcrypt**
- **dotenv**

## API Endpoints (Students)

| Method | Endpoint                        | Description                    |
|--------|----------------------------------|--------------------------------|
| POST   | `/students`                     | Register a new student         |
| GET    | `/students/:id`                 | Fetch a specific student       |
| PUT    | `/students/:id`                 | Update student info            |
| DELETE | `/students/:id`                 | Delete a student               |
| POST   | `/students/auth/login`          | Login with email + password    |
| GET    | `/students/:id/dashboard`       | Get student dashboard data     |
| GET    | `/students/:id/balance-history` | Get balance history            |

## Email Verification Flow

- On registration, a tokenized verification link is sent via email.
- User clicks the link → backend verifies token and marks the account as `is_verified: true`.
- Unlike Firebase, we handle everything: token generation, expiry, and mail delivery.

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/market-bucks-backend.git

# 2. Install dependencies
npm install

# 3. Setup env variables
touch .env
# Fill with: DATABASE_URL, EMAIL_USER, EMAIL_PASS, JWT_SECRET, etc.

# 4. Apply DB migrations
npx prisma migrate dev --name init

# 5. Start the dev server
npm run dev
```

## Contact
For queries or collaboration, feel free to reach out on [LinkedIn](https://www.linkedin.com/in/sabih-khan-1824021a3/)
