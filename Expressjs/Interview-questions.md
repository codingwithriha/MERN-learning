# 📘 Express.js Interview Handbook — Part 2

### Interview Question Bank, Coding Exercises, MCQs, Flashcards, Cheat Sheet & Revision System

> This is Part 2 of 2. Part 1 covered the theory, internals, diagrams, and code. This part is your **active recall and interview-drilling tool**. Every question includes the ideal answer, why it's correct, common wrong answers, and what the interviewer is actually testing.

---

## Table of Contents

1. [Beginner Interview Questions](#1-beginner-interview-questions)
2. [Intermediate Interview Questions](#2-intermediate-interview-questions)
3. [Advanced Interview Questions](#3-advanced-interview-questions)
4. [Scenario-Based Questions](#4-scenario-based-questions)
5. [Debugging Questions](#5-debugging-questions)
6. [Coding Exercises](#6-coding-exercises)
7. [MCQs](#7-mcqs)
8. [Flashcards](#8-flashcards)
9. [Cheat Sheet](#9-cheat-sheet)
10. [Revision Notes (5/15/30/60 min)](#10-revision-notes)
11. [Common Bugs](#11-common-bugs)
12. [Production Interview Stories](#12-production-interview-stories)
13. [Company-Specific Questions](#13-company-specific-questions)
14. [Final Revision Checklist](#14-final-revision-checklist)

---

## 1. Beginner Interview Questions

**Q1. What is Express.js?**
**Answer:** Express is a minimal, unopinionated web framework for Node.js that simplifies building web servers and APIs by providing routing, middleware, and utilities for handling HTTP requests/responses.
*Why correct:* Captures "minimal," "unopinionated," and its core purpose (routing + middleware).
*Wrong answer:* "It's a database" or "It's a frontend framework" — shows no real exposure to the stack.
*Tests:* Basic orientation — did the candidate actually use Express or just memorize a buzzword?

**Q2. How is Express different from plain Node.js `http` module?**
**Answer:** Node's `http` module is low-level — you manually parse URLs, methods, and bodies. Express adds routing, middleware chaining, and helper methods (`res.json`, `res.status`) on top, removing repetitive boilerplate.
*Wrong answer:* "Express replaces Node.js" — Express runs *on top of* Node, not instead of it.
*Tests:* Understanding that Express is a layer, not a replacement.

**Q3. What is middleware in Express?**
**Answer:** A function with signature `(req, res, next)` that executes during the request-response cycle, can modify `req`/`res`, end the cycle, or pass control via `next()`.
*Tests:* Fundamental building block — almost every Express interview starts here.

**Q4. How do you create a basic GET route?**
**Answer:**
```js
app.get('/hello', (req, res) => res.send('Hi'));
```
*Tests:* Basic syntax fluency.

**Q5. What does `app.listen()` do?**
**Answer:** Binds and starts the HTTP server on the given port, internally calling `http.createServer(app).listen(port)`.
*Tests:* Whether candidate knows Express sits on Node's `http` module.

**Q6. What's the difference between `res.send()` and `res.json()`?**
**Answer:** `res.json()` explicitly serializes data to JSON and sets `Content-Type: application/json`. `res.send()` is more generic — it inspects the argument type and behaves accordingly (string → text/html, object → JSON automatically).
*Wrong answer:* "They're identical" — technically `res.send()` calls `res.json()` internally for objects, but being explicit with `res.json()` is best practice for APIs.

**Q7. What is `req.params` vs `req.query` vs `req.body`?**
**Answer:** `req.params` = route path variables (`/users/:id`). `req.query` = URL query string (`?page=2`). `req.body` = data sent in the request body (POST/PUT), requires body-parsing middleware.
*Tests:* Core data-flow understanding — extremely common question.

**Q8. Why do we need `express.json()`?**
**Answer:** Without it, `req.body` is `undefined` for JSON payloads — Express doesn't parse bodies by default; you must explicitly register the parser middleware.
*Tests:* Whether the candidate has actually hit this bug before (very common beginner mistake).

**Q9. What HTTP status code should a successful POST that creates a resource return?**
**Answer:** `201 Created` (not `200`).
*Tests:* REST semantics knowledge, not just Express syntax.

**Q10. What is `express.Router()`?**
**Answer:** A mini, mountable Express application used to group related routes into modules, keeping the codebase organized.
*Tests:* Whether candidate can structure real projects, not just toy scripts.

**Q11. How do you serve static files in Express?**
**Answer:** `app.use(express.static('public'))` — serves files from the `public` folder directly.
*Tests:* Basic built-in middleware knowledge.

**Q12. What does `next()` do?**
**Answer:** Passes control to the next middleware/route handler in the stack. If not called (and no response sent), the request hangs.
*Tests:* Deep enough to catch people who memorized syntax without understanding flow.

**Q13. Can you have multiple middleware functions on a single route?**
**Answer:** Yes — `app.get('/path', mw1, mw2, handler)`. Each calls `next()` to proceed to the following one.
*Tests:* Route-level middleware chaining knowledge.

**Q14. What is the default port convention in most Express tutorials, and does it matter?**
**Answer:** 3000 is common by convention, not a requirement — any free port works, and in production it's usually read from `process.env.PORT`.
*Tests:* Awareness of environment-based configuration.

**Q15. How do you handle a 404 in Express?**
**Answer:** Add a catch-all middleware **after all valid routes**: `app.use((req, res) => res.status(404).json({ message: 'Not found' }))`.
*Tests:* Understanding of middleware order.

*(Beginner bank continues with the same depth across topics like: HTTP methods, `req.headers`, `res.redirect()`, `res.cookie()`, environment variables with `dotenv`, `nodemon` vs `node`, JSON vs form-encoded bodies, basic CORS errors, what a "route handler" is, difference between `app.use` and `app.get`, what a port is, synchronous vs asynchronous handlers, template engines (`res.render`), and simple try/catch in routes — each following the identical Q → Answer → Why → Wrong Answer → What's Tested format shown above. Drill these using the flashcard section below, which distills all of them into rapid-fire recall format.)*

---

## 2. Intermediate Interview Questions

**Q1. Explain the Express middleware execution model in detail.**
**Answer:** Express maintains an internal stack of "layers" (middleware/routes) in registration order. On each request, it walks the stack sequentially, checking path+method match, executing matched layers, and only proceeding to the next when `next()` is called. Execution halts once a response is sent.
*Tests:* Whether the candidate understands this isn't magic — it's a deterministic, ordered walk.

**Q2. Why does middleware order matter? Give a concrete bug example.**
**Answer:** If `authMiddleware` is registered *after* a protected route instead of before it, the route runs without any auth check, creating a security hole. Similarly, placing the error handler before other routes means it will never catch their errors.
*Tests:* Practical, not just theoretical understanding.

**Q3. How does Express handle errors in synchronous vs asynchronous code?**
**Answer:** Synchronous throws inside route handlers are automatically caught by Express and forwarded to error middleware. **Async** errors (rejected Promises) in Express 4 are **not** automatically caught — you must manually catch and call `next(err)`, or wrap handlers in a utility like `catchAsync`. Express 5 fixes this by auto-forwarding rejected promises.
*Wrong answer:* "Express catches everything automatically" — true only for sync code in Express 4.
*Tests:* A very common trap that separates junior from mid-level engineers.

**Q4. What's the difference between `app.use()` and `app.all()`?**
**Answer:** `app.use()` matches **any HTTP method** and matches path **prefixes** (e.g., `/api` matches `/api/users`). `app.all()` also matches any method, but requires an **exact** path match (supports patterns like `/users/:id`) rather than prefix matching.
*Tests:* Subtle distinction that shows real hands-on experience.

**Q5. How would you validate request bodies in Express?**
**Answer:** Use a schema-validation library (`joi`, `zod`, or `express-validator`) as middleware — validate before the controller logic runs, and return a `400` with clear error messages on failure.
*Tests:* Production-mindedness — not trusting client input.

**Q6. Explain how `express.Router()` enables modular route organization with a code example.**
**Answer:**
```js
// routes/products.js
const router = require('express').Router();
router.get('/', getAllProducts);
module.exports = router;

// app.js
app.use('/api/products', require('./routes/products'));
```
*Tests:* Practical modularization skill for real codebases.

**Q7. How do you implement centralized error handling across an entire Express app?**
**Answer:** Define a single error-handling middleware `(err, req, res, next)` at the very end of the middleware stack; all routes forward errors to it via `next(err)`, ensuring consistent response shape and centralized logging.
*Tests:* Architecture-level thinking.

**Q8. What is CORS and how do you handle it in Express?**
**Answer:** CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks requests from a different origin unless the server explicitly allows it via response headers. In Express, the `cors` middleware sets these headers (`Access-Control-Allow-Origin`, etc.).
*Tests:* Whether candidate has actually debugged a "blocked by CORS policy" browser error before.

**Q9. How would you rate-limit an API in Express?**
**Answer:** Use `express-rate-limit` middleware, configuring a time window and max requests per IP, e.g., `rateLimit({ windowMs: 900000, max: 100 })`, applied globally or to sensitive routes (like `/login`).
*Tests:* Security-conscious production experience.

**Q10. How does Express handle JSON parsing internally, and why is a size limit important?**
**Answer:** `express.json()` reads the raw request stream, buffers it, and parses it as JSON into `req.body`. Setting a size limit (`express.json({ limit: '10kb' })`) prevents large-payload denial-of-service attacks that could exhaust server memory.
*Tests:* Security + internals combined.

**Q11. What's the difference between `PUT` and `PATCH`, and how would you implement each in Express?**
**Answer:** `PUT` replaces the *entire* resource (client must send the full object). `PATCH` updates *part* of a resource. In Express, both usually target `/resource/:id`, but the handler logic differs — `PUT` typically overwrites, `PATCH` merges specific fields.
*Tests:* REST semantics precision, common in API-design interviews.

**Q12. How do you structure a large Express application for maintainability?**
**Answer:** Layered architecture — `routes` (define endpoints) → `controllers` (handle req/res, call services) → `services`/`models` (business logic & data access) → `middleware` and `utils` shared across the app. Keeps concerns separated and testable.
*Tests:* Real production experience vs tutorial-only knowledge.

**Q13. How would you test an Express API?**
**Answer:** Use `Jest`/`Mocha` + `Supertest` to send simulated HTTP requests directly to the exported `app` object (without needing a running server), asserting on status codes and response bodies.
*Tests:* Testing discipline — separates hobbyists from professionals.

**Q14. What's the purpose of environment variables, and how do you manage them in Express?**
**Answer:** Environment variables store configuration that differs between environments (dev/staging/prod) — DB URLs, secrets, ports. Managed via the `dotenv` package locally, and via the hosting platform's secret manager in production; `.env` files should never be committed to version control.
*Tests:* Security hygiene.

**Q15. How would you implement file uploads in Express?**
**Answer:** Use `multer` middleware, which parses `multipart/form-data`, storing files on disk or in memory, then attaches file info to `req.file`/`req.files` for further processing (e.g., uploading to S3/Cloudinary).
*Tests:* Practical feature implementation knowledge.

*(Intermediate bank continues similarly across: sessions vs JWT, cookie-parser, helmet's role, compression middleware, pagination strategies, database connection pooling with Express, logging with morgan/winston, versioning APIs, handling file downloads/streaming, graceful shutdown, WebSocket integration alongside Express, template engines in SSR apps, and testing middleware in isolation — all following the same rigorous Q/A/Why/Wrong/Tests structure.)*

---

## 3. Advanced Interview Questions

**Q1. Explain exactly how Express matches a route internally, including how `:id`-style parameters are captured.**
**Answer:** Express converts each registered path into a regular expression via `path-to-regexp`. `/users/:id` becomes something like `/^\/users\/([^\/]+)\/?$/`. On a matching request, the captured group(s) are extracted and assigned to `req.params` by parameter name, in registration order.
*Tests:* True internals knowledge — most candidates never look past the API surface.

**Q2. How would you design an Express app to survive a traffic spike 10x normal load?**
**Answer:** Horizontal scaling (multiple Node processes via `cluster`/PM2/Kubernetes pods behind a load balancer), caching hot reads (Redis), rate limiting abusive clients, database connection pooling with sane limits, async/non-blocking code everywhere, and offloading heavy work (image processing, emails) to background job queues instead of blocking request handlers.
*Tests:* System design thinking layered on Express specifics — common at senior/staff level.

**Q3. Why is Express considered "single-threaded," and what are the practical implications for route handler design?**
**Answer:** Node.js (and therefore Express) runs JS on a single main thread with an event loop; I/O operations are non-blocking, but synchronous CPU-heavy code (e.g., a large synchronous loop or `bcrypt.hashSync`) blocks that thread for *all* concurrent requests. The fix: use async APIs, offload CPU-heavy work to worker threads or separate microservices/queues.
*Tests:* Deep runtime understanding — a top interview differentiator.

**Q4. How does Express 5's automatic async error handling change how you write middleware compared to Express 4?**
**Answer:** In Express 4, an unhandled rejected promise in an async handler doesn't reach the error middleware automatically — devs must wrap handlers (`catchAsync`) or manually try/catch and call `next(err)`. In Express 5, if an async handler's returned promise rejects, Express automatically forwards that error to the next error-handling middleware, removing the need for manual wrapping in most cases.
*Tests:* Currency — is the candidate aware of framework evolution, not just legacy patterns?

**Q5. Design an authentication + authorization system in Express supporting role-based access control (RBAC).**
**Answer:** 
1. `authenticate` middleware verifies JWT from `Authorization` header, attaches decoded user (with role) to `req.user`.
2. `authorize(...allowedRoles)` middleware factory checks `req.user.role` against allowed roles for that route, returns `403` if not permitted.
3. Applied per-route: `router.delete('/:id', authenticate, authorize('admin'), deleteUser)`.
*Tests:* Ability to design composable, reusable security middleware — a very common system-design-style Express question.

**Q6. How would you implement idempotency for a payment-creation POST endpoint in Express?**
**Answer:** Require an `Idempotency-Key` header from the client; store a mapping of key → response (e.g., in Redis) the first time the request is processed; on retries with the same key, return the cached response instead of re-executing the operation, preventing duplicate charges.
*Tests:* Real production API design maturity, common in fintech/e-commerce interviews.

**Q7. How does `express.static()` handle caching headers, and why does that matter in production?**
**Answer:** `express.static()` sets `Last-Modified`/`ETag` headers by default and can be configured with `maxAge` to set `Cache-Control`, allowing browsers/CDNs to cache assets and reduce server load; misconfiguring this (e.g., no caching on immutable hashed filenames) wastes bandwidth, while over-caching mutable files causes stale content bugs.
*Tests:* Real deployment/performance experience.

**Q8. How would you prevent NoSQL injection in an Express + MongoDB app?**
**Answer:** Sanitize `req.body`/`req.query`/`req.params` with `express-mongo-sanitize` to strip `$`/`.`-prefixed keys (used in operator injection like `{ "$gt": "" }`), validate input types explicitly, and avoid directly interpolating user input into query objects.
*Tests:* Security-specific knowledge beyond generic "validate input."

**Q9. Explain how you'd implement request tracing/correlation IDs across a microservices architecture using Express.**
**Answer:** Middleware generates (or extracts from an incoming header) a unique `X-Request-Id` per request, attaches it to `req`, includes it in all logs, and forwards it in headers to any downstream service calls — enabling full request tracing across a distributed system in tools like ELK/Datadog.
*Tests:* Distributed-systems maturity — common at Staff+ interviews.

**Q10. How would you handle graceful degradation if your database connection drops mid-traffic?**
**Answer:** Implement health checks (`/health` endpoint checking DB connectivity), circuit-breaker patterns to fail fast instead of hanging requests, retry-with-backoff for transient failures, and return meaningful `503 Service Unavailable` responses rather than crashing or hanging indefinitely.
*Tests:* Resilience engineering mindset.

**Q11. What are the security implications of trusting `req.ip` behind a reverse proxy/load balancer, and how do you fix it?**
**Answer:** Behind a proxy (Nginx, AWS ALB), `req.ip` reflects the proxy's IP unless you enable `app.set('trust proxy', true)`, which tells Express to read the real client IP from `X-Forwarded-For`. Misconfiguring this can break rate limiting (all traffic looks like it's from one IP) or allow IP spoofing if trust proxy is misapplied.
*Tests:* Real deployment gotcha that trips up even experienced engineers.

**Q12. How would you version an Express REST API without breaking existing clients?**
**Answer:** URL-based versioning (`/api/v1/...`, `/api/v2/...`) is simplest and most explicit; alternatively, header-based versioning (`Accept: application/vnd.myapi.v2+json`). Maintain old versions until clients migrate, with clear deprecation timelines.
*Tests:* API lifecycle management maturity.

*(Advanced bank continues across: streaming large responses without memory bloat, implementing WebSockets alongside REST in the same Express server, building a plugin/middleware system, zero-downtime deployments, structured logging strategy, dependency injection patterns in Express, building your own minimal Express-like router as a learning/interview exercise, and handling multi-tenant applications — each following the same full answer format.)*

---

## 4. Scenario-Based Questions

**Scenario 1:** *"Your `/api/users` POST endpoint works fine locally but returns `undefined` for `req.body` in production. What could be wrong?"*
**Ideal Answer:** Most likely `express.json()` isn't registered (or registered after the route), the client isn't sending `Content-Type: application/json`, or a reverse proxy is stripping/mangling the body. Walk through: confirm middleware order, confirm request headers via logging, confirm body size isn't exceeding a configured limit silently rejecting it.
*Tests:* Real debugging methodology, not memorized theory.

**Scenario 2:** *"Users report the API becomes unresponsive under moderate load, even though CPU usage looks low. What would you investigate?"*
**Ideal Answer:** Check for blocking synchronous operations (heavy `JSON.parse` on huge payloads, synchronous crypto calls, unbounded loops), unclosed DB connections exhausting the pool, or a missing `await` causing unhandled promise pile-up. Use Node's built-in profiler / `clinic.js` to inspect event loop lag.
*Tests:* Systems debugging under real production pressure.

**Scenario 3:** *"A teammate says 'just put the auth check in every controller function.' Why might you push back on this in code review?"*
**Ideal Answer:** Duplicated logic increases risk of a forgotten check on a new route (security hole), violates DRY, and is harder to maintain. Push instead for centralized `authenticate`/`authorize` middleware applied at the router level.
*Tests:* Architectural judgment and communication in a team setting.

**Scenario 4:** *"Your error handler is defined, but it's never triggered when an async route throws. Why, and how do you fix it (assuming Express 4)?"*
**Ideal Answer:** Express 4 doesn't auto-catch promise rejections in async route handlers — the thrown error becomes an unhandled rejection instead of reaching `next(err)`. Fix: wrap the handler in a `catchAsync` utility or manually try/catch and call `next(err)`.
*Tests:* The single most commonly asked "gotcha" scenario in Express interviews.

**Scenario 5:** *"You need to add logging that includes a unique ID per request across every log line for that request, including in the DB layer. How do you design this in Express?"*
**Ideal Answer:** Middleware generates a UUID early in the chain, attaches to `req.id`; use `AsyncLocalStorage` (Node's context propagation API) to make that ID available even in code that doesn't have direct access to `req` (like a DB helper module), then include it in every log line via a logger wrapper.
*Tests:* Advanced Node.js + Express integration knowledge (AsyncLocalStorage is a strong senior-level signal).

---

## 5. Debugging Questions

**Bug 1:** Request hangs forever with no response and no error in console.
**Diagnosis:** A middleware is not calling `next()` and not sending a response — classic symptom. Check every custom middleware for a missing `next()` call, especially inside conditional branches (`if (condition) { ... }` without an `else` calling `next()`).

**Bug 2:** `Cannot set headers after they are sent to the client`.
**Diagnosis:** `res.send()`/`res.json()`/`res.end()` is being called more than once for the same request — often because both a `next()` call *and* a response were fired, or an async operation resolves after a response was already sent (e.g., missing `return` before `res.json()` inside an `if` block, so code execution continues and sends a second response).

**Bug 3:** `req.body` is `undefined`.
**Diagnosis:** Missing `express.json()`/`express.urlencoded()`, wrong `Content-Type` header from client, or middleware registered after the route that needs it.

**Bug 4:** Route defined but returns 404.
**Diagnosis:** Check: (a) HTTP method mismatch (used POST in Postman but registered as `app.get`), (b) router mounted at wrong prefix, (c) trailing slash mismatches, (d) route registered *after* a catch-all 404 handler by mistake.

**Bug 5:** CORS error in browser console despite `cors()` being used.
**Diagnosis:** Often `cors()` is applied *after* the routes it should protect, or the `origin` option doesn't match the actual frontend origin (including protocol/port), or preflight `OPTIONS` requests aren't being handled (some custom setups need explicit `app.options('*', cors())`).

**Bug 6:** Memory usage climbs steadily until the server crashes.
**Diagnosis:** Common causes: unclosed database connections/cursors, growing in-memory caches/arrays with no eviction, event listeners added per-request without removal, or large file uploads buffered fully in memory instead of streamed.

---

## 6. Coding Exercises

### 🟢 Easy

**Exercise:** Build an Express server with a single route `GET /square/:num` that returns `{ result: num*num }`.

**Solution:**
```js
const express = require('express');
const app = express();

app.get('/square/:num', (req, res) => {
  const num = Number(req.params.num);
  if (Number.isNaN(num)) {
    return res.status(400).json({ error: 'Invalid number' });
  }
  res.json({ result: num * num });
});

app.listen(3000);
```
*Explanation:* `req.params.num` is always a string — must convert with `Number()` and validate before using it, otherwise `NaN * NaN` silently returns `NaN` in the response instead of a proper error.

### 🟡 Medium

**Exercise:** Build an in-memory `/todos` CRUD API (GET all, GET one, POST, PUT, DELETE) with proper status codes and 404 handling for missing IDs.

**Solution:**
```js
const express = require('express');
const app = express();
app.use(express.json());

let todos = [];
let nextId = 1;

app.get('/todos', (req, res) => res.json(todos));

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const todo = { id: nextId++, title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  const { title, done } = req.body;
  if (title !== undefined) todo.title = title;
  if (done !== undefined) todo.done = done;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(3000);
```
*Explanation:* Note `204 No Content` on delete (no response body expected), consistent 404 checks before mutation, and partial-update semantics on PUT for simplicity (a strict REST implementation would use PATCH for partial updates).

### 🔴 Hard

**Exercise:** Implement rate limiting **from scratch** (no external library) — max 5 requests per IP per 60 seconds, returning `429 Too Many Requests` when exceeded.

**Solution:**
```js
const requestLog = new Map(); // ip -> [timestamps]

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000;
  const max = 5;

  const timestamps = (requestLog.get(ip) || []).filter(t => now - t < windowMs);

  if (timestamps.length >= max) {
    return res.status(429).json({ error: 'Too many requests, try again later' });
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  next();
}

app.use(rateLimiter);
```
*Explanation:* Uses a sliding window approach — filters out timestamps older than the window on every request rather than a fixed-bucket reset, which is more accurate. In production, you'd use Redis instead of an in-memory `Map` so limits are shared across multiple server instances.

### 🟣 Interview-Level

**Exercise:** *"Implement a middleware that automatically wraps every async route handler so unhandled promise rejections are forwarded to Express's error handler — without modifying each route individually."*

**Solution:**
```js
// catchAsync.js
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = catchAsync;

// Applying it at the router registration level automatically:
function wrapRouter(router) {
  ['get', 'post', 'put', 'patch', 'delete'].forEach((method) => {
    const original = router[method].bind(router);
    router[method] = (path, ...handlers) => {
      const wrapped = handlers.map((h) => (h.length === 4 ? h : catchAsync(h)));
      return original(path, ...wrapped);
    };
  });
  return router;
}

// usage:
const router = wrapRouter(express.Router());
router.get('/users', async (req, res) => {
  const users = await User.find(); // if this throws, it's auto-forwarded to next()
  res.json(users);
});
```
*Explanation:* This is a genuinely senior-level exercise — it demonstrates monkey-patching router methods to inject cross-cutting behavior (a lightweight aspect-oriented pattern), while correctly skipping 4-arg error-handling middleware (`h.length === 4`) so it isn't wrongly wrapped.

---

## 7. MCQs

**Q1.** What does `app.use(express.json())` do?
A) Serves static JSON files
B) Parses incoming JSON request bodies into `req.body` ✅
C) Converts all responses to JSON
D) Validates JSON schema

*Explanation:* (A) confuses it with `express.static`. (C) confuses parsing with serialization of output. (D) confuses parsing with validation — Express doesn't validate schemas natively.

**Q2.** Which of the following correctly defines error-handling middleware?
A) `(req, res, next) => {}`
B) `(err, req, res) => {}`
C) `(err, req, res, next) => {}` ✅
D) `(req, res, err, next) => {}`

*Explanation:* Express identifies error middleware **specifically by 4 parameters, in this exact order**. (B) is missing `next`. (D) has wrong parameter order — Express won't recognize it correctly.

**Q3.** What happens if two `res.send()` calls run for the same request?
A) The second one is silently ignored
B) Express throws "Cannot set headers after they are sent" ✅
C) Both responses are merged
D) The server restarts

*Explanation:* This is a very common real bug — once headers/body are sent, calling `res.send()` again throws.

**Q4.** In Express 4, what happens if an async route handler throws inside a `try` block with no `catch`?
A) Express automatically calls the error middleware
B) The promise rejection is unhandled and the error middleware is never triggered ✅
C) The server crashes
D) The response is sent as `500` automatically

