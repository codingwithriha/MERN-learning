# 🔐 The Complete Authentication & Authorization Handbook
### From Absolute Beginner to Interview Expert — MERN Stack Edition

## 📖 How to Use This Handbook

This is a reference book, not a blog post. Read it top to bottom once, then use the **Cheat Sheet**, **Flashcards**, and **Revision Notes** sections for spaced repetition before interviews. Every code example is written the way it would actually appear in a production Node.js / Express / React / MongoDB (MERN) codebase.

**Levels used throughout:**

| Level | Meaning |
|---|---|
| 🟢 L1 | Absolute Beginner |
| 🟢 L2 | Beginner |
| 🟡 L3 | Intermediate |
| 🟠 L4 | Advanced |
| 🔴 L5 | Production Level |
| 🟣 L6 | Interview Expert |

---

# Chapter 1 — Introduction to Authentication & Authorization

## 1.1 What Is Authentication? 🟢 L1

**Authentication (AuthN)** is the process of **verifying identity** — proving that a user is who they claim to be.

Think of it as the **ID check at an airport**: you show a passport, the officer checks your photo matches your face. That's authentication — a one-time verification of *who you are*.

In web applications, authentication typically means:
1. A user provides credentials (email + password, or a fingerprint, or an OTP, or a social login).
2. The server verifies those credentials against a stored record.
3. If valid, the server issues **proof of identity** (a session or a token) so the user doesn't have to re-prove identity on every single request.

## 1.2 What Is Authorization? 🟢 L1

**Authorization (AuthZ)** is the process of **verifying permissions** — deciding what an already-authenticated user is *allowed to do*.

Continuing the airport analogy: after your passport is checked (authentication), your **boarding pass** determines which gate you can enter and which seat you can sit in (authorization). A regular passenger can't walk into the cockpit — that's an authorization failure, not an authentication one.

**The single most common interview trap:** confusing the two. Remember this sentence:

> **Authentication = Identity. Authorization = Permission.**
> Authentication always happens *before* authorization. You cannot authorize someone whose identity you haven't verified.

## 1.3 Why Were They Created? 🟢 L1

Early computer systems (1960s–70s, e.g., CTSS at MIT) were **shared, multi-user systems**. The moment more than one person could use a computer, two problems appeared:

1. **How do we know it's really you?** → Authentication was born (the first computer passwords appeared around 1961).
2. **Now that we know it's you, what should you be allowed to touch?** → Authorization was born (Unix file permissions, `rwx`, appeared in the early 1970s).

The web inherited both problems at massive scale: millions of anonymous strangers hitting the same server, needing individual identities and individual permissions, over a **stateless protocol (HTTP)** that forgets everything between requests. Almost every AuthN/AuthZ mechanism you'll study exists to solve *"how do we remember who someone is, and what they can do, across stateless HTTP requests, securely."*

## 1.4 Why Do Companies Use Them? 🟢 L1

- **Security** — protect user data and business data from unauthorized access.
- **Personalization** — show *your* dashboard, *your* cart, *your* messages.
- **Compliance** — GDPR, HIPAA, SOC2, PCI-DSS all legally require access control and audit trails.
- **Multi-tenancy** — SaaS products (Slack, Notion, Salesforce) must isolate one customer's data from another's.
- **Business models** — free vs. paid tiers are enforced through authorization (role/permission checks).
- **Trust** — a single authentication breach (e.g., a leaked password database) can destroy a company's reputation overnight.

## 1.5 Real-World Analogy — The Nightclub 🟢 L1

Imagine a nightclub:

| Real World | Web App Equivalent |
|---|---|
| Bouncer checks your ID at the door | Authentication (login) |
| Wristband proves you already got checked | Session/Token (JWT, cookie) |
| VIP wristband color lets you into the VIP lounge | Authorization (roles/permissions) |
| Bouncer at the VIP door checks wristband color, not your ID again | Authorization middleware — doesn't re-verify identity, just checks the "role" |
| Club has cameras logging who went where | Audit logging |
| Wristband expires at 2 AM | Token/session expiry |
| You can get a new wristband by re-checking ID | Refresh token flow |

## 1.6 History Timeline 🟢 L2

```
1961 ─── First password-based login (MIT CTSS)
1970s ── Unix rwx permission model (AuthZ born properly)
1993 ── HTTP Basic Authentication (RFC 1945)
1994 ── Netscape invents Cookies
2000s ── Session-based server-side auth becomes standard (PHP/JSP/ASP)
2005 ── OAuth concept discussions begin (delegated access)
2007 ── OpenID 2.0
2010 ── OAuth 2.0 draft (RFC 6749 finalized 2012)
2010s ── JWT (JSON Web Tokens) - RFC 7519 (2015) - stateless auth explodes
2014 ── OpenID Connect (OIDC) - identity layer on top of OAuth 2.0
2015+ ── Passwordless / Magic Links become mainstream
2019 ── WebAuthn / FIDO2 - biometric & hardware-key based passwordless auth
2020s ── Passkeys go mainstream (Apple, Google, Microsoft adopt widely)
```

## 1.7 Advantages of Proper AuthN/AuthZ 🟢 L2

- Protects sensitive data from unauthorized access.
- Enables granular, auditable control (who did what, when).
- Builds user trust (secure login, MFA options).
- Enables business logic — subscriptions, roles, admin panels.
- Required for legal compliance in most industries.

## 1.8 Disadvantages / Trade-offs ⚖️ 🟢 L2

- **Complexity** — more moving parts = more bugs = more attack surface.
- **UX friction** — too much security (constant re-logins, CAPTCHAs) frustrates users.
- **Performance cost** — hashing passwords (bcrypt/argon2) is *intentionally* slow; token verification adds latency.
- **Statefulness vs. scalability tension** — sessions are simple but hard to scale horizontally; JWTs scale easily but are hard to revoke.
- **Maintenance burden** — token rotation, key rotation, expired session cleanup, password reset flows, MFA support — all need to be built and maintained.

---

# Chapter 2 — Core Concepts (Explained Completely)

## 2.1 Identity vs. Credentials vs. Session vs. Token — The Four Pillars 🟢 L2

| Term | Definition | Example |
|---|---|---|
| **Identity** | The "who" — a unique user record | `user._id`, `email` |
| **Credentials** | Secret proof used *once* to establish identity | password, OTP, biometric |
| **Session** | Server-side record that "remembers" a logged-in user | a row in a sessions table/Redis |
| **Token** | Self-contained, portable proof of identity/authorization | JWT, opaque access token |

**Interview one-liner:** *Credentials prove identity once. Sessions/Tokens carry that proof forward so you don't need credentials on every request.*

## 2.2 Stateless vs. Stateful Authentication 🟡 L3

HTTP is **stateless** — the server has no built-in memory of previous requests. There are two fundamentally different strategies to add "memory":

### A) Stateful (Session-Based) Authentication
- Server creates a session object **in server memory / database / Redis** after login.
- Server sends the client only a **session ID** (usually in a cookie).
- Every request, the browser automatically sends the cookie back; the server looks up the session ID in its store to know who the user is.

### B) Stateless (Token-Based) Authentication
- Server creates a **signed token** (usually a JWT) containing the user's identity/claims and sends it to the client.
- The client stores it (cookie, memory, or localStorage) and attaches it to every request (usually `Authorization: Bearer <token>` header).
- The server **does not store anything** — it just verifies the token's signature mathematically. If the signature is valid and not expired, the server trusts the claims inside.

| Aspect | Session-Based | Token-Based (JWT) |
|---|---|---|
| Server storage | Required (DB/Redis) | Not required |
| Scalability (horizontal) | Harder (needs shared session store) | Easier (any server can verify) |
| Revocation | Instant (delete session row) | Hard (token valid until expiry unless you add a blocklist) |
| Payload size | Small (just an ID) | Larger (full claims travel with every request) |
| Common storage on client | HttpOnly cookie | HttpOnly cookie (best) or Authorization header (SPA/mobile) |
| Best for | Traditional server-rendered apps, single backend | SPAs, microservices, mobile apps, multi-service architectures |

## 2.3 Cookies vs. LocalStorage vs. SessionStorage — For Storing Tokens 🟡 L3

| Storage | Sent automatically with requests? | Accessible to JS? | Vulnerable to |
|---|---|---|---|
| **Cookie (HttpOnly)** | ✅ Yes | ❌ No | CSRF (mitigated with `SameSite`) |
| **Cookie (non-HttpOnly)** | ✅ Yes | ✅ Yes | XSS + CSRF |
| **localStorage** | ❌ No (must attach manually) | ✅ Yes | XSS |
| **sessionStorage** | ❌ No | ✅ Yes | XSS (but cleared on tab close) |

**Interview-critical fact:** Storing JWTs in `localStorage` is the #1 most common **anti-pattern** interviewers probe for, because any XSS vulnerability lets an attacker read `localStorage` and steal the token completely. **HttpOnly cookies** are the industry-recommended storage for auth tokens because JavaScript literally cannot read them.

## 2.4 Password Hashing — Never Store Plaintext 🟢 L2

A **hash function** turns any input into a fixed-size, irreversible output ("digest"). Passwords must **never** be stored in plaintext or with reversible encryption — they must be **hashed** with a slow, salted algorithm.

- **Salt** — random data added to the password before hashing, so two identical passwords produce different hashes, defeating precomputed "rainbow table" attacks.
- **Slow hashing algorithms** (bcrypt, scrypt, argon2) are deliberately CPU/memory-expensive so brute-forcing is impractical, unlike fast hashes like MD5/SHA-256 which are built for *speed* (wrong tool for passwords).

```
Plaintext Password ──▶ [Add Salt] ──▶ [bcrypt/argon2, N rounds] ──▶ Stored Hash
"MyP@ssw0rd"              + random salt      (intentionally slow)      "$2b$12$KIX..."
```

**Argon2** (winner of the 2015 Password Hashing Competition) is currently the most recommended algorithm; **bcrypt** remains extremely common and battle-tested in production Node apps.

## 2.5 Multi-Factor Authentication (MFA) 🟡 L3

Authentication factors fall into three categories:

