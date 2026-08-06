# 🌐 REST APIs Interview Handbook
### The Complete Beginner-to-Staff-Engineer Reference & Interview Preparation Guide


## 📖 Table of Contents

1. [Introduction to REST APIs](#1-introduction-to-rest-apis)
2. [Core Concepts](#2-core-concepts)
3. [Internal Working / Request-Response Architecture](#3-internal-working--request-response-architecture)
4. [Visual Diagrams](#4-visual-diagrams)
5. [Code Examples (Simple → Production)](#5-code-examples)
6. [Real World Usage](#6-real-world-usage)
7. [Best Practices](#7-best-practices)
8. [Common Beginner Mistakes](#8-common-beginner-mistakes)
9. [Advanced Topics](#9-advanced-topics)
10. [Interview Questions (All Levels)](#10-interview-questions)
11. [Coding Exercises](#11-coding-exercises)
12. [MCQs](#12-mcqs)
13. [Flashcards](#13-flashcards)
14. [Cheat Sheet](#14-cheat-sheet)
15. [Revision Notes (5/15/30/60 min)](#15-revision-notes)
16. [Common Bugs & Debugging](#16-common-bugs--debugging)
17. [Production Interview Stories](#17-production-interview-stories)
18. [Company-Specific Questions](#18-company-specific-questions)
19. [Final Revision Checklist](#19-final-revision-checklist)

---

# 1. Introduction to REST APIs

## What is a REST API?

**REST** (Representational State Transfer) is an **architectural style** for designing networked applications — a set of constraints, not a protocol or standard. A **REST API** is a web API that follows these constraints, letting clients (browsers, mobile apps, other servers) interact with server-side resources (users, orders, products) using standard **HTTP methods** (GET, POST, PUT, PATCH, DELETE) over URLs that identify those resources.

Crucially: **REST is a philosophy, not a spec.** There's no official "REST protocol" you install — it's a set of architectural constraints defined by Roy Fielding, and APIs exist on a spectrum of how strictly they follow them (most production "REST APIs" are actually pragmatic, partial implementations — this nuance itself is a favorite senior interview topic).

## Why Was REST Created?

**Roy Fielding** defined REST in his **2000 PhD dissertation** ("Architectural Styles and the Design of Network-based Software Architectures") while he was also a co-author of the HTTP/1.1 specification. The goal: articulate *why* the web itself (HTTP + URLs + hypermedia) scaled so well to a global, decentralized system, and generalize those principles into a reusable architectural style for building APIs — favoring **statelessness, cacheability, and a uniform interface** over the tightly-coupled, stateful RPC-style protocols (like SOAP, CORBA) common at the time.

## Why Do Companies Use REST APIs?

| Reason | Explanation |
|---|---|
| **Simplicity** | Built on plain HTTP — any language/platform can consume it without special tooling. |
| **Statelessness → scalability** | No server-side session per client means any server can handle any request, simplifying horizontal scaling and load balancing. |
| **Cacheability** | HTTP's built-in caching (via headers) reduces server load and latency for read-heavy resources. |
| **Human-readable, debuggable** | JSON over standard HTTP verbs/status codes — easy to test with a browser, curl, or Postman. |
| **Universal client support** | Every language has an HTTP client; no special SDK/protocol library required (unlike gRPC, SOAP). |
| **Decoupling of client and server** | As long as the interface contract holds, clients and servers can evolve independently. |

## Real-World Analogy

Think of a REST API like a **restaurant menu with standardized ordering verbs**. Every dish (resource) has a name/number (URI) on the menu. You don't need a different process to order a burger vs. a salad — you always use the same actions: "I'd like to see the menu" (GET), "I'd like to order this" (POST), "please change my order" (PUT/PATCH), "cancel my order" (DELETE). The waiter (server) doesn't need to remember your entire dining history to take this order (statelessness) — each order ticket is self-contained.

Another analogy: URLs in REST are like **postal addresses** — a resource's address (`/users/42`) is stable and independent of who's asking or how they got there, and standard "verbs" (deliver, return-to-sender, forward) apply uniformly to any address.

## History Timeline

```
2000 ── Roy Fielding's dissertation formally defines REST
2002 ── eBay launches one of the earliest public "REST-like" APIs
2006 ── Amazon S3 launches with a REST API (highly influential real-world example)
2008 ── Twitter, Facebook expose REST APIs, fueling the API-first mobile app era
2010 ── Richardson Maturity Model published (a framework for grading REST API adoption levels)
2015 ── GraphQL open-sourced by Facebook, offering an alternative query-based API style
2015 ── gRPC open-sourced by Google, a high-performance RPC alternative
2020+── REST remains dominant for public/general-purpose APIs; GraphQL/gRPC common for
        specific internal/mobile-optimized or high-performance service-to-service use cases
```

## Advantages

- Simple, well-understood, minimal tooling required to build or consume.
- Naturally cacheable via standard HTTP mechanisms.
- Stateless design scales horizontally with ease.
- Human-readable (JSON) and easy to debug with ubiquitous tools (curl, Postman, browser).
- Huge ecosystem of tooling: API gateways, documentation generators (Swagger/OpenAPI), testing frameworks.

## Disadvantages

- **Over-fetching/under-fetching**: a fixed resource shape means clients often get more data than needed (over-fetching) or must make multiple round-trips for related data (under-fetching) — the core motivation behind GraphQL's existence.
- **No built-in real-time push** — REST is inherently request-response; real-time needs WebSockets/SSE layered on top.
- **Versioning is a real design challenge** — there's no single "correct" standard way to version a REST API, leading to fragmented conventions across the industry.
- **"REST" is often used loosely** — many APIs marketed as "RESTful" don't follow HATEOAS or full Richardson Maturity Model level 3, causing confusion about what "REST" even guarantees.
- Chatty for complex, deeply nested data requirements compared to a single well-crafted GraphQL query.

---

# 2. Core Concepts

## 2.1 The Six REST Architectural Constraints

| Constraint | Meaning |
|---|---|
| **Client-Server** | Separation of concerns — client (UI) and server (data/logic) evolve independently. |
| **Statelessness** | Every request contains all information needed to process it; the server stores no client session context between requests. |
| **Cacheability** | Responses must explicitly (via headers) indicate whether they're cacheable, improving performance/scalability. |
| **Uniform Interface** | A consistent way of interacting with resources (via URIs, standard HTTP methods, standard representations like JSON) — the defining characteristic of REST. |
| **Layered System** | Client can't tell (or need to know) whether it's talking directly to the server or through intermediaries (load balancers, gateways, caches). |
| **Code on Demand** *(optional)* | Servers can extend client functionality by sending executable code (e.g., JavaScript) — rarely used explicitly as a REST constraint in typical API design. |

## 2.2 Resources and URIs

A **resource** is any piece of information that can be named — a user, an order, a collection of products. Each resource is identified by a **URI** (Uniform Resource Identifier).

```
/users              → collection of users
/users/42            → a specific user resource
/users/42/orders       → a sub-collection: orders belonging to user 42
/users/42/orders/7      → a specific order for that user
```

**Naming conventions:**
- Use **nouns**, not verbs: `/users` not `/getUsers`.
- Use **plural** nouns for collections: `/products`, not `/product`.
- Use **hierarchy** for nested relationships: `/users/42/orders`.
- Use **lowercase, hyphenated** paths for multi-word resources: `/order-items`, not `/orderItems` or `/OrderItems`.

## 2.3 HTTP Methods (Verbs)

| Method | Purpose | Safe? | Idempotent? | Has body? |
|---|---|---|---|---|
| **GET** | Retrieve a resource | ✅ Yes | ✅ Yes | Typically no |
| **POST** | Create a new resource (or trigger a non-idempotent action) | ❌ No | ❌ No | Yes |
| **PUT** | Replace a resource entirely | ❌ No | ✅ Yes | Yes |
| **PATCH** | Partially update a resource | ❌ No | ❌ Not guaranteed (though often implemented idempotently) | Yes |
| **DELETE** | Remove a resource | ❌ No | ✅ Yes | Typically no |
| **HEAD** | Like GET but returns headers only, no body | ✅ Yes | ✅ Yes | No |
| **OPTIONS** | Discover allowed methods/CORS preflight | ✅ Yes | ✅ Yes | No |

**Safe** = doesn't modify server state. **Idempotent** = making the same request multiple times has the same effect as making it once (important for retry logic — a client can safely retry a PUT after a timeout, but retrying a POST might create duplicate resources).

## 2.4 HTTP Status Codes

| Range | Meaning | Common Examples |
|---|---|---|
| **1xx** | Informational | 100 Continue |
| **2xx** | Success | 200 OK, 201 Created, 204 No Content |
| **3xx** | Redirection | 301 Moved Permanently, 304 Not Modified |
| **4xx** | Client error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests |
| **5xx** | Server error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

**401 vs 403 — the classic confusion:** 401 Unauthorized means "you're not authenticated" (who are you?); 403 Forbidden means "I know who you are, but you don't have permission" (authenticated but not authorized).

## 2.5 Request/Response Structure

```
HTTP Request
─────────────
GET /users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...
Accept: application/json

HTTP Response
──────────────
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=60

{ "id": 42, "name": "Ali", "email": "ali@example.com" }
```

## 2.6 Headers

| Header | Purpose |
|---|---|
| `Content-Type` | Format of the request/response body (e.g., `application/json`) |
| `Authorization` | Credentials, typically `Bearer <token>` |
| `Accept` | What formats the client can handle in the response |
| `Cache-Control` | Caching directives (`max-age`, `no-store`, `no-cache`) |
| `ETag` | A version identifier for a resource, used for conditional requests |
| `If-None-Match` | Client sends the last known `ETag`; server returns 304 if unchanged |
| `X-Request-ID` | Custom header commonly used for request tracing |

## 2.7 Statelessness in Practice

Each request must carry everything needed to process it — typically an auth token, not a server-side session cookie referencing in-memory state. This means:

```
❌ Stateful (server remembers "logged in" via in-memory session):
   Request 1: POST /login → server stores session in memory
   Request 2: GET /profile → server looks up in-memory session

✅ Stateless (self-contained credentials each time):
   Request 1: POST /login → server returns a JWT
   Request 2: GET /profile with "Authorization: Bearer <JWT>" → server validates the token itself, no lookup needed
```

## 2.8 Richardson Maturity Model

A framework describing how "RESTful" an API really is:

```
Level 0: The Swamp of POX — one URI, one HTTP verb (usually POST) for everything (RPC-style over HTTP)
Level 1: Resources — multiple URIs for different resources, still often just one verb
Level 2: HTTP Verbs — proper use of GET/POST/PUT/DELETE and status codes (most "REST APIs" stop here)
Level 3: HATEOAS — responses include hypermedia links guiding the client on what actions are available next
```
Most real-world "REST APIs" (including most public APIs from major tech companies) sit at **Level 2** — this is an important, nuanced fact senior interviewers probe for, since claiming "full REST/HATEOAS compliance" without understanding this is a common red flag.

## 2.9 HATEOAS (Hypermedia as the Engine of Application State)

```json
{
  "id": 42,
  "status": "processing",
  "_links": {
    "self": { "href": "/orders/42" },
    "cancel": { "href": "/orders/42/cancel", "method": "POST" },
    "customer": { "href": "/users/17" }
  }
}
```
The idea: clients navigate the API dynamically via links returned in responses, rather than hardcoding URI structures — similar to how a human browses the web by clicking links rather than memorizing every URL. In practice, this is rarely fully implemented because it adds complexity most teams don't find worth the payoff for typical API consumers (mobile/web apps written against a known, versioned contract).

## 2.10 Pagination, Filtering, Sorting

```
GET /products?page=2&limit=20                       (offset/page-based pagination)
GET /products?cursor=eyJpZCI6NDJ9&limit=20            (cursor-based pagination — more stable under concurrent writes)
GET /products?category=shoes&minPrice=50&sort=-price   (filtering + sorting, "-" prefix = descending)
```

---

# 3. Internal Working / Request-Response Architecture

## 3.1 Full Request Lifecycle

```
1. Client constructs an HTTP request (method, URL, headers, optional body)
        │
2. DNS resolution — domain name → IP address
        │
3. TCP handshake (and TLS handshake if HTTPS) establishes a connection
        │
4. Request travels over the network, possibly through:
     - CDN / reverse proxy (e.g., Cloudflare)
     - Load balancer (distributes across server instances)
     - API Gateway (auth, rate limiting, request transformation)
        │
5. Application server receives the request
        │
6. Middleware pipeline runs: logging → auth → validation → business logic
        │
7. Business logic layer queries/mutates the database (or calls other services)
        │
8. Server constructs the HTTP response (status code, headers, body)
        │
9. Response travels back through the same layered path
        │
10. Client parses the response and updates its state/UI
```

## 3.2 Statelessness's Effect on Scaling

Because no server holds per-client session state in memory, **any** server instance behind a load balancer can handle **any** client's request — enabling simple, effective horizontal scaling without "sticky sessions" (routing a client to the same server every time), which is a requirement (and limitation) of stateful architectures.

```
Stateless (REST-style):                Stateful:
Client ──▶ Load Balancer                Client ──▶ Load Balancer
              │  (any server            │ (MUST route to the
              │   can handle it)        │  same server holding
      ┌───────┼───────┐                 │  this client's session)
      ▼       ▼       ▼                 ▼
   Server A Server B Server C     Server A (session lives HERE only)
```

## 3.3 Idempotency Under the Hood

Idempotency matters most for **retry safety**. If a client sends a `PUT /orders/42` and the response is lost due to a network timeout, the client can safely retry — the server applies the exact same final state either way. Retrying a non-idempotent `POST /orders` under the same failure could create a **duplicate order** unless the server implements additional safeguards (idempotency keys — see Advanced Topics).

## 3.4 Content Negotiation

```
Client:  Accept: application/json
Server:  Content-Type: application/json  → responds with JSON

Client:  Accept: application/xml
Server:  Content-Type: application/xml   → responds with XML (if supported)
```
The server inspects the `Accept` header and chooses the best-matching representation it can produce — this is what "Representational" in REST actually refers to: a resource (e.g., "user 42") can have multiple representations (JSON, XML, HTML), and REST separates the resource's identity from any one specific format.

---

# 4. Visual Diagrams

## 4.1 CRUD to HTTP Method Mapping

```
CREATE  →  POST    /users            (create a new user)
READ     →  GET      /users/42         (read a specific user)
READ     →  GET      /users              (read the collection)
UPDATE   →  PUT      /users/42          (replace user 42 entirely)
UPDATE   →  PATCH    /users/42          (partially update user 42)
DELETE    →  DELETE   /users/42          (remove user 42)
```

## 4.2 Authentication Flow (Token-Based, Stateless)

```
Client                          Server
  │  POST /login (credentials)    │
  ├───────────────────────────────▶│
  │                                │  Validate credentials
  │                                │  Generate JWT (signed token)
  │◀───────────────────────────────┤
  │  200 OK { token: "eyJ..." }    │
  │                                │
  │  GET /profile                  │
  │  Authorization: Bearer eyJ...   │
  ├───────────────────────────────▶│
  │                                │  Verify token signature
  │                                │  (no DB/session lookup needed)
  │◀───────────────────────────────┤
  │  200 OK { profile data }        │
```

## 4.3 Layered System (Gateway/Cache/Load Balancer)

```
   Client
     │
     ▼
   CDN (caches static/cacheable GET responses at the edge)
     │  (cache miss)
     ▼
   API Gateway (auth check, rate limiting, request logging)
     │
     ▼
   Load Balancer (distributes across instances)
     │
   ┌─┴─┬─────┐
   ▼   ▼     ▼
 App1 App2 App3   (stateless — any instance can serve any request)
     │
     ▼
  Database / Cache layer (Redis)
```

## 4.4 Pagination Strategies Compared

```
OFFSET-BASED                          CURSOR-BASED
─────────────                          ─────────────
GET /items?page=3&limit=20            GET /items?cursor=abc123&limit=20

Page 1: items 1-20                    Page: items after cursor "abc123"
Page 2: items 21-40                   (cursor encodes the last-seen item's
Page 3: items 41-60                    position, e.g., its ID or timestamp)

⚠ Problem: if an item is deleted        ✅ Stable even if items are
  from page 1 while browsing,             added/removed elsewhere in
  page 2's results can shift/skip/         the list — cursor is relative
  duplicate items ("page drift")          to a specific item, not a
                                          numeric offset
```

---

# 5. Code Examples

## 5.1 A Basic REST Endpoint — Simple → Production (Express.js)

**Simple:**
```js
app.get("/users/:id", async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json(user);
});
```

**Intermediate (proper status codes + error handling):**
```js
app.get("/users/:id", async (req, res) => {
  try {
    const user = await db.users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
```

**Production (validation, pagination, filtering, consistent error envelope, caching headers):**
```js
const { z } = require("zod");

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  status: z.enum(["active", "inactive"]).optional(),
});

app.get("/users", async (req, res, next) => {
  try {
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        error: { code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      });
    }
    const { page, limit, status } = parsed.data;

    const [users, total] = await Promise.all([
      db.users.find({ status }).skip((page - 1) * limit).limit(limit),
      db.users.count({ status }),
    ]);

    res.set("Cache-Control", "private, max-age=30");
    res.status(200).json({
      data: users,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err); // delegate to centralized error-handling middleware
  }
});
```

## 5.2 Idempotency Keys for Safe POST Retries

```js
app.post("/payments", async (req, res) => {
  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    return res.status(400).json({ error: "Idempotency-Key header required" });
  }

  const existing = await db.idempotencyRecords.findOne({ key: idempotencyKey });
  if (existing) {
    // Same request retried — return the ORIGINAL result, don't reprocess
    return res.status(existing.statusCode).json(existing.response);
  }

  const payment = await processPayment(req.body);
  await db.idempotencyRecords.create({
    key: idempotencyKey,
    statusCode: 201,
    response: payment,
  });

  res.status(201).json(payment);
});
```
*Why this matters:* a client retrying a `POST /payments` after a network timeout (not knowing if the original request succeeded) would otherwise risk double-charging a customer — the idempotency key lets the server recognize "I've already handled this exact request" and return the cached result instead of reprocessing.

## 5.3 Conditional Requests with ETags

```js
app.get("/articles/:id", async (req, res) => {
  const article = await db.articles.findById(req.params.id);
  const etag = `"${article.updatedAt.getTime()}"`;

  if (req.headers["if-none-match"] === etag) {
    return res.status(304).end(); // client's cached copy is still valid, no body needed
  }

  res.set("ETag", etag);
  res.status(200).json(article);
});
```

## 5.4 Rate Limiting Middleware (Production Pattern)

```js
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                    // limit each IP to 100 requests per window
  standardHeaders: true,        // return RateLimit-* headers
  legacyHeaders: false,
  message: { error: { code: "RATE_LIMITED", message: "Too many requests" } },
});

app.use("/api/", apiLimiter);
```

## 5.5 Centralized Error Handling Middleware

```js
class ApiError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

// Usage inside a route:
if (!user) throw new ApiError(404, "USER_NOT_FOUND", "No user with that ID exists");

// Centralized handler — MUST be registered last, after all routes
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  console.error(err); // structured logging in real production

  res.status(statusCode).json({
    error: { code, message: statusCode === 500 ? "Something went wrong" : err.message },
  });
});
```

---

# 6. Real World Usage

| Concept | Where it shows up in real MERN projects |
|---|---|
| Idempotency keys | Payment APIs (Stripe requires/recommends them), order submission endpoints |
| Cursor-based pagination | Social media feeds, infinite scroll lists (Twitter/Facebook-style APIs) |
| ETag/conditional requests | CDN-cached API responses, avoiding re-downloading unchanged assets/data |
| API Gateway + rate limiting | Public APIs (Stripe, GitHub, Twilio) protecting backend services from abuse/overload |
| Versioned APIs (`/v1/`, `/v2/`) | Any long-lived public API needing to evolve without breaking existing client integrations |
| HATEOAS (partial) | Some banking/finance APIs (PayPal's API includes `_links`) for guiding valid next actions |
| Centralized error envelopes | Virtually every production API — consistent `{ error: { code, message } }` shape for client-side error handling |
| Statelessness + JWT | Mobile app backends, SPA backends — no server-side session store needed, scales trivially |

**Example — Stripe's API**: a widely studied "gold standard" REST API design — consistent resource naming, idempotency keys for all mutating requests, detailed error codes with human-readable messages, and thorough versioning via a dated version header rather than the URL path.

**Example — GitHub's REST API**: uses proper HTTP status codes extensively, supports conditional requests via ETags for efficient polling, and provides `Link` headers for pagination (a lightweight HATEOAS-style pattern) instead of embedding pagination metadata in the body.

---

# 7. Best Practices

## URL/Resource Design

- Use **nouns**, plural, hierarchical: `/users/42/orders/7`.
- Avoid verbs in URLs — the HTTP method *is* the verb (`POST /orders`, not `/createOrder`).
- Use **query parameters** for filtering/sorting/pagination, not the path: `/products?category=shoes`.
- Keep URLs **lowercase** and **hyphenated** for readability: `/order-items`.

## Versioning Strategies

| Strategy | Example | Trade-off |
|---|---|---|
| URI path versioning | `/v1/users` | Simple, visible, but "pollutes" the URL/resource identity conceptually |
| Header versioning | `Accept: application/vnd.api.v2+json` | Cleaner URLs, but less discoverable/harder to test casually |
| Query param versioning | `/users?version=2` | Simple but easy to omit accidentally, less common in production |

Most production APIs (Stripe, GitHub) pragmatically use **URI path versioning** or a **dated version header**, valuing clarity and ease of routing over theoretical purity.

## Response Envelope Consistency

```json
// Success
{ "data": { "id": 42, "name": "Ali" }, "meta": { "requestId": "abc123" } }

// Error
{ "error": { "code": "VALIDATION_ERROR", "message": "Email is required", "details": [...] } }
```

## Security

- Always use HTTPS — never send credentials/tokens over plain HTTP.
- Validate and sanitize **all** input server-side, never trust client-side validation alone.
- Apply the principle of least privilege — an endpoint should never return more data than the requester is authorized to see (avoid "just filter it on the client" anti-patterns).
- Rate-limit public/authentication endpoints to mitigate brute-force and abuse.
- Never expose internal error details (stack traces, DB error messages) to clients in production.

## Scalability

- Design for statelessness from day one — never rely on in-memory session data tied to a specific server instance.
- Use caching headers (`Cache-Control`, `ETag`) aggressively for cacheable GET endpoints.
- Support pagination on every collection endpoint — never return an unbounded list.
- Consider cursor-based pagination for high-write-frequency collections (feeds, logs) to avoid page-drift issues.

## Documentation

- Use **OpenAPI/Swagger** specs — machine-readable, enables auto-generated docs, client SDKs, and contract testing.
- Document every error code an endpoint can return, not just the happy path.

---

# 8. Common Beginner Mistakes

| Mistake | Why it happens | Fix |
|---|---|---|
| Using verbs in URLs (`/getUser`, `/createOrder`) | Coming from RPC-style thinking | Use nouns + proper HTTP methods: `GET /users/:id`, `POST /orders` |
| Returning 200 OK for everything, even errors | Not knowing/using the full range of status codes | Use accurate status codes (404, 400, 401, 403, 409, 500) so clients can react programmatically |
| Confusing 401 and 403 | Not understanding the authentication vs authorization distinction | 401 = "who are you?" (not authenticated); 403 = "I know who you are, you can't do this" (not authorized) |
| Storing session state in server memory | Not realizing this breaks horizontal scaling/statelessness | Use stateless tokens (JWT) or an external session store (Redis) shared across instances |
| No pagination on list endpoints | Assuming the dataset will "always stay small" | Always paginate collections from day one — retrofitting pagination onto an established API is a breaking change |
| Inconsistent error response shapes across endpoints | Ad-hoc error handling written per-route without a shared convention | Centralize error handling with one consistent error envelope shape |
| Not validating input on the server | Trusting client-side validation as sufficient | Always validate/sanitize on the server — clients can bypass client-side checks entirely |
| Using PUT when PATCH is meant (or vice versa) | Not understanding "replace entire resource" vs "partial update" semantics | Use PUT only when sending the complete resource representation; use PATCH for partial updates |
| Making POST non-idempotent-safe for critical operations (payments) without any duplicate-prevention mechanism | Not anticipating network retries | Implement idempotency keys for critical mutating endpoints |

---

# 9. Advanced Topics

## 9.1 API Gateways

A single entry point sitting in front of one or many backend services, handling cross-cutting concerns centrally: authentication, rate limiting, request/response transformation, logging, and routing to the correct downstream service (especially relevant in a microservices architecture).

```
Client ──▶ API Gateway ──┬──▶ Users Service
                          ├──▶ Orders Service
                          └──▶ Payments Service
```

## 9.2 GraphQL vs REST — When to Choose Which

| | REST | GraphQL |
|---|---|---|
| Data fetching | Fixed shape per endpoint; may over/under-fetch | Client specifies exactly the fields needed in one query |
| Caching | Native HTTP caching (very mature, simple) | More complex — typically requires client-side normalized caching (Apollo, Relay) |
| Versioning | Explicit versions (`/v1`, `/v2`) | Typically evolves via additive schema changes, avoiding hard version bumps |
| Learning curve | Lower, universally understood | Higher — requires understanding schemas, resolvers, query language |
| Best for | Simple CRUD, public APIs, cache-heavy read patterns | Complex, deeply nested data requirements (e.g., mobile apps needing to minimize round-trips) |

## 9.3 Webhooks (Reverse REST)

Instead of the client polling an API repeatedly for updates, the **server calls the client's provided URL** when an event occurs — used by Stripe, GitHub, Twilio, etc.

```
Your Server                       Stripe
     │  Register webhook URL         │
     ├───────────────────────────────▶│
     │                                │  (later) payment succeeds
     │◀───────────────────────────────┤
     │  POST /webhooks/stripe          │
     │  { event: "payment.succeeded" } │
```
**Critical production concern:** webhook handlers must be **idempotent** (see section 5.2) since providers retry delivery on any non-2xx response or timeout, and must **verify the request's authenticity** (e.g., via a signature header) since the endpoint is publicly reachable.

## 9.4 HTTP Caching in Depth

```
Cache-Control: no-store              → never cache, anywhere
Cache-Control: private, max-age=60    → cache in the browser only, for 60 seconds
Cache-Control: public, max-age=3600     → cache anywhere (including shared CDN caches), for 1 hour
Cache-Control: no-cache                  → cache it, but ALWAYS revalidate with the server first (via ETag)
```

## 9.5 Rate Limiting Algorithms

| Algorithm | How it works | Trade-off |
|---|---|---|
| Fixed window | Count requests in discrete time windows (e.g., per minute) | Simple, but allows bursts at window boundaries (2x limit possible right at the edge) |
| Sliding window | Weighs the current and previous window proportionally | Smoother, avoids the boundary-burst problem, slightly more complex |
| Token bucket | Tokens refill at a steady rate; each request consumes a token | Allows controlled bursts while enforcing a steady average rate — very common in production |
| Leaky bucket | Requests processed at a constant, fixed rate regardless of burst | Smooths out bursts completely, but can add latency for legitimate burst traffic |

## 9.6 API Versioning Deprecation Strategy

```
1. Announce deprecation with a clear sunset date (via docs + response headers, e.g., Sunset/Deprecation headers)
2. Provide a migration guide between v1 and v2
3. Monitor usage of the deprecated version (analytics on which clients still call it)
4. Send warning headers on every deprecated-version response (e.g., `Deprecation: true`)
5. Only remove the old version after usage drops to near-zero or the sunset date passes with adequate notice
```

## 9.7 Idempotency Beyond POST — Handling Concurrent PUT/PATCH Conflicts

```
GET /articles/42        → returns article + ETag "v3"
PUT /articles/42
  If-Match: "v3"          → server only applies the update if the resource is STILL at version v3
                             (otherwise returns 412 Precondition Failed — someone else updated it first)
```
This is **optimistic concurrency control** — prevents the classic "lost update" problem where two clients read the same resource, both edit it, and the second write silently overwrites the first's changes.

---

# 10. Interview Questions

## 10.1 Beginner Questions

**Q1. What is a REST API?**

> *Ideal answer:* An API following REST's architectural constraints (statelessness, uniform interface via HTTP methods, cacheability, etc.), letting clients interact with server-side resources identified by URIs using standard HTTP verbs.
> *Tests:* Whether you know REST is a style/set of constraints, not a rigid protocol or standard.

**Q2. What does "stateless" mean in REST?**

> *Ideal answer:* Every request must contain all information the server needs to process it (e.g., an auth token); the server doesn't retain client-specific session state in memory between requests.

**Q3. What's the difference between PUT and PATCH?**

> *Ideal answer:* PUT replaces the entire resource with the provided representation; PATCH applies a partial update, modifying only the specified fields.
> *Common wrong answer:* "They're basically the same" — misses the full-replace vs partial-update semantic difference, which matters for correctness (e.g., PUT-ing a partial object could unintentionally null out omitted fields).

**Q4. What is idempotency, and which HTTP methods are idempotent?**

> *Ideal answer:* An idempotent operation produces the same result no matter how many times it's repeated. GET, PUT, DELETE, HEAD, and OPTIONS are idempotent by definition; POST and (typically) PATCH are not.

**Q5. What's the difference between 401 and 403 status codes?**

> *Ideal answer:* 401 Unauthorized means the request lacks valid authentication credentials. 403 Forbidden means the client is authenticated but doesn't have permission to perform the action.

**Q6. What is a URI, and how does it relate to a resource?**

> *Ideal answer:* A Uniform Resource Identifier uniquely names/identifies a resource (e.g., `/users/42`), independent of how the client got there or what format the response is in.

**Q7. What does 201 Created typically indicate, and what should accompany it?**

> *Ideal answer:* A resource was successfully created (typically in response to POST); it should be accompanied by a `Location` header pointing to the new resource's URI, and often the created resource's representation in the body.

**Q8. What is the purpose of the `Content-Type` header?**

> *Ideal answer:* It tells the recipient (server or client) the media type/format of the body being sent (e.g., `application/json`), so it can be parsed correctly.

**Q9. What's a query parameter, and when would you use one instead of a path segment?**

> *Ideal answer:* A key-value pair appended to a URL after `?`, typically used for optional, non-hierarchical modifiers like filtering, sorting, and pagination (`/products?category=shoes&sort=price`), whereas path segments identify the resource's hierarchical identity itself (`/products/42`).

**Q10. What does 404 mean, and how is it different from an empty array response?**

> *Ideal answer:* 404 means the requested resource/URI itself doesn't exist. An empty array with 200 OK means the resource (a collection) *does* exist, it's just currently empty — conflating the two miscommunicates to the client whether the endpoint/resource is valid at all.

*(Beginner set continues with: what JSON is and why it's the dominant REST payload format, what a "collection" vs "single resource" endpoint is, basic understanding of `curl`/Postman for testing, what CORS is at a surface level, what a request body is, and the meaning of common status codes like 200, 204, 400, 500.)*

## 10.2 Intermediate Questions

**Q1. Why is statelessness important for scalability?**

> *Ideal answer:* Because no server instance holds client-specific session state, any instance behind a load balancer can handle any request — this avoids the need for "sticky sessions" and makes horizontal scaling (adding more server instances) straightforward, since there's no per-client affinity requirement.

**Q2. Explain the trade-offs between offset-based and cursor-based pagination.**

> *Ideal answer:* Offset-based (`?page=3&limit=20`) is simple and allows jumping to arbitrary pages, but suffers from "page drift" — if items are inserted/deleted while paginating, results can shift, skip, or duplicate. Cursor-based (`?cursor=abc123`) anchors to a specific item's position, staying stable under concurrent writes, but doesn't support jumping to an arbitrary page number, only "next"/"previous" from a known point.

**Q3. How would you design idempotency for a payment creation endpoint?**

> *Ideal answer:* Require an `Idempotency-Key` header from the client; on the server, check if that key has already been processed and, if so, return the original cached response instead of reprocessing — preventing duplicate charges if the client retries after a timeout without knowing whether the original request succeeded.

**Q4. What's the Richardson Maturity Model, and where do most real-world "REST APIs" actually sit?**

> *Ideal answer:* A four-level (0-3) framework grading REST adoption: Level 0 (single URI/verb, RPC-style), Level 1 (multiple resource URIs), Level 2 (proper HTTP verbs + status codes), Level 3 (HATEOAS — hypermedia-driven navigation). Most production APIs, including major companies' public APIs, sit at **Level 2** — they use proper verbs/status codes but don't implement full HATEOAS, which is a nuanced but important fact to know rather than assuming "REST" always means fully hypermedia-driven.

**Q5. How would you version a REST API, and what are the trade-offs of different approaches?**

> *Ideal answer:* URI path versioning (`/v1/users`) is simple and highly visible/debuggable but conceptually "pollutes" the resource's identity with version info. Header-based versioning (custom `Accept` header) keeps URLs clean but is less discoverable/harder to test casually. Query param versioning is simple but easy to omit by accident. Most production APIs pragmatically choose URI path versioning or a dated version header for clarity, even if it's not the "purest" REST approach.

**Q6. Explain conditional requests using ETags.**

> *Ideal answer:* The server includes an `ETag` header (a version fingerprint) in a response. On subsequent requests, the client sends that value via `If-None-Match`; if the resource hasn't changed, the server responds with `304 Not Modified` and no body, saving bandwidth — the client uses its already-cached copy.

**Q7. What's the difference between a 500 and a 400-range error, and why does the distinction matter for clients?**

> *Ideal answer:* 4xx indicates a client-side problem (bad input, missing auth, etc.) — the client should fix the request before retrying as-is. 5xx indicates a server-side failure — the client's request may have been fine, and a retry (possibly with backoff) might succeed once the server recovers. This distinction matters for automated retry logic: retrying a 400 blindly is usually pointless, while retrying a transient 503 can be appropriate.

**Q8. How would you design an endpoint that needs to support both filtering and full-text search on a large collection?**

> *Ideal answer:* Use query parameters for both (`/products?category=shoes&q=running`), keeping the resource path clean and reserving path segments for resource hierarchy/identity. For genuinely large-scale full-text search, consider offloading to a dedicated search index (Elasticsearch) rather than relying on the primary database's query capabilities, exposing it through the same REST-style query parameter interface for consistency.

**Q9. What's CORS, and why does it exist?**

> *Ideal answer:* Cross-Origin Resource Sharing — a browser security mechanism preventing a webpage from making requests to a different origin (domain/port/protocol) than the one it was served from, unless the server explicitly allows it via response headers (`Access-Control-Allow-Origin`, etc.). It exists to prevent malicious sites from silently making authenticated requests to other sites on a user's behalf using their existing session/cookies.

**Q10. How would you handle a "read-then-write" race condition on a shared resource via REST?**

> *Ideal answer:* Use optimistic concurrency control — require the client to send the last-known version (via `If-Match` with an ETag) on the update request; the server rejects the update with `412 Precondition Failed` if the resource has changed since the client last read it, preventing a silent "lost update."

*(Intermediate set continues with: designing nested vs flat resource URLs, when to use 202 Accepted for async operations, webhook design and signature verification, rate limiting algorithm trade-offs, and the difference between authentication and authorization in the context of REST endpoints.)*

## 10.3 Advanced Questions

**Q1. Design a REST API for a ride-sharing app's ride-booking flow, including how you'd handle the inherently asynchronous nature of "finding a driver."**

> *Ideal answer:* `POST /rides` creates a ride request and immediately returns `202 Accepted` with a `Location` header pointing to `/rides/{id}` (since matching a driver isn't instantaneous) — the client then polls `GET /rides/{id}` (or better, subscribes via WebSocket/webhook for a push-based update) to check status transitions (`requested` → `matched` → `in_progress` → `completed`). This demonstrates understanding that REST's synchronous request-response model needs supplementing (polling, webhooks, or a separate real-time channel) for genuinely long-running/async workflows.

**Q2. How would you design rate limiting for a public API with different tiers (free, pro, enterprise)?**

> *Ideal answer:* Use a token bucket algorithm per API key/tier, with different refill rates and bucket sizes per tier, enforced at the API Gateway layer before requests even reach backend services. Return `429 Too Many Requests` with `Retry-After` and `X-RateLimit-Remaining`/`X-RateLimit-Reset` headers so well-behaved clients can back off appropriately. Store rate limit counters in a fast, shared store (Redis) so limits are enforced consistently across multiple gateway/API instances, not per-instance in isolation.

**Q3. Explain how you'd design webhook delivery to be reliable, given that the receiving server might be temporarily down.**

> *Ideal answer:* Implement retry with exponential backoff on non-2xx responses or timeouts, cap the number of retries, and provide a dead-letter mechanism (logging/alerting) for permanently failed deliveries. The receiving side must implement idempotent handling (via a unique event ID) since retries mean the same event could be delivered more than once. Consider also exposing a way for the receiver to manually re-fetch missed events (an events list/log endpoint) as a fallback to pure push-based delivery.

**Q4. When would you choose gRPC over REST for a service-to-service (not public-facing) API, and what would you give up?**

> *Ideal answer:* gRPC (using HTTP/2 and Protocol Buffers) offers significantly better performance (binary serialization, multiplexed streams, built-in strong typing via `.proto` schemas) for high-throughput internal service-to-service communication. Trade-offs: worse browser support (needs a proxy like grpc-web for browser clients), less human-readable/debuggable payloads (binary, not JSON), and a steeper learning curve. REST remains preferable for public-facing APIs valuing universal accessibility and easy debugging over raw performance.

**Q5. How would you design an API to support bulk operations (e.g., updating 10,000 records) without timing out or overwhelming the server?**

> *Ideal answer:* Avoid a single synchronous endpoint processing everything inline. Instead: accept the bulk request, return `202 Accepted` immediately with a job ID, process the work asynchronously (via a queue/background worker), and expose a `GET /jobs/{id}` endpoint (or webhook callback) for the client to check progress/completion — the same async pattern as Q1's ride-booking example, generalized to any long-running operation.

**Q6. Discuss the security implications of exposing detailed error messages/stack traces in API responses, and what a proper production error-handling strategy looks like.**

> *Ideal answer:* Detailed internal errors (stack traces, DB query fragments, internal file paths) can leak implementation details useful to attackers (technology stack fingerprinting, SQL injection surface hints). Production APIs should return a generic, safe error message and a stable error *code* to clients, while logging full details server-side (with request correlation IDs) for internal debugging — never conflating "what the client needs to know" with "what an engineer debugging the issue needs to know."

*(Advanced set continues with: designing multi-tenant API authorization boundaries, API Gateway architecture for a microservices system, handling partial failures in an API that aggregates data from multiple downstream services, and strategies for zero-downtime API versioning migrations for high-traffic public APIs.)*

## 10.4 Scenario-Based Questions

**Q1. A mobile app team complains your REST API requires 5 separate requests to render a single screen (user profile + their posts + each post's comments + each commenter's avatar). How do you address this without a full GraphQL migration?**

> *Ideal answer:* Introduce a purpose-built "composite" or "BFF" (Backend-for-Frontend) endpoint (e.g., `GET /screens/profile/:userId`) that internally aggregates the needed data server-side and returns it in one response — trading some REST purity (a non-resource-shaped endpoint) for practical efficiency, a very common real-world pattern before reaching for GraphQL. Alternatively, support optional field expansion (`?expand=posts,posts.comments`) on the existing resource endpoint.

**Q2. Clients report intermittent duplicate orders being created despite the UI only allowing one click on "Submit." What's your diagnosis and fix?**

> *Ideal answer:* Likely a network retry (client-side timeout-triggered retry, or a flaky connection causing the client to resend) hitting a non-idempotent `POST /orders` endpoint without any duplicate-prevention mechanism. Fix: implement idempotency keys (client generates a UUID per checkout attempt, sent as a header; server deduplicates based on that key).

**Q3. An API endpoint that used to return in under 100ms now takes 2+ seconds after a "minor" change: adding a new field that requires a join to another table for every item in a list response. How do you fix this without removing the field?**

> *Ideal answer:* Likely an N+1 query problem — the new field's data is being fetched with a separate query per list item instead of a single batched join/query. Fix: batch-fetch the additional data in one query (e.g., `WHERE id IN (...)`for all items at once) instead of querying per-item in a loop, and consider caching the frequently-joined data if it changes infrequently.

*(Additional scenarios: debugging a webhook that's delivered but silently ignored due to signature verification failure, designing an endpoint for a search feature needing typo-tolerance, and resolving a versioning conflict when two client app versions expect incompatible response shapes from the same endpoint.)*

## 10.5 Practical / Debugging / Coding Questions

**Q1 (Debugging). Clients report getting `200 OK` with an empty body when requesting a resource that doesn't exist. What's wrong and how do you fix it?**
```js
app.get("/users/:id", async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json(user); // user might be null/undefined here
});
```
> *Ideal answer:* The handler doesn't check if `user` is null/undefined before responding — it should return `404 Not Found` with a clear error body instead of a misleading `200 OK` with an empty/null payload.
> ```js
> app.get("/users/:id", async (req, res) => {
>   const user = await db.users.findById(req.params.id);
>   if (!user) return res.status(404).json({ error: "User not found" });
>   res.status(200).json(user);
> });
> ```

**Q2 (Coding). Design and implement the endpoint contract for updating a user's email with optimistic concurrency control.**
```js
app.put("/users/:id", async (req, res) => {
  const ifMatch = req.headers["if-match"];
  const user = await db.users.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });

  const currentEtag = `"${user.version}"`;
  if (ifMatch && ifMatch !== currentEtag) {
    return res.status(412).json({ error: "Resource has been modified since you last read it" });
  }

  user.email = req.body.email;
  user.version += 1;
  await user.save();

  res.set("ETag", `"${user.version}"`);
  res.status(200).json(user);
});
```

**Q3 (Debugging). A public API's rate limiter occasionally allows double the intended request rate right at the boundary between two time windows. Why, and what's the fix?**

> *Ideal answer:* This is the classic **fixed window** rate limiting flaw — a client can send the max allowed requests right at the end of one window, then immediately send another full batch at the start of the next window, effectively getting 2x the limit within a short burst spanning the boundary. Fix: switch to a sliding window or token bucket algorithm, which smooths this out by weighting requests continuously rather than resetting counts abruptly at fixed boundaries.

**Q4 (Coding). Implement a simple exponential backoff retry wrapper for a flaky downstream API call.**
```js
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.status >= 500 && attempt < maxRetries) throw new Error("Server error, retrying");
      return res;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const delay = 2 ** attempt * 100; // 100ms, 200ms, 400ms...
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

---

# 11. Coding Exercises

## Easy
**Design and implement CRUD endpoints** for a simple `/notes` resource (GET list, GET one, POST, PATCH, DELETE), with correct status codes for every case (including 404 for missing notes).

## Medium
**Add pagination, filtering, and sorting** to the `/notes` list endpoint, with proper validation of query parameters (rejecting invalid `limit`/`page` values with `400`), and a consistent response envelope including pagination metadata.

## Hard
**Implement idempotency-key support** for a `/orders` POST endpoint backed by a real (simulated) database, including a background cleanup job concept for expiring old idempotency records, and comprehensive tests covering: first request, retried request with the same key, and retried request with the same key but a *different* body (should this be rejected? — discuss the design decision).

## Interview Level
**Design (on a whiteboard/in a doc, not necessarily implement) a full REST API for a hotel booking system**, covering: resource modeling (hotels, rooms, bookings, guests), handling booking conflicts (double-booking prevention via optimistic concurrency or a dedicated availability-check endpoint), async payment processing flow, webhook design for payment provider callbacks, and your versioning strategy for the public-facing partner API.

---

# 12. MCQs

**1. Which HTTP method is NOT idempotent by default?**
A) GET
B) PUT
C) POST ✅
D) DELETE

*Explanation:* POST typically creates a new resource each time it's called with the same body (e.g., creating a new order), so repeating it produces a different result (multiple orders) — the defining reason it's not considered idempotent.

**2. What status code should a successful DELETE request typically return?**
A) 200 OK with the deleted resource in the body
B) 204 No Content ✅ (or 200 if returning some confirmation body)
C) 404 Not Found
D) 202 Accepted, always

*Explanation:* 204 No Content is the most common/appropriate response for a successful DELETE, since there's often nothing meaningful left to return — though returning 200 with a small confirmation body is also acceptable depending on API design conventions.

**3. What does a 304 Not Modified response indicate?**
A) The request failed validation
B) The resource was deleted
C) The client's cached copy is still valid, based on a conditional request (ETag/If-None-Match) ✅
D) The server is temporarily unavailable

*Explanation:* 304 is returned in response to a conditional GET request when the resource hasn't changed since the client's cached version — saving bandwidth by omitting the body entirely.

**4. Why is cursor-based pagination often preferred over offset-based pagination for a live-updating feed?**
A) It's simpler to implement
B) It allows jumping to any arbitrary page number
C) It remains stable even as items are added/removed during pagination ✅
D) It doesn't require a database index

*Explanation:* Offset-based pagination can skip or duplicate items if the underlying dataset changes between page requests ("page drift"); cursor-based pagination anchors to a specific item, avoiding this issue.

**5. What's the main purpose of an Idempotency-Key header on a POST request?**
A) To encrypt the request body
B) To let the server recognize and safely handle retried requests without reprocessing them ✅
C) To version the API
D) To specify the response format

*Explanation:* It lets a server detect that an incoming POST is a retry of a previously-processed request (e.g., after a client timeout) and return the original result instead of creating a duplicate resource.

*(Additional MCQs cover: correct status code choices for various scenarios, HATEOAS's actual definition vs common misconceptions, the difference between 401/403/404, understanding of safe vs idempotent methods, and correct use of query params vs path segments.)*

---

# 13. Flashcards

- **What are REST's core architectural constraints?** → *Client-server, statelessness, cacheability, uniform interface, layered system, (optional) code on demand.*
- **What does "idempotent" mean?** → *Repeating the same request produces the same result as making it once — critical for safe retries.*
- **401 vs 403?** → *401 = not authenticated (who are you?); 403 = authenticated but not authorized (you can't do this).*
- **What's the Richardson Maturity Model's Level 2?** → *Proper use of HTTP verbs and status codes — where most real-world "REST APIs" actually sit.*
- **What problem does an idempotency key solve?** → *Prevents duplicate processing (e.g., double-charging) when a client retries a POST after an ambiguous failure like a timeout.*
- **Offset vs cursor pagination — key trade-off?** → *Offset allows jumping to any page but suffers "page drift" under concurrent writes; cursor is stable but only supports next/previous navigation.*
- **What does an ETag + If-None-Match enable?** → *Conditional requests — server returns 304 Not Modified if the client's cached copy is still current, saving bandwidth.*
- **What is HATEOAS?** → *Hypermedia as the Engine of Application State — responses include links guiding the client's next possible actions, rarely fully implemented in practice.*
- **Why does statelessness aid horizontal scaling?** → *Any server instance can handle any request since no server holds client-specific session state in memory.*
- **What's optimistic concurrency control via If-Match?** → *Server rejects an update (412 Precondition Failed) if the resource changed since the client last read it, preventing lost updates.*

---

# 14. Cheat Sheet

```
HTTP METHODS
─────────────
GET     → read (safe, idempotent)
POST    → create / non-idempotent action
PUT     → replace entire resource (idempotent)
PATCH   → partial update (not guaranteed idempotent)
DELETE  → remove (idempotent)

STATUS CODES QUICK REFERENCE
──────────────────────────────
200 OK                  → success, general
201 Created              → resource created (POST)
204 No Content             → success, nothing to return (DELETE)
304 Not Modified            → conditional GET, use cached copy
400 Bad Request              → invalid input/request
401 Unauthorized               → not authenticated
403 Forbidden                    → authenticated, but not allowed
404 Not Found                      → resource/URI doesn't exist
409 Conflict                         → state conflict (e.g., duplicate)
412 Precondition Failed                → optimistic concurrency check failed
422 Unprocessable Entity                 → semantically invalid data
429 Too Many Requests                      → rate limited
500 Internal Server Error                    → unhandled server-side error
503 Service Unavailable                        → server temporarily overloaded/down

DESIGN CHECKLIST
──────────────────
✔ Nouns in URLs, verbs via HTTP methods
✔ Plural collection names
✔ Pagination on every list endpoint
✔ Consistent error envelope
✔ Idempotency keys on critical POSTs (payments, orders)
✔ Proper status codes, not just 200/500
✔ Validate ALL input server-side
```

---

# 15. Revision Notes

## ⏱ 5-Minute Revision
- REST = architectural style (statelessness, uniform interface via HTTP verbs, cacheability).
- Resources identified by URIs; nouns not verbs in paths.
- Core methods: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).
- 401 = not authenticated; 403 = not authorized.

## ⏱ 15-Minute Revision
Add:
- Idempotency: GET/PUT/DELETE idempotent, POST/PATCH generally not.
- Idempotency keys for safe payment/order retries.
- Pagination: offset-based vs cursor-based trade-offs.
- ETag/If-None-Match for conditional caching (304 responses).
- Richardson Maturity Model levels 0-3; most real APIs sit at Level 2.

## ⏱ 30-Minute Revision
Add:
- Full status code table (400-range vs 500-range meaning and retry implications).
- API versioning strategies (URI path, header, query param) and their trade-offs.
- Rate limiting algorithms: fixed window, sliding window, token bucket, leaky bucket.
- Webhooks: reliability via retries + idempotent handling + signature verification.
- Optimistic concurrency control via If-Match/412 Precondition Failed.

## ⏱ 1-Hour Revision
Add everything above plus:
- Walk through the full request lifecycle diagram (section 3.1) from memory.
- Practice designing a REST API for a non-trivial domain (booking system, e-commerce) on a whiteboard, including async operation handling (202 Accepted pattern).
- Review all Advanced Q&A (section 10.3) — async workflow design and gRPC/REST trade-offs are common senior differentiators.
- Do the Hard coding exercise (idempotency-key implementation) without referencing the solution.
- Review the Common Bugs table (section 16) the night before.

---

# 16. Common Bugs & Debugging

| Bug | Why It Occurs | How to Debug | Fix |
|---|---|---|---|
| Duplicate resources created on retry | Non-idempotent POST endpoint with no duplicate-prevention mechanism | Check client logs for retried requests around timeouts; check DB for near-identical records with close timestamps | Implement idempotency keys for critical mutating endpoints |
| Stale data served despite an update | Aggressive caching (`Cache-Control: public, max-age=...`) without proper invalidation | Check response headers for cache directives; check CDN/browser cache behavior | Use shorter TTLs, ETags for revalidation, or explicit cache purging on updates |
| "Page drift" — items skipped/duplicated while paginating | Offset-based pagination combined with concurrent inserts/deletes | Reproduce by paginating while writes occur; check if item counts/positions shift between page requests | Switch to cursor-based pagination for frequently-mutating collections |
| Lost updates — one user's edit silently overwritten by another's | No concurrency control on PUT/PATCH, "last write wins" by default | Reproduce with two near-simultaneous updates to the same resource; check if the earlier one's changes vanish | Implement optimistic concurrency control (ETag + If-Match, returning 412 on conflict) |
| Webhook events processed multiple times | Provider retries delivery (network issues, non-2xx response), handler isn't idempotent | Check for duplicate event IDs in processing logs | Store processed event IDs; check-and-skip before processing a duplicate |
| N+1 query slowdown after adding a "simple" new field to a list response | New field requires a per-item lookup instead of a single batched query | Profile/log query counts per request; a list of 100 items making 100+ extra queries is the tell | Batch-fetch the related data in one query (`WHERE id IN (...)`) instead of querying inside a loop |
| Clients silently receiving wrong/broken data after an API "minor update" | Breaking change shipped without a version bump, assuming it was "backward compatible" | Compare old vs new response shapes carefully; check client error logs/crash reports after the deploy | Treat any field removal/rename/type change as a breaking change requiring a new version, not a patch |

---

# 17. Production Interview Stories

**Story 1 — "The Double-Charged Customers Incident"**
> *Scenario:* "Over a holiday weekend of high traffic and some network instability, we discovered several customers were charged twice for the same order. Walk me through the root cause and fix."
> *Expected senior response:* Diagnose that the checkout/payment endpoint is a non-idempotent POST, and under network instability, clients (or an upstream proxy/load balancer) retried requests whose original response was lost, causing the payment to be processed twice. Fix: implement idempotency keys generated client-side per checkout attempt (not per retry), stored server-side with the original response, ensuring retries return the cached result rather than reprocessing the charge. Also recommend auditing *all* other non-idempotent, side-effecting endpoints (not just payments) for the same risk.

**Story 2 — "The API That 'Broke' Every Time We Added a Field"**
> *Scenario:* "Every time we add a new optional field to an API response, some subset of client apps crash. Why might this be happening, and how do you prevent it going forward?"
> *Expected response:* Some client-side code likely uses strict deserialization (e.g., a statically-typed mobile client expecting an exact, closed schema) that breaks on unexpected extra fields, rather than the intended "additive changes are safe" REST evolution assumption. Recommend establishing an explicit API contract/compatibility policy (e.g., via OpenAPI schema + contract tests) communicated to all client teams, and potentially using a strict versioning discipline where truly breaking changes (including strict-schema-incompatible additions for some clients) require a new version rather than assuming all additive changes are universally "safe."

**Story 3 — "The Webhook That Silently Stopped Working"**
> *Scenario:* "Our integration partner's webhook deliveries to our system just... stopped, with no errors on our side. Diagnose."
> *Expected response:* Likely causes to investigate: (a) the endpoint started returning non-2xx responses (perhaps due to an unrelated deploy changing auth middleware order) causing the provider to eventually give up retrying and possibly disable the webhook after repeated failures; (b) a signature verification check silently failing and rejecting valid requests without adequate logging. Recommend adding structured logging/alerting specifically for webhook endpoint failures (since they're easy to overlook compared to user-facing endpoint errors) and periodically testing webhook delivery via the provider's dashboard/test tools.

---

# 18. Company-Specific Questions

## Google-style
- "Design a REST API for a URL-shortening service, including how you'd handle collision avoidance and analytics tracking without slowing down the redirect path." *(Tests resource modeling and performance-conscious design.)*
- "How would you design rate limiting for an API serving both free and paid tiers at massive scale?" *(Tests distributed rate limiting, token bucket algorithm knowledge.)*

## Microsoft-style
- "Walk through how you'd version a public API used by thousands of third-party integrators, without breaking existing integrations." *(Tests deprecation strategy, backward compatibility discipline.)*
- "Design the API contract for a multi-tenant SaaS product, ensuring proper data isolation between tenants." *(Tests authorization boundary design.)*

## Amazon-style
- "Design the REST API for a warehouse inventory system that must handle concurrent updates from multiple locations without lost updates." *(Tests optimistic concurrency control design.)*
- "Tell me about a time an API design decision caused a production incident, and what you'd do differently." *(Behavioral, tests real design/debugging experience.)*

## Meta-style
- "Compare REST and GraphQL for a social media feed API serving highly variable client data needs (web vs mobile vs third-party developers)." *(Tests deep trade-off understanding, not just definitions.)*
- "Design an API supporting real-time-ish updates (e.g., new comments) without full WebSocket infrastructure — what are your options and their trade-offs?" *(Tests polling vs long-polling vs SSE vs webhook trade-off reasoning.)*

## Netflix-style
- "Design a REST API for a content catalog service that must gracefully degrade if a personalization/recommendation dependency is slow or down." *(Tests resilience patterns — timeouts, fallback responses, partial data.)*
- "How would you design pagination for an infinitely-scrolling content feed with billions of items?" *(Tests cursor-based pagination reasoning at scale.)*

## Modern Startup-style
- "We need to ship an MVP API fast — what's the minimum viable set of best practices you wouldn't skip even under time pressure?" *(Tests pragmatic prioritization: validation, status codes, and basic error handling over "nice to have" features like full HATEOAS.)*
- "A partner integration keeps breaking every time we deploy — how do you prevent this without a dedicated API governance team?" *(Tests lightweight contract testing/OpenAPI schema validation as a pragmatic safeguard.)*