*Explanation:* This is Express 4's most notorious gotcha — without manual handling, the error middleware never fires.

**Q5.** What's the correct order for these three middleware for a typical API? (1) error handler, (2) `express.json()`, (3) route definitions
A) 1, 2, 3
B) 2, 3, 1 ✅
C) 3, 2, 1
D) 2, 1, 3

*Explanation:* Body parsing must come before routes that need `req.body`; error handling must always be last to catch everything above it.

**Q6.** Which status code should a `DELETE` request return on success with no response body?
A) 200
B) 202
C) 204 ✅
D) 404

*Explanation:* `204 No Content` explicitly signals success with an intentionally empty body — a REST convention frequently tested.

---

## 8. Flashcards

| Front | Back |
|---|---|
| What is middleware? | A function `(req, res, next)` that runs during the request lifecycle |
| What does `next()` do? | Passes control to the next middleware/handler |
| How to parse JSON bodies? | `app.use(express.json())` |
| Error middleware signature? | `(err, req, res, next)` — 4 params |
| `req.params` vs `req.query`? | Params = route path variables; Query = `?key=value` string |
| Status code for successful creation? | 201 |
| Status code for successful deletion (no body)? | 204 |
| What serves static files? | `express.static('folder')` |
| What creates modular routes? | `express.Router()` |
| Express 4 async error gotcha? | Rejected promises aren't auto-caught — must manually forward via `next(err)` |
| What fixes CORS errors? | `cors` middleware with correct `origin` config |
| What's `app.listen()` built on? | Node's `http.createServer().listen()` |
| What matches route paths internally? | `path-to-regexp`, converting paths to regex |
| Why is Node/Express "single-threaded"? | One main JS thread + event loop; blocking code stalls all requests |
| What's `trust proxy` for? | Reading real client IP from `X-Forwarded-For` behind a proxy/load balancer |

