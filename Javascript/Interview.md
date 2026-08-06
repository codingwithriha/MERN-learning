# 📘 The Complete JavaScript Interview Handbook

## 📑 Table of Contents

1. Introduction to JavaScript
2. Core Concepts
3. Internal Working (Engine, Memory, Execution)
4. Visual Diagrams
5. Code Examples (Simple → Intermediate → Production)
6. Real World Usage
7. Best Practices
8. Common Beginner Mistakes
9. Advanced Topics
10. Interview Questions (Beginner / Intermediate / Advanced / Scenario / Debugging / Coding)
11. Follow-up Questions
12. Coding Exercises (Easy → Interview Level)
13. MCQs
14. Flashcards
15. Cheat Sheet
16. Revision Notes (5/15/30/60 min)
17. Common Bugs
18. Production Interview Stories
19. 100+ Beginner / Intermediate / Advanced FAQ Bank
20. Company-Specific Questions (Google, Microsoft, Amazon, Meta, Netflix, Startups)
21. Final Revision Checklist

---

# 1. Introduction to JavaScript

### What is JavaScript?

JavaScript (JS) is a **high-level, interpreted (JIT-compiled), single-threaded, dynamically-typed programming language** that is the only language natively understood by web browsers. It lets you add behavior and interactivity to otherwise static HTML/CSS pages, and — via **Node.js** — it also runs on servers, making it the backbone of the **MERN** stack (MongoDB, Express, React, Node).

Formally, JavaScript is a **multi-paradigm** language: it supports procedural, object-oriented (via prototypes), and functional programming styles all at once.

### Why was it created?

- Created by **Brendan Eich** at Netscape in **10 days in 1995**.
- Original name: **Mocha**, then **LiveScript**, finally renamed **JavaScript** as a marketing move to ride Java's popularity (the two languages are **unrelated**).
- Goal: give web pages the ability to react to user actions (clicks, form validation, animations) without needing a full page reload from the server.
- Standardized in 1997 under **ECMA International** as **ECMAScript (ES)** — this is why you hear "ES5", "ES6/ES2015", "ES2020" etc. "JavaScript" is the popular name; "ECMAScript" is the official specification it implements.

### Why do companies use it?

| Reason | Explanation |
|---|---|
| Universal | Every browser on every device runs JS — no installation needed |
| Full-stack with one language | Node.js lets teams use JS on frontend AND backend (MERN, MEAN) |
| Huge ecosystem | npm has 2M+ packages — almost everything is pre-built |
| Massive hiring pool | Easiest language to hire for; huge community support |
| Async by design | Naturally suited for I/O-heavy apps (chat apps, APIs, streaming) |
| Backed by big players | V8 (Google), Chakra (Microsoft), continually improved |

### Real-World Analogy

Think of a website as a **house**:
- **HTML** = the skeleton/structure (walls, rooms)
- **CSS** = the paint, decoration, styling
- **JavaScript** = the electricity — it makes doorbells ring, lights turn on when you flip a switch, and appliances respond to your actions. Without it, the house just *sits there* looking pretty but doing nothing.

### History Timeline

```
1995 ── Brendan Eich creates Mocha/LiveScript at Netscape (10 days)
1996 ── Renamed to JavaScript; Microsoft creates JScript for IE
1997 ── ECMAScript 1 (ES1) standard published
1999 ── ES3 — regex, try/catch (widely adopted for a decade)
2008 ── Google releases V8 engine (Chrome) — huge performance leap
2009 ── Node.js created by Ryan Dahl — JS escapes the browser
2009 ── ES5 — strict mode, JSON support, Array methods (map/filter)
2015 ── ES6/ES2015 — BIGGEST update: let/const, classes, arrow fns,
         promises, modules, destructuring, template literals
2016+ ── Yearly releases: ES2016, ES2017 (async/await)... ES2023+
Today ── JS runs in browsers, servers (Node/Deno/Bun), mobile (React
         Native), desktop (Electron), and even IoT devices
```

### Advantages

- Runs everywhere (browser, server, mobile, desktop, embedded)
- No compilation step needed for development (interpreted/JIT)
- First-class functions + closures enable powerful patterns
- Non-blocking async I/O model makes it excellent for scalable servers
- Enormous ecosystem and community (Stack Overflow, npm, frameworks)
- Same language for frontend + backend reduces context switching

### Disadvantages

- **Dynamic typing** causes runtime bugs that a compiler could've caught (this is why **TypeScript** exists)
- **Single-threaded** — one long-running synchronous task blocks everything (the UI freezes)
- Historical **quirks/inconsistencies** (`typeof null === "object"`, `NaN !== NaN`, loose `==` coercion)
- Callback-heavy async code can become unreadable ("callback hell") without promises/async-await
- No built-in strong typing, module system was missing for years (fixed in ES6)

> **Interview Tip:** Interviewers often open with "What is JavaScript and why is it single-threaded?" — this is a filter question. A confident, structured answer (like above) signals strong fundamentals before deeper questions even start.

---

# 2. Core Concepts

## 2.1 Variables: `var`, `let`, `const`

A **variable** is a named container that stores a value in memory.

```js
var name = "Alice";   // function-scoped, hoisted, re-declarable, re-assignable
let age = 25;          // block-scoped, hoisted but in "Temporal Dead Zone", re-assignable
const country = "PK";  // block-scoped, cannot be re-assigned (but object contents CAN mutate)
```

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function scope | Block scope `{ }` | Block scope `{ }` |
| Hoisting | Hoisted + initialized as `undefined` | Hoisted but in TDZ | Hoisted but in TDZ |
| Re-declaration | ✅ Allowed | ❌ Error | ❌ Error |
| Re-assignment | ✅ Allowed | ✅ Allowed | ❌ Error |
| Global object property | ✅ Yes (`window.x`) | ❌ No | ❌ No |

**Temporal Dead Zone (TDZ):** the period between entering a scope and the line where a `let`/`const` variable is actually declared. Accessing it during this window throws a `ReferenceError`, not `undefined`.

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 5;
```

> **Common Misconception:** Many believe `let`/`const` are "not hoisted" at all. They ARE hoisted (their existence is registered), but they aren't *initialized* until their declaration line executes — that gap is the TDZ.

## 2.2 Data Types

JavaScript has **8 data types**, split into **primitives** and **1 non-primitive**:

**Primitives (immutable, stored by value):**
1. `String` — `"hello"`
2. `Number` — `42`, `3.14` (JS has ONE number type — no int/float distinction)
3. `Boolean` — `true` / `false`
4. `undefined` — variable declared but not assigned
5. `null` — intentional absence of value
6. `Symbol` (ES6) — unique, immutable identifier, often used as object keys to avoid collisions
7. `BigInt` (ES2020) — for integers larger than `2^53 - 1`

**Non-primitive:**
8. `Object` — includes arrays, functions, dates, maps, sets, everything else (objects are reference types)

```js
typeof "hi"        // "string"
typeof 42           // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"   ⚠️ famous JS bug, kept for backward compatibility
typeof Symbol()      // "symbol"
typeof 10n           // "bigint"
typeof {}            // "object"
typeof []            // "object"   (arrays are objects!)
typeof function(){}  // "function"
```

## 2.3 Primitive vs Reference Types (Value vs Reference)

```js
// Primitives: copied BY VALUE
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 — unaffected

// Objects: copied BY REFERENCE (pointer to same memory location)
let obj1 = { x: 10 };
let obj2 = obj1;
obj2.x = 20;
console.log(obj1.x); // 20 — SAME object in memory!
```

**Memory Diagram:**

```
Primitive (Stack):              Reference (Stack + Heap):

 a = 10  ──► [10]                obj1 ──┐
 b = 20  ──► [20]                        ├──► { x: 20 } (Heap)
 (independent copies)            obj2 ──┘
                                  (both point to same heap object)
```

## 2.4 Type Coercion (`==` vs `===`)

- `==` (loose equality): converts types before comparing
- `===` (strict equality): compares value AND type, no conversion

```js
0 == false        // true  (false → 0)
0 === false       // false (different types)
"" == 0           // true  ("" → 0)
null == undefined // true  (special case — only equal to each other)
null === undefined// false
NaN == NaN        // false (NaN is never equal to anything, even itself!)
```

> **Best Practice:** Always use `===` and `!==` unless you have a specific, documented reason to allow coercion. `==` is a common source of production bugs.

## 2.5 Scope & Scope Chain

**Scope** determines where a variable is accessible.

- **Global scope** — accessible everywhere
- **Function scope** — accessible only inside the function (`var`)
- **Block scope** — accessible only inside `{ }` (`let`/`const`)
- **Lexical scope** — inner functions have access to variables of their outer (enclosing) function, based on WHERE they are physically written in the code

```js
function outer() {
  let outerVar = "I'm outside";
  function inner() {
    console.log(outerVar); // accessible via scope chain
  }
  inner();
}
```

The **scope chain** is the sequence of scopes the JS engine searches through (innermost → outermost) when resolving a variable name.

## 2.6 Hoisting

**Hoisting** is JavaScript's behavior of moving *declarations* (not initializations) to the top of their scope during the **compile phase**, before code executes line-by-line.

```js
console.log(x); // undefined (NOT an error — declaration hoisted)
var x = 5;

sayHi(); // "Hi!" — function declarations are FULLY hoisted
function sayHi() { console.log("Hi!"); }

sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye!"); }; // only the `var` is hoisted, not the assignment
```

## 2.7 Functions Deep Dive

### Function Declaration vs Expression vs Arrow Function

```js
// Declaration — hoisted fully, has its own `this`
function add(a, b) { return a + b; }

// Expression — NOT hoisted (only the variable is), has its own `this`
const subtract = function(a, b) { return a - b; };

// Arrow function (ES6) — NOT hoisted, does NOT have its own `this`,
// inherits `this` from the enclosing lexical scope, cannot be used as constructor
const multiply = (a, b) => a * b;
```

| Feature | Function Declaration | Function Expression | Arrow Function |
|---|---|---|---|
| Hoisted | Fully | No (var part only) | No |
| Own `this` | Yes | Yes | No (lexical `this`) |
| `arguments` object | Yes | Yes | No |
| Used as constructor (`new`) | Yes | Yes | No |
| Good for | Named reusable utilities | Callbacks, IIFE | Callbacks, `this`-preserving code |

### First-Class Functions

Functions in JS are **first-class citizens** — they can be:
- Assigned to variables
- Passed as arguments (**callbacks**)
- Returned from other functions (**higher-order functions**)

```js
function higherOrder(fn) {
  return function(x) { return fn(x) * 2; };
}
const double = higherOrder(x => x + 1);
console.log(double(5)); // 12
```

## 2.8 Closures

A **closure** is formed when a function "remembers" the variables from its lexical scope even after the outer function has finished executing.

```js
function counter() {
  let count = 0; // private variable — not accessible from outside
  return function () {
    count++;
    return count;
  };
}
const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2 — `count` persisted between calls!
```

**Why it matters:** Closures enable **data privacy** (before ES6 classes had `#private` fields), **memoization**, **currying**, and **module patterns**.

**Diagram:**

```
counter() executes and returns ──► [inner function]
                                        │
                          Lexical Environment (closure) kept alive:
                                { count: 0 }
                                        │
                     Each call to increment() reads/updates
                     THIS SAME closed-over `count` variable
```

## 2.9 The `this` Keyword

`this` refers to the **execution context** — its value depends on **HOW a function is called**, not where it's defined (except arrow functions).

```js
const obj = {
  name: "Alice",
  greet() { console.log(this.name); } // `this` = obj (called as obj.greet())
};
obj.greet(); // "Alice"

const greetFn = obj.greet;
greetFn(); // undefined (or error in strict mode) — `this` = global/undefined, lost context!

const arrowGreet = () => console.log(this.name);
arrowGreet(); // undefined — arrow fn takes `this` from surrounding (module/global) scope
```

**Rules for determining `this` (in order of precedence):**
1. `new Foo()` → `this` = the newly created object
2. `fn.call(obj)` / `fn.apply(obj)` / `fn.bind(obj)` → `this` = `obj` explicitly
3. `obj.method()` → `this` = `obj` (whatever is left of the dot)
4. Plain function call `fn()` → `this` = `undefined` (strict mode) or global object (non-strict)
5. Arrow functions → `this` = inherited from enclosing lexical scope (no own `this`)

## 2.10 Prototypes & Prototypal Inheritance

Every JS object has an internal link `[[Prototype]]` (accessible via `__proto__` or `Object.getPrototypeOf()`) to another object it can "inherit" properties/methods from. This chain is called the **prototype chain**.

```js
function Person(name) { this.name = name; }
Person.prototype.sayHi = function () { console.log(`Hi, I'm ${this.name}`); };

const alice = new Person("Alice");
alice.sayHi(); // "Hi, I'm Alice" — sayHi isn't on `alice` itself, found via prototype chain
```

**Prototype Chain Diagram:**

```
alice  ──[[Prototype]]──►  Person.prototype  ──[[Prototype]]──►  Object.prototype ──► null
{name:"Alice"}              {sayHi: fn}                            {toString, hasOwnProperty...}
```

`class` syntax (ES6) is **syntactic sugar** over this same prototype mechanism — it doesn't introduce a new inheritance model, just a cleaner way to write it.

## 2.11 Objects & Arrays

```js
// Object literal
const user = { name: "Bob", age: 30 };

// Destructuring (ES6)
const { name, age } = user;

// Spread operator — shallow copy / merge
const updatedUser = { ...user, age: 31 };

// Array methods (all HIGHLY tested in interviews)
[1,2,3].map(x => x * 2);          // [2,4,6] — transforms, returns NEW array
[1,2,3].filter(x => x > 1);       // [2,3] — selects matching items
[1,2,3].reduce((acc,x) => acc+x, 0); // 6 — accumulates to single value
[1,2,3].forEach(x => console.log(x)); // no return, side-effects only
[1,2,3].find(x => x > 1);         // 2 — first match
[1,2,3].some(x => x > 2);         // true — at least one matches
[1,2,3].every(x => x > 0);        // true — all match
```

## 2.12 Equality, Truthy/Falsy, Type Conversion

**Falsy values (only 8 in all of JS):** `false, 0, -0, 0n, "", null, undefined, NaN`
Everything else — including `"0"`, `[]`, `{}` — is **truthy**.

```js
if ([]) console.log("runs!");  // [] is truthy, even though it's "empty"
if ("0") console.log("runs!"); // "0" is truthy (non-empty string)
```


---

# 3. Internal Working — How JavaScript Actually Runs

## 3.1 The JavaScript Engine

A JS Engine (V8 for Chrome/Node, SpiderMonkey for Firefox, JavaScriptCore for Safari) converts your code into machine code. V8's pipeline:

```
Source Code
    │
    ▼
Parser ──► Abstract Syntax Tree (AST)
    │
    ▼
Ignition (Interpreter) ──► Bytecode  (fast startup)
    │
    ▼
TurboFan (JIT Optimizing Compiler) ──► Optimized Machine Code
    (monitors "hot" code — code run many times — and recompiles it
     into highly optimized machine code on the fly)
```

**JIT (Just-In-Time compilation)** = a hybrid of interpretation (fast to start) and compilation (fast to run). This is why modern JS is fast despite being a "scripting language."

## 3.2 Memory: Stack vs Heap

```
CALL STACK (LIFO)                    HEAP (unstructured, large)
┌─────────────────┐                  ┌───────────────────────┐
│ innerFunction()  │                  │ { name: "Alice" }     │
├─────────────────┤                  │ [1,2,3,4]             │
│ outerFunction()  │                  │ function() {...}      │
├─────────────────┤                  └───────────────────────┘
│ global execution │                  Objects, arrays, functions
└─────────────────┘                  are stored here; variables on
Primitives & references               the stack hold a REFERENCE
stored here                           (pointer) to this location
```

**Stack Overflow** happens when the call stack exceeds its limit — typically from unterminated recursion:

```js
function recurse() { return recurse(); }
recurse(); // RangeError: Maximum call stack size exceeded
```

## 3.3 Garbage Collection

JS automatically frees memory that is no longer **reachable** from the root (global object, active call stack).

- **Mark-and-Sweep algorithm** (used by V8): starting from "roots," the GC marks everything reachable; anything NOT marked is "swept" (deleted).
- **Memory leaks** commonly happen from: forgotten timers/intervals, detached DOM references kept in variables, unbounded caches, closures unintentionally holding large objects.

## 3.4 Execution Context & The Call Stack

Every time a function is invoked, JS creates an **Execution Context** containing:
1. **Variable Environment** (hoisted vars/functions)
2. **Lexical Environment** (scope chain reference)
3. **`this` binding**

These contexts are pushed onto the **Call Stack** (Last In, First Out).

```
Call Stack lifecycle for:
function a() { b(); }
function b() { c(); }
function c() { console.log("done"); }
a();

Push: [Global]
Push: [Global, a()]
Push: [Global, a(), b()]
Push: [Global, a(), b(), c()]
Pop:  [Global, a(), b()]        (c finishes)
Pop:  [Global, a()]              (b finishes)
Pop:  [Global]                   (a finishes)
```

## 3.5 The Event Loop (THE #1 asked JS interview topic)

JavaScript is **single-threaded** — one Call Stack, one thing at a time. So how does it handle `setTimeout`, network requests, and user clicks without freezing? Via the **Event Loop** and Web/Node APIs running OUTSIDE the JS engine.

```
                     ┌─────────────────┐
                     │   Call Stack     │◄──────────────┐
                     └────────┬─────────┘                │
                              │ (empty?)                  │
                              ▼                            │
                     ┌─────────────────┐                  │
                     │   Event Loop     │──────────────────┘
                     └───┬─────────┬───┘
             ┌───────────┘         └───────────┐
             ▼                                 ▼
  ┌────────────────────┐            ┌─────────────────────┐
  │ Microtask Queue      │            │  Macrotask (Task) Q │
  │ (Promises, queueMicro│            │ (setTimeout, setInterval,
  │  task, MutationObs.) │            │  DOM events, I/O)     │
  │  ⭐ HIGHER PRIORITY  │            └─────────────────────┘
  └────────────────────┘
        ▲
        │
┌───────┴────────────┐
│  Web APIs / Node    │  (fetch, DOM, timers, fs — handled by
│  APIs (outside JS    │   the BROWSER or libuv, not the JS engine)
│  engine)             │
└─────────────────────┘
```

**Rule:** After every single task from the Call Stack finishes, the Event Loop **drains the ENTIRE microtask queue** (all pending Promise callbacks) before picking even ONE macrotask (like a `setTimeout`).

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// Output: 1, 4, 3, 2
// Why: sync code runs first (1, 4), then ALL microtasks (3),
// then the macrotask queue (2) — even with a 0ms delay!
```

