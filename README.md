# CodeBit — Frontend

CodeBit is a full-stack competitive coding platform — solve problems, run/submit code, compete in live contests, and get AI-assisted help while you're stuck. This repo is the **React SPA** that talks to the [CodeBit backend](../CodingPlatform).

## Tech Stack

- **React 19** + **Vite 8**
- **Redux Toolkit** + `react-redux` — global state (auth, problems)
- **React Router v7**
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives) — `src/ui/`
- **react-hook-form** + **Zod** — forms & validation
- **Monaco Editor** (`@monaco-editor/react`) — in-browser code editor
- **react-split** / **react-resplit** — resizable editor/problem panes
- **react-markdown** + **remark-gfm** — problem statements / editorials
- **Recharts** — stats/graphs (contests, profile)
- **Framer Motion**, **lucide-react**, **sonner** (toasts), **react-hot-toast**
- Deployed on **Vercel**

## Folder Structure

```
frontend/
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── Pages/                      # Route-level pages
│   │   ├── About.jsx
│   │   ├── Admin.jsx
│   │   ├── Careers.jsx
│   │   ├── ContestList.jsx
│   │   ├── ForgetPassword.jsx
│   │   ├── Hero.jsx
│   │   ├── HomePage.jsx
│   │   ├── Interview.jsx
│   │   ├── Login.jsx
│   │   ├── Problem.jsx
│   │   ├── Profile.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Signup.jsx
│   │   └── VerifyEmail.jsx
│   ├── Redux/
│   │   ├── Features/
│   │   │   ├── Auth/authSlice.js
│   │   │   └── problem/problemSlice.js
│   │   └── stores.js
│   ├── Utils/
│   │   └── axiosClient.js          # Axios instance + auth interceptor
│   ├── assets/                     # Images (logo, trophy, table graphics)
│   ├── components/
│   │   ├── admin/                  # Admin CRUD panels
│   │   │   ├── AdminNavbar.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── AdminUpload.jsx
│   │   │   ├── AdminUserDetails.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── AdminVideo.jsx
│   │   │   ├── DeleteProblem.jsx
│   │   │   ├── UpdateList.jsx
│   │   │   └── UpdateProblem.jsx
│   │   ├── contests/                # Contest flow
│   │   │   ├── ContestHistory.jsx
│   │   │   ├── ContestProblemPage.jsx
│   │   │   ├── ContestSubmissionHistory.jsx
│   │   │   ├── ContestTopbar.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── SingleContest.jsx
│   │   ├── layouts/
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── Navbar.jsx
│   │   ├── problems/                # Problem-solving workspace
│   │   │   ├── AIAssistant.jsx      # BitMentor chat UI
│   │   │   ├── Editorial.jsx
│   │   │   ├── LeftPanel.jsx        # Statement / editorial / submissions tabs
│   │   │   ├── ProblemPage.jsx      # Page shell (splits Left/Right)
│   │   │   ├── RightPanel.jsx       # Monaco editor + run/submit
│   │   │   └── SubmissionHistory.jsx
│   │   └── shared/
│   │       ├── Authloader.jsx
│   │       ├── NotFoundPage.jsx
│   │       ├── Pagination.jsx
│   │       └── Spinner.jsx
│   ├── lib/
│   │   └── utils.js                 # cn() / shadcn helpers
│   ├── ui/                          # shadcn/ui primitives
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── dropdown-menu.jsx
│   │   ├── form.jsx
│   │   ├── input.jsx
│   │   ├── select.jsx
│   │   └── sheet.jsx
│   ├── App.jsx                      # Route definitions
│   ├── index.css
│   └── main.jsx
├── components.json                  # shadcn config
├── jsconfig.json
├── vercel.json                      # SPA rewrite (all routes → index.html)
└── vite.config.js
```

## Routes (`App.jsx`)

| Path | Access | Page |
|---|---|---|
| `/` | Public | `HomePage` |
| `/login`, `/signup` | Public-only (redirects if logged in) | `Login`, `Signup` |
| `/forget-password`, `/reset-password/:token` | Public-only | `ForgetPassword`, `ResetPassword` |
| `/verify-email` | Requires signup state (email in router state) | `VerifyEmail` |
| `/problems` | Protected | `Problem` (problem list) |
| `/problem/:id` | Protected | `ProblemPage` (editor workspace) |
| `/profile` | Protected | `Profile` |
| `/interview` | Protected | `Interview` |
| `/contests` | Protected | `ContestList` |
| `/contest/:id` | Protected | `SingleContest` |
| `/contest/:contestId/problem/:problemId` | Protected | `ContestProblemPage` |
| `/contest/:contestId/leaderboard` | Protected | `Leaderboard` |
| `/contests/history` | Protected | `ContestHistory` |
| `/admin`, `/admin/create`, `/admin/update`, `/admin/update/:id`, `/admin/delete`, `/admin/upload/:problemId`, `/admin/video`, `/admin/users`, `/admin/users/:id` | Admin-only (`user.role === "admin"`) | Admin pages |
| `/about`, `/career` | Public | `About`, `Careers` |
| `*` | — | `NotFoundPage` |

Protection is done with `protect()` / `publicOnly()` wrapper functions reading `isAuthenticated` from Redux, not a router-level guard component.

## State (Redux)

- **`authSlice`** — `isAuthenticated`, `loading`, `user`; `loadUser()` thunk dispatched on app mount (`App.jsx` `useEffect`) to restore session from cookie/token via `/user/me`.
- **`problemSlice`** — problem list/detail caching with a `loaded` flag to avoid redundant refetches.

## API Client

`src/Utils/axiosClient.js`:
- `baseURL`: `import.meta.env.VITE_BACKEND_URL` (falls back to `http://localhost:4000`)
- `withCredentials: true` — sends the auth cookie
- Request interceptor also attaches `Authorization: Bearer <token>` from `localStorage` (used for the Google OAuth redirect flow, which returns the JWT as a query param)

## Getting Started

### Prerequisites
- Node.js ≥ 18
- The [backend](../CodingPlatform) running locally (default `http://localhost:4000`) or deployed

### Install & run

```bash
npm install
npm run dev       # http://localhost:5173
```

### Environment Variables

Create `.env` in the project root:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Build

```bash
npm run build
npm run preview
```

### Deployment

Deployed on Vercel. `vercel.json` rewrites all paths to `index.html` for client-side routing. Set `VITE_BACKEND_URL` to the deployed backend URL in the Vercel project's environment variables.

## Known Gotchas

- `overflow-x: hidden` on a layout wrapper around the sidebar breaks sticky positioning by creating an unintended scroll container — avoid it on `MainLayout`.
- Google OAuth returns the JWT as a `?token=` query param on redirect (see backend `googleRoute.js`) rather than only relying on the cookie — the frontend needs to pick this up and store it (`localStorage`) for the `Authorization` header interceptor to work cross-origin.
