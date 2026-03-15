# 🪺 RecipeNest

A clean, fast, and distraction-free recipe discovery web application built with React and TypeScript.

## 🌐 Live Demo
[https://therecipenest.netlify.app/](https://therecipenest.netlify.app/)

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI and type safety |
| Vite | Build tool and dev server |
| Tailwind CSS v4 | Styling |
| Shadcn/ui | UI component primitives |
| TanStack Query | Server state and caching |
| Zustand | Client state (bookmarks, theme) |
| React Router v6 | Navigation and URL state |
| Framer Motion | Page transitions and animations |
| Lucide React | Icons |
| Iconify | Category icons |
| Axios | HTTP client |

---

## ✨ Features

- 🔍 Debounced search with URL state
- 🏷️ Filter recipes by category
- 🌙 Dark / light mode persisted across sessions
- 🔖 Bookmark recipes persisted in localStorage
- 📄 Full recipe detail — ingredients, instructions, YouTube video
- 🍽️ Similar recipes section on detail page
- 📱 Fully responsive — mobile first
- ⚡ TanStack Query caching — instant filter switching after first load
- 🎬 Framer Motion page transitions

---

## 🏗️ Project Structure
```
src/
├── components/
│   ├── ui/                  # Shadcn primitives
│   ├── layout/              # Navbar, RootLayout
│   └── customComponents/    # RecipeCard, SearchBar, FilterBar, Loader
├── pages/
│   ├── Home/
│   ├── RecipeDetail/
│   ├── Bookmarks/
│   └── NotFound/
└── lib/
    ├── hooks/               # Custom React hooks
    ├── services/            # Axios instance and API functions
    ├── store/               # Zustand global store
    ├── types/               # TypeScript interfaces
    ├── utils/               # Pure helper functions
    └── router/              # Route definitions
```

---

## 🔌 API

**TheMealDB** — free, no API key required
- Search recipes by name
- Filter by category
- Fetch recipe detail by ID
- Fetch all categories

---

## ⚙️ Local Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/recipenest.git
cd recipenest
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser
```
http://localhost:5173
```

---

## 🧠 Key Architectural Decisions

**URL as state** — search, category, and pagination live in URL params. Supports shareable links, back button, and page refresh without losing state. Same pattern used by Amazon and Airbnb.

**Server state vs client state** — API data managed by TanStack Query. Bookmarks and theme managed by Zustand persisted to localStorage.

**Anti-corruption layer** — raw API types and domain types are kept separate. Transformer functions in the service layer convert API responses to clean domain objects. Components never see raw API shapes.

**Dumb components** — components receive data via props and render UI. All data fetching and business logic lives in custom hooks. Pages are smart containers, components are pure renderers.

---

## 📦 Scripts
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 🔮 Future Improvements

- [ ] Nutrition facts via Edamam API
- [ ] Cuisine filter
- [ ] User authentication
- [ ] Cross device bookmark sync
- [ ] Skeleton loaders
- [ ] PWA support

---

## 👨‍💻 Author

Built by [Narra Rakesh](https://github.com/narrarakesh)