> **Interview Gold:** This exact snippet ("what's the output order") is one of the most repeated JS interview questions across FAANG companies. Memorize the reasoning, not just the answer.

---

# 4. Visual Diagrams — Key Mental Models

### Where JavaScript fits in a MERN request:

```
Browser (React, JS)
      │  HTTP Request (fetch/axios)
      ▼
Express.js (Node.js server, JS)
      │  Query
      ▼
MongoDB (stores data as BSON/JSON)
      │  Response
      ▼
Node.js (JS) ──► Express.js (JS) ──► React (JS) ──► Browser renders
```

### Prototype Chain (recap)

```
instance ──► Constructor.prototype ──► Object.prototype ──► null
```

### Closure Memory Model (recap)

```
Outer Function Call ──► creates Lexical Environment
        │
        └──► Inner Function retains REFERENCE to it (closure)
                   even after outer function returns
```

### Async/Await under the hood

```
async function getData() {
  const res  = await fetch(url);   // pauses HERE, yields control
  const data = await res.json();   // engine keeps running OTHER code
  return data;                      // resumes when Promise settles
}
// async/await is SYNTACTIC SUGAR over Promises + generators
```

---

# 5. Code Examples: Simple → Intermediate → Production

## 5.1 Debounce Function (extremely common interview coding question)

**Simple (concept):**
```js
function debounceSimple(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);                 // cancel the previous scheduled call
    timer = setTimeout(() => fn(...args), delay); // schedule a new one
  };
}
```
*Line-by-line:* `timer` is closed over between calls. Every new call clears the pending timeout and starts a fresh one — so `fn` only runs after the user STOPS triggering the event for `delay` ms.

**Intermediate (with `this` and immediate option):**
```js
function debounce(fn, delay, immediate = false) {
  let timer;
  return function (...args) {
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
    if (callNow) fn.apply(this, args);
  };
}
```

**Production (used in a real search input):**
```js
const searchInput = document.querySelector("#search");
const handleSearch = debounce(async (e) => {
  const query = e.target.value.trim();
  if (!query) return;
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const results = await res.json();
  renderResults(results);
}, 300);

searchInput.addEventListener("input", handleSearch);
```
*Why production-grade:* trims/validates input, encodes the query safely (prevents URL injection), avoids firing network requests on every keystroke (huge performance/cost win), and is fully reusable.

## 5.2 Deep Clone (common "implement it yourself" question)

```js
// Simple — shallow only
const shallow = { ...original };

// Intermediate — JSON trick (loses functions, undefined, Dates become strings)
const clone = JSON.parse(JSON.stringify(original));

// Production — structuredClone (modern, handles Dates, Maps, Sets, circular refs)
const properClone = structuredClone(original);

// Manual recursive version (what interviewers actually want you to WRITE)
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (map.has(obj)) return map.get(obj); // handle circular references
  const result = Array.isArray(obj) ? [] : {};
  map.set(obj, result);
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) result[key] = deepClone(obj[key], map);
  }
  return result;
}
```

## 5.3 Custom `Promise.all` Implementation (Advanced/Staff-level question)

```js
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = value;     // preserve ORDER, not completion order
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);               // reject immediately on first failure
    });
  });
}
```
*What this tests:* Understanding that `Promise.all` fails fast, preserves input order (not completion order), and handles empty arrays correctly.


---

# 6. Real World Usage in MERN Projects

| Concept | Where it shows up in real MERN apps |
|---|---|
| Closures | Custom React hooks, private state in modules, memoized selectors |
| Promises/async-await | Every API call (fetch/axios), Mongoose queries, Express route handlers |
| Event loop | Understanding why Express doesn't block while querying MongoDB |
| Prototypes | Understanding how `class UserModel extends Model` works under the hood |
| Array methods | Transforming API responses (`.map`), filtering search results, aggregating totals (`.reduce`) |
| Destructuring | `const { name, email } = req.body;` in nearly every Express controller |
| Spread/rest | Merging default config objects, `...req.body` when creating Mongo documents |
| Modules (ESM/CJS) | Organizing Express routes/controllers, React component imports |
| `this` | Class components in older React code, Express middleware chaining |
| Debounce/throttle | Search bars, window resize handlers, infinite scroll, autosave forms |

---

# 7. Best Practices (Production Standards)

### Code Style & Structure
- Use `const` by default, `let` only when reassignment is needed, **never `var`**.
- One logical concern per function (Single Responsibility Principle).
- Use **named exports** for utilities, default export for the "main" thing a file provides.
- Prefer `===`/`!==` always.
- Guard clauses over deep nesting:
```js
// ❌ Bad
function process(user) {
  if (user) {
    if (user.isActive) {
      // logic
    }
  }
}
// ✅ Good
function process(user) {
  if (!user || !user.isActive) return;
  // logic
}
```

### Naming Conventions
- `camelCase` for variables/functions, `PascalCase` for classes/React components, `UPPER_SNAKE_CASE` for constants.
- Boolean variables should read like yes/no questions: `isLoading`, `hasError`, `canSubmit`.

### Error Handling
- Always wrap `await` calls in `try/catch` (or a centralized error-handling middleware in Express).
- Never swallow errors silently (`catch (e) {}`) — log or rethrow.

### Performance
- Debounce/throttle expensive event handlers.
- Avoid creating functions/objects inside render loops (React) or hot loops.
- Use `Map`/`Set` instead of objects/arrays for frequent lookups (O(1) vs O(n)).

### Security
- Never use `eval()` or `new Function()` with untrusted input.
- Sanitize/validate all user input before using in queries (prevents NoSQL/SQL injection).
- Avoid exposing sensitive data in client-side JS (API keys, secrets).

### Folder Structure (typical MERN backend)
```
src/
 ├─ controllers/     ← business logic per route
 ├─ routes/           ← Express route definitions
 ├─ models/            ← Mongoose schemas
 ├─ middlewares/       ← auth, error handling
 ├─ utils/             ← helper functions (debounce, formatters)
 ├─ config/            ← env, db connection
 └─ app.js
```

---

# 8. Common Beginner Mistakes

| Mistake | Why it happens | Fix |
|---|---|---|
| Using `var` everywhere | Learned from old tutorials | Use `let`/`const` |
| Confusing `==` and `===` | Coercion feels "convenient" | Always use `===` |
| Not understanding `this` in callbacks | `this` seems "global" intuitively | Use arrow functions or `.bind()` |
| Mutating state directly (`arr.push()` in React) | Doesn't realize objects are references | Use spread/immutable updates |
| Forgetting `await` | Assumes async functions run synchronously | Always `await` or `.then()` promises |
| Comparing objects with `===` | Assumes value comparison like primitives | Compare properties or use deep-equal libs |
| Infinite loops from wrong loop conditions | Off-by-one errors | Carefully trace loop bounds, use `for...of` |
| Modifying array while iterating | Doesn't know it shifts indices | Iterate a copy, or filter/map instead |
| Not handling Promise rejections | Forgets async can fail | Always add `.catch()` or `try/catch` |
| Global variable leaks | Forgetting `let/const`, assigns to `window` accidentally | Use strict mode `"use strict"` |

---

# 9. Advanced Topics

## 9.1 Generators & Iterators
```js
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
const gen = idGenerator();
gen.next().value; // 1
gen.next().value; // 2
```
Generators can pause/resume execution — the foundation async/await was originally built on top of (`co` library, redux-saga).

## 9.2 Symbols & Well-Known Symbols
```js
const id = Symbol("id"); // guaranteed unique, avoids property name collisions
class Collection {
  [Symbol.iterator]() { /* makes the class usable in for...of */ }
}
```

## 9.3 Proxy & Reflect
```js
const handler = {
  get(target, prop) {
    console.log(`Accessing ${prop}`);
    return target[prop];
  }
};
const proxied = new Proxy({ name: "Alice" }, handler);
proxied.name; // logs "Accessing name", then returns "Alice"
```
Used in libraries like Vue 3's reactivity system and validation layers.

## 9.4 Currying & Function Composition
```js
const curry = (fn) => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...more) => curry(fn)(...args, ...more);

const add3 = (a, b, c) => a + b + c;
const curriedAdd = curry(add3);
curriedAdd(1)(2)(3); // 6
```

## 9.5 Memoization
```js
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

## 9.6 Event Delegation
```js
// Instead of adding a listener to every <li>, add ONE to the parent
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") console.log(e.target.textContent);
});
```
Leverages **event bubbling** — dramatically improves performance for large/dynamic lists.

## 9.7 Microtasks vs Macrotasks (deep dive)
- Microtasks: Promise callbacks, `queueMicrotask`, `MutationObserver`
- Macrotasks: `setTimeout`, `setInterval`, I/O, UI rendering, `setImmediate` (Node)
- The engine **always drains the full microtask queue** between each macrotask — this can starve rendering if you chain too many promises.

## 9.8 WeakMap & WeakSet
Hold **weak references** — allow garbage collection of keys/values when no other reference exists. Used for private data storage and caches that shouldn't cause memory leaks.

## 9.9 Modules: CommonJS vs ES Modules
```js
// CommonJS (Node default, synchronous)
const fs = require("fs");
module.exports = myFunction;

