# LaraGym

A gym management system built with Laravel, SvelteKit, and a mobile-friendly member PWA.

![Screenshot](https://raw.github.com/johndavedecano/PHPLaravelGymManagementSystem/main/screenshot.png)

## Features

- **Packages** — create and manage membership packages with billing cycles
- **Members** — user management with profiles and account numbers
- **Services & billing cycles** — annually, weekly, daily, fixed, and more
- **Attendance** — track member check-ins per branch
- **Subscriptions** — manage member subscriptions with status tracking
- **Branches** — multi-branch support
- **Activity logs** — system-wide audit trail
- **Admin panel** — SvelteKit dashboard for staff (port 5173)
- **Member PWA** — installable progressive web app for gym members (port 5174)

## Project Structure

```
laragym/
├── app/                        # Laravel application
├── routes/api.php              # REST API routes
├── resources/apps/
│   ├── admin/                  # Admin panel (SvelteKit)
│   └── member/                 # Member PWA (SvelteKit + vite-plugin-pwa)
└── database/migrations/
```

## Installation

### 1. Laravel API

```bash
git clone git@github.com:johndavedecano/laragym.git project
cd project
composer install
cp .env.example .env        # edit with your DB credentials
php artisan key:generate
php artisan storage:link
php artisan migrate
php artisan db:seed
php artisan serve           # http://localhost:8000
```

### 2. Admin Panel

```bash
cd resources/apps/admin
cp .env.example .env        # set PUBLIC_API_URL=http://localhost:8000
npm install
npm run dev                 # http://localhost:5173
```

### 3. Member PWA

```bash
cd resources/apps/member
cp .env.example .env        # VITE_API_BASE_URL can stay empty in dev (proxy handles it)
npm install
npm run dev                 # http://localhost:5174
```

> In development the member app proxies all `/api` requests to `http://localhost:8000` automatically. For production set `VITE_API_BASE_URL` to your API's public URL.

## API

The REST API is served at `http://localhost:8000/api`.

| Group | Endpoints |
|---|---|
| Auth | `POST /api/auth/login`, `register`, `logout`, `forgot`, `reset` |
| Member (auth) | `GET/PUT /api/me`, `PUT /api/me/password`, `GET /api/me/subscriptions`, `GET /api/me/attendance` |
| Admin only | `cycles`, `services`, `branches`, `packages`, `subscriptions`, `users`, `activities`, `stats` |

## Tests

```bash
# create a `homestead_test` database first, then:
./vendor/bin/phpunit
```

To use a different test database name, update `phpunit.xml`.

## Screenshots

![Profile](https://raw.github.com/johndavedecano/PHPLaravelGymManagementSystem/main/profile.png)
![Package](https://raw.github.com/johndavedecano/PHPLaravelGymManagementSystem/main/package.png)

## Contact

Open to work — reach out at johndavedecano@gmail.com

## License

MIT — free to use, modify, and distribute with attribution.