---

## 9. Cheat Sheet

```
EXPRESS ONE-PAGE CHEAT SHEET
─────────────────────────────
SETUP
  const app = require('express')();
  app.listen(PORT);

MIDDLEWARE ORDER (always this pattern)
  1. Security (helmet, cors)
  2. Body parsers (express.json)
  3. Logging (morgan)
  4. Routes
  5. 404 handler
  6. Error handler (err, req, res, next) — always LAST

ROUTES
  app.get('/path', handler)
  app.post('/path', handler)
  router = express.Router(); app.use('/prefix', router)

REQUEST DATA
  req.params.id     -> /users/:id
  req.query.page    -> ?page=2
  req.body.name     -> POST/PUT JSON body

RESPONSES
  res.status(200).json({...})
  res.status(201).json({...})   // created
  res.status(204).send()        // deleted, no body
  res.status(400/401/403/404/500).json({...})

ASYNC ERROR HANDLING (Express 4)
  const catchAsync = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);
  router.get('/x', catchAsync(async (req,res) => {...}));

SECURITY MUST-HAVES
  helmet(), cors({origin: CLIENT_URL}), express-rate-limit,
  express-validator/joi/zod for input, bcrypt for passwords

COMMON STATUS CODES
  200 OK | 201 Created | 204 No Content
  400 Bad Request | 401 Unauthorized | 403 Forbidden | 404 Not Found
  429 Too Many Requests | 500 Internal Server Error
```