// ES Modules (modern, static analysis, tree-shakeable)
import fs from "fs";
export default myFunction;
```
ESM is statically analyzable (enables tree-shaking/bundling optimizations); CJS is resolved at runtime.


---

# 10. Interview Questions by Chapter (with Full Answers)

> Format for every question: **Q → Pause → Ideal Answer → Why it's correct → Common wrong answer → What the interviewer is testing → Follow-ups**

## 🟢 Beginner Questions

**Q1. What is the difference between `null` and `undefined`?**

*Ideal Answer:* `undefined` means a variable has been declared but not yet assigned a value — JS itself sets this automatically. `null` is an **intentional** assignment representing "no value" — a developer explicitly sets it. `typeof undefined === "undefined"`, but `typeof null === "object"` (a long-standing JS bug kept for backward compatibility).

*Why correct:* Distinguishes "the system hasn't given a value yet" vs "a human deliberately emptied this."

*Common wrong answer:* "They're the same thing" — shows lack of depth.

*What's being tested:* Basic type system understanding, attention to JS's quirks.

*Follow-ups:* "Why does `typeof null` return `object`?" (historical bug in the first JS implementation — null was represented as the 0x00 pointer type, same as objects). "How would you check for both at once?" (`value == null` catches both due to loose equality's special-cased rule).

---

**Q2. Explain hoisting with an example.**

*Ideal Answer:* Hoisting is the JS engine's behavior of registering variable and function **declarations** in memory during the compile phase, before execution. `var` declarations are hoisted and initialized to `undefined`; function declarations are hoisted completely (usable before their definition line); `let`/`const` are hoisted into a Temporal Dead Zone and throw if accessed before their declaration line.

*Why correct:* Shows understanding of the two-phase (compile + execute) nature of JS execution.

*Common wrong answer:* "Hoisting moves code to the top of the file" — incorrect; nothing physically moves, only declarations are registered ahead of time.

*What's tested:* Deep understanding of execution phases, not just memorized behavior.

*Follow-ups:* "Is `let` hoisted?" (yes, but not initialized — TDZ). "What happens with hoisted class declarations?" (also in TDZ, cannot be used before definition).

---

**Q3. What are template literals and why use them?**

*Ideal Answer:* Template literals (ES6) use backticks and allow embedded expressions via `${}`, multi-line strings without `\n`, and are the base for tagged templates.
```js
const name = "Bob";
console.log(`Hello, ${name}! Today is ${new Date().toDateString()}.`);
```
*Why correct:* Cleaner than string concatenation, supports expressions directly.

*Common wrong answer:* "Just a way to write strings with backticks" — misses expression interpolation and multiline capability.

*What's tested:* Familiarity with modern ES6+ syntax.

---

**Q4. What is the difference between `.map()` and `.forEach()`?**

*Ideal Answer:* `.map()` returns a **new array** with transformed values and is chainable; `.forEach()` returns `undefined` and is used purely for side effects (like logging or mutating external state).

*Common wrong answer:* "They're basically the same" — misses the key return-value distinction, which affects chainability and whether the result should be used.

*What's tested:* Practical array-method fluency, used constantly in React/Express code.

---

**Q5. What is NaN and how do you correctly check for it?**

*Ideal Answer:* `NaN` ("Not a Number") is a special numeric value representing an invalid math operation (e.g., `0/0`, `"abc" * 2`). Crucially, `NaN !== NaN`. The correct check is `Number.isNaN(value)` (strict, no coercion) rather than the global `isNaN()` (which coerces first and gives false positives, e.g. `isNaN("abc")` is `true` but `isNaN(undefined)` is also `true` misleadingly).

*What's tested:* Attention to JS edge cases that trip up many developers.

---

**Q6. What's the difference between `let` and `const`?**

*Ideal Answer:* Both are block-scoped, but `const` cannot be reassigned after declaration. Important nuance: `const` prevents **reassignment**, not **mutation** — a `const` object's properties can still change.
```js
const arr = [1,2];
arr.push(3);  // ✅ fine — mutating, not reassigning
arr = [4,5];  // ❌ TypeError
```

*Common wrong answer:* "const objects are frozen/immutable" — false; use `Object.freeze()` for true immutability.

---

**Q7. What is an IIFE and why use one?**

*Ideal Answer:* An Immediately Invoked Function Expression runs as soon as it's defined, creating an isolated scope to avoid polluting the global namespace — historically used before ES6 modules/block scope existed.
```js
(function () {
  const privateVar = "hidden";
})();
```

---

**Q8. Explain `typeof` vs `instanceof`.**

*Ideal Answer:* `typeof` returns a string describing a primitive type (`"string"`, `"number"`, etc.) or `"object"`/`"function"` for references. `instanceof` checks whether an object's prototype chain includes a given constructor's `.prototype` — used to test custom object types (`arr instanceof Array`).

---

**Q9. What does `"use strict"` do?**

*Ideal Answer:* Opts code into a stricter parsing/execution mode: disallows undeclared variables, makes `this` `undefined` in plain function calls instead of the global object, throws on assignment to read-only properties, and disallows duplicate parameter names. ES6 modules and classes are strict by default.

---

**Q10. What are truthy and falsy values?**

*Ideal Answer:* JS coerces values to booleans in conditional checks. Only 8 values are falsy: `false, 0, -0, 0n, "", null, undefined, NaN`. Everything else, including `[]` and `{}`, is truthy.

*Common wrong answer:* "Empty array/object is falsy" — a very common misconception; both are actually truthy since they're objects.

---

## 🟡 Intermediate Questions

**Q11. Explain closures with a real use case.**

*Ideal Answer:* A closure lets an inner function retain access to its outer function's variables even after the outer one returns. Real use case: creating private counters, memoization caches, or React's `useState`-like patterns.
```js
function createBankAccount(balance) {
  return {
    deposit(amount) { balance += amount; return balance; },
    getBalance() { return balance; }
  };
}
const acc = createBankAccount(100);
acc.deposit(50); // balance is private, only accessible via returned methods
```

*What's tested:* Whether the candidate can apply closures practically, not just define them.

*Follow-up:* "What's a downside of closures?" (Can cause memory leaks if the closed-over data is large and the closure persists longer than needed.)

---

**Q12. Explain the event loop and predict output.**
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```
*Ideal Answer:* Output: `A, D, C, B`. Synchronous code (A, D) runs first, then the microtask queue is fully drained (C — the Promise callback), and only then does the engine pick up the macrotask (B — setTimeout), even with a 0ms delay.

*What's tested:* THE single most common JS interview question; tests real understanding vs memorized async syntax.

---

**Q13. What is the difference between `call`, `apply`, and `bind`?**

*Ideal Answer:* All three explicitly set `this`. `call(thisArg, a, b)` invokes immediately with arguments listed individually. `apply(thisArg, [a, b])` invokes immediately with arguments as an array. `bind(thisArg)` does NOT invoke immediately — it returns a new function with `this` permanently bound, useful for event handlers or delayed execution.
```js
function greet(greeting) { console.log(`${greeting}, ${this.name}`); }
const user = { name: "Alice" };
greet.call(user, "Hi");    // Hi, Alice
greet.apply(user, ["Hi"]); // Hi, Alice
const bound = greet.bind(user);
bound("Hi");               // Hi, Alice
```

---

**Q14. What are Promises and how do they solve callback hell?**

*Ideal Answer:* A Promise represents a value that may be available now, later, or never — with three states: `pending`, `fulfilled`, `rejected`. They allow chaining with `.then()`/`.catch()` instead of nesting callbacks infinitely, and can be composed with `Promise.all/race/allSettled/any`.

*Common wrong answer:* "Promises make async code synchronous" — incorrect; they don't block, they provide a structured way to handle eventual results.

---

**Q15. Explain prototypal inheritance vs classical inheritance.**

*Ideal Answer:* Classical inheritance (Java/C++) uses classes as blueprints that are instantiated. JS uses **prototypal inheritance** — objects inherit directly from other objects via the prototype chain. ES6 `class` syntax is sugar over this same prototype mechanism, not a true classical model.

---

**Q16. What is the difference between shallow copy and deep copy? Show how to do both.**

*Ideal Answer:* A shallow copy duplicates only the top-level properties — nested objects/arrays still point to the same reference. A deep copy recursively duplicates everything.
```js
const shallow = { ...original };               // shallow
const deep = structuredClone(original);         // deep (modern browsers/Node 17+)
```

---

**Q17. What's the difference between synchronous and asynchronous code? Give a real example.**

*Ideal Answer:* Synchronous code executes line by line, blocking further execution until the current line finishes. Asynchronous code (timers, network requests, file I/O) is offloaded to Web/Node APIs, allowing the rest of the program to continue, with results delivered later via callbacks/promises/async-await.

---

**Q18. What are default parameters and rest parameters?**
```js
function greet(name = "Guest", ...rest) {
  console.log(name, rest);
}
greet(); // "Guest", []
greet("Bob", 1, 2, 3); // "Bob", [1,2,3]
```

---

**Q19. Explain destructuring with a nested example.**
```js
const { user: { name, address: { city } = {} } = {} } = response;
```
*Ideal Answer:* Destructuring extracts values from objects/arrays into variables, supporting defaults, renaming, and nesting — heavily used when consuming API responses in MERN apps.