1. **Something you know** — password, PIN.
2. **Something you have** — phone (OTP/SMS), authenticator app (TOTP), hardware key (YubiKey).
3. **Something you are** — biometrics (fingerprint, Face ID).

**MFA** requires at least **two different categories** (not two of the same — two passwords isn't MFA). **2FA** is the most common form of MFA.

**TOTP (Time-based One-Time Password)** — RFC 6238 — generates a 6-digit code from a shared secret + current time, refreshing every 30 seconds (Google Authenticator, Authy).

## 2.6 OAuth 2.0 — Delegated Authorization 🟠 L4

**OAuth 2.0 is NOT an authentication protocol — it's an authorization delegation protocol.** This is one of the most misunderstood facts in interviews.

OAuth 2.0 lets a user grant a third-party app **limited access** to their data on another service, **without sharing their password** with that third-party app.

**Real analogy:** A valet key for your car — it starts the engine and drives short distances but can't open the trunk or glovebox. You never hand over your *master* key (password); you hand over a *restricted* key (access token).

### OAuth 2.0 Roles

| Role | Meaning | Example |
|---|---|---|
| Resource Owner | The user | You |
| Client | The app requesting access | "Login with Google" button on some site |
| Authorization Server | Issues tokens after user consent | Google's OAuth server |
| Resource Server | Hosts the protected data | Google Contacts/Calendar API |

### Authorization Code Flow (most common, most secure)

```
User               Client App              Authorization Server        Resource Server
 │                     │                            │                        │
 │──Click "Login"─────▶│                            │                        │
 │                     │───Redirect to consent─────▶│                        │
 │◀───────────Login & consent screen─────────────────│                        │
 │───Approves─────────────────────────────────────▶│                        │
 │                     │◀────Redirect w/ auth code──│                        │
 │                     │───Exchange code+secret────▶│                        │
 │                     │◀────Access + Refresh token─│                        │
 │                     │─────Request data w/ token────────────────────────▶│
 │                     │◀────────────Protected data───────────────────────│
```

## 2.7 OpenID Connect (OIDC) — Authentication on Top of OAuth 🟠 L4

OAuth 2.0 only handles **authorization** ("can this app access this data?"). It was never designed to answer **"who is this user?"** — companies hacked around this by treating "the app *can* access your profile API" as a proxy for login, which was insecure and inconsistent.

**OpenID Connect (2014)** adds a thin **identity layer** on top of OAuth 2.0:
- Introduces the **ID Token** — a JWT that specifically contains identity claims (`sub`, `email`, `name`, `iss`, `aud`, `exp`).
- This is what actually powers "Sign in with Google/Facebook/GitHub" buttons.

**Interview one-liner:** *OAuth 2.0 = "can you access my data?" OpenID Connect = "who are you?" — OIDC is built on top of OAuth 2.0.*

## 2.8 JWT (JSON Web Token) — Deep Dive 🟠 L4

A JWT is a compact, URL-safe, **self-contained** token with three Base64URL-encoded parts, separated by dots:

```
eyJhbGciOiJIUzI1NiJ9 . eyJ1c2VySWQiOiI2NCJ9 . SflKxwRJSMeKKF2QT4fw
      HEADER          .        PAYLOAD        .      SIGNATURE
```

1. **Header** — algorithm & token type: `{"alg": "HS256", "typ": "JWT"}`
2. **Payload** — the **claims** (data): `{"userId": "64", "role": "admin", "iat": 1690000000, "exp": 1690003600}`
3. **Signature** — `HMACSHA256(base64(header) + "." + base64(payload), SECRET_KEY)` — proves the token wasn't tampered with.

**Critical fact:** The payload is **Base64-encoded, NOT encrypted.** Anyone can decode and *read* a JWT's payload (try it on jwt.io). Never put secrets (passwords, credit card numbers) inside a JWT payload. The signature only guarantees **integrity** (it wasn't altered), not **confidentiality**.

### Access Token vs. Refresh Token

| | Access Token | Refresh Token |
|---|---|---|
| Purpose | Sent with every API request | Used only to get a new access token |
| Lifespan | Short (5–15 min) | Long (days/weeks) |
| Storage | Memory / HttpOnly cookie | HttpOnly, Secure cookie only |
| If stolen | Limited damage window | Serious — can mint new access tokens |

**Why short-lived access tokens?** JWTs cannot be easily revoked (there's no built-in "log this token out" mechanism since the server doesn't track them). Keeping them short-lived limits the blast radius if one is stolen. The refresh token (which *is* tracked server-side, often in a DB) provides a revocation point.

## 2.9 RBAC vs. ABAC vs. ACL — Authorization Models 🟠 L4

| Model | Full Name | How it decides access | Example |
|---|---|---|---|
| **RBAC** | Role-Based Access Control | Based on assigned **role** | "Admins can delete posts" |
| **ABAC** | Attribute-Based Access Control | Based on **attributes** of user/resource/environment | "Managers can approve expenses under $500 only during business hours" |
| **ACL** | Access Control List | Per-resource list of who can do what | "This specific file: Alice=read/write, Bob=read" |
| **PBAC** | Policy-Based Access Control | Centralized policy engine evaluates rules | Used in enterprise systems (OPA, Casbin) |

**RBAC** is by far the most common in typical MERN apps: `role: "admin" | "editor" | "viewer"` stored on the user document, checked in middleware.

## 2.10 CSRF, XSS, and Session Hijacking — The Threat Model 🟠 L4

- **XSS (Cross-Site Scripting)** — attacker injects malicious JS into your page (e.g., via an unsanitized comment field) that runs in the victim's browser and can steal tokens from `localStorage` or non-HttpOnly cookies.
- **CSRF (Cross-Site Request Forgery)** — attacker tricks a logged-in user's browser into submitting a request to your site (e.g., via a hidden form on a malicious page); the browser automatically attaches cookies, so the request looks legitimate. Mitigated with `SameSite` cookies + CSRF tokens.
- **Session Hijacking** — attacker steals a valid session ID/token (via network sniffing, XSS, or malware) and impersonates the user. Mitigated with HTTPS everywhere, HttpOnly cookies, short expiry, IP/device fingerprint checks.

```
        XSS ATTACK FLOW                          CSRF ATTACK FLOW
┌─────────────────────────┐          ┌────────────────────────────────┐
│ Attacker injects <script>│          │ Victim is logged into bank.com  │
│ into a vulnerable page   │          │ (has valid session cookie)      │
└───────────┬──────────────┘          └───────────────┬──────────────────┘
            │                                          │
            ▼                                          ▼
┌─────────────────────────┐          ┌────────────────────────────────┐
│ Script runs in victim's  │          │ Victim visits evil.com which    │
│ browser, reads token     │          │ auto-submits a form to bank.com │
│ from localStorage/cookie │          │ /transfer?amount=1000           │
└───────────┬──────────────┘          └───────────────┬──────────────────┘
            │                                          │
            ▼                                          ▼
┌─────────────────────────┐          ┌────────────────────────────────┐
│ Token sent to attacker's │          │ Browser auto-attaches bank.com  │
│ server                   │          │ cookie → request looks valid    │
└──────────────────────────┘          └────────────────────────────────┘
```

---

# Chapter 3 — Internal Working (Behind the Scenes)

## 3.1 Full Session-Based Login Lifecycle 🟡 L3

```
1. POST /login { email, password }
        │
        ▼
2. Server finds user by email in DB
        │
        ▼
3. Server compares password with stored hash
   bcrypt.compare(plainPassword, user.hashedPassword)
        │
        ▼ (match)
4. Server creates a session:
   - Generates a random session ID
   - Stores { userId, createdAt, expiresAt } in session store (Redis/DB)
        │
        ▼
5. Server sets a cookie:
   Set-Cookie: sid=abc123; HttpOnly; Secure; SameSite=Strict
        │
        ▼
6. Browser stores the cookie automatically
        │
        ▼
7. On every future request, browser auto-attaches: Cookie: sid=abc123
        │
        ▼
8. Server middleware looks up sid in session store → attaches req.user
        │
        ▼
9. Route handler uses req.user for logic/authorization
```

## 3.2 Full JWT-Based Login Lifecycle 🟡 L3

```
1. POST /login { email, password }
        │
        ▼
2. Server verifies credentials (same as above: bcrypt.compare)
        │
        ▼ (match)
3. Server generates JWT:
   jwt.sign({ userId, role }, SECRET, { expiresIn: '15m' })
        │
        ▼
4. Server sends token to client
   (as HttpOnly cookie, or in JSON response body for SPA to store)
        │
        ▼
5. Client attaches token to every request:
   Authorization: Bearer eyJhbGciOi...
        │
        ▼
6. Server middleware verifies signature + expiry (no DB lookup needed!)
   jwt.verify(token, SECRET) → decoded { userId, role }
        │
        ▼
7. req.user = decoded → route handler proceeds
        │
        ▼ (token expires after 15 min)
8. Client sends refresh token to /refresh-token endpoint
        │
        ▼
9. Server validates refresh token (checked against DB — can be revoked)
        │
        ▼
10. Server issues a brand-new access token
```

## 3.3 Memory & Execution Flow of `jwt.verify()` Internally 🟠 L4

1. Splits the token string on `.` into header, payload, signature.
2. Base64URL-decodes the header to read the algorithm (e.g., `HS256`).
3. Recomputes the signature: `HMACSHA256(header.payload, SECRET)`.
4. Compares the recomputed signature to the token's signature (constant-time comparison to avoid timing attacks).
5. If they match → decodes and returns the payload.
6. Checks `exp` (expiry) and `nbf` (not-before) claims against the current server time.
7. If any check fails → throws `JsonWebTokenError` or `TokenExpiredError`.

**Why this is "stateless":** Steps 1–7 require **zero** database or network calls — pure CPU computation. This is why JWTs scale horizontally so well: any server instance with the shared secret can verify any token instantly.

## 3.4 Password Verification Internal Flow (bcrypt) 🟠 L4

