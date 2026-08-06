# 📙 REST APIs Interview Handbook — Part 1

### Chapters 1–9: Foundations → Advanced Topics

> Part 1 of 2. Theory, internals, diagrams, and code. Part 2 (after you confirm) will hold the full interview question bank, exercises, MCQs, flashcards, cheat sheet, and revision checklist — same format as the previous handbooks.

---

## Table of Contents

1. [Introduction to REST APIs](#1-introduction-to-rest-apis)
2. [Core Concepts](#2-core-concepts)
3. [Internal Working](#3-internal-working)
4. [Visual Diagrams](#4-visual-diagrams)
5. [Code Examples (Simple → Intermediate → Production)](#5-code-examples)
6. [Real-World Usage in MERN Apps](#6-real-world-usage-in-mern-apps)
7. [Best Practices](#7-best-practices)
8. [Common Beginner Mistakes](#8-common-beginner-mistakes)
9. [Advanced Topics](#9-advanced-topics)

---

## 1. Introduction to REST APIs

### 1.1 What is a REST API?

**REST** stands for **RE**presentational **S**tate **T**ransfer. It's an **architectural style** (not a protocol, not a library, not a strict standard) for designing networked applications — most commonly implemented over HTTP.

A **REST API** is a web service that follows REST's constraints, exposing **resources** (users, products, orders) as URLs, and letting clients interact with those resources using standard HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).

```
GET    /users        → list users
GET    /users/42     → get user 42
POST   /users         → create a user
PUT    /users/42      → replace user 42
PATCH  /users/42      → partially update user 42
DELETE /users/42      → delete user 42
```

### 1.2 Why Was REST Created?

REST was defined by **Roy Fielding** in his **2000 PhD dissertation**, "Architectural Styles and the Design of Network-based Software Architectures." Fielding was also one of the principal authors of the HTTP/1.1 specification, so REST was essentially a formalization of the architectural principles that made the **web itself** scale so well — stateless communication, cacheable responses, uniform interfaces, and resource-based addressing.

Before REST became dominant, many APIs used **SOAP** (Simple Object Access Protocol) — a rigid, XML-based, heavily-specified protocol with strict contracts (WSDL). REST emerged as a **simpler, more flexible alternative** better suited to the growing web and mobile ecosystem.

### 1.3 Why Do Companies Use REST APIs?

- **Simplicity** — built directly on HTTP, using verbs and status codes developers already understand.
- **Statelessness** — makes horizontal scaling trivial (any server can handle any request, no session affinity required).
- **Cacheability** — HTTP's built-in caching semantics (via `Cache-Control`, `ETag`) can be leveraged directly.
- **Language/platform agnostic** — any client (web, mobile, IoT) that can make an HTTP request can consume a REST API.
- **Wide tooling support** — Postman, curl, browsers, virtually every HTTP client library.
- Used practically everywhere: **Twitter/X, GitHub, Stripe, Google Maps, Twilio** all expose REST(-ish) APIs.

### 1.4 Real-World Analogy

Think of a REST API like a **restaurant menu with standardized ordering language**. Every dish (resource) has a name/number (URL). You use the **same universal verbs** at any restaurant — "I'd like to order X" (POST), "Can I see the menu for X" (GET), "Please change my order to Y" (PUT/PATCH), "Cancel my order" (DELETE). You don't need a custom, restaurant-specific ordering protocol each time — the *interface* is uniform even though the *kitchen* (implementation) differs.

### 1.5 History Timeline

| Year | Milestone |
|---|---|
| 2000 | Roy Fielding's dissertation formally defines REST |
| Early 2000s | SOAP dominates enterprise APIs; REST is a research-adjacent alternative |
| 2006–2010 | REST gains massive traction as Web 2.0 APIs (Twitter, Flickr, del.icio.us) adopt lightweight HTTP+JSON/XML APIs |
| 2010s | JSON overtakes XML as the dominant REST payload format; REST becomes the de facto default for public/internal APIs |
| 2015+ | Alternative styles emerge (GraphQL from Facebook/Meta in 2015, gRPC from Google in 2016) as complements/competitors for specific use cases, but REST remains dominant for general-purpose web APIs |

### 1.6 Advantages

- Simple mental model built on ubiquitous HTTP semantics.
- Stateless — trivially horizontally scalable.
- Cacheable at multiple layers (browser, CDN, reverse proxy).
- Huge ecosystem of tooling, documentation standards (OpenAPI/Swagger), and client libraries.
- Loose coupling between client and server (as long as the contract/interface is stable).

### 1.7 Disadvantages

- **Over-fetching/under-fetching** — a fixed endpoint shape may return more data than a client needs (over-fetching) or require multiple round trips to assemble a full view (under-fetching) — a key reason GraphQL exists.
- **No enforced strict standard** — "REST" is loosely applied in practice; many "REST APIs" don't actually satisfy all of Fielding's constraints (especially HATEOAS, rarely implemented).
- **Versioning complexity** — evolving a REST API without breaking existing clients requires careful discipline.
- **Statelessness can mean repeated data** — every request must carry all context needed (e.g., auth tokens), which can add overhead compared to stateful protocols in some contexts.

---

## 2. Core Concepts

### 2.1 Resources and URIs

A **resource** is any piece of information that can be named — a user, an order, a collection of products. Each resource is identified by a **URI** (Uniform Resource Identifier).

```
/users            → the "users" collection resource
/users/42         → a specific user resource
/users/42/orders  → the "orders" sub-collection belonging to user 42
```

**Naming convention rule:** use **nouns**, not verbs, in URIs. `/getUsers` is not RESTful; `GET /users` is.

### 2.2 HTTP Methods (Verbs) and Their Semantics

| Method | Purpose | Idempotent? | Safe? |
|---|---|---|---|
| `GET` | Retrieve a resource | Yes | Yes |
| `POST` | Create a resource / trigger an action | No | No |
| `PUT` | Replace a resource entirely | Yes | No |
| `PATCH` | Partially update a resource | Not guaranteed (usually treated as not idempotent) | No |
| `DELETE` | Remove a resource | Yes | No |

- **Safe** = doesn't modify server state (read-only).
- **Idempotent** = calling it multiple times has the same effect as calling it once (e.g., `DELETE /users/42` called 3 times still results in user 42 being gone — no different from calling it once).

> **Interview gold:** "`POST` is neither safe nor idempotent — calling `POST /orders` twice typically creates two orders. `PUT` is idempotent because replacing a resource with the same data repeatedly yields the same end state."

### 2.3 HTTP Status Codes

| Range | Meaning | Common Codes |
|---|---|---|
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

**401 vs 403 (a very commonly confused pair):**
- **401 Unauthorized** = "I don't know who you are" (missing/invalid authentication).
- **403 Forbidden** = "I know who you are, but you're not allowed to do this" (authenticated but unauthorized for this action).

### 2.4 Richardson Maturity Model

A framework for grading how "RESTful" an API actually is:

```
Level 0: The Swamp of POX
  - Single URI, single HTTP method (usually POST), everything in the body
  - e.g., POST /api with { "action": "getUser", "id": 42 }

Level 1: Resources
  - Multiple URIs for different resources, but still mostly one HTTP method
  - e.g., POST /getUser, POST /createUser

Level 2: HTTP Verbs
  - Proper use of GET/POST/PUT/DELETE + correct status codes
  - Most real-world "REST APIs" live here — this is genuinely RESTful in practice

Level 3: Hypermedia Controls (HATEOAS)
  - Responses include links describing available next actions
  - Rarely implemented in practice, but is Fielding's "true" REST vision
```

### 2.5 Statelessness

Each request from client to server must contain **all the information needed to understand and process it** — the server must not rely on any stored session/context from previous requests. This is why REST APIs typically use tokens (like JWTs) sent with **every** request rather than server-side session memory tied to a specific server instance.

### 2.6 Representations

REST resources aren't the data itself — they're **representations** of that data, typically as JSON (most common today) or XML. The same underlying resource (`/users/42`) could be represented differently depending on the `Accept` header (**content negotiation**):

```
GET /users/42
Accept: application/json   → { "id": 42, "name": "Ali" }

GET /users/42
Accept: application/xml    → <user><id>42</id><name>Ali</name></user>
```

### 2.7 HATEOAS (Hypermedia as the Engine of Application State)

The idea that API responses should include **links** to related/available actions, so clients don't need to hard-code URL structures — they navigate the API the way a browser navigates the web by following links.

```json
{
  "id": 42,
  "name": "Ali",
  "_links": {
    "self": { "href": "/users/42" },
    "orders": { "href": "/users/42/orders" },
    "delete": { "href": "/users/42", "method": "DELETE" }
  }
}
```

In practice, **most production "REST APIs" skip HATEOAS entirely** — it's the most-discussed-but-least-implemented REST constraint.

### 2.8 Filtering, Sorting, Pagination

```
GET /products?category=electronics&sort=-price&page=2&limit=20
```

- **Filtering**: narrow results by field values.
- **Sorting**: `sort=price` (ascending) vs `sort=-price` (descending, common convention).
- **Pagination**: `page`/`limit` (offset-based) or `cursor`/`limit` (cursor-based, better for large datasets).

### 2.9 Versioning Strategies

| Strategy | Example |
|---|---|
| URI versioning | `/api/v1/users` |
| Header versioning | `Accept: application/vnd.myapp.v2+json` |
| Query parameter versioning | `/users?version=2` |

URI versioning is the most common in practice due to its simplicity and visibility, even though header versioning is often considered "more RESTful" (since the URI is supposed to identify the resource, not the API version).

---

## 3. Internal Working

### 3.1 The Full HTTP Request-Response Lifecycle

```
1. Client constructs an HTTP request
   Method + URL + Headers + (optional) Body
        │
2. DNS resolution (domain → IP address)
        │
3. TCP connection established (three-way handshake)
        │
4. TLS handshake (if HTTPS) — encrypts the connection
        │
5. HTTP request sent over the connection
        │
6. Server (e.g., an Express app) parses the request
        │
7. Routing layer matches method+path to a handler
        │
8. Handler executes business logic (DB queries, etc.)
        │
9. Server constructs an HTTP response
   Status code + Headers + Body
        │
10. Response sent back over the same TCP connection
        │
11. Client parses the response and acts on it
```

### 3.2 How Content Negotiation Actually Works

The client sends an `Accept` header listing preferred formats (with optional quality weights):
```
Accept: application/json, application/xml;q=0.8
```
The server inspects this header and chooses the best matching representation it supports, setting `Content-Type` in the response accordingly. If the server can't produce any acceptable format, it should return `406 Not Acceptable`.

### 3.3 How Caching Works Internally (ETags & Conditional Requests)

1. Server computes an **ETag** (a hash/fingerprint of the resource's current state) and includes it in the response: `ETag: "abc123"`.
2. Client caches the response along with this ETag.
3. On a subsequent request, the client sends `If-None-Match: "abc123"`.
4. If the resource hasn't changed, the server responds with **`304 Not Modified`** and an **empty body** — saving bandwidth. If it has changed, the server returns the new representation with status `200` and a new ETag.

```
Client                          Server
  │  GET /product/1              │
  │ ─────────────────────────────▶
  │  200 OK, ETag: "v1"           │
  │ ◀─────────────────────────────
  │  (later)                      │
  │  GET /product/1                │
  │  If-None-Match: "v1"           │
  │ ─────────────────────────────▶
  │  304 Not Modified (no body)    │
  │ ◀─────────────────────────────
```

### 3.4 Idempotency Internals — Why `PUT` Is Idempotent but `POST` Isn't

`PUT /users/42` with body `{ name: "Ali" }` sets user 42's name to "Ali" — running it 1 time or 100 times produces the **exact same end state**. `POST /users` with the same body typically means "create a new user resource" — running it 100 times creates 100 different users (100 different `_id`s), since the server assigns identity on creation. This is a structural property of the semantics, not an implementation detail — but note: it's still the **API author's job** to actually implement these methods to honor their idempotency contract; nothing forces a `PUT` handler to behave idempotently — REST simply expects it.

### 3.5 Statelessness Internals — What This Means for Load Balancing

```
                    ┌──────────────┐
   Requests ───────▶│ Load Balancer│
                    └──────┬───────┘
              ┌────────────┼────────────┐
              ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Server A │  │ Server B │  │ Server C │
        └──────────┘  └──────────┘  └──────────┘
```

Because each request is self-contained (auth token included, no reliance on server-held session), **any** server can handle **any** request — the load balancer doesn't need "sticky sessions" pinning a client to one specific server. This is the core reason REST/stateless APIs scale horizontally so easily.

---

## 4. Visual Diagrams

### 4.1 Resource-Oriented URL Structure

```
/api/v1/
  ├── users/
  │     ├── GET     → list users
  │     ├── POST    → create user
  │     └── {id}/
  │           ├── GET     → get one user
  │           ├── PUT     → replace user
  │           ├── PATCH   → update user
  │           ├── DELETE  → delete user
  │           └── orders/
  │                 └── GET → list this user's orders
  └── products/
        ├── GET  → list products
        └── {id}/
              └── GET → get one product
```

### 4.2 Request/Response Anatomy

```
REQUEST                              RESPONSE
─────────────────────                ─────────────────────
POST /api/v1/users HTTP/1.1          HTTP/1.1 201 Created
Host: api.example.com                Content-Type: application/json
Content-Type: application/json       Location: /api/v1/users/42
Authorization: Bearer <token>
                                      {
{                                       "id": 42,
  "name": "Ali",                       "name": "Ali",
  "email": "ali@example.com"           "email": "ali@example.com"
}                                     }
```

### 4.3 Status Code Decision Flow

```
Did the request succeed?
    │
   YES ──▶ Was a resource created? ──▶ 201 Created
    │            │
    │           NO ──▶ Any content to return? ──▶ 200 OK
    │                        │
    │                       NO ──▶ 204 No Content
    │
   NO ──▶ Client's fault?
              │
             YES ──▶ Not authenticated? ──▶ 401
              │       Not permitted?     ──▶ 403
              │       Doesn't exist?     ──▶ 404
              │       Malformed data?    ──▶ 400 / 422
              │       Too many requests? ──▶ 429
              │
             NO (server's fault) ──▶ 500 / 502 / 503
```

### 4.4 Authentication Flow for a REST API (Token-Based)

```
Client                                    Server
  │  POST /login {email, password}          │
  │ ────────────────────────────────────────▶
  │                                    verify credentials
  │  200 OK { token: "jwt..." }              │
  │ ◀────────────────────────────────────────
  │  (store token)
  │
  │  GET /orders                              │
  │  Authorization: Bearer jwt...              │
  │ ────────────────────────────────────────▶
  │                                    verify token, extract user
  │  200 OK [ ...orders ]                      │
  │ ◀────────────────────────────────────────
```

---

## 5. Code Examples

### 5.1 Simple Example — A Minimal REST Endpoint (Express)

```js
const express = require('express');
const app = express();
app.use(express.json());

let products = [{ id: 1, name: 'Laptop', price: 1200 }];

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.status(200).json(product);
});

app.listen(3000);
```

**Explanation:** Two resource-oriented GET endpoints — a collection (`/products`) and a single item (`/products/:id`) — following core REST naming (nouns, not verbs) and correct status codes (`404` when not found).

### 5.2 Intermediate Example — Full CRUD with Correct Status Codes and Filtering/Pagination

```js
const express = require('express');
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 1200, category: 'electronics' },
  { id: 2, name: 'Mouse', price: 25, category: 'electronics' },
];
let nextId = 3;

// GET with filtering, sorting, pagination
app.get('/products', (req, res) => {
  let result = [...products];

  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }
  if (req.query.sort === 'price') result.sort((a, b) => a.price - b.price);
  if (req.query.sort === '-price') result.sort((a, b) => b.price - a.price);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  res.status(200).json({ data: paginated, total: result.length, page, limit });
});

app.post('/products', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'name and price are required' });
  }
  const product = { id: nextId++, name, price, category };
  products.push(product);
  res.status(201).location(`/products/${product.id}`).json(product);
});

app.put('/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const { name, price, category } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'name and price required for full replace' });
  products[idx] = { id: products[idx].id, name, price, category };
  res.status(200).json(products[idx]);
});

app.patch('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Not found' });
  Object.assign(product, req.body);
  res.status(200).json(product);
});

app.delete('/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  products.splice(idx, 1);
  res.status(204).send();
});

app.listen(3000);
```

**Explanation:**
- `PUT` requires the full object (replace semantics) and rejects incomplete data; `PATCH` uses `Object.assign` to merge only provided fields (partial-update semantics) — demonstrating the real semantic difference, not just different route names.
- `res.status(201).location(...)` sets the `Location` header pointing to the newly created resource — a REST best practice often missed.
- Filtering/sorting/pagination all live in query parameters, keeping the URL resource-oriented (`/products`, not `/getFilteredProducts`).
- `204` on delete correctly sends no body.

### 5.3 Production Example — Versioned, Validated, Paginated, HATEOAS-Aware API Layer

```js
// routes/v1/products.routes.js
const router = require('express').Router();
const { validate } = require('../../middleware/validate');
const { productSchema, productUpdateSchema } = require('../../schemas/product.schema');
const controller = require('../../controllers/products.controller');
const authenticate = require('../../middleware/authenticate');

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', authenticate, validate(productSchema), controller.create);
router.put('/:id', authenticate, validate(productSchema), controller.replace);
router.patch('/:id', authenticate, validate(productUpdateSchema), controller.update);
router.delete('/:id', authenticate, controller.remove);

module.exports = router;
```

```js
// controllers/products.controller.js
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.list = catchAsync(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 20, 100); // cap limit to prevent abuse
  const filter = {};
  if (req.query.category) filter.category = req.query.category;

  const [items, total] = await Promise.all([
    Product.find(filter).skip((page - 1) * limit).limit(limit),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    data: items.map(toResource),
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    links: {
      self: `/api/v1/products?page=${page}&limit=${limit}`,
      next: page * limit < total ? `/api/v1/products?page=${page + 1}&limit=${limit}` : null,
      prev: page > 1 ? `/api/v1/products?page=${page - 1}&limit=${limit}` : null,
    },
  });
});

exports.create = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).location(`/api/v1/products/${product._id}`).json(toResource(product));
});

exports.getOne = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('Product not found', 404));

  // Conditional GET support via ETag
  const etag = `"${product.updatedAt.getTime()}"`;
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end();
  }
  res.set('ETag', etag).status(200).json(toResource(product));
});

function toResource(product) {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    category: product.category,
    _links: {
      self: { href: `/api/v1/products/${product._id}` },
      delete: { href: `/api/v1/products/${product._id}`, method: 'DELETE' },
    },
  };
}
```

**Explanation:**
- **Cap on `limit`** (`Math.min(..., 100)`) prevents a client from requesting an abusively large page size.
- **`meta`/`links` in the response** provide pagination metadata and HATEOAS-style navigation links — genuinely production-grade REST design, going beyond the "Level 2" maturity most APIs stop at.
- **ETag support** (`getOne`) implements real conditional GET caching — the server checks `If-None-Match` and returns `304` when appropriate, saving bandwidth for unchanged resources.
- **`toResource()`** decouples the internal database shape from the external API representation — a critical practice, since exposing raw DB documents directly (including internal fields) is a common security/maintainability mistake.
- Validation, auth, and business logic are cleanly separated into middleware/controller layers.

---

## 6. Real-World Usage in MERN Apps

- **Express *is* the REST API layer** in MERN — React's `fetch`/`axios` calls hit Express routes structured exactly per REST conventions (`GET /api/products`, `POST /api/orders`).
- **Frontend state often mirrors REST resource shape** — e.g., a Redux/Zustand store for "products" typically maps closely to what `GET /products` returns.
- **Third-party integrations** — MERN apps commonly consume external REST APIs too (Stripe for payments, SendGrid for email, Google Maps for geocoding) — the same REST principles apply whether you're building or consuming the API.
- **Mobile apps (React Native)** consume the exact same REST endpoints as the web frontend — one of REST's biggest practical wins: one backend, many client types, no protocol-specific client code needed.
- **API documentation** — production MERN teams typically publish an **OpenAPI/Swagger spec** describing every endpoint, generated either manually or from code annotations, letting frontend and backend teams work in parallel against an agreed contract.

---

## 7. Best Practices

### 7.1 URL & Resource Design
- Use plural nouns: `/users`, not `/user`.
- Nest resources logically but avoid excessive depth: `/users/42/orders/7` is fine; `/users/42/orders/7/items/3/reviews/1` is a smell — consider a top-level `/reviews?itemId=3` instead.
- Never use verbs in URLs (`/getUser` ❌ → `GET /users/:id` ✅).

### 7.2 Status Codes & Error Responses
- Be precise: `400` for malformed requests, `401` for missing/invalid auth, `403` for insufficient permissions, `404` for missing resources, `409` for conflicts (e.g., duplicate email), `422` for semantically invalid data that's well-formed.
- Use a **consistent error response shape** across the whole API:
```json
{ "status": "error", "message": "Email already in use", "code": "DUPLICATE_EMAIL" }
```

### 7.3 Security
- Always use HTTPS in production (never send tokens/credentials over plain HTTP).
- Validate and sanitize all input server-side — never trust client-side validation alone.
- Rate-limit public endpoints, especially authentication endpoints.
- Use short-lived access tokens + refresh tokens rather than long-lived tokens for sensitive APIs.

### 7.4 Performance & Scalability
- Always paginate list endpoints — never return unbounded result sets.
- Support field selection/projection where responses can be large (`?fields=id,name`).
- Leverage HTTP caching (`Cache-Control`, `ETag`) for cacheable GET endpoints.
- Compress responses (`gzip`/`br`) for large payloads.

### 7.5 Documentation & Versioning
- Publish an OpenAPI (Swagger) spec — enables auto-generated docs, client SDKs, and contract testing.
- Version explicitly (`/api/v1/...`) from day one, even before you think you'll need v2.
- Never make breaking changes to a released API version — add new fields/endpoints instead, and deprecate with clear timelines.

### 7.6 Consistency
- Consistent naming (camelCase or snake_case — pick one and never mix).
- Consistent date formats (ISO 8601: `2026-08-06T10:00:00Z`).
- Consistent pagination/filtering parameter names across all endpoints.

---

## 8. Common Beginner Mistakes

| Mistake | Why It Happens | The Fix |
|---|---|---|
| Using verbs in URLs (`/getUsers`, `/createUser`) | Coming from an RPC-style mental model | Use nouns + HTTP methods: `GET /users`, `POST /users` |
| Returning `200` for every response, including errors | Not thinking about status codes carefully | Use precise status codes (`201`, `400`, `404`, etc.) |
| Confusing `401` and `403` | Not understanding the authentication vs authorization distinction | 401 = "who are you?", 403 = "you can't do that" |
| Not paginating list endpoints | Works fine with small test data, breaks at scale | Always paginate, even if you think the list will "stay small" |
| Exposing internal database fields/structure directly in API responses | Returning DB documents as-is | Map to a dedicated "resource" shape (DTO) before responding |
| Inconsistent error response formats across endpoints | Ad hoc error handling per route | Centralize error handling with one consistent response shape |
| Making `PUT` behave like `PATCH` (partial update) | Not understanding replace vs partial-update semantics | Use `PUT` only for full replacement, `PATCH` for partial updates |
| No API versioning from the start | "We'll add it later" | Version from day one (`/api/v1/`) — retrofitting is painful |
| Deeply nested URLs (`/a/1/b/2/c/3/d/4`) | Over-literal resource nesting | Flatten with query parameters or top-level resources where reasonable |
| Not validating input server-side (trusting the frontend) | Assuming the frontend form validation is enough | Always validate on the server — clients can bypass frontend code entirely |

---

## 9. Advanced Topics

### 9.1 HATEOAS in Practice

Even though rarely fully implemented, understanding it matters for interviews. A HATEOAS-compliant response lets a client discover available actions without hard-coded knowledge of the API's URL structure — useful in APIs that evolve frequently or serve many independent client teams, since clients follow links rather than construct URLs themselves.

### 9.2 Idempotency Keys for Non-Idempotent Operations

For `POST` requests where retries are risky (e.g., payment creation), clients send a unique `Idempotency-Key` header. The server stores the result of the first request against that key; if the same key is retried (e.g., due to a network timeout and automatic client retry), the server returns the **original** response instead of re-executing the operation — preventing duplicate charges/orders.

### 9.3 API Gateway Patterns

In microservice architectures, a REST API is often fronted by an **API Gateway** that handles cross-cutting concerns centrally: authentication, rate limiting, request routing to the correct backend service, response aggregation from multiple services, and logging/metrics — so individual services don't each reimplement these concerns.

```
Client → API Gateway → [Users Service, Orders Service, Payments Service]
```

### 9.4 Content Negotiation Beyond JSON

Production APIs sometimes support multiple representations (JSON, CSV export, PDF reports) via the `Accept` header or explicit format suffixes (`/reports/5.csv`), letting one underlying resource serve multiple client needs without separate endpoints for each format.

### 9.5 GraphQL and gRPC — Why They Exist Despite REST's Dominance

- **GraphQL** (Meta, 2015) lets clients specify exactly which fields they need in a single request, solving REST's over-fetching/under-fetching problem — especially valuable for complex, deeply nested UI data requirements (common in large product apps).
- **gRPC** (Google, 2016) uses HTTP/2 and Protocol Buffers for high-performance, strongly-typed service-to-service communication — common in internal microservice-to-microservice calls where performance and strict contracts matter more than human-readability.
- **REST remains dominant** for public-facing APIs due to simplicity, cacheability, and universal tooling support — the choice between REST/GraphQL/gRPC is a genuine architectural tradeoff, not a strict "one is better" situation.

### 9.6 Rate Limiting Strategies

| Strategy | How It Works |
|---|---|
| Fixed window | Count requests per fixed time block (e.g., per calendar minute) — simple but allows bursts at window boundaries |
| Sliding window | Tracks a rolling time window — more accurate, slightly more complex |
| Token bucket | Tokens refill at a steady rate; each request consumes a token — allows controlled bursts |
| Leaky bucket | Requests processed at a constant fixed rate regardless of burst — smooths traffic |

### 9.7 API Contract Testing

In teams with separate frontend/backend development, **contract testing** (e.g., using Pact) verifies that the API's actual behavior matches an agreed-upon contract (often derived from the OpenAPI spec), catching breaking changes **before** they reach a shared environment — critical in larger organizations with independently-deployed services.
