Frontend integration notes — Magic Link (email verification)
===========================================================

Overview
- Use magic-link email verification for new email-based signups.
- Backend endpoints: `POST /auth/send-magic-link` and `POST /auth/verify-email`.
- Backend also auto-sends the magic link after `POST /users` when a user is created with email-only.

Environment (ops)
- RESEND_API_KEY: Resend API key (secret). Example provided must be stored in secret manager.
- RESEND_FROM: noreply@petitpoto.pro (default if unset).
- FRONTEND_URL: frontend public URL (ex: https://app.petitpoto.pro).
- EMAIL_TOKEN_SECRET: optional secret to sign email tokens (fallback to JWT_SECRET if absent).

Endpoints
- POST /auth/send-magic-link
  - Body: { "email": "alice@example.com" }
  - Response: { "ok": true }
  - Behavior: backend looks up user by email and sends a 24h-signed token in email.

- POST /auth/verify-email
  - Body: { "token": "<jwt-token>" }
  - Response (success): { accessToken, refreshToken, user }
  - Behavior: verifies token, activates user (`isActivated=true`) and returns login tokens.

- POST /auth/login (updated for email support)
  - Body: { "email": "user@example.com", "password": "..." } OR { "phone": "+1234567890", "password": "..." }
  - Response (success): { accessToken, refreshToken, user }
  - Behavior: detects email (contains @) vs phone, looks up user accordingly, validates password, returns tokens.
  - Note: email is preferred; if both provided, email is used. Fallback to phone for backward compatibility with old accounts.

User creation flow (frontend)
1. Existing signup UI remains. If user registers with email only (no phone), backend creates account with `isActivated=false` and will automatically send the magic link.
2. Frontend: after `POST /users`, show a confirmation screen: "Un e‑mail de confirmation a été envoyé à your@mail — vérifiez votre boîte" and provide a button "Renvoyer le lien" which calls `POST /auth/send-magic-link`.

Login flow (NEW — email-based)
1. Replace phone number input with email input in login form.
2. Call `POST /auth/login` with `{ email, password }`.
3. Backend auto-detects email (has @) and looks up user by email; validates password.
4. Backward compatibility: old users with only phone can still log in with `{ phone, password }` — backend will detect and look up by phone instead.
5. Recommended UX during transition: show single input accepting both "email or phone number".

Migration flow for old phone accounts
1. When a user logs in via phone and their account has no `email`, frontend should show a small form asking for email.
2. Submit email to `PATCH /users` (existing endpoint). After successful update, call `POST /auth/send-magic-link` to verify.

Magic link handling (frontend)
1. Magic link format: `${FRONTEND_URL}/auth/verify-email?token=<token>`.
2. Frontend route `/auth/verify-email` must read `token` from query string and call `POST /auth/verify-email` with JSON body `{ "token": "..." }`.
3. On success: store `accessToken` and `refreshToken` (localStorage or secure cookie per your security policy) and redirect to app main page.
4. On failure/expired token: show friendly message and a button to request a new link (calls `POST /auth/send-magic-link`).

Sample requests
- Request magic link:
```bash
curl -X POST https://api.yourdomain.com/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com"}'
```

- Login with email (NEW):
```bash
curl -X POST https://api.yourdomain.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```

- Login with phone (backward compatibility):
```bash
curl -X POST https://api.yourdomain.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"+1234567890","password":"password123"}'
```

- Verify token (frontend should POST token):
```bash
curl -X POST https://api.yourdomain.com/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token":"eyJhbGciOi..."}'
```

Email template (HTML) — example
```html
<p>Bonjour {{firstname}},</p>
<p>Pour finaliser ton inscription, clique sur le lien ci‑dessous :</p>
<p><a href="{{link}}">Confirmer mon adresse e‑mail</a></p>
<p>Ce lien expire dans 24 heures.</p>
```

Deliverability / Ops checklist
- Add SPF/DKIM/DMARC records for `petitpoto.pro` per Resend documentation.
- Validate the `noreply@petitpoto.pro` address with Resend (if required by provider).
- Store `RESEND_API_KEY` in secrets manager; do not commit it.

Frontend responsibilities (summary)
- Add a route `/auth/verify-email` that extracts query `token` and POSTs it to backend.
- Update login form: replace phone input with email input (or single field accepting both during transition).
- Call `POST /auth/login` with `{ email, password }` (or `{ phone, password }` for backward compat).
- Provide UI states: waiting for email, magic link sent, token expired, resend link.
- For existing phone-only users: show email-collect modal on next login and POST email to `PATCH /users` then immediately call `POST /auth/send-magic-link`.
- Recommended: during transition, accept both email and phone in a single login input field.

Want a Postman collection or a small OpenAPI snippet? Reply and I generate it.