```
Stored hash: $2b$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
             │   │  │
             │   │  └── 22-char salt + 31-char hash (embedded together)
             │   └───── cost factor (12 = 2^12 = 4096 rounds)
             └───────── bcrypt algorithm identifier

bcrypt.compare(inputPassword, storedHash):
  1. Extracts the salt from the storedHash itself (salt is stored WITH the hash)
  2. Re-hashes inputPassword using that exact salt + cost factor
  3. Compares the new hash to storedHash (constant-time)
  4. Returns true/false
```

This is why you never need to store the salt separately — bcrypt embeds it inside the hash string itself.

## 3.5 Session Store Architecture in Production 🔴 L5

In production, sessions are **never** stored in plain server memory (that breaks the moment you have more than one server instance, or the server restarts). Common architecture:

```
                    ┌─────────────┐
     Request 1 ────▶│  Server A   │───┐
                    └─────────────┘   │
                                       ▼
                    ┌─────────────┐  ┌──────────────┐
     Request 2 ────▶│  Server B   │─▶│ Redis (shared │
                    └─────────────┘  │ session store)│
                                       └──────────────┘
                    ┌─────────────┐   ▲
     Request 3 ────▶│  Server C   │───┘
                    └─────────────┘
```
Any server can serve any request because the session lives in a **shared, fast, in-memory store (Redis)** instead of any one server's local memory. This is called making the app **stateless at the server level**, even though the auth mechanism itself is "stateful."

---

# Chapter 4 — Code Examples (Simple → Intermediate → Production)

## 4.1 Simple Example — Plain Password Check (❌ Never do this in production) 🟢 L1

```javascript
// simple-bad-example.js
// Purpose: illustrate WHY plaintext comparison is wrong before showing the right way

const users = [{ email: "a@test.com", password: "12345" }]; // plaintext! BAD

function login(email, password) {
  const user = users.find(u => u.email === email);
  if (user && user.password === password) {   // direct string comparison
    return "Login success";
  }
  return "Login failed";
}
```
**Why this is wrong:** passwords are stored and compared as plaintext. Any database leak instantly exposes every user's real password. This example exists purely to contrast with the correct approach below.

## 4.2 Intermediate Example — bcrypt + Express Session 🟡 L3

```javascript
// server.js
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,   // used to sign the session-id cookie
  resave: false,                        // don't save session if unmodified
  saveUninitialized: false,             // don't create session until something stored
  cookie: { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 } // 1 hour
}));

// --- Signup: hash the password before saving ---
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12); // 12 = cost factor (salt rounds)
  await User.create({ email, password: hashedPassword });
  res.status(201).json({ message: "User created" });
});

// --- Login: compare plaintext input against the stored hash ---
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  req.session.userId = user._id;   // server now "remembers" this browser is logged in
  res.json({ message: "Logged in" });
});

// --- Protect a route: require an active session ---
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });
  next();
}

app.get("/dashboard", requireAuth, (req, res) => {
  res.json({ message: `Welcome, user ${req.session.userId}` });
});
```
**Line-by-line explanation:**
- `bcrypt.hash(password, 12)` — hashes with 12 salt rounds (2^12 = 4096 iterations); higher = slower = more brute-force-resistant, but slower logins too. 10–12 is the common production sweet spot.
- `httpOnly: true` — JavaScript on the frontend cannot read this cookie (blocks XSS token theft).
- `secure: true` — cookie is only sent over HTTPS.
- `req.session.userId` — `express-session` automatically persists this to the configured store (memory by default — **must be swapped for Redis in production**, see 4.3).
- `requireAuth` middleware — the authorization gatekeeper: no valid session → 401 before the route logic ever runs.

## 4.3 Production Example — JWT Access + Refresh Tokens, Role-Based Authorization 🔴 L5

```javascript
// auth.controller.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken"); // DB-tracked, so it CAN be revoked

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function generateAccessToken(user) {
  return jwt.sign(
    { sub: user._id, role: user.role },     // "sub" = subject, JWT standard claim for user id
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign({ sub: user._id }, REFRESH_SECRET, { expiresIn: "7d" });
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    // Deliberately vague message — do NOT reveal whether email or password was wrong
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Store refresh token server-side so it can be revoked (e.g., on logout / password change)
  await RefreshToken.create({ token: refreshToken, userId: user._id });

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true, secure: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json({ accessToken }); // access token returned in body; SPA keeps it in memory (NOT localStorage)
};

exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken) return res.status(403).json({ message: "Refresh token revoked or invalid" });

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const user = await User.findById(decoded.sub);
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

exports.logout = async (req, res) => {
  await RefreshToken.deleteOne({ token: req.cookies.refreshToken });
  res.clearCookie("refreshToken").json({ message: "Logged out" });
};
```

```javascript
// middleware/authenticate.js — verifies WHO the user is
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;   // "Bearer eyJhbGciOi..."
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // { sub, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authenticate;
```

```javascript
// middleware/authorize.js — verifies WHAT the user can do (RBAC)
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }
    next();
  };
}
module.exports = authorize;
```

```javascript
// routes/admin.routes.js — putting it together
const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

router.delete(
  "/users/:id",
  authenticate,             // Step 1: who are you?
  authorize("admin"),       // Step 2: are you allowed to do THIS?
  deleteUserController
);

module.exports = router;
```

**Why this is "production-grade":**
- Separates **authentication** (`authenticate.js`) from **authorization** (`authorize.js`) into distinct, composable middleware — a hallmark of clean architecture interviewers look for.
- Refresh tokens are tracked in the DB (`RefreshToken` model) so they **can** be revoked (logout, password change, "log out of all devices").
- Access tokens stay short-lived and are never persisted to disk on the client.
- Generic error messages prevent **user enumeration** attacks (attacker probing which emails exist).
- `role` is embedded in the access token to avoid a DB round-trip on every authorization check — a common production optimization.

---

# Chapter 5 — Real World Usage in MERN Applications

| Company / Product | What they use | Why |
|---|---|---|
| **Netflix** | OAuth 2.0 + custom session tokens, device-based session management | Multiple devices per account, needs per-device revocation |
| **Amazon** | Session cookies + MFA + risk-based (adaptive) authentication | High-value transactions need step-up auth |
| **Slack** | OAuth 2.0 (Sign in with Google/Apple) + workspace-level RBAC | Multi-tenant workspaces, granular roles (owner/admin/member/guest) |
| **GitHub** | OAuth 2.0 Apps, Personal Access Tokens, fine-grained repo permissions (ABAC-like) | Third-party integrations (CI/CD) need scoped, revocable access |
| **Google** | OpenID Connect (they *invented* much of it), passkeys | Powers "Sign in with Google" everywhere |
| **Typical MERN SaaS startup** | JWT access + refresh tokens, HttpOnly cookies, `role` field on User schema, `authenticate` + `authorize` Express middleware | Simple to implement, scales horizontally, fits MongoDB document model well |

**Where it appears in a typical MERN codebase:**
```
project/
├── backend/
│   ├── models/User.js          # password (hashed), role, refreshTokens[]
│   ├── middleware/authenticate.js
│   ├── middleware/authorize.js
│   ├── controllers/auth.controller.js
│   ├── routes/auth.routes.js
│   └── utils/token.js          # jwt.sign / jwt.verify helpers
├── frontend/
│   ├── src/context/AuthContext.jsx   # holds accessToken in memory, exposes login()/logout()
│   ├── src/api/axiosInstance.js      # attaches Authorization header, handles 401 → refresh flow
│   └── src/routes/ProtectedRoute.jsx # redirects unauthenticated users to /login
```


# Chapter 6 — Best Practices 🔴 L5

### Folder Structure
- Keep `authenticate` (identity) and `authorize` (permission) as **separate middleware** — never merge them into one giant function.
- Isolate token logic in a `utils/token.js` or `services/token.service.js` — never call `jwt.sign`/`jwt.verify` directly inside controllers.

### Naming Conventions
- `req.user` for the authenticated identity (industry standard, expected by many libraries like Passport.js).
- `accessToken` / `refreshToken`, never ambiguous names like `token1`/`token2`.

### Security
- **Always** use HTTPS in production — cookies marked `secure` are silently dropped over HTTP.
- **Always** hash passwords with bcrypt/argon2 — never MD5/SHA-1/SHA-256 alone (too fast, brute-forceable).
- **Rate-limit** login endpoints (`express-rate-limit`) to block brute-force attacks.
- **Generic error messages** on login failure ("Invalid email or password") — never reveal which field was wrong.
- **Rotate JWT secrets** periodically; store secrets in environment variables / secret managers (never in code, never in git).
- Set `SameSite=Strict` or `Lax` on cookies to mitigate CSRF.
- Implement **account lockout** or exponential backoff after repeated failed attempts.
- Log authentication events (login, logout, failed attempts) for audit trails — but **never log passwords or tokens**.

### Optimization
- Embed frequently-checked claims (like `role`) directly in the JWT to avoid a DB call on every request.
- Cache permission lookups (e.g., in Redis) for complex ABAC/PBAC systems.

### Maintainability
- Centralize role/permission definitions in one config file (`roles.config.js`), not scattered magic strings across the codebase.
- Write integration tests specifically for authorization boundaries (e.g., "a `viewer` role gets 403 on DELETE").

### Scalability
- Use stateless JWTs (or Redis-backed sessions) so any server instance can handle any request — required for load-balanced, horizontally-scaled deployments.
- Keep access tokens short-lived; keep the *stateful* part (refresh tokens) minimal and fast to check (indexed DB lookup or Redis).

---

# Chapter 7 — Common Beginner Mistakes 🟡 L3