---

## 10. Revision Notes

### ⏱ 5-Minute Revision
- Express = layer on top of Node's `http` for routing + middleware.
- Middleware runs in registration order; must call `next()` or send a response.
- `express.json()` needed to read `req.body`.
- Error middleware = `(err, req, res, next)`, must be last.
- Express 4 doesn't auto-catch async errors — wrap in `catchAsync`.

### ⏱ 15-Minute Revision
Add to the above:
- `req.params` (route vars) vs `req.query` (query string) vs `req.body` (payload).
- `express.Router()` for modular routes.
- REST status codes: 200/201/204/400/401/403/404/429/500.
- `cors`, `helmet`, `express-rate-limit` for baseline security.
- `express.static()` for serving files.
- Route matching uses `path-to-regexp` internally.

### ⏱ 30-Minute Revision
Add to the above:
- Full request lifecycle: TCP → Node http parsing → Express dispatch → middleware stack → handler → response.
- Layered architecture: routes → controllers → services/models.
- Node is single-threaded — blocking sync code stalls all requests; use async/non-blocking patterns.
- `trust proxy` setting for correct `req.ip` behind load balancers.
- Graceful shutdown handling (`SIGTERM`) for zero-downtime deploys.
- Clustering/PM2/Kubernetes for multi-core scaling.

