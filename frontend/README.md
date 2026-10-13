# LetsTalk deployment

The frontend is deployed to Vercel and the Express/Socket.IO backend to Render. MongoDB Atlas is used for the database.

## Deploy the backend to Render

Create a Render Web Service from the repository. Set the root directory to `Backend`. The included `render.yaml` configures the build and start commands:

- Build command: `npm ci`
- Start command: `npm start`

Set these environment variables in Render:

| Name | Value |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long, random secret |
| `FRONTEND_URL` | Exact deployed Vercel origin, including `https://`, without a trailing slash |
| `NODE_ENV` | `production` |

Render provides `PORT`. The `/` endpoint returns a health response for Render's health check.

## Deploy the frontend to Vercel

Import the repository into Vercel and set the project root directory to `frontend`. Use:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable `VITE_BACKEND_URL`: the Render service origin, including `https://`, without a trailing slash

Redeploy after changing environment variables because Vite embeds them during the build. The Vercel rewrite serves the app entry point for client-side routes.

## Local development

Create `Backend/.env` with `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_URL=http://localhost:5173`. Create `frontend/.env` with:

```text
VITE_BACKEND_URL=http://localhost:8080
```

Run the backend and frontend in separate terminals:

```powershell
cd Backend
npm ci
npm run dev
```

```powershell
cd frontend
npm ci
npm run dev
```

## Production considerations

Authentication cookies use `SameSite=None; Secure` in production because the Vercel and Render default domains are cross-site. HTTPS is required. Some browser privacy settings block third-party cookies; using a custom domain arrangement with frontend and API subdomains under the same registrable domain can avoid that constraint.