---

**Q20. What is optional chaining (`?.`) and nullish coalescing (`??`)?**
```js
const city = user?.address?.city ?? "Unknown"; // safely access nested props, fallback if null/undefined
```
*Why it matters vs `||`:* `??` only falls back on `null`/`undefined`, whereas `||` also falls back on ANY falsy value (like `0` or `""`), which can cause subtle bugs (`count || 10` incorrectly replaces a valid `0`).

---

## 🔴 Advanced Questions

**Q21. Implement your own `bind()` function.**
```js
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;
  return function (...callArgs) {
    return fn.apply(context, [...boundArgs, ...callArgs]);
  };
};
```
*What's tested:* Deep understanding of `this`, closures, and the `apply`/prototype mechanism simultaneously — a classic staff-level question.

---

**Q22. What's the difference between microtasks and macrotasks? Why does it matter for performance?**

*Ideal Answer:* Microtasks (Promises) run to completion BEFORE the engine yields to the next macrotask (timers, I/O, rendering). Chaining excessive promises can therefore **starve rendering/UI updates**, since the browser won't repaint until the microtask queue is empty.

---

**Q23. Explain currying and give a practical use case.**

*Ideal Answer:* Currying transforms a function of multiple arguments into a sequence of functions each taking one argument, enabling partial application. Practical use: creating specialized, reusable validators or configured API request functions (e.g., `createLogger("ERROR")("message")`).

---

**Q24. How would you detect and avoid memory leaks in a JS app?**

*Ideal Answer:* Common leak sources: uncleaned `setInterval`/event listeners, growing caches without eviction, detached DOM nodes still referenced in variables, and closures unintentionally retaining large objects. Detect via Chrome DevTools Memory tab (heap snapshots, comparing over time). Avoid by cleaning up listeners/timers in cleanup functions (e.g., React's `useEffect` cleanup), using `WeakMap`/`WeakSet` for caches keyed by objects.

---

**Q25. What is the difference between `Object.freeze()`, `Object.seal()`, and `const`?**

*Ideal Answer:* `const` prevents reassignment of the variable binding only. `Object.seal()` prevents adding/removing properties but allows modifying existing ones. `Object.freeze()` prevents adding, removing, AND modifying properties (shallow — nested objects are still mutable unless recursively frozen).

---

## 📋 Scenario-Based Questions

**Q26.** *"You have a search input that fires an API call on every keystroke, and the backend is getting hammered. How do you fix this?"*
*Ideal Answer:* Implement debouncing so the API call only fires after the user pauses typing for e.g. 300ms, and/or cancel in-flight requests using `AbortController` when a newer keystroke arrives, to avoid race conditions where an older, slower response overwrites a newer one.

**Q27.** *"Your Node.js API becomes unresponsive under load. What could be happening in the JS execution model?"*
*Ideal Answer:* Since Node is single-threaded for JS execution, a CPU-heavy synchronous operation (e.g., large JSON parsing, synchronous crypto, tight loops) blocks the event loop entirely, freezing ALL other requests. Fix: offload heavy work to worker threads, child processes, or a queue/microservice, and audit for accidental synchronous blocking calls (like `fs.readFileSync`).

**Q28.** *"A user reports that clicking a button sometimes submits a form twice."*
*Ideal Answer:* Likely a race condition from lack of debouncing/disabling the button during submission, or duplicate event listener attachment (e.g., re-adding a listener on every render without cleanup). Fix: disable the button immediately on click until the request resolves, and ensure listeners are properly cleaned up.

## 🛠️ Practical / Debugging Questions

**Q29. Find the bug:**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3 — not 0, 1, 2!
```
*Ideal Answer:* `var` is function-scoped, so all three callbacks share the SAME `i`, which is `3` by the time the timeouts fire. Fix: use `let` (block-scoped — creates a new binding per iteration), or wrap in an IIFE that captures the current value.

**Q30. Why does this return `undefined` instead of throwing, and what's the fix?**
```js
const user = {};
console.log(user.address.city); // TypeError: Cannot read properties of undefined
```
*Ideal Answer:* `user.address` is `undefined`, so accessing `.city` on it throws — it does NOT return `undefined` gracefully. Fix with optional chaining: `user.address?.city`.

## 💻 Coding Questions (see full Coding Exercises section below for more)

**Q31. Reverse a string without using `.reverse()`.**
```js
function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
}
```

**Q32. Check if a string is a palindrome.**
```js
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}
```

**Q33. Flatten a nested array.**
```js
function flatten(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
// Or simply: arr.flat(Infinity)
```


---

# 11. Follow-up Questions Bank

Interviewers rarely stop at one answer. Here are realistic chains they use to probe depth:

- On **closures** → "What's a memory leak risk with closures?" → "How would you fix it?" → "How does React's `useState` conceptually relate to closures?"
- On **event loop** → "What if the Promise callback itself schedules another microtask?" (queue keeps draining until empty — can starve macrotasks) → "What's the difference between `process.nextTick` and `setImmediate` in Node?"
- On **`this`** → "What does `this` equal inside a `setTimeout` callback passed as a regular function?" (global/undefined, NOT the enclosing object) → "How do arrow functions fix this?"
- On **prototypes** → "What's the difference between `Object.create(null)` and `{}`?" (the former has NO prototype chain at all — no inherited methods like `toString`)
- On **promises** → "What happens if you don't return a promise inside a `.then()` chain?" (the next `.then()` still runs, but doesn't wait for that inner async operation — a common bug)
- On **hoisting** → "Are class declarations hoisted?" (yes, but in TDZ, same as `let`/`const`)
- On **debounce/throttle** → "What's the difference between the two?" (debounce waits for a pause; throttle guarantees execution at most once per interval, even during continuous activity)

---

# 12. Coding Exercises

## Easy
1. **FizzBuzz** — print Fizz/Buzz/FizzBuzz for 1–100.
2. **Find the max number in an array** without `Math.max(...arr)`.
3. **Count vowels** in a string.
4. **Remove duplicates** from an array using a `Set`.

```js
// #4 solution
function removeDuplicates(arr) { return [...new Set(arr)]; }
```

## Medium
5. **Group array of objects by a property** (e.g., group users by role).
```js
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    (acc[group] ||= []).push(item);
    return acc;
  }, {});
}
```
6. **Implement `Array.prototype.myMap`.**
```js
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) result.push(callback(this[i], i, this));
  return result;
};
```
7. **Debounce** function (see section 5.1).
8. **Deep equality check** between two objects.

## Hard
9. **Implement `Promise.race`, `Promise.allSettled`, and `Promise.any` manually.**
10. **Build a simple Pub/Sub (event emitter) system.**
```js
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, listener) { (this.events[event] ||= []).push(listener); }
  emit(event, ...args) { (this.events[event] || []).forEach(fn => fn(...args)); }
  off(event, listener) {
    this.events[event] = (this.events[event] || []).filter(fn => fn !== listener);
  }
}
```
11. **Implement a LRU Cache** using `Map` (insertion order matters).
```js
class LRUCache {
  constructor(capacity) { this.capacity = capacity; this.cache = new Map(); }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val); // move to "most recently used" end
    return val;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) this.cache.delete(this.cache.keys().next().value);
    this.cache.set(key, value);
  }
}
```

## Interview Level (frequently asked at top companies)
12. **Implement `curry(fn)`** (see section 9.4).
13. **Flatten nested arrays to any depth** (see Q33 above).
14. **Implement your own `bind`** (see Q21).
15. **Write a function to check for balanced parentheses** using a stack.
```js
function isBalanced(str) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };
  for (const char of str) {
    if ("([{".includes(char)) stack.push(char);
    else if (")]}".includes(char)) {
      if (stack.pop() !== pairs[char]) return false;
    }
  }
  return stack.length === 0;
}
```

---

# 13. Multiple Choice Questions (MCQs)

**MCQ 1.** What is the output of `typeof NaN`?
- A) `"NaN"`
- B) `"undefined"`
- C) `"number"` ✅
- D) `"object"`

*Explanation:* NaN is technically classified as a `number` type in JS, despite representing an invalid numeric result. (A) is wrong — there's no `"NaN"` type string. (B)/(D) confuse it with `undefined`/`null` typing quirks.

**MCQ 2.** Which of these is NOT a falsy value?
- A) `""`
- B) `"0"` ✅ (a non-empty string is truthy!)
- C) `null`
- D) `NaN`

*Explanation:* `"0"` is a string with length 1 — truthy. Only the actual number `0` is falsy, not the string `"0"`.

**MCQ 3.** What does `Array.isArray([])` return?
- A) `undefined`
- B) `false`
- C) `true` ✅
- D) throws an error

*Explanation:* This is the correct, reliable way to check for arrays (unlike `typeof []` which returns `"object"`).

**MCQ 4.** Which method does NOT mutate the original array?
- A) `.push()`
- B) `.splice()`
- C) `.map()` ✅
- D) `.sort()`

*Explanation:* `.map()` returns a brand-new array. `.push`, `.splice`, and `.sort` all mutate in place — a common interview trap since `.sort()` "looking read-only" surprises many.

**MCQ 5.** What is the result of `[] + []`?
- A) `[]`
- B) `""` ✅
- C) `NaN`
- D) Error

*Explanation:* The `+` operator coerces both arrays to strings (`""` each) via `toString()`, then concatenates → empty string.

**MCQ 6.** What does this log?
```js
console.log(1 + "1");
console.log(1 - "1");
```
- A) `"11"`, `0` ✅
- B) `2`, `0`
- C) `"11"`, `"0"`
- D) Error, `0`

*Explanation:* `+` with a string triggers string concatenation (`"11"`); `-` forces numeric coercion (`1 - 1 = 0`).

**MCQ 7.** Which correctly describes `let` block scoping?
- A) Accessible throughout the entire function
- B) Accessible only within the nearest enclosing `{ }` ✅
- C) Accessible globally
- D) Not accessible after declaration

---

# 14. Flashcards (Revision)

| Front (Question) | Back (Answer) |
|---|---|
| What is a closure? | A function that retains access to its outer scope's variables even after the outer function returns |
| `==` vs `===`? | `==` coerces types before comparing; `===` compares value+type strictly |
| What is the event loop? | The mechanism that lets JS handle async operations by moving completed callbacks from queues to the call stack when it's empty |
| Microtask vs Macrotask priority? | Microtasks (Promises) always run before the next macrotask (setTimeout, etc.) |
| `null` vs `undefined`? | `undefined` = not yet assigned (system); `null` = intentionally empty (developer) |
| What does `this` refer to in an arrow function? | The `this` of its enclosing lexical scope — arrow functions have no own `this` |
| What is hoisting? | Declarations are registered in memory before code execution; `var` → `undefined`, `let/const` → TDZ |
| `call` vs `apply` vs `bind`? | `call`(args individually)/`apply`(args as array) invoke immediately; `bind` returns a new bound function for later |
| What is the prototype chain? | The link between an object and the object it inherits properties/methods from, up to `Object.prototype` → `null` |
| Debounce vs Throttle? | Debounce: wait for pause then fire once. Throttle: fire at most once per fixed interval regardless of activity |
| Falsy values (all 8)? | `false, 0, -0, 0n, "", null, undefined, NaN` |
| Stack vs Heap? | Stack: primitives + references (fixed size, LIFO). Heap: objects/functions (dynamic, unstructured) |

---

# 15. One-Page Cheat Sheet

```
VARIABLES        let/const (block) > var (function, avoid)
EQUALITY         Always use === / !==
TYPES            string, number, boolean, undefined, null, symbol, bigint, object
TRUTHY/FALSY     Falsy: false 0 -0 0n "" null undefined NaN  → else truthy
THIS             obj.method() → obj | plain fn() → undefined/global
                 arrow fn → lexical (inherited) | new Fn() → new instance
                 call/apply → explicit | bind → returns new bound fn