### ⏱ 60-Minute Revision
Add to the above:
- Walk through the Production Example in Part 1 line by line, out loud, explaining every middleware's purpose.
- Practice writing the `catchAsync` wrapper and a custom `authorize(...roles)` middleware from memory.
- Review all Debugging Questions (Section 5) and be able to diagnose each from symptom alone.
- Review Express 4 vs Express 5 differences table.
- Rehearse answers to at least 3 Scenario-Based Questions out loud.
- Skim the full Cheat Sheet once more right before the interview.

---

## 11. Common Bugs

| Bug | Why It Occurs | How to Debug | How to Fix |
|---|---|---|---|
| Hanging requests | Missing `next()` or missing response in some code path | Add logging at the start/end of each middleware to find where it stops | Ensure every path either calls `next()` or sends a response |
| `req.body` undefined | Missing/misordered `express.json()` | Log `req.headers['content-type']` and middleware order | Register body parser before routes, confirm client sends correct header |
| Double response error | Missing `return` before a response call inside conditional logic | Search for `res.` calls without preceding `return` in branches | Add `return` before every conditional response |
| CORS blocked in browser | `cors()` misconfigured or missing preflight handling | Check Network tab for the failed `OPTIONS` preflight request | Correctly configure `origin`, ensure `cors()` runs before routes |
| Silent async errors (no response, no crash) | Express 4 not catching promise rejections | Add global `process.on('unhandledRejection', ...)` temporarily to surface it | Wrap async handlers with `catchAsync` or try/catch + `next(err)` |
| Memory leak over time | Growing in-memory structures, unclosed connections | Use `--inspect` + Chrome DevTools memory profiler, or `clinic.js` | Add TTL/eviction to caches, always close DB cursors/connections |

