## h2bc web frontend

Frontend for the h2bc website. It includes:
- Site pages (about + other sections)
- Shop UI (products & related views)
- Fetching from a headless CMS
- Fetching from an ecommerce API

Built with Next.js, TypeScript, Tailwind. Details will be filled in as integrations land.

### Setup
Prerequisites:
- Node 20+ (LTS recommended)
- npm (bundled) or pnpm / yarn if you prefer

Install dependencies:
```bash
npm install
```

Optional environment variables (create `.env.local`):
```
NEXT_PUBLIC_CMS_URL=
CMS_TOKEN=
ECOM_API_URL=
ECOM_API_KEY=
```

### Run
```bash
npm run dev
# visit http://localhost:3000
```

### Build
```bash
npm run build
npm start   # production server
```

© h2bc – All rights reserved.
