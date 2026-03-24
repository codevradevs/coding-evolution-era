# Codevra Security Documentation

**Version:** 2.0  
**Last Updated:** 2025  
**Scope:** Backend API + Frontend (MERN Stack)

---

## 1. Security Architecture Overview

Codevra implements a **defence-in-depth** strategy — multiple independent layers of security so that if one layer is bypassed, the next one stops the attack.

```
Request → CORS → Helmet → Suspicious Request Detector → Rate Limiter
        → NoSQL Sanitizer → HPP → Body Size Guard → Route Handler
        → Input Validation → Sanitization → Database → Response
```

---

## 2. Attack Vectors & Protections

### 2.1 Cross-Site Scripting (XSS)

**Attack:** Injecting malicious scripts into inputs that get rendered in the browser.

**Protections:**
- `sanitizeString()` in `middleware/security.js` strips all HTML tags, `javascript:` protocols, `on*=` event handlers, and `data:` URIs from every user input before it touches the database
- Helmet's `contentSecurityPolicy` blocks inline scripts and restricts script sources to `'self'` only
- `X-XSS-Protection` header enabled via Helmet
- `X-Content-Type-Options: nosniff` prevents MIME-type sniffing attacks

---

### 2.2 NoSQL Injection

**Attack:** Sending MongoDB operators (`$where`, `$gt`, `$regex`, etc.) in request bodies to manipulate queries.

**Protections:**
- `express-mongo-sanitize` middleware strips all keys containing `$` or `.` from `req.body`, `req.query`, and `req.params` before any route handler runs
- Suspicious request detector pattern-matches raw NoSQL operators and blocks the request immediately
- All database queries use Mongoose's typed schema validation — fields are cast to their declared types, rejecting unexpected objects

---

### 2.3 SQL Injection

**Attack:** Injecting SQL statements into inputs.

**Protections:**
- MongoDB/Mongoose is used — no raw SQL queries exist in the codebase
- Suspicious request detector blocks common SQL injection patterns (`UNION SELECT`, `DROP TABLE`, `INSERT INTO`, etc.)
- All inputs are sanitized before use

---

### 2.4 Brute Force & Credential Stuffing

**Attack:** Automated repeated login attempts to guess passwords.

**Protections:**
- `authLimiter`: 10 requests per 15 minutes per IP on `/api/auth/login` and `/api/auth/register`
- `forgotPasswordLimiter`: 3 requests per hour per IP on `/api/auth/forgot-password`
- **Account lockout**: After 10 consecutive failed login attempts, the account is locked for 30 minutes. `failedLoginAttempts`, `lockedUntil`, and `lastFailedLogin` are stored on the User model
- Failed attempts are reset to 0 on successful login
- bcrypt with cost factor 12 — each hash takes ~300ms, making bulk cracking computationally infeasible

---

### 2.5 JWT Attacks

**Attack:** Token forgery, algorithm confusion (`alg: none`), or token replay.

**Protections:**
- JWT verification explicitly whitelists `algorithms: ['HS256']` — prevents the `alg: none` attack where an attacker strips the signature
- All tokens are signed and verified with `issuer: 'codevra-api'` and `audience: 'codevra-client'` — tokens from other systems are rejected
- Access tokens expire in 15 minutes (`JWT_EXPIRES_IN=15m`)
- Refresh tokens expire in 7 days (`JWT_REFRESH_EXPIRES_IN=7d`)
- Token length is validated (max 2048 chars) before verification — prevents memory exhaustion via oversized tokens
- Token payload is validated: `userId` must be a valid 24-char MongoDB ObjectId

---

### 2.6 Cross-Site Request Forgery (CSRF)

**Attack:** Tricking a logged-in user's browser into making unintended requests.

**Protections:**
- All state-changing operations require a `Bearer` token in the `Authorization` header — browsers cannot automatically attach this header in cross-origin requests
- CORS is locked to the exact frontend origin (`FRONTEND_URL` env var) in production
- Session cookies use `sameSite: 'strict'` and `httpOnly: true`
- `X-Frame-Options: DENY` prevents the site from being embedded in iframes (clickjacking)

---

### 2.7 Cross-Origin Resource Sharing (CORS) Abuse

**Attack:** Unauthorized domains making API requests.