CLOSURE          Inner fn remembers outer fn's variables after it returns
HOISTING         var → undefined | let/const → TDZ | function decl → fully hoisted
EVENT LOOP       Sync code → drain ALL microtasks (Promises) → 1 macrotask (setTimeout) → repeat
ARRAY METHODS    map (transform,new) filter (select,new) reduce (accumulate)
                 forEach (side-effect,no return) find/some/every (boolean/value)
ASYNC            Promise states: pending/fulfilled/rejected
                 async/await = sugar over Promises
                 Promise.all → fails fast, preserves order
                 Promise.allSettled → waits for all, never rejects
SPREAD/REST      ...arr (spread: expand) | function(...args) (rest: collect)
DESTRUCTURE      const {a,b:renamed=default} = obj
OPTIONAL CHAIN   obj?.prop?.nested ?? fallback
MODULES          ESM: import/export (static) | CJS: require/module.exports (dynamic)
```


---

# 16. Revision Notes by Time Budget

### ⏱️ 5-Minute Revision
- `let/const` > `var`; always `===`
- Falsy values: `false 0 -0 0n "" null undefined NaN`
- Closures = inner fn remembers outer scope
- Event loop: sync → microtasks (Promises) → macrotasks (setTimeout)
- `this`: depends on HOW called, not where defined (except arrows)

### ⏱️ 15-Minute Revision
Add to the above:
- Hoisting (var/let/const/function differences + TDZ)
- Prototype chain & how `class` is sugar over it
- `call`/`apply`/`bind` differences
- Array methods: map/filter/reduce/forEach/find/some/every
- Promise states + `Promise.all` vs `allSettled` vs `race` vs `any`

### ⏱️ 30-Minute Revision
Add to the above:
- Full memory model: stack vs heap, garbage collection (mark & sweep)
- Debounce vs throttle (concept + code)
- Currying, memoization, generators
- Deep vs shallow copy techniques
- CommonJS vs ES Modules
- WeakMap/WeakSet use cases

### ⏱️ 1-Hour Revision
Add to the above:
- Re-implement from scratch: `bind`, `debounce`, `Promise.all`, `deepClone`, `curry`
- Walk through 5 event-loop output-prediction snippets
- Review all "Common Beginner Mistakes" table
- Review all Scenario-Based Questions (search debounce, blocking event loop, double-submit bug)
- Skim the full FAQ bank below for anything unfamiliar

---

# 17. Common Bugs — Causes, Debugging, Fixes

| Bug | Why it Happens | How to Debug | Fix |
|---|---|---|---|
| `this` is `undefined` inside a callback | Regular function loses caller context when passed as reference | Log `this` at the top of the function | Use arrow function or `.bind(this)` |
| Loop variable always shows last value in async callbacks | `var` is function-scoped, shared across iterations | Log the loop variable inside vs outside the timeout | Switch to `let` |
| "Cannot read properties of undefined" | Accessing nested property on an object that doesn't exist yet (e.g., before API data loads) | Check network tab / add console.log before the access line | Use optional chaining `?.` with sensible defaults |
| Unexpected mutation of shared state | Passing objects/arrays by reference and mutating them elsewhere | Use `console.trace()` to see all mutation call sites | Use spread/`structuredClone` for copies before mutating |
| Infinite re-render loop (React + JS interplay) | New object/array/function reference created every render, triggering effect re-runs | Check dependency arrays in `useEffect` | Memoize with `useMemo`/`useCallback`, or move constants outside |
| Unhandled promise rejection crashes Node process | Missing `.catch()` or `try/catch` around `await` | Check for `UnhandledPromiseRejectionWarning` in logs | Wrap every await in try/catch or add global handler |
| Off-by-one errors in loops | Miscounting `<` vs `<=` bounds | Manually trace first/last iteration | Carefully verify boundary conditions, prefer `.length` checks |
| Memory leak from uncle­aned timers/listeners | Component/module re-mounted repeatedly without cleanup | Chrome DevTools → Memory → heap snapshot diff | Clear intervals/timeouts and remove listeners on teardown |

---

# 18. Production Interview Stories (What Seniors Expect)

**Story 1 — "Our checkout button let users submit orders twice."**
A senior engineer expects you to identify this as a **race condition + missing debounce/disable-state** issue, articulate the user impact (duplicate charges), propose BOTH a frontend fix (disable button + AbortController for in-flight requests) and a backend safeguard (idempotency keys) — showing you think beyond just the JS snippet to the full system.

**Story 2 — "Our Node API's response times spike randomly under load."**
Expected reasoning: since Node is single-threaded for JS execution, any synchronous CPU-heavy code (e.g., JSON.stringify on huge payloads, synchronous regex on large strings, sync crypto calls) blocks the event loop for ALL concurrent requests, not just one. A senior candidate profiles with `--prof`/Chrome DevTools, identifies the blocking function, and proposes async alternatives, streaming, or offloading to worker threads.

**Story 3 — "A junior developer used `==` throughout the codebase and a bug slipped into production."**
Interviewers want you to explain the SPECIFIC coercion rule that caused the bug (e.g., `"" == 0` was true unexpectedly), not just say "use `===`". Then discuss how ESLint rules (`eqeqeq`) prevent this class of bug at the team level — showing process maturity, not just individual fixes.

**Story 4 — "Users report the app 'freezes' for a second when they click a button."**
Expected reasoning: something synchronous and expensive is blocking the main thread (e.g., a large `.filter()`/`.sort()` on the client, or a heavy synchronous computation). Senior-level answer discusses chunking work, `requestIdleCallback`/Web Workers, or moving the computation server-side.


---

# 19. Extended FAQ Bank (Quick-Answer Format)

> These are additional to the fully-worked questions in Section 10. Answers here are concise by design — for full "why/wrong-answer/interviewer-intent" breakdowns, apply the same reasoning patterns shown in Section 10.

## Beginner FAQ (40)

1. **What is JavaScript used for?** Web interactivity, servers (Node), mobile apps (React Native), automation scripts.
2. **What is ECMAScript?** The official specification standard JavaScript implements.
3. **Difference between `Number()` and `parseInt()`?** `Number()` converts the whole string strictly (fails on trailing junk); `parseInt()` parses leading numeric characters and stops at the first invalid one.
4. **What does `NaN` stand for?** Not a Number — result of an invalid math operation.
5. **What is a template literal?** Backtick strings supporting `${expr}` interpolation and multi-line text.
6. **What is the `typeof` operator used for?** Returns a string naming a value's primitive type.
7. **What's an array?** An ordered, index-based collection — technically a special kind of object in JS.
8. **How do you add an element to an array?** `.push()` (end), `.unshift()` (start), or spread into a new array.
9. **What is a function?** A reusable block of code that performs a task and can return a value.
10. **What's the difference between a parameter and an argument?** Parameter = placeholder in the function definition; argument = actual value passed at call time.
11. **What is JSON?** JavaScript Object Notation — a lightweight, language-independent data format based on JS object syntax.
12. **How do you convert an object to JSON?** `JSON.stringify(obj)`.
13. **How do you parse JSON into an object?** `JSON.parse(jsonString)`.
14. **What is the DOM?** Document Object Model — the browser's tree representation of an HTML page that JS can manipulate.
15. **How do you select an element in the DOM?** `document.querySelector()` / `getElementById()`.
16. **What is an event listener?** A function registered to run when a specific event (click, input, etc.) occurs on an element.
17. **What is a ternary operator?** `condition ? valueIfTrue : valueIfFalse` — a compact if/else.
18. **What does `===` check that `==` doesn't?** Type, in addition to value.
19. **What is string interpolation?** Embedding variables/expressions directly inside a string via template literals.
20. **What's the difference between `String()` and `.toString()`?** Functionally similar for most values, but `String()` safely handles `null`/`undefined` (returns `"null"`/`"undefined"`) while calling `.toString()` on them throws.
21. **What is an array method that removes the last element?** `.pop()`.
22. **What is an array method that removes the first element?** `.shift()`.
23. **What's the difference between `.slice()` and `.splice()`?** `.slice()` returns a new array (non-mutating); `.splice()` mutates the original, inserting/removing elements.
24. **What is a for...of loop used for?** Iterating over iterable values (arrays, strings, maps, sets) directly.
25. **What is a for...in loop used for?** Iterating over an object's enumerable property KEYS (use with caution on arrays).
26. **What does `Array.isArray()` do?** Reliably checks if a value is an array (unlike `typeof`).
27. **What is an anonymous function?** A function without a name, often used as a callback or expression.
28. **What is a callback function?** A function passed as an argument to be executed later/after some operation completes.
29. **What does `.length` return on a string?** The number of UTF-16 code units (characters) in the string.
30. **How do you check if a key exists in an object?** `"key" in obj` or `Object.hasOwn(obj, "key")`.
31. **What is an object literal?** Defining an object directly with `{ key: value }` syntax.
32. **What's the difference between a method and a function?** A method is a function stored as a property of an object.
33. **What does `console.table()` do?** Displays array/object data as a formatted table in devtools — useful for debugging.
34. **What is `undefined + 1`?** `NaN` — arithmetic with `undefined` always yields `NaN`.
35. **What is string concatenation?** Joining strings together, via `+` or template literals.
36. **What is a boolean?** A primitive type with exactly two values: `true`/`false`.
37. **How do you comment code in JS?** `//` single line, `/* */` multi-line.
38. **What is the global object in browsers?** `window`.
39. **What is the global object in Node.js?** `global` (or `globalThis` universally across environments).
40. **What does `Array.prototype.includes()` do?** Checks whether an array contains a given value, returns boolean (handles `NaN` correctly unlike `indexOf`).