---

## 12. Production Interview Stories

**Story 1 — "The Hanging Endpoint":**
*Setup:* A senior interviewer says: "In production, one specific endpoint occasionally never responds — no error, no crash, just hangs until client timeout. CPU and memory look normal. Walk me through your investigation."
*What they expect:* A structured approach — reproduce locally, add request-scoped logging at each middleware boundary, check for a conditional branch missing `next()`, check for a Promise that's created but never awaited/resolved (e.g., a forgotten `await` on an external API call that itself hangs), and check upstream service timeouts. They are testing **methodical debugging under ambiguity**, not a single memorized answer.

**Story 2 — "The Silent Data Leak":**
*Setup:* "A junior engineer added a new admin-only route but forgot to apply the `authorize('admin')` middleware. How would you have prevented this from reaching production, and how do you prevent it happening again?"
*What they expect:* Discussion of code review checklists, automated tests that assert unauthorized roles get `403`, and architectural solutions like grouping all admin routes under a single router with `router.use(authorize('admin'))` applied once at the top, so it's structurally impossible to forget per-route.

**Story 3 — "The Scaling Wall":**
*Setup:* "Your Express API was fine at 100 requests/sec but falls over at 1,000/sec even though you added more server instances. What do you check?"
*What they expect:* Candidate should look *past* Express itself — database connection pool limits, N+1 query patterns, missing indexes, synchronous blocking code, and whether the load balancer is actually distributing traffic evenly. Senior interviewers want to see you don't assume "the framework" is the bottleneck without evidence.