**Protections:**
- Custom CORS handler in `buildCorsOptions()` — only the exact `FRONTEND_URL` origin is allowed in production
- Unknown origins are logged and rejected with a 403
- Allowed methods are explicitly whitelisted: `GET, POST, PUT, DELETE, OPTIONS`
- Allowed headers are explicitly whitelisted: `Content-Type, Authorization`
- Preflight cache: `maxAge: 86400` (24 hours)

---

### 2.8 HTTP Parameter Pollution (HPP)

**Attack:** Sending duplicate query parameters (e.g. `?sort=name&sort=password`) to confuse middleware or bypass validation.

**Protections:**
- `hpp` middleware (`hppProtection`) normalizes duplicate parameters — only the last value is kept, preventing array-based bypasses

---

### 2.9 Path Traversal

**Attack:** Using `../` sequences in inputs to access files outside the intended directory.

**Protections:**
- Suspicious request detector blocks patterns like `../`, `/etc/passwd`, `/proc/`, `/sys/`
- No file system operations use user-supplied paths

---

### 2.10 Denial of Service (DoS) / Payload Flooding

**Attack:** Sending massive request bodies or high request volumes to exhaust server resources.

**Protections:**
- `requestSizeGuard` middleware rejects any request with `Content-Length > 1MB` before body parsing
- `express.json({ limit: '100kb' })` — hard body size limit
- `express.urlencoded({ limit: '100kb' })` — hard URL-encoded body limit
- `globalLimiter`: 100 requests per 15 minutes per IP across all `/api/` routes
- Route-specific limiters are stricter (auth: 10/15min, contact: 5/hr, quotes: 5/hr)

---

### 2.11 Information Disclosure

**Attack:** Extracting server details, stack traces, or internal paths from error responses.

**Protections:**
- Global error handler never returns stack traces or internal error messages — always returns `{ error: 'Something went wrong.' }`
- `helmet({ hidePoweredBy: true })` removes the `X-Powered-By: Express` header
- `res.removeHeader('X-Powered-By')` in `securityHeaders` middleware as a second layer
- Health check endpoint returns minimal info: `{ status: 'ok', service: 'Codevra API' }`
- Forgot password endpoint always returns the same message regardless of whether the email exists — prevents user enumeration

---

### 2.12 Clickjacking

**Attack:** Embedding the site in an invisible iframe to trick users into clicking hidden elements.

**Protections:**
- `X-Frame-Options: DENY` via Helmet and `securityHeaders`
- `Content-Security-Policy: frame-ancestors 'none'` via Helmet CSP

---

### 2.13 Man-in-the-Middle (MITM)

**Attack:** Intercepting traffic between client and server.

