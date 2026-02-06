# Railway Calculator (Next.js + Node.js)

Monorepo with:
- `frontend/` Next.js app (App Router)
- `backend/` Node.js + Express API

## Local run
### Backend
```bash
cd backend
npm install
PORT=3001 FRONTEND_ORIGIN=http://localhost:3000 npm start
```

### Frontend
```bash
cd frontend
npm install
# mac/linux:
NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev
# PowerShell:
# $env:NEXT_PUBLIC_API_URL="http://localhost:3001"; npm run dev
```

Open http://localhost:3000

## Railway deploy (2 services)
Create 2 services from the same repo and set:
- Backend Root Directory: `backend`
- Frontend Root Directory: `frontend`

Env vars:
- Frontend: `NEXT_PUBLIC_API_URL=https://<backend-url>`
- Backend: `FRONTEND_ORIGIN=https://<frontend-url>`