| Mistake | Why beginners make it | The fix |
|---|---|---|
| Storing JWT in `localStorage` | Seems simple, tutorials do it | Use HttpOnly cookies; if you must use header-based auth (mobile/SPA), keep the token in memory only |
| Comparing passwords with `===` | Doesn't understand hashing yet | Always `bcrypt.compare()` |
| Never expiring tokens (`expiresIn` omitted) | Doesn't think about what happens if stolen | Always set short expiry + refresh flow |
| Putting sensitive data (password, SSN) inside JWT payload | Thinks JWT is encrypted | JWT payload is only Base64-encoded, **readable by anyone** — never put secrets in it |
| Doing authorization checks only on the frontend (hiding a button) | Confuses UI/UX with security | Frontend hiding is UX only; **always** re-check permissions on the backend — the real security boundary |
| One giant `if (req.user)` check reused for everything | Doesn't separate AuthN from AuthZ | Split into `authenticate` then `authorize(role)` middleware |
| Not handling token expiry gracefully (app just breaks) | Didn't build the refresh flow | Implement silent refresh via refresh token before hitting expiry, or intercept 401 in Axios and retry after refresh |
| Same secret used for access & refresh tokens | Doesn't realize the risk | Use **different secrets** so a leaked access-token secret can't be used to forge refresh tokens |
| Revealing "email not found" vs "wrong password" | Trying to be "helpful" | Always same generic message — prevents user enumeration |
| No rate limiting on login/signup | Not thinking like an attacker | Add `express-rate-limit` / CAPTCHA after N failed attempts |

**How experienced developers avoid these:** they treat AuthN/AuthZ as a **security boundary**, not a feature — meaning every decision defaults to "assume attacker," never "assume happy path."

---

# Chapter 8 — Advanced Topics 🟠 L4 / 🔴 L5

## 8.1 Passwordless Authentication
- **Magic links** — user enters email, receives a one-time signed link (short-lived JWT/token) that logs them in on click. No password to steal or forget.
- **WebAuthn / Passkeys** — public-key cryptography; the private key never leaves the user's device (stored in a secure enclave / hardware). Phishing-resistant because the credential is bound to the exact origin domain.

## 8.2 Single Sign-On (SSO)
Enterprise pattern where one login grants access to multiple related applications, typically via **SAML** (older, XML-based, common in enterprise) or **OIDC** (modern, JSON/JWT-based). A central **Identity Provider (IdP)** (Okta, Auth0, Azure AD) issues tokens trusted by all connected **Service Providers**.

## 8.3 Token Revocation Strategies for JWT
Since JWTs are stateless by design, "logging out" or "banning a user immediately" is hard. Production strategies:
- **Short expiry + refresh token DB check** (shown in Chapter 4) — most common.
- **Token blocklist** in Redis — store revoked token IDs (`jti` claim) with a TTL matching remaining token life; check on every request (adds a small stateful cost back).
- **Token versioning** — store a `tokenVersion` number on the User document; embed it in the JWT; increment it on password change/logout — instantly invalidates all previously issued tokens.

## 8.4 Horizontal Scaling & Distributed Session Management 🔴 L5
When scaling to multiple server instances behind a load balancer:
- **Sticky sessions** (route the same user always to the same server) — simple but fragile, breaks on server failure.
- **Shared session store (Redis)** — the recommended approach; any instance can serve any request.
- **Fully stateless JWT** — eliminates the shared store need entirely for authentication (though refresh-token revocation still needs *some* shared state).

## 8.5 Zero Trust & Step-Up Authentication
Modern systems don't just authenticate once and trust forever. **Step-up authentication** requires re-verifying identity (e.g., re-entering password, MFA prompt) before high-risk actions (changing email, large money transfer) — even within an already "logged in" session.

## 8.6 Microservices Authentication Patterns 🔴 L5
```
Client ──▶ API Gateway ──(validates JWT once)──▶ Service A
                                              └──▶ Service B
                                              └──▶ Service C
```
The API Gateway authenticates once and forwards a trusted, verified identity (often re-signed as an internal token) downstream — internal services don't each re-verify the original user credentials, they trust the gateway (mTLS or internal network trust boundary).


# Chapter 9 — Interview Questions (Deep, with Full Answers)

> Format for each: **Question → Ideal Answer → Why It's Correct → Common Wrong Answer → What the Interviewer Is Testing → Likely Follow-ups**

---

### 🟢 Beginner Q1: What is the difference between authentication and authorization?

**Ideal Answer:** Authentication verifies *who* a user is (identity), typically via credentials like email/password. Authorization determines *what* an authenticated user is allowed to do (permissions), typically via roles or policies. Authentication always happens first; authorization decisions depend on a known identity.

**Why It's Correct:** It captures both the definitional distinction and the *ordering* dependency, which is what separates a memorized answer from an understood one.

**Common Wrong Answer:** "They're basically the same thing — checking if a user can log in." This conflates the two and misses that a user can be authenticated but still get a 403 (forbidden) on a specific action.

**What's Being Tested:** Whether the candidate has the foundational vocabulary right — this question filters out candidates who've never built real access control.

**Follow-ups:** *"Can you be authorized without being authenticated?"* (No — authorization requires a known identity to check permissions against, though some systems allow "anonymous" roles with default limited permissions.) *"Give an HTTP status code example for each failure."* (401 = authentication failure, 403 = authorization failure.)

---

### 🟢 Beginner Q2: Why should you never store passwords in plaintext?

**Ideal Answer:** If the database is ever breached (SQL injection, leaked backup, insider threat), plaintext passwords expose every user's real password immediately — and because people reuse passwords across sites, this cascades into other accounts. Hashing with a slow, salted algorithm (bcrypt/argon2) means even a full database leak doesn't reveal usable passwords without massive, impractical computation.

**Why It's Correct:** It explains the *consequence chain*, not just "it's insecure."

**Common Wrong Answer:** "Because it's against best practices." — true but shallow; shows no understanding of the actual attack.

**What's Being Tested:** Security-first thinking, not rule memorization.

**Follow-ups:** *"What's a salt and why is it needed?"* *"Why not use SHA-256 for passwords?"* (Too fast — GPUs can compute billions of SHA-256 hashes/sec, making brute-force feasible; bcrypt/argon2 are deliberately slow.)

---

### 🟢 Beginner Q3: What is a JWT and what are its three parts?