**Protections:**
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` forces HTTPS for 1 year
- Session cookies use `secure: true` in production (HTTPS only)
- All sensitive environment variables (JWT secrets, DB URI, encryption keys) are stored in `.env` and never committed to version control (`.gitignore`)

---

### 2.14 Code Injection

**Attack:** Injecting `eval()`, `exec()`, `system()` calls through user inputs.

**Protections:**
- Suspicious request detector blocks `eval(`, `exec(`, `system(`, `passthru(` patterns
- No `eval()` or dynamic code execution exists anywhere in the codebase

---

### 2.15 Vault Encryption

**Attack:** Accessing encrypted notes even if the database is compromised.

**Protections:**
- Vault notes are encrypted with AES-256 using `VAULT_ENCRYPTION_KEY` (32-byte key stored in `.env`)
- Even with direct database access, note contents are unreadable without the encryption key

---

## 3. Security Middleware Stack (Execution Order)

| Order | Middleware | Purpose |
|-------|-----------|---------|
| 1 | `helmet()` | 15+ security headers |
| 2 | `securityHeaders` | Additional headers + cache control |
| 3 | `cors(buildCorsOptions())` | Origin whitelisting |
| 4 | `app.set('trust proxy', 1)` | Accurate IP behind reverse proxy |
| 5 | `requestSizeGuard` | Reject oversized payloads early |
| 6 | `express.json({ limit: '100kb' })` | Body size limit |
| 7 | `noSQLSanitize` | Strip MongoDB operators |
| 8 | `hppProtection` | Normalize duplicate params |
| 9 | `suspiciousRequestDetector` | Pattern-match known attack signatures |
| 10 | `globalLimiter` | 100 req/15min per IP |
| 11 | Route-specific limiters | Stricter limits per endpoint |
| 12 | `authMiddleware` | JWT verification with alg whitelist |
| 13 | Input validation | Type checks + length limits |
| 14 | `sanitizeString()` | Strip XSS payloads |
| 15 | Mongoose schema | Type casting + required field enforcement |

---

## 4. Rate Limiting Reference

| Endpoint | Limit | Window |
|----------|-------|--------|
| All `/api/` routes | 100 requests | 15 minutes |
| `POST /api/auth/login` | 10 requests | 15 minutes |
| `POST /api/auth/register` | 10 requests | 15 minutes |
| `POST /api/auth/forgot-password` | 3 requests | 1 hour |
| `POST /api/contact` | 5 requests | 1 hour |
| `POST /api/services/quote` | 5 requests | 1 hour |
| Public read endpoints | 200 requests | 15 minutes |

---

## 5. Password Security

- Minimum 8 characters enforced at API level
- Hashed with **bcrypt** at cost factor **12** (~300ms per hash)
- Passwords are never logged, returned in responses, or stored in plain text
- Password reset tokens are generated with `crypto.randomBytes(32)` — cryptographically secure
- Reset tokens expire in **15 minutes**
- Reset tokens are single-use — cleared from DB immediately after use

---

## 6. HTTP Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | `default-src 'self'` | Prevents XSS, data injection |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Forces HTTPS |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer leakage |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter |
| `Cache-Control` | `no-store` | Prevents caching of API responses |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates browsing context |
| `Cross-Origin-Resource-Policy` | `same-origin` | Prevents cross-origin reads |

---

## 7. Environment Variables Security

All secrets are stored in `.env` and must never be committed to version control.

| Variable | Purpose | Requirement |
|----------|---------|-------------|
| `JWT_SECRET` | Access token signing | Min 64 chars, random |
| `JWT_REFRESH_SECRET` | Refresh token signing | Min 64 chars, different from JWT_SECRET |
| `VAULT_ENCRYPTION_KEY` | AES-256 vault encryption | Exactly 32 bytes |
| `SESSION_SECRET` | Express session signing | Min 32 chars, random |
| `MONGODB_URI` | Database connection | Atlas URI with auth |
| `GMAIL_APP_PASSWORD` | Email sending | App-specific password |

`.gitignore` must include:
```
.env
*.env
.env.*
```

---

## 8. Audit Trail

Every service quote submission stores:
- `ip` — client IP address (from `x-forwarded-for` or socket)
- `userAgent` — browser/client identifier
- `status` — `new | reviewed | contacted | closed`
- `createdAt` / `updatedAt` — timestamps

Every failed login attempt stores:
- `failedLoginAttempts` — running count
- `lastFailedLogin` — timestamp of last failure
- `lockedUntil` — lockout expiry if threshold exceeded

---

## 9. Known Limitations & Recommendations

| Item | Current State | Recommendation |
|------|--------------|----------------|
| Refresh token revocation | Not implemented | Store refresh tokens in DB and invalidate on logout |
| 2FA / MFA | Not implemented | Add TOTP (Google Authenticator) for admin accounts |
| Security logging | `console.warn` only | Integrate a logging service (e.g. Winston + Logtail) |
| CAPTCHA | Not implemented | Add hCaptcha or Cloudflare Turnstile on public forms |
| Dependency scanning | Manual | Run `npm audit` in CI/CD pipeline |
| QR session storage | In-memory | Move to Redis for multi-instance deployments |

---

## 10. Security Checklist

- [x] Helmet with full CSP
- [x] CORS locked to frontend origin
- [x] Rate limiting on all endpoints
- [x] NoSQL injection prevention
- [x] XSS input sanitization
- [x] HTTP Parameter Pollution prevention
- [x] Suspicious request pattern detection
- [x] JWT algorithm whitelist (no `alg: none`)
- [x] JWT issuer + audience validation
- [x] Account lockout after failed attempts
- [x] bcrypt password hashing (cost 12)
- [x] Cryptographically secure reset tokens
- [x] User enumeration prevention
- [x] Stack trace suppression in errors
- [x] Server fingerprint removal
- [x] Payload size limits
- [x] Clickjacking prevention
- [x] HSTS enforced
- [x] Secure + HttpOnly + SameSite cookies
- [x] AES-256 vault encryption
- [x] IP + UserAgent audit logging
- [x] Secrets in environment variables only
