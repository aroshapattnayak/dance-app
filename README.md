# DanceApp - Dance Studio Fee Manager

A real-time, mobile-first fee tracking platform built for dance studio operations. Manages student rosters, monthly fee collection, payment reconciliation, and invoicing — all synced across devices via Firebase.

**Live App:** [aroshapattnayak.github.io/dance-app](https://aroshapattnayak.github.io/dance-app/)

---

## The Problem

A dance studio with 64+ students across four fee tiers ($60–$150/mo) was manually reconciling Zelle payment texts against spreadsheets. Sibling families share a single Zelle sender name, making parent-to-student matching error-prone. The process took ~30 minutes per week and was entirely desktop-bound — despite payments arriving as phone notifications.

## The Solution

A mobile-first web app where the primary workflow — **receive Zelle text → record payment** — takes under 5 seconds from a phone:

1. Tap the Quick Pay button
2. Search by parent name (matches how Zelle texts appear)
3. Student auto-populates with correct fee amount
4. Save — syncs to all devices instantly

---

## Features

### Core
- **Student Roster** — 64+ students with fee tiers ($75 / $120 / $150/mo), parent/guardian info, active/inactive status
- **Payment Tracking** — Record payments with method (Zelle, Cash, Check, Venmo), date, notes, and status
- **Monthly Dashboard** — Revenue collected vs. expected, collection percentage, paid/unpaid breakdown
- **Invoice Generation** — Per-student payment history and invoice view
- **Sibling & Family Grouping** — Families like Bondala (Nalini), Variketi (Naga Deepthi), Vetcha (Purnachandra), and Jonna (Venkatakrishnai) share parent names for easy lookup

### Mobile-First UX
- **Quick Pay FAB** — Floating action button on mobile for instant payment entry
- **Parent Name Search** — Type "Nalini" → shows both Bondala siblings. Matches Zelle sender names to students
- **Smart Defaults** — Date=today, Method=Zelle, Amount=student's fee tier. Minimizes taps
- **Responsive Layout** — Bottom tab navigation on mobile, sidebar on desktop
- **Touch-Optimized** — 44px+ touch targets, method selection via tappable pills instead of dropdowns

### Real-Time Cloud Sync
- **Firebase Firestore** — All data persists in the cloud. No localStorage, no device-specific data
- **Cross-Device Sync** — Add a payment on phone, laptop dashboard updates within ~1 second
- **Offline Persistence** — Works without internet. Queues writes locally, syncs when connectivity returns
- **Optimistic UI** — Instant feedback on actions; Firestore confirms in background

### Operational
- **Unpaid This Month** — Dashboard highlights students who haven't paid, with outstanding amount
- **Payment Filtering** — Filter by month, payment method
- **Zelle Scanner** — Parent roster matching for Zelle payment auto-detection
- **CI/CD** — GitHub Actions auto-deploys on every push to `main`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 (CDN), JSX with in-browser Babel transpilation |
| **Backend/DB** | Firebase Firestore (real-time NoSQL, offline persistence) |
| **Hosting** | GitHub Pages (static site, zero cost) |
| **CI/CD** | GitHub Actions (auto-deploy on push) |
| **Design** | Custom component library — warm amber/brown palette, Playfair Display + Lato fonts |

### Architecture Decisions

- **Single-file React app** — `DanceApp_3.jsx` contains all components, styles, and seed data. No build step, no bundler, no `node_modules`. Keeps the project simple and portable.
- **In-browser Babel** — Transpiles JSX at runtime via CDN. Eliminates the need for a local build toolchain.
- **Firebase Compat SDK (CDN)** — Loaded via `<script>` tags alongside React. No npm, no imports, no bundling.
- **Optimistic updates + onSnapshot** — CRUD operations update local state immediately for instant UI, then write to Firestore. `onSnapshot` listeners confirm and sync across devices.
- **Seed data migration** — `STUDENTS0` and `PAYMENTS0` arrays in the JSX serve as the initial data source. On first load, the app detects an empty Firestore and batch-writes all seed data. After migration, Firestore is the source of truth.

---

## Project Structure

```
.
├── index.html          # Entry point — loads React, Babel, Firebase CDNs; initializes Firestore
├── DanceApp_3.jsx      # Entire app — components, styles, seed data, Firestore integration
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions — auto-deploy to GitHub Pages on push
```

---

## Setup

### Prerequisites
- A Firebase project with Firestore enabled ([console.firebase.google.com](https://console.firebase.google.com))
- A GitHub repository with Pages enabled

### Local Development
```bash
# No install needed — just serve the files
python3 -m http.server 5174

# Open http://localhost:5174
```

### Firebase Configuration
The Firebase config lives in `index.html`:
```javascript
firebase.initializeApp({
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
});
```

### Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{doc} {
      allow read, write: if true;
    }
    match /payments/{doc} {
      allow read, write: if true;
    }
  }
}
```

### Deployment
Pushing to `main` triggers automatic deployment via GitHub Actions:
```bash
git add -A && git commit -m "Update" && git push
# Deploys to GitHub Pages in ~30 seconds
```

---

## Data Model

### Students Collection
```javascript
{
  id: "s1",
  name: "Arishka Gedam",
  parentName: "Mrugla Gedam",
  email: "",
  phone: "",
  fee: 120.0,        // Monthly fee in USD
  active: true
}
```

### Payments Collection
```javascript
{
  id: "pm001",
  sid: "s12",         // References student.id
  amount: 150,
  date: "2026-03-02",
  method: "Zelle",    // Zelle | Cash | Check | Venmo | Other
  status: "paid",     // paid | pending | overdue
  note: ""
}
```

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Students managed | 64 |
| Payment records | 290+ |
| Fee tiers | $60 / $75 / $120 / $150 per month |
| Payment reconciliation time | ~5 seconds (down from ~30 min/week) |
| Infrastructure cost | $0 (Firebase free tier + GitHub Pages) |
| Build step | None |
| Bundle size | 0 KB (CDN-loaded, no bundler) |

---

## License

Private project. All rights reserved.
