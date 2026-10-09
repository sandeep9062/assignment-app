# Likhai

Marketplace for handwritten work, practical files and notes, launching in Chandigarh.
One Next.js app: pages, API routes and MongoDB (Mongoose) in the same project.

## Run it locally
1. Start MongoDB (local install, Docker `docker run -p 27017:27017 mongo:7`, or a free Atlas cluster).
2. `cp .env.example .env.local` and fill it in:
   - `JWT_SECRET`: 32+ random characters (`node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`)
   - `MONGODB_URI`
   - `AUTO_APPROVE_SELLERS=true` for development so new sellers go live without review
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` if you want an admin account
3. `npm install`
4. `npm run seed` loads sample sellers and jobs (`npm run seed:reset` removes only those)
5. `npm run dev` then open http://localhost:3000

## What works
- Sign up, log in, log out (bcrypt passwords, signed HttpOnly session cookie, 7 days)
- Seller application, seller listing with search and filters, seller profiles
- Post a job, public open-jobs list (delivery address is never public), seller offers
- Account page: your jobs and the offers on them
- Admin page `/admin`: approve or reject seller applications (admin accounts only)

## Not built yet
- Accepting an offer and paying (Razorpay), order tracking, reviews
- Photo uploads for handwriting samples (needs file storage, for example Cloudinary or S3)
- Chat, email/WhatsApp notifications
- The login rate limiter is in-memory: move it to Redis/Upstash before running several server instances

## Layout
- `app/` pages and `app/api/` routes
- `lib/` database, models, auth, validation helpers, shared queries
- `components/` UI pieces
- `scripts/seed.mjs` sample data
