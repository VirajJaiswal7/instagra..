# Vibegram (full stack)

```
vibegram-full/
├── backend/   Express + Mongoose API (models, controllers, routes, middleware, uploads, seed.js)
└── frontend/  React + Vite + Tailwind (services/api.js Axios instance, context/AuthContext.jsx)
```

## Environment
`backend/.env` (copy `.env.example`): `PORT`, `MONGO_URI`, `JWT_ACCESS_SECRET` (use a long random string), `CLIENT_URL`, `NODE_ENV`.
`frontend/.env` (copy `.env.example`): `VITE_API_URL=http://localhost:5000/api`.

## MongoDB
Local: install MongoDB Community and keep `MONGO_URI=mongodb://127.0.0.1:27017/vibegram`.
Atlas: create a free cluster, add your IP + a DB user, paste the `mongodb+srv://...` string into `MONGO_URI`.

## Run
```bash
# backend
cd backend && npm install && cp .env.example .env
npm run seed      # 6 demo users, 12 posts, stories
npm run dev       # http://localhost:5000

# frontend (new terminal)
cd frontend && npm install && npm install axios && cp .env.example .env
npm run dev       # http://localhost:5173
```
Frontend deps: react-router-dom, lucide-react, axios, tailwindcss, @tailwindcss/vite.

## Demo login
`aria@vibegram.com` / `password123` (also jules, nia, leo, sunny, mika @vibegram.com)

## Notes
- Access token (15 min) lives in memory; refresh token is stored in MongoDB and an HttpOnly cookie, rotated on every refresh, revoked on logout.
- Uploads: Multer saves to `backend/uploads`. For Cloudinary, edit only `backend/utils/upload.js`.
