# TenantHub Web

Angular frontend for the TenantHub API. A user logs in with email, password and company slug, and sees their profile and company.

## Requirements
- Node.js (LTS) and Angular CLI
- The TenantHub API running (see the API README)

## How to run
1. Start the API: in `tenanthub-api`, make sure `.env` has `FRONTEND_ORIGIN=http://localhost:4200`, then run `dotnet run` (runs on http://localhost:5053)
2. In this folder, run `yarn install`
3. Run `ng serve` and open http://localhost:4200

The API URL is in `src/environments/`.

## How to test
- Automated tests: `ng test`
- Manual: create a user with the admin endpoints (see the API README), log in on `/login`, and you land on `/home` with your profile
- Wrong password or company shows an error and stores no token
- Opening `/home` without logging in redirects to `/login`

## Note about the token
The token is saved in `localStorage`. This is simple, but if the page has an XSS bug, a malicious script could read the token. A safer option for real products is an HttpOnly cookie set by the server.