## Intermediate FAQ (40)

1. **What's the difference between synchronous and asynchronous JavaScript?** Sync blocks execution until done; async offloads work and continues, resolving later via callbacks/promises.
2. **Explain `Promise.all` vs `Promise.allSettled`.** `all` rejects immediately if any promise fails; `allSettled` waits for every promise and reports each outcome (fulfilled/rejected) without short-circuiting.
3. **What is a higher-order function?** A function that takes another function as an argument and/or returns a function.
4. **What is function composition?** Combining multiple functions so the output of one becomes the input of the next.
5. **What's the difference between `Object.keys`, `values`, and `entries`?** Return arrays of an object's keys, values, or `[key, value]` pairs respectively.
6. **What is the spread operator used for beyond arrays?** Merging objects, copying objects/arrays shallowly, passing array elements as individual function arguments.
7. **What's a Set used for?** Storing unique values with fast O(1) lookup/insertion, unlike arrays which require `.includes()` scans.
8. **What's a Map vs a plain object?** Maps allow any type as keys (not just strings/symbols), maintain insertion order reliably, and have a `.size` property.
9. **What is event bubbling?** An event triggered on a nested element propagates upward through its ancestors unless stopped.
10. **What is event capturing?** The opposite phase — events travel DOWN from the root to the target before bubbling back up.
11. **How do you stop event propagation?** `event.stopPropagation()`.
12. **How do you prevent a form's default submission?** `event.preventDefault()`.
13. **What is `async`/`await` syntactic sugar for?** Promises — `await` pauses execution within the async function until the promise settles, without blocking the rest of the program.
14. **What happens if you `await` a non-promise value?** It's automatically wrapped in `Promise.resolve()` and resolves immediately.
15. **How do you handle errors in async/await code?** Wrap in `try/catch`.
16. **What is a generator function?** A function (`function*`) that can pause (`yield`) and resume execution, producing a sequence of values lazily.
17. **What's the difference between `Array.prototype.find` and `filter`?** `find` returns the FIRST matching element (or `undefined`); `filter` returns ALL matching elements as a new array.
18. **What is destructuring with default values?** Providing a fallback when the destructured property is `undefined`: `const { a = 5 } = obj`.
19. **What is a module in JavaScript?** A file with its own scope that explicitly exports/imports functionality, avoiding global namespace pollution.
20. **Difference between default and named exports?** Default: one per module, imported with any name. Named: multiple per module, must be imported with matching (or aliased) names.
21. **What is tree-shaking?** A bundler optimization that removes unused exported code, possible because ES Modules are statically analyzable.
22. **What is the difference between `Object.freeze` and deep immutability?** `freeze` is shallow — nested objects remain mutable unless recursively frozen.
23. **What's a pure function?** A function that, given the same input, always returns the same output and has no side effects.
24. **What is immutability and why does it matter in state management (Redux/React)?** Treating data as unchangeable — instead of mutating, you create new copies — which lets frameworks efficiently detect changes via reference comparison.
25. **What's the difference between `Array.from()` and the spread operator for converting iterables?** Functionally similar for simple cases; `Array.from` additionally accepts a mapping function as a second argument.
26. **What is a Proxy used for?** Intercepting fundamental operations (get/set/delete) on an object — used in reactivity systems and validation.
27. **What's the difference between `WeakMap` and `Map`?** `WeakMap` keys must be objects and are weakly referenced (garbage-collectable); `Map` keys can be any type and are strongly referenced.
28. **What is memoization?** Caching a function's results based on its inputs to avoid redundant expensive recomputation.
29. **What is throttling?** Ensuring a function executes at most once per specified time interval, regardless of how often it's triggered.
30. **What's the difference between debounce and throttle, with a real use case each?** Debounce: search input (wait for typing pause). Throttle: scroll event handler (fire at a controlled steady rate).
31. **What does the `new` keyword actually do?** Creates a new object, sets its prototype to the constructor's `.prototype`, binds `this` to it, executes the constructor, and returns the object (unless the constructor explicitly returns another object).
32. **What is a class in JS really?** Syntactic sugar over constructor functions + prototype-based inheritance.
33. **What are static methods in a class?** Methods called on the class itself, not on instances (`ClassName.method()`), often used for utility/factory functions.
34. **What are getters and setters?** Special methods that let you define computed properties accessed like plain fields (`get`/`set` keywords).
35. **What's the difference between `Array.prototype.sort()` default behavior and providing a comparator?** Default sort coerces elements to strings (numeric sort breaks: `[10,2,1].sort()` → `[1,10,2]`); a comparator `(a,b) => a-b` fixes numeric sorting.
36. **What is `structuredClone()`?** A modern built-in deep-clone function supporting complex types (Dates, Maps, Sets, circular refs) without libraries.
37. **What's an async generator?** A generator function (`async function*`) that yields promises, iterable with `for await...of`.
38. **What is `Array.prototype.flatMap()`?** Maps each element then flattens the result by one level — combines `.map()` + `.flat(1)`.
39. **What's the difference between `Object.assign()` and the spread operator for merging objects?** Functionally similar for shallow merges; spread is more concise and commonly preferred in modern code.
40. **What is a Symbol used for?** Creating guaranteed-unique property keys to avoid naming collisions, and implementing well-known protocols (like `Symbol.iterator`).

## Advanced FAQ (40)