**Ideal Answer:** A JWT (JSON Web Token) is a compact, self-contained token with three Base64URL-encoded, dot-separated parts: a Header (algorithm/type), a Payload (claims — the actual data like user ID and role), and a Signature (proves the token hasn't been tampered with, computed from the header+payload using a secret key).

**Why It's Correct:** Structurally complete and mentions the *purpose* of each part, not just the names.

**Common Wrong Answer:** "It's an encrypted token that stores login data." — Wrong: it's encoded, not encrypted, and this is a very common misconception.

**What's Being Tested:** Whether the candidate actually understands JWT internals vs. having used a library without understanding it.

**Follow-ups:** *"Is the payload encrypted?"* (No — Base64 encoded only, readable by anyone. Never put secrets in it.) *"What happens if I change one character in the payload?"* (Signature verification fails — server rejects the token.)

---

### 🟢 Beginner Q4: What does `bcrypt.hash()` actually do?

**Ideal Answer:** It generates a random salt, combines it with the password, and runs it through the bcrypt algorithm for a configurable number of rounds (cost factor), producing a one-way hash string that embeds the salt and cost factor within itself. This hash is what gets stored in the database.

**Why It's Correct:** Shows understanding that salt and cost factor are embedded in the output, which is why `bcrypt.compare()` doesn't need a separately stored salt.

**Common Wrong Answer:** "It encrypts the password." — bcrypt is a one-way hash, not reversible encryption; there's no "decrypt" function.

**What's Being Tested:** Precision of language — "hash" vs "encrypt" is a classic interview tripwire.

**Follow-ups:** *"How does bcrypt.compare() know which salt to use?"* (Extracts it from the stored hash string itself.)

---

### 🟢 Beginner Q5: What is a session cookie and how does the browser use it?

**Ideal Answer:** After login, the server creates a session record and sends the browser a `Set-Cookie` header containing a session ID. The browser stores this and automatically attaches it as a `Cookie` header on every subsequent request to that domain, letting the server look up the session and identify the user without re-sending credentials.

**Why It's Correct:** Explains both server-side creation and the browser's automatic re-attachment behavior — a detail many candidates miss.

**Common Wrong Answer:** "The frontend has to manually send the cookie on every request." — Incorrect for standard cookies (unlike headers, which *do* need manual attachment).

**What's Being Tested:** Understanding of browser HTTP mechanics, not just server-side code.

**Follow-ups:** *"What does HttpOnly do?"* *"What's the difference between a session cookie and a persistent cookie?"* (Session cookie disappears when browser closes — no `Expires`/`Max-Age`; persistent cookie survives browser restarts.)

---

### 🟡 Intermediate Q6: Compare session-based and JWT-based authentication. When would you choose each?

**Ideal Answer:** Session-based auth stores state server-side (DB/Redis) and gives the client only an opaque ID — easy to revoke instantly, but requires shared storage to scale horizontally. JWT-based auth is stateless and self-contained — trivially scalable across servers/microservices, but hard to revoke before expiry without adding back some server-side state (blocklist or refresh-token tracking). Choose sessions for traditional monolithic server-rendered apps with a single backend; choose JWTs for SPAs, mobile apps, and microservice architectures where multiple independent services need to verify identity without a shared session store.

**Why It's Correct:** Shows the actual engineering trade-off (statelessness vs. revocability) rather than reciting "JWT is modern, sessions are old."

**Common Wrong Answer:** "JWT is always better because it's stateless." — Ignores the real revocation problem, a red flag for shallow understanding.

**What's Being Tested:** Architectural judgment — can the candidate reason about trade-offs, not just recite definitions.

**Follow-ups:** *"How would you revoke a JWT before it expires?"* *"Can you combine both approaches?"* (Yes — many production systems use short-lived JWT access tokens + a DB-tracked, revocable refresh token — the "best of both.")

---

### 🟡 Intermediate Q7: Why is OAuth 2.0 not an authentication protocol?

**Ideal Answer:** OAuth 2.0's core purpose is authorization delegation — letting a third-party app get a scoped access token to act on a user's behalf against a resource server, without ever seeing the user's password. It was never designed to answer "who is this user" reliably or in a standardized way — that's why OpenID Connect was created on top of it, adding a standardized ID Token (a JWT) specifically for identity claims.

**Why It's Correct:** Distinguishes OAuth's actual design intent from the common "Login with Google" usage pattern most candidates only know at surface level.

**Common Wrong Answer:** "OAuth 2.0 is how Google login works, so it's authentication." — Conflates a common implementation pattern with the protocol's actual defined purpose.

**What's Being Tested:** Deep protocol understanding vs. surface familiarity with "Login with X" buttons.

**Follow-ups:** *"What does OpenID Connect add?"* *"What's the difference between an access token and an ID token in OIDC?"* (Access token = for calling APIs on the user's behalf; ID token = a JWT proving identity, meant for the client app itself, not for calling external APIs.)

---

### 🟡 Intermediate Q8: Where should you store a JWT on the client, and why?

**Ideal Answer:** An HttpOnly, Secure, SameSite cookie is the recommended storage — JavaScript cannot read it (blocking XSS token theft), it's only sent over HTTPS, and SameSite mitigates CSRF. `localStorage`/`sessionStorage` are readable by any JS running on the page, so a single XSS vulnerability anywhere in the app compromises every stored token instantly.

**Why It's Correct:** Directly addresses the primary threat model (XSS) and explains *why* the recommended approach mitigates it.

**Common Wrong Answer:** "localStorage, because it's easy to use with `Authorization` headers in a SPA." — Popular in tutorials, but a known security anti-pattern that interviewers specifically probe for.

**What's Being Tested:** Whether the candidate has internalized real security practices vs. copying common tutorial code.

**Follow-ups:** *"If you must use header-based auth (e.g., native mobile app), how do you mitigate the risk?"* (Keep the token in secure, OS-level storage like Keychain/Keystore, not plain memory or shared preferences; keep it short-lived.)

---

### 🟡 Intermediate Q9: Explain the full lifecycle of a refresh token in a production app.

**Ideal Answer:** On login, the server issues both a short-lived access token (used for API calls) and a long-lived refresh token (stored HttpOnly, and recorded in the server's database). When the access token expires, the client calls a `/refresh` endpoint sending the refresh token; the server checks it against the DB record (confirming it hasn't been revoked/logged out), and if valid, issues a fresh access token — the refresh token itself may also be rotated (issued anew) to limit reuse. On logout or suspicious activity, the server deletes the DB record, immediately invalidating that refresh token even though it hasn't technically "expired" yet.

**Why It's Correct:** Covers issuance, verification, rotation, and revocation — the full loop, which is exactly what separates "I've read about JWT" from "I've built this."

**Common Wrong Answer:** "The refresh token just gets a new access token." — True but incomplete; skips the DB-tracking/revocation mechanism, which is the entire reason refresh tokens exist architecturally.

**What's Being Tested:** Whether the candidate has actually implemented this flow, not just read about JWTs.

**Follow-ups:** *"What is refresh token rotation and why does it matter?"* (Issuing a new refresh token on every use and invalidating the old one — if a stolen refresh token gets used and then the legitimate user tries to use their (now-invalidated) old one, the server can detect reuse and revoke the entire token family — a strong signal of theft.)

---

### 🟠 Advanced Q10: How would you design an authorization system that supports both roles and fine-grained per-resource permissions?

**Ideal Answer:** Use a hybrid RBAC + ACL/ABAC model: assign coarse-grained roles (admin/editor/viewer) for broad defaults, but allow per-resource overrides stored in a separate permissions collection (e.g., `{ resourceId, userId, permission: "write" }`) checked after the role check. For complex conditional logic (e.g., "editors can edit only their own posts, or posts in teams they belong to"), introduce a policy/attribute layer (ABAC) evaluated in a centralized authorization service or middleware — potentially using a policy engine like Open Policy Agent (OPA) or a library like CASL/Casbin — so authorization logic isn't scattered across dozens of route handlers.

**Why It's Correct:** Demonstrates awareness that real production systems rarely use a single pure model — they layer RBAC (cheap, fast defaults) with ABAC/ACL (flexible, resource-specific overrides), and centralizes policy logic for maintainability.

**Common Wrong Answer:** "Just add more roles for every combination." — Leads to role explosion (`editor-of-team-a`, `editor-of-team-b`...) which doesn't scale and is a well-known anti-pattern.

**What's Being Tested:** System design maturity — can the candidate design for the *messy real world*, not just a toy two-role example.

**Follow-ups:** *"How do you keep this performant if every request needs a permission check?"* (Cache resolved permissions per request/session; index the permissions collection by userId+resourceId.)

---

### 🟠 Advanced Q11: How do you prevent a stolen JWT access token from being used indefinitely?

**Ideal Answer:** Keep access tokens short-lived (5–15 min) so a stolen token has a small usable window. For scenarios requiring immediate revocation (compromised account, forced logout), add a lightweight stateful check: either a token-version number on the user record (bump it to invalidate all previously issued tokens instantly) or a Redis-based blocklist keyed by the token's `jti` claim with a TTL matching remaining token life. Pure stateless JWTs cannot be revoked before expiry — any "instant revocation" requirement inherently reintroduces some server-side state.

**Why It's Correct:** Correctly identifies that this is a fundamental architectural tension in JWTs, not something solvable "for free" — and gives concrete, implementable solutions.

**Common Wrong Answer:** "Just delete the token from the database." — Reveals a misunderstanding: standard JWTs aren't stored in a database to begin with; there's nothing to "delete" unless you've specifically built a tracking mechanism.

**What's Being Tested:** Deep understanding of JWT's stateless nature and its real consequences — a favorite "gotcha" at senior interviews.

**Follow-ups:** *"What's the trade-off of the token-version approach?"* (It invalidates ALL sessions for that user at once — can't selectively revoke one device's session, unlike per-refresh-token tracking.)

---

### 🟠 Advanced Q12: Design an authentication system for a multi-tenant SaaS product.

**Ideal Answer:** Each user belongs to one or more organizations (tenants); the JWT/session should carry not just `userId` and global `role`, but also the *active tenant context* (`orgId`) and the user's role **within that org** (since roles can differ per org — e.g., admin in Org A, viewer in Org B). Every authorization check must validate both "is this user authenticated" AND "does this user have permission X within THIS specific org" — critically, every data query must also be scoped by `orgId` at the database level (not just checked in middleware) to prevent cross-tenant data leaks even if an authorization check is accidentally missed somewhere. Support an org-switcher UI that reissues a token scoped to the newly selected org.

**Why It's Correct:** Captures the two things that trip up almost everyone building multi-tenant systems for the first time: per-org roles (not global roles) and defense-in-depth data scoping (not relying solely on middleware).

**Common Wrong Answer:** "Just add an `orgId` field to the user and check it." — Misses that a single user can belong to multiple orgs with different roles in each, and misses the critical database-level scoping requirement.

**What's Being Tested:** Real-world system design experience — this is a classic staff/senior-level SaaS interview question.

**Follow-ups:** *"What happens if a user is removed from an org while they have an active session?"* (Their existing token may still claim membership until it expires or is refreshed — mitigated by short-lived tokens + re-validating org membership on refresh, or checking a live "membership" flag on sensitive operations.)

---

## Scenario-Based Questions

### Scenario Q13: "A user reports they were logged out of the app randomly after 15 minutes of activity, even though they were actively using it." What's likely happening and how do you fix it?

**Ideal Answer:** Likely the access token expired (15-min lifespan) and the frontend isn't implementing the silent-refresh flow correctly — either not intercepting 401 responses to trigger a `/refresh` call, or the refresh token itself has issues (missing/expired/not sent due to cookie misconfiguration). Fix: implement an Axios/fetch interceptor that, on receiving a 401, automatically attempts a token refresh and retries the original request before falling back to a full logout.

**What's Being Tested:** Practical debugging instinct connected to the theoretical token lifecycle — can they trace symptom → root cause → fix.

### Scenario Q14: "Your team wants to let users stay logged in for 30 days without re-entering their password, but security wants strict revocation control." How do you satisfy both?

**Ideal Answer:** Long-lived (30-day), HttpOnly, DB-tracked refresh token + short-lived access tokens. "Stay logged in" is achieved via the refresh token's long lifespan; "strict revocation" is achieved because the refresh token is a row in the database that can be deleted instantly (on logout, password change, or admin action), which prevents any further access-token renewal — satisfying both requirements without contradiction.

**What's Being Tested:** Ability to reconcile seemingly conflicting requirements using the right architecture — a common senior-interview pattern.

---

## Practical / Debugging / Coding Questions

### Debugging Q15: This middleware isn't blocking unauthorized users. Find the bug.
```javascript
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    }
    // missing else branch!
  };
}
```
**Ideal Answer:** There's no `else` branch — if the role check fails, `next()` is never called, but a response is also never sent, so the request just **hangs forever** (client sees a timeout, not a clean 403). Fix:
```javascript
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role === role) return next();
    return res.status(403).json({ message: "Forbidden" });
  };
}
```
**What's Being Tested:** Attention to control flow — a very common real bug in Express middleware, and a great signal of code review discipline.

### Coding Q16: Write a middleware that checks if a JWT is expired and returns a specific, distinguishable error for "expired" vs "invalid."
```javascript
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ code: "NO_TOKEN" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ code: "TOKEN_EXPIRED" }); // frontend can trigger refresh flow
      }
      return res.status(401).json({ code: "TOKEN_INVALID" });    // frontend should force full logout
    }
    req.user = decoded;
    next();
  });
}
```
**Why this matters:** Distinguishing expired-vs-invalid lets the frontend decide *automatic silent refresh* (expired) vs. *forced logout* (invalid/tampered) — a real production UX detail interviewers love to see candidates think of unprompted.


# Chapter 10 — Coding Exercises

### 🟢 Easy: Implement a password strength validator
**Task:** Write a function `isStrongPassword(password)` that returns `true` only if the password is 8+ characters and contains at least one uppercase, one lowercase, one digit, and one special character.
```javascript
function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}
// isStrongPassword("Abcdef1!") -> true
// isStrongPassword("abcdefgh") -> false (no uppercase/digit/special char)
```
**Explanation:** Each `(?=...)` is a lookahead — checks a condition exists *somewhere* in the string without consuming characters, letting all four conditions apply to the same string independently, followed by `.{8,}` enforcing minimum length.

---

### 🟡 Medium: Implement `authenticate` + `authorize` middleware from scratch (no libraries for the role check)
**Task:** Given a `req.user = { id, role }` populated by a prior JWT-verification step, write an `authorize(...roles)` middleware factory usable as `authorize("admin", "editor")`.
```javascript
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
// usage: router.post("/posts", authenticate, authorize("admin", "editor"), createPost);
```
**Explanation:** Using rest parameters (`...allowedRoles`) makes the middleware reusable across any route with any role combination, keeping authorization logic declarative at the route-definition level instead of buried in controller bodies.

---

### 🟠 Hard: Implement refresh-token rotation with reuse detection
**Task:** On every `/refresh` call, issue a new refresh token and invalidate the old one. If an already-used (invalidated) refresh token is presented again, treat it as a theft signal and revoke the entire token family (log the user out of all devices).
```javascript
// RefreshToken schema: { token, userId, familyId, isValid: Boolean }

async function refreshTokenHandler(req, res) {
  const { token } = req.cookies;
  const record = await RefreshToken.findOne({ token });

  if (!record) return res.status(403).json({ message: "Unknown token" });

  if (!record.isValid) {
    // Reuse of an already-rotated-out token = likely theft
    await RefreshToken.updateMany({ familyId: record.familyId }, { isValid: false });
    return res.status(403).json({ message: "Token reuse detected — all sessions revoked" });
  }

  // Rotate: invalidate the old, issue a new one in the same family
  record.isValid = false;
  await record.save();

  const newToken = generateRefreshToken(record.userId);
  await RefreshToken.create({ token: newToken, userId: record.userId, familyId: record.familyId, isValid: true });

  const accessToken = generateAccessToken({ id: record.userId });
  res.cookie("refreshToken", newToken, { httpOnly: true, secure: true, sameSite: "strict" });
  res.json({ accessToken });
}
```
**Explanation:** `familyId` groups all refresh tokens descended from a single original login. Rotating on every use means a stolen-and-later-reused old token immediately signals compromise (since the legitimate user would have already rotated past it), letting the server nuke the entire family — this is the technique used by major identity providers (Auth0, Google) in production.

---

### 🟣 Interview-Level: Design and implement rate-limited login with account lockout
**Task:** Prevent brute-force attacks: after 5 failed login attempts within 15 minutes for a given email, lock further attempts for that email for 15 minutes.
```javascript
const attempts = new Map(); // In production: use Redis, not in-memory Map

async function login(req, res) {
  const { email, password } = req.body;
  const record = attempts.get(email) || { count: 0, lockedUntil: null };

  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    return res.status(429).json({ message: "Too many attempts. Try again later." });
  }

  const user = await User.findOne({ email });
  const valid = user && await bcrypt.compare(password, user.password);

  if (!valid) {
    record.count += 1;
    if (record.count >= 5) {
      record.lockedUntil = Date.now() + 15 * 60 * 1000;
      record.count = 0;
    }
    attempts.set(email, record);
    return res.status(401).json({ message: "Invalid email or password" });
  }

  attempts.delete(email); // reset on success
  const accessToken = generateAccessToken(user);
  res.json({ accessToken });
}
```
**Explanation:** This is exactly the pattern tested at senior interviews — notice the response is still the generic "Invalid email or password" even while locked-out logic runs behind the scenes (except the 429, which is unavoidechoed but doesn't reveal *why*). In production, replace the in-memory `Map` with Redis (`INCR` + `EXPIRE`) so it works across multiple server instances.

---

# Chapter 11 — Multiple Choice Questions (MCQs)

**Q1.** What does the "signature" part of a JWT guarantee?
- A) The payload is encrypted and unreadable ❌ *(JWT payload is Base64-encoded, not encrypted — always readable)*
- B) The token hasn't been tampered with since it was issued ✅ *(Correct — signature verifies integrity, computed from header+payload+secret)*
- C) The token can never expire ❌ *(Expiry is controlled by the separate `exp` claim, unrelated to the signature)*
- D) The user's password is embedded safely ❌ *(Passwords should never be in a JWT at all)*

