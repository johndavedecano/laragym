# LaraGym — Project Milestones

## Milestone 1 — Member PWA (v1) ✅ Complete

**Goal:** Give gym members a self-service portal (PWA) to view their subscription, attendance, and profile without contacting admin.

### Backend (Laravel API)
- [x] `GET /api/me` — authenticated member profile + user data
- [x] `PUT /api/me` — update member profile fields
- [x] `PUT /api/me/password` — change password
- [x] `GET /api/me/subscriptions` — paginated subscription list with package/cycle relations
- [x] `GET /api/me/attendance` — attendance history (`Attendance` model + migration)
- [x] `GET /api/branches` — opened to authenticated members (was admin-only)
- [x] All member routes registered under `auth:sanctum` middleware

### Frontend (SvelteKit PWA — `resources/apps/member/`)
- [x] SvelteKit project scaffolded (port 5174)
- [x] Tailwind CSS + Skeleton UI configured
- [x] vite-plugin-pwa configured (manifest, service worker, icons)
- [x] API client with Sanctum token injection
- [x] Route groups — auth layout vs protected app layout
- [x] Auth screens — Login, Register, Forgot Password, Reset Password
- [x] Dashboard — subscription summary, account number, quick links
- [x] Subscription screen — current plan + history
- [x] Attendance screen — paginated list + month filter
- [x] Profile screen — view/edit details + avatar upload
- [x] Branches screen — list with member's branches highlighted
- [x] Bottom navigation bar (Home, Subscription, Attendance, Profile)

---

## Milestone 2 — Member PWA (v2) — Planned

**Goal:** Deepen member engagement with payments, class booking, and real-time notifications.

### Payments & Subscriptions
- [ ] Online subscription purchase flow
- [ ] Payment gateway integration (e.g., Stripe or local provider)
- [ ] Receipt / invoice download

### Class Booking
- [ ] Browse available classes by branch
- [ ] Book a class slot
- [ ] View and cancel upcoming bookings

### QR Code Check-in
- [ ] Member QR code generated from subscription
- [ ] Admin-side QR scanner to record attendance

### Push Notifications
- [ ] Web push subscription (service worker)
- [ ] Notify members of subscription expiry (7-day and 1-day warnings)
- [ ] Notify members when attendance is recorded

### UX Improvements
- [ ] Dark mode
- [ ] Offline support — show cached data when network is unavailable

---

## Milestone 3 — Platform Expansion — Future

**Goal:** Expand beyond the member PWA into a broader platform.

### Internationalisation
- [ ] Multi-language support (i18n)

### Admin Enhancements
- [ ] Admin mobile-friendly view
- [ ] Bulk subscription management

### Analytics
- [ ] Member retention reports
- [ ] Attendance heatmaps per branch

### Native Mobile (Flutter)
- [ ] Flutter app consuming the same REST API
- [ ] Android + iOS release via app stores