1. **Explain how the V8 engine optimizes JavaScript.** Uses Ignition (bytecode interpreter) for fast startup and TurboFan (JIT) to recompile "hot" functions into optimized machine code based on runtime type feedback.
2. **What are hidden classes in V8?** Internal representations V8 creates for objects with the same shape (same properties in same order), enabling fast property access — changing an object's shape dynamically can "deoptimize" this.
3. **What is inline caching?** A V8 optimization that remembers where a property was found on a previous access to speed up repeated lookups of the same shape.
4. **How does garbage collection's Mark-and-Sweep algorithm work?** Starting from root references (globals, active call stack), the GC marks all reachable objects; unmarked (unreachable) objects are swept and their memory reclaimed.
5. **What is the difference between the microtask queue and the callback queue in Node.js specifically?** Node has additional phases (`process.nextTick` queue runs before even microtasks, then microtasks, then macrotask phases like timers, I/O callbacks, `setImmediate`).
6. **Explain `process.nextTick()` vs `setImmediate()` in Node.js.** `nextTick` callbacks run before the event loop continues to the next phase (higher priority); `setImmediate` runs in the "check" phase, after I/O callbacks.
7. **How would you implement your own `Promise` class from scratch (conceptually)?** Track state (pending/fulfilled/rejected), maintain callback queues for `.then()`, and ensure callbacks fire asynchronously (via microtask) even if the promise is already settled.
8. **What is a thunk and how does it relate to async flow control?** A function that wraps an async operation and takes a callback — an intermediate pattern used before promises became standard (still seen in `redux-thunk`).
9. **What's the difference between structural typing and nominal typing, and how does this relate to duck typing in JS?** JS relies on structural/duck typing at runtime — if an object "quacks" (has the right shape/methods), it can be used, regardless of its "declared" type (which JS doesn't have without TypeScript).
10. **How does `async`/`await` interact with error boundaries in a loop?** Errors thrown inside an async loop iteration must be caught individually (`try/catch` per iteration) or they'll reject the entire outer promise/abort remaining iterations depending on structure.
11. **What is tail call optimization and does JS support it?** Reusing the current stack frame for a function's final call instead of pushing a new one; specified in ES6 but NOT implemented in most engines (including V8) in practice.
12. **What's the difference between `Object.create(proto)` and using a constructor function?** `Object.create` directly sets the prototype of a new object without running any constructor logic — a more primitive/manual way to establish inheritance.
13. **Explain the module resolution algorithm difference between CJS and ESM.** CJS resolves and loads modules synchronously at require-time (supports conditional/dynamic requires easily); ESM resolves imports statically at parse time (enables tree-shaking, but historically complicated dynamic imports until `import()`).
14. **What are Web Workers and how do they help with JS's single-threaded limitation?** They run scripts on background threads separate from the main thread, communicating via message passing — useful for CPU-heavy work without freezing the UI.
15. **What is the difference between `Worker` threads (Node) and clustering?** Worker threads share memory (via `SharedArrayBuffer`) and are lighter for CPU-bound parallel tasks within one process; clustering spins up multiple full Node processes to utilize multiple CPU cores for handling more concurrent requests.
16. **How does JS handle integer precision, and what problem does `BigInt` solve?** Numbers are IEEE-754 doubles, safely representing integers only up to `2^53-1`; `BigInt` allows arbitrary-precision integers beyond that limit.
17. **What is a race condition in async JS code and how do you prevent one?** When multiple async operations affecting shared state resolve in an unpredictable order, causing incorrect results; prevent via request cancellation (`AbortController`), sequence/version tracking, or mutexes/locks in concurrent contexts.
18. **Explain how `Array.prototype.sort()`'s stability guarantee changed across ECMAScript versions.** Modern engines (ES2019+) guarantee a STABLE sort (equal elements retain relative order); older engines didn't guarantee this.
19. **What is the difference between shallow and deep equality, and how would you implement deep equality?** Shallow compares only top-level references; deep recursively compares nested values — implement via recursive key-by-key comparison or libraries like lodash's `isEqual`.
20. **How does `this` behave differently in class methods vs regular object methods when destructured/passed as callbacks?** Both lose their bound context when passed as a plain reference (e.g., `onClick={obj.method}`); class methods aren't auto-bound unless using arrow function class fields or explicit `.bind()` in the constructor.
21. **What is the "revealing module pattern"?** A design pattern using an IIFE to encapsulate private state/functions and explicitly return (reveal) only the public API.
22. **Explain how JS achieves "concurrency" without true multi-threading for I/O.** Delegates I/O operations to the underlying OS/libuv thread pool (Node) or browser APIs, while the JS main thread remains free; results are queued back via the event loop when ready.
23. **What's a common pitfall with `for...in` on arrays?** It iterates over ALL enumerable properties including inherited/non-index ones, and doesn't guarantee numeric order — use `for...of` or `.forEach` for arrays instead.
24. **How do you implement a simple polyfill for `Array.prototype.reduce`?**
```js
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  const startIdx = initialValue !== undefined ? 0 : 1;
  for (let i = startIdx; i < this.length; i++) acc = callback(acc, this[i], i, this);
  return acc;
};
```
25. **What is the difference between `Reflect` and directly manipulating objects?** `Reflect` provides the same low-level operations (get/set/delete/etc.) as regular syntax but as explicit function calls that return booleans/values consistently — mainly used alongside `Proxy` traps.
26. **How does JS's single-threaded model interact with `SharedArrayBuffer` and Atomics?** These allow genuinely shared memory between Worker threads with atomic (race-condition-free) read/write operations — a rare exception to JS's "share nothing" concurrency model.
27. **What is a common performance issue with deeply nested object spreading in loops, and how do you fix it?** Repeated shallow copying in a loop is O(n) per operation, leading to O(n²) overall — fix by using mutable accumulation patterns (e.g., building with `push`/direct assignment) inside the loop, only creating the final immutable copy once outside.
28. **Explain the difference between `Function.prototype.call` performance and modern spread-based invocation.** Historically `.apply` with array arguments was less optimized than direct calls; modern engines have largely closed this gap, but it's still a discussed micro-optimization topic in performance interviews.
29. **What is "referential transparency" and why does it matter for testing?** A pure-function property where an expression can be replaced by its value without changing program behavior — makes unit tests predictable and enables memoization/parallelization safely.
30. **How would you implement a basic dependency-free "reactive" state system using `Proxy`?** Wrap state in a `Proxy` whose `set` trap triggers registered subscriber callbacks — the conceptual foundation of frameworks like Vue 3's reactivity.
31. **What is the difference between `Array.prototype.at(-1)` and `arr[arr.length - 1]`?** Functionally equivalent for reading the last element; `.at()` (ES2022) additionally supports negative indices directly and works cleanly on any indexable, improving readability.
32. **How does V8 handle small integer caching (SMI)?** Small integers are stored directly (not boxed as full heap objects) for performance — arithmetic on them is significantly faster than on "boxed" numbers/objects.
33. **What's the danger of using `for...of` with `Object.entries()` inside extremely hot loops?** Creates new arrays/iterators on every call, adding GC pressure; in perf-critical code, a plain indexed loop or cached key array may be preferred.
34. **How do JS engines handle Tail-recursive functions if TCO isn't implemented?** They still push a new stack frame per call, so deep recursion (even "tail-call shaped") can still overflow the stack in most engines — convert to iterative solutions for very deep recursion.
35. **What's the difference between `Object.getOwnPropertyNames()` and `Object.keys()`?** `getOwnPropertyNames` includes non-enumerable properties too; `Object.keys` only returns enumerable own properties.
36. **What is a "microtask starvation" bug and how do you spot it?** Continuously scheduling new microtasks from within microtask callbacks (e.g., recursive `.then()` chains) can indefinitely delay rendering/macrotasks; spotted via unresponsive UI despite an "active" JS thread.
37. **How does `async function` return value wrapping work internally?** Any value returned from an `async function` is automatically wrapped in a resolved Promise, even if it's already a promise (in which case it "flattens"/adopts that promise's state).
38. **What's the difference between structural sharing and full deep cloning in state management libraries?** Structural sharing (used by Immer/Redux Toolkit) reuses unchanged nested references, only creating new objects along the "path" that changed — more efficient than full deep clones.
39. **How would you detect an infinite microtask loop causing UI freeze in production?** Performance profiling would show the main thread as "busy" continuously with Promise callback frames and no macrotask/paint entries — visible in Chrome Performance tab timeline gaps.
40. **What is the difference between eager and lazy evaluation, and where does JS lean?** Eager evaluates expressions immediately (JS's default for most expressions); lazy defers until needed (JS approximates this via generators, `??`/`&&` short-circuiting, and Promise's deferred execution model).


---

# 20. Company-Specific Interview Questions (Adapted for MERN Developers)

### 🔵 Google
- "Explain the event loop in detail and predict output of a mixed setTimeout/Promise snippet." (tests fundamentals rigor)
- "Implement a debounce/throttle function from scratch, then explain Big-O of your implementation."
- "Design a simple in-memory LRU cache using JS data structures." (Map-based, see Section 12)
- Follow-up style: expects you to discuss trade-offs (time/space complexity) unprompted.

### 🟦 Microsoft
- "Walk through how prototypal inheritance works and how ES6 classes relate to it."
- "Given this buggy React/Node code snippet using `var` in a loop with async callbacks, find and fix the bug."
- "How would you structure error handling across an Express + MongoDB API using async/await?"

### 🟧 Amazon
- Heavy focus on **behavioral + practical scenario** questions layered onto JS fundamentals: "Tell me about a time you fixed a performance bug caused by JS execution model (blocking event loop). What was your debugging process?"
- "Implement `Promise.all` from scratch." (see Section 5.3)
- Expects **Leadership Principles** framing (Ownership, Dive Deep) even in technical answers.

### 🟪 Meta
- "Explain closures and how they relate to React's `useState`/`useCallback` under the hood."
- "What's the difference between reconciliation and the JS event loop — how do they interact when state updates happen inside a `setTimeout`?"
- Fast-paced coding round: implement a debounced search feature with cancellation (AbortController) live.

### 🔴 Netflix
- Focus on **scale and performance**: "How would you avoid blocking Node's event loop while processing large video-metadata JSON payloads?"
- "Explain memory leak sources in long-running Node services and how you'd detect them in production."

### 🟢 Modern Startups
- Practical, less theoretical: "Build a working autocomplete/search box with debounce in 20 minutes."
- "Refactor this callback-hell code to use async/await."
- Often combine JS fundamentals directly with a live small feature build (reflects real day-to-day work).