**Q2.** Which HTTP status code should be returned when an authenticated user tries to access a resource they don't have permission for?
- A) 401 Unauthorized ❌ *(This means "not authenticated" / missing-or-invalid credentials)*
- B) 403 Forbidden ✅ *(Correct — user is known, but lacks permission)*
- C) 404 Not Found ❌ *(Sometimes used deliberately to hide resource existence, but semantically wrong for a plain permission failure)*
- D) 500 Internal Server Error ❌ *(Not a server error at all)*

**Q3.** Where is the safest place to store an authentication token on a web client?
- A) `localStorage` ❌ *(Readable by any JS — vulnerable to XSS)*
- B) `sessionStorage` ❌ *(Same XSS vulnerability, just shorter-lived)*
- C) A global JS variable ❌ *(Still readable by any script running on the page)*
- D) An HttpOnly, Secure cookie ✅ *(Correct — inaccessible to JavaScript, mitigating XSS token theft)*

**Q4.** What is the primary purpose of a "salt" in password hashing?
- A) To make the hash reversible ❌ *(Hashing remains one-way regardless of salt)*
- B) To ensure identical passwords produce different hashes, defeating rainbow-table attacks ✅
- C) To encrypt the password for storage ❌ *(Salting isn't encryption)*
- D) To speed up the hashing process ❌ *(It has no effect on speed; cost factor controls speed)*

**Q5.** In OAuth 2.0's Authorization Code flow, what does the client exchange for an access token?
- A) The user's password ❌ *(Never shared with the client — that's the whole point of OAuth)*
- B) An authorization code ✅ *(Correct — exchanged along with the client secret at the token endpoint)*
- C) A refresh token ❌ *(Refresh tokens are used later, to get NEW access tokens after expiry)*
- D) A session cookie ❌ *(Not part of the OAuth 2.0 token exchange)*

**Q6.** Why are JWT access tokens typically kept short-lived (e.g., 15 minutes)?
- A) To reduce server storage costs ❌ *(JWTs aren't stored server-side at all)*
- B) Because JWTs are hard to revoke before expiry, so short lifespans limit the damage if stolen ✅
- C) Because long tokens are computationally expensive to verify ❌ *(Verification cost is unrelated to token lifespan)*
- D) Browsers reject tokens longer than 15 minutes ❌ *(Not a real browser restriction)*

**Q7.** Which of these is an example of Role-Based Access Control (RBAC)?
- A) "Users in the Finance department can approve invoices under $1000 during business hours" ❌ *(This is ABAC — multiple attributes/conditions)*
- B) "Admins can delete any post; Editors can edit but not delete; Viewers can only read" ✅ *(Correct — access purely by assigned role)*
- C) "This specific file: Alice=read/write, Bob=read-only" ❌ *(This is an ACL — per-resource)*
- D) None of the above ❌

**Q8.** What is the main security risk of storing a JWT in `localStorage`?
- A) CSRF ❌ *(localStorage isn't auto-sent by the browser, so it's actually LESS exposed to CSRF than cookies)*
- B) XSS ✅ *(Correct — any injected script can read localStorage and steal the token)*
- C) SQL Injection ❌ *(Unrelated to client-side storage)*
- D) DDoS ❌ *(Unrelated)*

---

# Chapter 12 — Flashcards (Revision)