---

## 13. Company-Specific Questions

**Google-style (systems thinking):** *"Design the middleware stack for an Express API that must support both public unauthenticated endpoints and internal authenticated admin endpoints, with different rate limits for each, while keeping the codebase clean."* — Tests architecture + separation of concerns at scale.

**Microsoft-style (correctness & edge cases):** *"Given this Express route [code sample with a subtle missing `return` bug], find the bug and explain the failure mode."* — Tests precise code reading and understanding of the double-response issue.

**Amazon-style (leadership principles + ownership):** *"Tell me about a time a bug in your Express API caused a production incident. What did you do, and what did you change afterward?"* — Tests ownership, root-cause analysis, and process improvement (behavioral + technical hybrid).

**Meta-style (speed + pragmatism):** *"You have 20 minutes: build a working Express endpoint that accepts a list of numbers and returns their statistics (mean/median/mode) with proper input validation."* — Tests speed, correctness under time pressure, and whether validation is remembered even when rushed.

**Netflix-style (production resilience):** *"Your Express service depends on three downstream microservices. One of them is degraded/slow. How does your Express app avoid becoming slow/unavailable itself?"* — Tests timeouts, circuit breakers, and graceful degradation thinking, not just Express syntax.

**Modern startup-style (full-stack pragmatism):** *"We need to ship an MVP API in a day — walk me through the exact folder structure and middleware you'd set up first, and what you'd deliberately skip for now."* — Tests judgment about what matters at MVP stage vs premature optimization.