| # | Front (Question) | Back (Answer) |
|---|---|---|
| 1 | Authentication vs Authorization? | AuthN = identity ("who"), AuthZ = permission ("what can you do") |
| 2 | Is a JWT encrypted? | No — only Base64-encoded. Readable by anyone. Signature only proves integrity. |
| 3 | Best client storage for tokens? | HttpOnly, Secure, SameSite cookie |
| 4 | What does bcrypt embed inside its output hash? | The salt and the cost factor |
| 5 | 401 vs 403? | 401 = not authenticated, 403 = authenticated but not allowed |
| 6 | What is OAuth 2.0's actual purpose? | Delegated authorization (NOT authentication) |
| 7 | What adds identity to OAuth 2.0? | OpenID Connect (OIDC) — adds the ID Token |
| 8 | Why are access tokens short-lived? | JWTs are hard to revoke early; short life limits damage if stolen |
| 9 | What does a refresh token allow revocation of? | Because it's tracked server-side (DB), it can be deleted to instantly stop new access tokens from being issued |
| 10 | RBAC vs ABAC? | RBAC = fixed roles; ABAC = dynamic rules based on attributes/context |
| 11 | What mitigates CSRF on cookies? | `SameSite=Strict/Lax` + CSRF tokens |
| 12 | What mitigates XSS token theft? | HttpOnly cookies (JS can't read them) |
| 13 | What's in a JWT header? | Algorithm (`alg`) and token type (`typ`) |
| 14 | What are the 3 MFA factor categories? | Something you know / have / are |
| 15 | What is TOTP? | Time-based One-Time Password, refreshing every 30s from a shared secret |
| 16 | Session-based auth storage location? | Server-side (DB/Redis); client only holds a session ID |
| 17 | Main scalability downside of sessions? | Requires a shared store across servers to scale horizontally |
| 18 | Main downside of JWTs? | Hard to revoke before expiry (stateless by design) |
| 19 | What is `req.user` typically populated by? | The `authenticate` middleware, after verifying a token/session |
| 20 | What is refresh token rotation? | Issuing a new refresh token on every use + invalidating the old one, to detect reuse/theft |

---

# Chapter 13 — One-Page Cheat Sheet 📋

```
AUTHENTICATION = WHO           AUTHORIZATION = WHAT
────────────────────           ────────────────────
Login, credentials              Roles, permissions
401 if fails                    403 if fails
Happens FIRST                   Happens AFTER auth

PASSWORD STORAGE
────────────────
plaintext ❌ → SHA-256 ❌ (too fast) → bcrypt/argon2 ✅ (slow + salted)

TOKEN STRATEGIES
────────────────
Session:  server stores state | client holds ID only | easy revoke | needs shared store to scale
JWT:      client holds full claims | server verifies via signature | hard revoke | scales trivially

JWT STRUCTURE
─────────────
header.payload.signature   (Base64URL, NOT encrypted — never put secrets in payload)

TOKEN LIFESPANS (typical)
──────────────────────────
Access token:  5–15 min   (stateless, high risk if long-lived)
Refresh token: 7–30 days  (stateful/DB-tracked, revocable)

CLIENT STORAGE RANKING (best → worst for tokens)
──────────────────────────────────────────────────
1. HttpOnly Secure SameSite Cookie   (JS can't read → XSS-safe)
2. In-memory JS variable              (gone on refresh, but not persisted for XSS to grab easily)
3. sessionStorage                     (XSS-readable, cleared on tab close)
4. localStorage                       (XSS-readable, persists — AVOID for tokens)

OAUTH 2.0 QUICK MAP
────────────────────
Resource Owner = user | Client = your app | Auth Server = issues tokens | Resource Server = hosts data
OAuth 2.0 = authorization only | OIDC = adds identity (ID Token) on top

AUTHORIZATION MODELS
─────────────────────
RBAC = role-based (fixed roles)
ABAC = attribute-based (dynamic conditions)
ACL  = per-resource access list

TOP SECURITY DEFAULTS
───────────────────────
✅ HTTPS everywhere        ✅ Generic login error messages
✅ Rate-limit login        ✅ HttpOnly + Secure + SameSite cookies
✅ bcrypt/argon2 hashing   ✅ Short access tokens + revocable refresh tokens
```


# Chapter 14 — Timed Revision Notes ⏱️

### 5-Minute Revision
- AuthN = who, AuthZ = what. AuthN happens first.
- Passwords: never plaintext → bcrypt/argon2 (salted, slow).
- JWT = header.payload.signature — Base64-encoded, NOT encrypted.
- Best token storage: HttpOnly cookie.
- 401 = not authenticated, 403 = not authorized.

### 15-Minute Revision
Add to the above:
- Session-based (stateful, server stores, easy revoke, harder to scale) vs. JWT-based (stateless, self-contained, hard to revoke, scales easily).
- Access token (short-lived) + Refresh token (long-lived, DB-tracked, revocable) pattern.
- OAuth 2.0 = delegated authorization; OIDC = adds identity layer (ID Token) on top of OAuth 2.0.
- RBAC (fixed roles) vs. ABAC (dynamic attributes) vs. ACL (per-resource list).
- XSS steals tokens from JS-accessible storage; CSRF abuses auto-sent cookies — mitigate with HttpOnly + SameSite.

### 30-Minute Revision
Add to the above:
- Full session login lifecycle: credentials → bcrypt.compare → session created in store → cookie sent → auto-attached on future requests → middleware looks up session.
- Full JWT login lifecycle: credentials → bcrypt.compare → JWT signed → sent to client → attached via header/cookie → verified statelessly via signature+expiry → refresh flow when expired.
- Token revocation strategies: token versioning, Redis blocklist by `jti`, refresh-token DB deletion.
- Multi-tenant auth: role scoped per-organization, not global; DB-level query scoping as defense-in-depth.
- Common mistakes: localStorage for tokens, frontend-only authorization checks, revealing which credential was wrong, missing rate limiting.

### 1-Hour Revision (Full Pass)
Read Chapters 1–9 in full, focusing especially on:
- Chapter 2.8 (JWT deep dive) — most heavily tested topic.
- Chapter 3 (internal working / lifecycles) — asked in almost every mid/senior interview.
- Chapter 9's Advanced Q10–Q12 — system design style questions common at senior/staff level.
- Chapter 7 (common mistakes) — directly maps to "gotcha" interview questions.

---

# Chapter 15 — Common Bugs & How to Debug Them 🐛

| Bug | Why It Happens | How to Debug | Fix |
|---|---|---|---|
| "jwt malformed" error | Token not split correctly, extra whitespace, or `Bearer` prefix accidentally included in the verify call | `console.log` the raw header string before parsing | Ensure `.split(" ")[1]` correctly strips `"Bearer "` |
| Cookie not being sent by browser | Missing `credentials: 'include'` on fetch/axios, or CORS misconfigured (`Access-Control-Allow-Credentials` missing), or `SameSite=Strict` blocking cross-site requests | Check Network tab → Request Headers → is `Cookie` present? | Set `credentials: "include"` client-side + `Access-Control-Allow-Origin` (exact origin, not `*`) + `Access-Control-Allow-Credentials: true` server-side |
| User stays logged in after "logout" | Only clearing client-side token, never invalidating server-side (refresh token DB row, or session store entry) | Check DB/Redis after logout call | Always delete the server-side record, not just the client cookie |
| Random logouts every ~15 min | Access token expiring with no working refresh flow | Check for repeated 401s in Network tab right at the expiry interval | Implement Axios/fetch interceptor for automatic silent refresh on 401 |
| Authorization "leaking" across tenants in multi-tenant app | Queries not scoped by `orgId`/`tenantId` at the database level | Audit every Mongoose query for missing tenant filter | Add `orgId` to every relevant query, ideally enforced via a shared query-builder helper |
| `req.user` is `undefined` in a route | `authenticate` middleware not applied to that route, or applied after route logic runs | Check middleware order in `router.use()`/route definitions | Ensure `authenticate` runs before any route/middleware relying on `req.user` |
| Password comparison always fails after a fresh signup | Hashing the password twice (e.g., once in a pre-save Mongoose hook AND again in the controller) | Log the stored hash length/format immediately after signup | Hash in exactly one place — typically a Mongoose `pre('save')` hook, removed from the controller |

---

# Chapter 16 — Production Interview Stories 🎬

**Story 1 — "The Silent Session Leak"**
*Scenario:* A senior engineer interview presents: "Our app occasionally shows User A's dashboard data to User B for a split second after User B logs in, on a freshly deployed server." What do you check first?

**What a senior engineer expects:** Immediately suspect **shared server-side state that isn't request-scoped** — e.g., a global/module-level variable accidentally caching `currentUser` instead of using `req.user`, or a session store misconfiguration causing session ID collisions, or (in Node specifically) a singleton service unintentionally storing per-request data as instance state instead of passing it through the request context — a classic Node.js concurrency bug since a single Node process serves many concurrent requests on shared memory.

**Story 2 — "The 2 AM Pager Alert"**
*Scenario:* "All users got logged out simultaneously in production at 2 AM. No deploy happened. What are your top three hypotheses?"

**What a senior engineer expects, in priority order:**
1. **JWT secret rotated/changed** (e.g., via a secrets manager rotation policy) without a grace period supporting both old and new secrets — every existing token instantly fails signature verification.
2. **Redis/session store restarted or flushed** (memory-only Redis without persistence, or an eviction policy kicking in under memory pressure), wiping all active sessions.
3. **Clock skew** between servers if using short-lived tokens and a load balancer with multiple instances whose system clocks drifted, causing premature "expired" rejections.

**Story 3 — "The Compliance Audit"**
*Scenario:* "A compliance auditor asks: can you prove exactly who accessed a specific customer's data, and when, for the last 90 days?"

**What a senior engineer expects:** This tests whether authentication/authorization events are **logged with sufficient detail** (userId, timestamp, resource accessed, action, IP) in an **immutable, queryable** audit log — not just `console.log` statements — and retained per compliance requirements. A "no" answer here is a real production gap, and the interviewer is checking if the candidate thinks about auth as an *operational* system, not just a login form.

---

# Chapter 17 — Frequently Asked Interview Questions (Rapid-Fire Bank)

> A calibrated, high-signal set covering the range interviewers actually draw from — organized by level, each with a concise but complete answer. (Full deep-dive treatment of the highest-value subset is in Chapter 9 above.)

### Beginner Rapid-Fire (30)
1. **What is a session?** Server-side record identifying a logged-in user, referenced by a client-held session ID.
2. **What is a cookie?** Small piece of data a server asks the browser to store and resend automatically.
3. **What does HttpOnly mean?** The cookie is inaccessible to JavaScript — mitigates XSS token theft.
4. **What does Secure mean on a cookie?** Cookie is only sent over HTTPS connections.
5. **What is SameSite?** Controls whether a cookie is sent on cross-site requests — mitigates CSRF.
6. **What's a hash function?** A one-way function converting input into a fixed-size, irreversible output.
7. **What's the difference between hashing and encryption?** Hashing is one-way (no decrypt); encryption is two-way (can decrypt with a key).
8. **What is bcrypt?** A slow, salted password-hashing algorithm designed to resist brute-force attacks.
9. **What is a salt?** Random data added before hashing so identical inputs produce different hashes.
10. **What's the purpose of `expiresIn` in `jwt.sign()`?** Sets how long the token remains valid before rejection.
11. **What does `jwt.verify()` return on success?** The decoded payload (claims).
12. **What does `jwt.verify()` throw on an expired token?** A `TokenExpiredError`.
13. **What is `req.user`?** Convention for the currently authenticated user's data, set by auth middleware.
14. **What's a 401 status code?** Unauthorized — not authenticated / missing or invalid credentials.
15. **What's a 403 status code?** Forbidden — authenticated, but lacking permission.
16. **What is MFA?** Multi-Factor Authentication — requiring 2+ different factor categories to log in.
17. **Name the 3 MFA factor categories.** Something you know, have, are.
18. **What is a magic link?** A one-time signed login link sent via email — passwordless authentication.
19. **What is a Bearer token?** A token sent via `Authorization: Bearer <token>` header, granting access to whoever "bears" it.
20. **What's the difference between `Authorization` and `Authentication` header?** There is no "Authentication" header — the standard header for both is `Authorization`, historically named for credential-passing.
21. **What is CORS and how does it relate to auth?** Browser security mechanism controlling cross-origin requests; must be configured correctly to allow cookies (`credentials: include` + matching server headers).
22. **What is a token blocklist?** A stored list of revoked token IDs checked before trusting an otherwise-valid token.
23. **What's the purpose of the `iat` claim?** "Issued at" timestamp — when the token was created.
24. **What's the `sub` claim?** "Subject" — typically the user ID the token represents.
25. **What is a passkey?** A WebAuthn-based, phishing-resistant, passwordless credential tied to a device.
26. **Can you decode a JWT without the secret?** Yes — the payload is just Base64, not encrypted; only *verifying* the signature requires the secret.
27. **What is account lockout?** Temporarily blocking login attempts for an account after repeated failures.
28. **What is rate limiting?** Restricting how many requests a client can make in a time window, to prevent abuse.
29. **What's the risk of a weak JWT secret?** Attackers can brute-force it and forge valid tokens for any user/role.
30. **What is `express-session`'s default store, and why is it dangerous in production?** In-memory store — doesn't scale across processes/servers and leaks memory over time; must be replaced with Redis or similar in production.

### Intermediate Rapid-Fire (25)
31. **Why use `HS256` vs `RS256` for JWT signing?** HS256 uses one shared secret (simple, symmetric); RS256 uses a public/private key pair (asymmetric) — lets you verify tokens without exposing the signing key, useful when multiple services must verify but only one should issue.
32. **What is token introspection?** An endpoint (`/introspect`) where a resource server asks the authorization server whether a given (often opaque) token is still valid — common in OAuth 2.0 setups using opaque tokens instead of JWTs.
33. **What's an opaque token?** A random string with no embedded meaning — must be looked up server-side to resolve identity, unlike a self-contained JWT.
34. **What is PKCE and why does it matter?** Proof Key for Code Exchange — an OAuth 2.0 extension protecting public clients (mobile/SPA apps that can't safely store a client secret) from authorization code interception attacks.
35. **What is the "confused deputy" problem in authorization?** When a privileged component is tricked into misusing its authority on behalf of an attacker — relevant when services blindly trust upstream requests without validating scope.
36. **How do you handle authorization in GraphQL vs REST?** REST typically authorizes per-route/middleware; GraphQL typically authorizes per-resolver or per-field, since a single query can touch many resource types in one request.
37. **What's the risk of embedding roles directly in a JWT?** If a user's role changes mid-session (e.g., demoted), the old token still carries the stale role until it expires or is refreshed.
38. **How would you implement "log out of all devices"?** Bump a `tokenVersion`/`sessionVersion` field on the user record and check it against the token's embedded version on every request; mismatch = reject.
39. **What is CSRF and how do SameSite cookies mitigate it?** Attacker-triggered unwanted requests using the victim's auto-sent cookies; `SameSite=Strict/Lax` stops the cookie from being sent on cross-site requests, breaking the attack.
40. **Why might you choose Redis over MongoDB for session storage?** Redis is in-memory and extremely fast for the high-frequency read/write pattern of session lookups, with built-in TTL/expiry support.
41. **What's the difference between authentication and identity federation?** Federation lets identity established with one provider (e.g., Google) be trusted by another system, without that system managing credentials itself.
42. **What does "least privilege" mean in authorization design?** Grant users/services the minimum permissions needed to perform their task — nothing more by default.
43. **What is a scope in OAuth 2.0?** A defined, granular permission a client requests (e.g., `read:contacts`) — the user consents to specific scopes, not blanket access.
44. **How do you test authorization logic effectively?** Write tests asserting both the "allowed" and "denied" paths explicitly for each role/permission boundary — denial tests are as important as allow tests and often skipped.
45. **What's a JWKS endpoint?** "JSON Web Key Set" — a published endpoint of public keys used to verify RS256-signed tokens without hardcoding keys, common with identity providers like Auth0/Google.
46. **How does token expiry clock skew get handled?** Libraries often allow a small `clockTolerance` (few seconds) to account for minor time drift between servers.
47. **What is impersonation/"login as user" and how do you secure it for support teams?** A privileged admin feature to view the app as another user for debugging — must be heavily audited, restricted to specific roles, and clearly logged/flagged as an impersonated session.
48. **How do microservices typically share authentication trust?** A central API Gateway validates the token once and forwards a trusted internal identity/context to downstream services, avoiding repeated full verification everywhere.
49. **What's the difference between `SameSite=Lax` and `SameSite=Strict`?** `Lax` still allows the cookie on top-level, "safe" cross-site navigations (like clicking a link); `Strict` blocks it in all cross-site contexts.
50. **How would you securely handle "forgot password"?** Generate a short-lived, single-use, signed reset token, email a link containing it, verify + invalidate it upon use, and never reveal whether the submitted email exists in the system.
51. **What is device fingerprinting used for in auth?** Detecting anomalous logins (new device/location) to trigger step-up verification or alerts.
52. **What's the purpose of the `aud` claim in a JWT?** "Audience" — identifies the intended recipient service(s), preventing a token issued for Service A from being replayed against Service B.
53. **What's a common pitfall when verifying JWT algorithm?** Not restricting allowed algorithms in `jwt.verify()`, opening the door to the classic "alg: none" or algorithm-confusion attack (accepting an unsigned or wrongly-keyed token).
54. **How would you rate-limit per-user vs per-IP, and why does it matter?** Per-IP alone fails against distributed attacks and unfairly penalizes shared IPs (offices/NAT); combining per-account and per-IP limits is more robust.
55. **What is "silent authentication" in SSO/OIDC?** Attempting login via a hidden iframe using an existing SSO session cookie, without prompting the user, to seamlessly re-authenticate.

### Advanced Rapid-Fire (20)
56. **How would you migrate an app from session-based to JWT-based auth with zero downtime?** Run both systems in parallel during a transition window — issue both a session and a JWT on login, accept either on incoming requests, monitor JWT adoption, then deprecate sessions once all active clients have migrated.
57. **How do you protect against JWT algorithm confusion attacks (RS256→HS256)?** Explicitly whitelist the accepted algorithm(s) in the verification call rather than trusting the `alg` field from the token itself.
58. **How would you design step-up authentication for high-risk actions?** Track an "authentication level"/timestamp in the session; require fresh re-verification (password/MFA prompt) if the last strong-auth event exceeds a threshold before allowing sensitive actions.
59. **What are the trade-offs of storing sessions in a database vs Redis?** DB is durable but slower for high-frequency reads; Redis is extremely fast with native TTL but typically less durable (though persistence options exist) — most production systems use Redis for the speed/TTL fit.
60. **How would you design zero-downtime JWT secret rotation?** Support verifying against both the old and new secret for an overlap window (or use a JWKS with multiple active keys/kid header), sign new tokens only with the new secret, retire the old one after all outstanding tokens expire.
61. **What's the security implication of long-lived, non-rotating refresh tokens?** A single theft grants an attacker persistent access until manual revocation or the (very long) expiry — rotation reduces this window.
62. **How would you design authorization for a real-time (WebSocket) connection?** Authenticate during the handshake (token in query param/header/cookie), then re-validate authorization on each significant message/subscription, since the initial handshake auth can go stale over a long-lived connection.
63. **What is the "trust boundary" concept in microservice auth, and where should you place it?** The point at which incoming, unverified traffic becomes verified/trusted (typically the API Gateway); everything behind it should treat forwarded identity as trusted but never re-expose the boundary itself.
64. **How does Zero Trust architecture change traditional authentication assumptions?** Removes the assumption that "inside the network = trusted" — every request, internal or external, must be authenticated and authorized, typically via mutual TLS and short-lived credentials.
65. **What's a common failure mode of ABAC systems at scale?** Policy rule complexity grows non-linearly, becoming hard to audit/reason about — often mitigated with a dedicated policy engine (OPA) and strong test coverage of policy combinations.
66. **How would you handle authorization for offline-first mobile apps?** Cache the last known permission set locally with a short trust window, always re-validate critical actions with the server when connectivity returns, and never trust purely client-side cached permissions for irreversible actions.
67. **What is token binding and why does it help?** Cryptographically binding a token to the specific client/TLS connection that requested it, so a stolen token can't be replayed from a different client.
68. **How would you audit an existing authorization system for privilege escalation risks?** Map every route to its required role, cross-check actual middleware application (not just intent), test boundary cases (role changes mid-session, missing checks on newly added routes), and review any place client-supplied data influences an authorization decision.
69. **What's the risk of trusting a `role` claim from a JWT without any freshness check?** A demoted/banned user retains old privileges until token expiry — mitigated with short expiry + server-side freshness checks for highly sensitive actions.
70. **How would you design authentication for machine-to-machine (service) communication?** OAuth 2.0 Client Credentials flow — services authenticate with their own client ID/secret (no user involved) to obtain a scoped access token for service-to-service calls.


# Chapter 18 — Company-Specific Interview Questions

### 🟦 Google-Style
- *"Design the authentication system for a product with 1 billion users across web, mobile, and smart-TV clients."* — Tests: multi-platform token strategy, OIDC federation, scale-first thinking, key rotation at scale.
- *"How would you detect and stop credential-stuffing attacks in real time?"* — Tests: rate limiting, anomaly detection, device/IP risk scoring.

### 🟦 Microsoft-Style
- *"Walk me through how Azure AD (Entra ID) style SSO would integrate with a third-party enterprise app."* — Tests: SAML/OIDC federation knowledge, enterprise IdP concepts.
- *"How do you handle authorization for a hierarchical org structure (company → department → team)?"* — Tests: nested RBAC/ABAC design.

### 🟦 Amazon-Style
- *"Design least-privilege IAM-style access control for internal microservices."* — Tests: service-to-service auth, scoped policies, principle of least privilege.
- *"A payment endpoint needs stronger auth than a profile-read endpoint. How do you design that?"* — Tests: step-up authentication, risk-based auth.

### 🟦 Meta-Style
- *"Design authentication for a product handling both personal accounts and Business/Page accounts with different permission models."* — Tests: multi-entity authorization design, RBAC+ABAC hybrid.
- *"How would you prevent session fixation attacks in a login flow?"* — Tests: security depth (regenerate session ID after login, never reuse pre-auth session ID).

### 🟦 Netflix-Style
- *"Design device-level session management — a user should be able to see and revoke access from any of their 5 logged-in devices individually."* — Tests: per-device refresh token tracking, granular revocation UI backing.
- *"How would you handle authentication across regional server clusters with minimal latency?"* — Tests: stateless JWT rationale, distributed system trade-offs.

### 🟦 Modern Startup-Style
- *"We have 2 weeks to ship auth for our MVP — walk me through your exact implementation plan."* — Tests: pragmatism, prioritization (JWT + bcrypt + basic RBAC is usually the right MVP scope, deferring MFA/SSO), awareness of what NOT to over-engineer early.
- *"A customer reports their account was compromised — walk me through your incident response."* — Tests: practical ops maturity (force logout via token versioning, force password reset, review audit logs, notify user).
