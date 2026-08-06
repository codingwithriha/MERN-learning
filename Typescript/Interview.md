# 📘 TypeScript Interview Handbook
### The Complete Guide — From Absolute Beginner to Interview Expert

> **Status:** Part 1 of N — this document is being built section by section.
> Part 1 covers: Introduction → Core Concepts → Internal Working → Beginner Interview Questions.
> Later parts will append: Intermediate/Advanced concepts, more interview questions, coding exercises, MCQs, flashcards, cheat sheet, company-specific questions, and the final checklist.

---

## Table of Contents

1. [Introduction to TypeScript](#1-introduction-to-typescript)
2. [Core Concepts](#2-core-concepts)
3. [Internal Working (How TypeScript Actually Works)](#3-internal-working)
4. [Visual Diagrams](#4-visual-diagrams)
5. [Code Examples](#5-code-examples)
6. [Real-World Usage](#6-real-world-usage)
7. [Best Practices](#7-best-practices)
8. [Common Beginner Mistakes](#8-common-beginner-mistakes)
9. [Beginner Interview Questions (Part 1 batch)](#9-beginner-interview-questions)

---

## 1. Introduction to TypeScript

### 1.1 What is TypeScript?

TypeScript is a **statically typed superset of JavaScript** developed and maintained by **Microsoft**. "Superset" means every valid JavaScript program is also a valid TypeScript program — TypeScript doesn't replace JavaScript, it *adds* a type system on top of it.

At its core, TypeScript = **JavaScript + Static Types + Compile-Time Checking**.

You write `.ts` files, the TypeScript compiler (`tsc`) checks your code for type errors, and then **compiles ("transpiles") it down to plain JavaScript** that runs in any browser or Node.js environment — because browsers and Node.js don't understand TypeScript directly; they only understand JavaScript.

```
Your .ts code  --->  TypeScript Compiler (tsc)  --->  Plain .js code  --->  Runs in Browser/Node
   (types checked here)                                  (types are GONE here)
```

### 1.2 Why Was TypeScript Created?

JavaScript was originally designed in **10 days in 1995** by Brendan Eich, intended for small scripts on web pages — form validation, simple animations. It was never designed for building massive applications with millions of lines of code, dozens of engineering teams, and long-term maintenance.

As JavaScript applications grew (Gmail, Facebook, large enterprise apps), teams ran into recurring pain:

- Bugs like `undefined is not a function` that only showed up **at runtime**, sometimes in production, sometimes only for a specific user.
- No way to know what shape an object was supposed to have without reading through the whole codebase.
- Refactoring was terrifying — renaming a property could silently break code elsewhere with no warning.
- Autocomplete in editors was weak because the editor didn't know what properties/methods existed on a variable.

Microsoft, dealing with these exact issues while building large-scale web applications, created TypeScript in **2012** (led by Anders Hejlsberg, who also created C# and Turbo Pascal) to solve this by adding a **type system** — a way to describe the "shape" of data — that catches errors **before the code ever runs**.

### 1.3 Why Do Companies Use TypeScript?

| Reason | Explanation |
|---|---|
| **Catch bugs early** | Type errors are caught at compile-time (while writing code), not at runtime (in production, in front of users). |
| **Better autocomplete & IntelliSense** | Editors like VS Code know exactly what properties/methods exist, because types describe the shape of data. |
| **Self-documenting code** | A function signature like `function getUser(id: number): User` tells you everything without reading the implementation. |
| **Safer refactoring** | Rename a property, and TypeScript immediately shows you every place that breaks — across the entire codebase. |
| **Easier onboarding** | New engineers can understand data shapes and function contracts without asking senior devs or digging through code. |
| **Scales to large teams** | Contracts (interfaces/types) between frontend, backend, and different teams become explicit and enforced. |

Companies like Google, Microsoft, Airbnb, Slack, Asana, and most modern startups either mandate TypeScript or strongly prefer it for anything beyond a small prototype.

### 1.4 Real-World Analogy

Think of JavaScript as **ordering food by describing it verbally** to a chef with no menu — "give me something spicy, maybe chicken, not too oily." The chef (the JavaScript engine) will try its best and only tell you it went wrong *after* they've cooked it and served it to you (runtime error).

TypeScript is like **filling out a structured order form**: "Dish: Chicken Biryani, Spice Level: Medium, Portion: Large." If you write something invalid — like writing "Purple" under Spice Level — the waiter (the TypeScript compiler) catches it immediately and tells you to fix it **before** it ever reaches the kitchen. Nothing gets cooked (executed) until the order form is valid.

Another analogy: JavaScript is like driving without a seatbelt or dashboard warnings — it might be fine for a short, careful trip, but risky at highway speed with a team of people in the car. TypeScript is the seatbelt + dashboard warning lights: it doesn't stop you from driving, but it warns you the moment something is wrong.

### 1.5 History of TypeScript

| Year | Milestone |
|---|---|
| 2010 | Internal design work begins at Microsoft, led by Anders Hejlsberg |
| 2012 | TypeScript 0.8 publicly released (October 1, 2012) |
| 2014 | TypeScript 1.0 released |
| 2015 | TypeScript adds support for ES2015 (ES6) classes, modules, arrow functions |
| 2016 | TypeScript 2.0 introduces **non-nullable types**, a huge safety milestone |
| 2018 | TypeScript 3.0 — project references, tuple improvements |
| 2020 | TypeScript 4.0 — variadic tuple types |
| 2021+ | Continued rapid growth; becomes the de-facto standard for large-scale JS projects (React, Angular, Vue 3, Node.js ecosystems) |
| Ongoing | TypeScript team is actively working on a **native (Go-based) compiler port** for massive speed improvements |

### 1.6 Advantages of TypeScript

- ✅ Catches type-related bugs at compile time, before code runs.
- ✅ Excellent editor tooling — autocomplete, inline docs, jump-to-definition.
- ✅ Makes large codebases and large teams manageable.
- ✅ Self-documenting — types act as always-up-to-date documentation.
- ✅ Gradual adoption — you can convert a JS project to TS file by file.
- ✅ Huge ecosystem — almost every popular npm package ships type definitions (or has them via `@types/...`).
- ✅ Works seamlessly with React, Node.js, Express, Next.js, and virtually every modern JS framework.

### 1.7 Disadvantages of TypeScript

- ❌ Extra learning curve — you must learn the type system on top of JavaScript.
- ❌ More upfront code (type annotations) for simple scripts — can feel like overhead for tiny projects.
- ❌ Compilation step required — you can't just run `.ts` files directly in a browser.
- ❌ Type definitions for some third-party libraries can be missing, outdated, or wrong.
- ❌ Can create a false sense of total safety — TypeScript types **disappear at runtime**; they don't validate data coming from outside your program (API responses, user input, `JSON.parse`) unless you add runtime validation too.
- ❌ Complex advanced types (conditional types, mapped types) can become genuinely hard to read and debug.

---

## 2. Core Concepts

### 2.1 Static Typing vs Dynamic Typing

**Dynamic typing (JavaScript):** A variable's type is determined **at runtime**, and can change.

```javascript
let value = 5;        // value is a number right now
value = "hello";      // now it's a string — totally legal in JS
```

**Static typing (TypeScript):** A variable's type is checked **at compile time**, and once assigned, generally cannot change to an incompatible type.

```typescript
let value: number = 5;
value = "hello";   // ❌ Compile-time Error: Type 'string' is not assignable to type 'number'.
```

> **Interview angle:** Interviewers love asking "what's the difference between static and dynamic typing, and where does TypeScript fit?" The precise answer: TypeScript adds **optional static typing** on top of JavaScript's dynamic typing — but remember, TypeScript's types are erased at compile time, so at runtime, the code is still plain dynamically-typed JavaScript underneath.

### 2.2 Type Inference

You don't always have to write explicit types — TypeScript is smart enough to **infer** (guess) the type from the assigned value.

```typescript
let age = 25;          // inferred as number
let name = "Alice";    // inferred as string
let isAdmin = false;   // inferred as boolean

age = "twenty-five";   // ❌ Error — TS inferred `age` as number, and remembers it
```

### 2.3 Primitive Types

| Type | Example | Notes |
|---|---|---|
| `string` | `"hello"`, `'hi'`, `` `template` `` | Text data |
| `number` | `42`, `3.14`, `-7` | TypeScript has ONE number type (no `int`/`float` split) |
| `boolean` | `true`, `false` | |
| `null` | `null` | Represents "intentionally empty" |
| `undefined` | `undefined` | Represents "not yet assigned" |
| `bigint` | `100n` | For integers beyond `Number.MAX_SAFE_INTEGER` |
| `symbol` | `Symbol("id")` | Unique, immutable identifiers |

```typescript
let username: string = "john_doe";
let age: number = 30;
let isVerified: boolean = true;
let bigNumber: bigint = 9007199254740993n;
let uniqueId: symbol = Symbol("id");
```

### 2.4 `any`, `unknown`, `never`, `void`

These four are commonly confused in interviews — know them cold.

```typescript
// `any` — disables type checking entirely. Avoid it; it's an escape hatch.
let data: any = 5;
data = "now a string";  // ✅ allowed, no error, no safety
data.foo.bar.baz;       // ✅ compiles fine, but WILL crash at runtime

// `unknown` — the type-safe version of `any`. You MUST narrow it before use.
let input: unknown = "hello";
input.toUpperCase();          // ❌ Error: Object is of type 'unknown'
if (typeof input === "string") {
  input.toUpperCase();        // ✅ OK — TypeScript narrowed the type inside this block
}

// `void` — represents "this function returns nothing useful"
function logMessage(msg: string): void {
  console.log(msg);
  // no return statement (or `return;` with no value)
}

// `never` — represents "this function never successfully returns"
function throwError(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {}
}
```

> **Interview gold:** "What's the difference between `any` and `unknown`?" — `any` turns OFF type checking for that value entirely (dangerous). `unknown` keeps type checking ON but forces you to **narrow** the type (with `typeof`, `instanceof`, or a type guard) before you're allowed to use it. Always prefer `unknown` over `any` in real code.

### 2.5 Arrays and Tuples

```typescript
// Array — all elements are the same type
let scores: number[] = [90, 85, 77];
let names: Array<string> = ["Alice", "Bob"];   // generic syntax, same meaning

// Tuple — fixed-length array where each position has a SPECIFIC type
let user: [string, number] = ["Alice", 30];
// user[0] must be string, user[1] must be number, and only 2 elements allowed

let point: [number, number, number] = [10, 20, 30]; // e.g., 3D coordinates
```

### 2.6 Objects and Interfaces

```typescript
// Inline object type
let person: { name: string; age: number } = { name: "Alice", age: 30 };

// Interface — a reusable, named "contract" describing an object's shape
interface Person {
  name: string;
  age: number;
  email?: string;       // `?` = optional property
  readonly id: number;  // cannot be reassigned after creation
}

const employee: Person = { id: 1, name: "Bob", age: 28 };
employee.id = 2;   // ❌ Error: Cannot assign to 'id' because it is a read-only property
```

### 2.7 Type Aliases

```typescript
type ID = string | number;               // union type alias
type Point = { x: number; y: number };   // object type alias

function printId(id: ID) {
  console.log(id);
}
```

**Interface vs Type Alias** — one of the most common TypeScript interview questions:

| Feature | `interface` | `type` |
|---|---|---|
| Extending | `interface B extends A {}` | `type B = A & { ... }` (intersection) |
| Declaration merging | ✅ Yes — multiple `interface` blocks with the same name merge automatically | ❌ No — duplicate `type` names cause an error |
| Union/Intersection types | ❌ Cannot represent unions directly | ✅ `type Status = "active" \| "inactive"` |
| Use for objects/classes | ✅ Preferred, idiomatic | ✅ Also works |
| Primitives, tuples, unions | ❌ Cannot alias primitives | ✅ Can alias anything |

> **Rule of thumb often quoted in interviews:** Use `interface` for defining the shape of objects/classes (especially in public APIs, since they support declaration merging), and use `type` for unions, intersections, tuples, and utility-type compositions.

### 2.8 Enums

```typescript
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}
let move: Direction = Direction.Up;

// String enums — more explicit and debuggable
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}
```

### 2.9 Functions in TypeScript

```typescript
// Typing parameters and return value
function add(a: number, b: number): number {
  return a + b;
}

// Optional parameter
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// Default parameter
function multiply(a: number, b: number = 2): number {
  return a * b;
}

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0);
}

// Function type expressed as a type alias
type MathOperation = (a: number, b: number) => number;
const subtract: MathOperation = (a, b) => a - b;
```

### 2.10 Union and Intersection Types

```typescript
// Union — value can be ONE of several types
function printId(id: number | string) {
  console.log(id);
}

// Intersection — value must satisfy ALL combined types
type Employee = { id: number; name: string };
type Manager = { teamSize: number };
type ManagerRole = Employee & Manager;

const boss: ManagerRole = { id: 1, name: "Sara", teamSize: 5 };
```

### 2.11 Generics

Generics let you write reusable code that works with multiple types while still preserving type safety — instead of using `any`.

```typescript
// Without generics — loses type information
function identityAny(value: any): any {
  return value;
}

// With generics — the type is preserved
function identity<T>(value: T): T {
  return value;
}

let output1 = identity<string>("hello");  // output1: string
let output2 = identity(42);               // T inferred as number

// Generic interface
interface Box<T> {
  content: T;
}
const stringBox: Box<string> = { content: "books" };

// Generic constraint — T must have a `.length` property
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}
logLength("hello");     // ✅ strings have .length
logLength([1, 2, 3]);   // ✅ arrays have .length
logLength(42);          // ❌ Error: number doesn't have .length
```

### 2.12 Type Narrowing / Type Guards

```typescript
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());  // TS knows it's a string here
  } else {
    console.log(value.toFixed(2));     // TS knows it's a number here
  }
}

// instanceof narrowing
class Dog { bark() {} }
class Cat { meow() {} }
function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// Custom type guard (user-defined type predicate)
interface Fish { swim: () => void; }
interface Bird { fly: () => void; }
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

---

## 3. Internal Working

### 3.1 The Compilation Pipeline

TypeScript is NOT executed directly by any JavaScript engine (V8, SpiderMonkey, etc.). Instead, it goes through a **compilation pipeline**:

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│  .ts Source │ --> │   Scanner   │ --> │    Parser     │ --> │   Binder    │ --> │  Checker  │
│    Code     │     │ (Tokenizer) │     │  (Builds AST) │     │(Symbol Table)│     │(Type Check)│
└─────────────┘     └─────────────┘     └──────────────┘     └─────────────┘     └──────────┘
                                                                                          |
                                                                                          v
                                                                                  ┌───────────────┐
                                                                                  │    Emitter     │
                                                                                  │ (Generates .js)│
                                                                                  └───────────────┘
                                                                                          |
                                                                                          v
                                                                                  Plain JavaScript
```

**Step-by-step:**

1. **Scanner (Lexer/Tokenizer):** Reads the raw `.ts` text character by character and breaks it into "tokens" — keywords, identifiers, operators, literals. E.g., `let age: number = 5;` becomes tokens like `let`, `age`, `:`, `number`, `=`, `5`, `;`.
2. **Parser:** Takes the token stream and builds an **Abstract Syntax Tree (AST)** — a tree structure representing the grammatical structure of the code.
3. **Binder:** Walks the AST and creates a **symbol table** — mapping every declared name (variables, functions, classes, types) to a `Symbol` object, tracking where it was declared and what it refers to.
4. **Checker (Type Checker):** The heart of TypeScript. Walks the AST + symbol table and verifies that every operation is type-safe — checking assignments, function calls, property accesses, etc. This is where all the type errors you see come from.
5. **Emitter:** If (and only if — depending on config) type checking passes, the emitter **strips out all the type annotations** and generates plain `.js` output, optionally down-leveled to an older ECMAScript target (e.g., converting `const`/arrow functions to `var`/`function` for older environments).

### 3.2 Type Erasure — The Most Important Internal Concept

**Types exist ONLY at compile time. They are completely erased ("erased types") when compiled to JavaScript.** This is arguably the single most important internal concept in TypeScript, and interviewers ask about it constantly.

```typescript
// TypeScript source
interface User {
  name: string;
  age: number;
}
function greet(user: User): string {
  return `Hello, ${user.name}`;
}
```

Compiles down to:

```javascript
// Plain JavaScript output — notice: NO trace of `interface User`, no `: string`, no `: User`
function greet(user) {
  return `Hello, ${user.name}`;
}
```

**Consequences of type erasure (very common interview trap):**

```typescript
function isUser(value: unknown): boolean {
  return value instanceof User;   // ❌ Error! `User` is an interface — it doesn't exist at runtime
}
```

You **cannot** check `typeof someValue === "User"` or `value instanceof SomeInterface` because interfaces and type aliases produce **zero runtime code**. Only `class` declarations exist at runtime (because classes compile down to actual JS functions/prototypes), so `instanceof` only works with classes, not interfaces or type aliases.

### 3.3 Structural Typing ("Duck Typing")

TypeScript uses **structural typing**, not **nominal typing**. This means TypeScript cares about the **shape** of a value, not the name of the type it was declared with.

```typescript
interface Point { x: number; y: number; }

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const obj = { x: 10, y: 20, z: 30 };  // has an EXTRA property, and was never declared as `Point`
printPoint(obj);  // ✅ Works! Because `obj` has all the properties `Point` requires (structurally compatible)
```

This is called "duck typing" — "if it walks like a duck and quacks like a duck, it's a duck" — as opposed to languages like Java/C# which use **nominal typing**, where a type is only compatible if it's explicitly declared to implement/extend that exact named type.

### 3.4 `tsc` — The TypeScript Compiler CLI

```bash
tsc app.ts              # compiles app.ts to app.js
tsc --watch              # recompiles automatically on file changes
tsc --init                # generates a tsconfig.json with sensible defaults
tsc --noEmit              # type-check ONLY, don't output any JS (common in CI pipelines)
```

`tsconfig.json` controls the compiler's behavior — target JS version, module system, strictness level, output directory, etc.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true
  }
}
```

### 3.5 How Editors Get "Live" Type Checking

VS Code doesn't run `tsc` on every keystroke. Instead, TypeScript ships a **Language Service** — a separate API that editors talk to via the **Language Server Protocol (LSP)**. This service keeps an in-memory model of your whole project, incrementally re-analyzes only what changed, and feeds back errors, autocomplete suggestions, and hover-documentation in real time. This is why VS Code (built by the same team, using the same engine) has such deeply integrated TypeScript support.

---

## 4. Visual Diagrams

### 4.1 TypeScript in the Bigger Picture

```
   Developer writes
  ┌────────────────┐
  │   file.ts       │
  └────────┬────────┘
           │
           ▼
  ┌────────────────────┐
  │  TypeScript Compiler │  <-- checks types, reports errors HERE
  │       (tsc)           │
  └────────┬────────────┘
           │  (types stripped away)
           ▼
  ┌────────────────┐
  │   file.js        │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────────────────┐
  │  JS Engine (V8 / Node.js /   │  <-- no knowledge that TS ever existed
  │     Browser runtime)          │
  └─────────────────────────────┘
```

### 4.2 `any` vs `unknown` vs `never` — Decision Flow

```
                 Do you know the exact type?
                          │
              ┌───────────┴────────────┐
             YES                       NO
              │                         │
    Use a specific type        Do you want type SAFETY
   (string, number, User)          while staying flexible?
                                        │
                          ┌─────────────┴──────────────┐
                         YES                           NO
                          │                             │
                    Use `unknown`                 Use `any`
              (must narrow before use)        (⚠ avoid — unsafe)

   Function never returns normally (throws / infinite loop)? → Use `never`
```

### 4.3 Structural Typing Visual

```
interface Point { x: number; y: number; }

  obj = { x: 1, y: 2, z: 3 }
             │
             │  Does `obj` have AT LEAST
             │  everything `Point` needs?
             ▼
        ✅ YES (x ✓, y ✓, extra z is fine for
                 direct structural checks in
                 most contexts)
             │
             ▼
     Compatible with type `Point`
```

---

## 5. Code Examples

Every core concept, shown at 3 levels: **Simple → Intermediate → Production**.

### 5.1 Example: Basic Typing

**Simple:**
```typescript
let age: number = 25;
console.log(age);
```

**Intermediate:**
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  inStock?: boolean;
}

function formatProduct(product: Product): string {
  const stockLabel = product.inStock ? "In Stock" : "Out of Stock";
  return `${product.name} — $${product.price.toFixed(2)} (${stockLabel})`;
}

const item: Product = { id: 1, name: "Laptop", price: 999.99, inStock: true };
console.log(formatProduct(item));
```

**Production-level (real-world API layer pattern):**
```typescript
// types/product.ts
export interface Product {
  readonly id: string;
  name: string;
  price: number;
  category: "electronics" | "clothing" | "grocery";
  inStock: boolean;
}

// services/productService.ts
import { Product } from "../types/product";

export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Product with id ${id} not found`);
    this.name = "ProductNotFoundError";
  }
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new ProductNotFoundError(id);
  }
  const data: unknown = await response.json();
  // Runtime validation is STILL needed here — TS types don't validate real API data!
  if (!isProduct(data)) {
    throw new Error("Invalid product data received from API");
  }
  return data;
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.price === "number" &&
    typeof v.inStock === "boolean"
  );
}
```
> **Why this matters in interviews:** This example demonstrates a critical, often-missed point — TypeScript types disappear at runtime, so data coming from `fetch`/APIs must be validated at runtime too (with a type guard, or a library like `zod`). Mentioning this unprompted in an interview signals strong real-world experience.

### 5.2 Example: Generics in Practice

**Simple:**
```typescript
function firstElement<T>(arr: T[]): T {
  return arr[0];
}
firstElement([1, 2, 3]);       // number
firstElement(["a", "b"]);      // string
```

**Intermediate:**
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function wrapResponse<T>(data: T): ApiResponse<T> {
  return { data, status: 200, message: "OK" };
}

const res = wrapResponse({ id: 1, name: "Alice" });
// res.data is typed as { id: number; name: string }
```

**Production-level (generic repository pattern used in real backend codebases):**
```typescript
interface Entity {
  id: string;
}

class Repository<T extends Entity> {
  private items: Map<string, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

interface User extends Entity {
  name: string;
  email: string;
}

const userRepo = new Repository<User>();
userRepo.add({ id: "1", name: "Alice", email: "alice@example.com" });
const user = userRepo.findById("1"); // typed as User | undefined
```
> This `Repository<T>` pattern is exactly how many real-world backend services (Node.js/Express/NestJS) structure their data access layer — one generic, reusable, fully type-safe class instead of duplicating CRUD logic for every entity.

---

## 6. Real-World Usage

- **React + TypeScript:** Typing props and state (`interface Props { title: string }`), avoiding "undefined is not a function" bugs from mistyped prop names.
- **Node.js/Express APIs:** Typing request bodies, query params, and response shapes so that a frontend team and backend team share a single "contract" (often via a shared `types` package in a monorepo).
- **Redux/state management:** Typing actions, reducers, and the global store so that dispatching a wrong action shape fails to compile instead of silently breaking the UI.
- **Large monorepos (Google, Microsoft, Airbnb):** TypeScript's project references and incremental builds let hundreds of engineers work across thousands of files while catching cross-team breaking changes automatically.
- **Public npm libraries:** Ship `.d.ts` declaration files so consumers of the library get autocomplete and type safety even if they don't inspect the source code.

---

## 7. Best Practices

- ✅ **Enable `strict: true`** in `tsconfig.json` from day one — it turns on `strictNullChecks`, `noImplicitAny`, and other checks that catch the most bugs. Retrofitting strict mode onto a large loose codebase later is painful.
- ✅ **Avoid `any`** — prefer `unknown` + narrowing, or a precise type/generic.
- ✅ **Use `interface` for object/class shapes**, `type` for unions/intersections/utility compositions.
- ✅ **Validate external data at runtime** (API responses, form input, `JSON.parse`) — types don't protect you from bad real-world data. Use libraries like `zod` or `io-ts` for this.
- ✅ **Prefer readonly and immutability** where possible (`readonly` properties, `ReadonlyArray<T>`) to prevent accidental mutation bugs.
- ✅ **Keep types close to where they're used**, but share common/domain types in a dedicated `types/` folder for larger projects.
- ✅ **Use utility types** (`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`) instead of manually rewriting variations of the same type.
- ✅ **Naming convention:** `PascalCase` for types/interfaces/classes/enums, `camelCase` for variables/functions. Avoid the old `IUserService` Hungarian-notation-style prefix — modern TS style guides (including Microsoft's own) recommend against prefixing interfaces with `I`.
- ✅ **Folder structure (typical production pattern):**
```
src/
 ├── types/          # shared interfaces & type aliases
 ├── services/        # API calls, business logic
 ├── components/       # UI components (if frontend)
 ├── utils/            # helper functions
 ├── hooks/             # custom React hooks (if applicable)
 └── index.ts
```

---

## 8. Common Beginner Mistakes

| Mistake | Why Beginners Do It | How to Avoid It |
|---|---|---|
| Overusing `any` to "make errors go away" | It's the fastest way to silence a confusing compiler error | Understand the actual error; use `unknown` + narrowing, or fix the real type |
| Thinking TS validates data at runtime | Types feel like validation because they catch so much at compile time | Remember: types are erased at compile time — always validate external data (API responses, forms) separately |
| Not enabling `strict` mode | Default `tsconfig.json` from `tsc --init` has strict off by default in some setups, and it feels like "less work" initially | Turn on `strict: true` immediately — it's far easier than retrofitting later |
| Confusing `interface` and `type` | Both look similar for simple object shapes | Learn the distinctions (declaration merging, unions) — see section 2.7 |
| Using `Object` or `object` type carelessly | Confusing capitalized `Object` (way too broad, matches almost everything) with lowercase `object` | Prefer specific interfaces/types instead of the generic `object`/`Object` types |
| Forgetting `?` for optional properties, causing false compile errors | Not realizing TS enforces every declared property must be present unless marked optional | Add `?` to properties that may legitimately be absent |
| Ignoring compiler errors / relying on `// @ts-ignore` everywhere | Errors can feel like blockers under deadline pressure | Fix the underlying type issue; reserve `@ts-ignore`/`@ts-expect-error` for rare, well-justified, commented exceptions |

---

## 9. Beginner Interview Questions

*(This is the first batch. More Beginner, Intermediate, Advanced, Scenario-based, Debugging, and Coding questions — plus MCQs, flashcards, cheat sheet, coding exercises, company-specific questions, and the final checklist — will be added in the next parts of this handbook.)*

---

**Q1. What is TypeScript, and how is it different from JavaScript?**

*Ideal Answer:* TypeScript is a statically-typed superset of JavaScript created by Microsoft. It adds an optional type system, interfaces, generics, and other features on top of JavaScript, then compiles down to plain JavaScript. Every valid JS file is valid TS, but TS adds compile-time type checking that catches errors before runtime, which plain JavaScript cannot do since it's dynamically typed.

*Why it's correct:* It captures the "superset" relationship, the compile step, and the core value proposition (compile-time error catching).

*Common wrong answer:* "TypeScript is a completely different language from JavaScript" — wrong, because TS compiles TO JavaScript and is a strict superset; it doesn't introduce a separate runtime.

*What the interviewer is testing:* Whether you understand TypeScript's fundamental relationship to JavaScript, not just that it "adds types."

*Follow-up questions:*
- "Does TypeScript run directly in the browser?" (No — it must be compiled to JS first.)
- "Can you use JavaScript libraries in a TypeScript project?" (Yes, via type declaration files, either bundled or from `@types/...`.)

---

**Q2. What are the primitive types in TypeScript?**

*Ideal Answer:* `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, and `symbol`. Unlike some languages, TypeScript has just one `number` type covering both integers and floats — there's no separate `int`/`float`/`double`.

*Why it's correct:* Complete and accurate list; correctly notes the single `number` type, a common point of confusion for people coming from Java/C#/Python.

*Common wrong answer:* Listing `array` or `object` as "primitive" — these are reference/structural types, not primitives.

*What the interviewer is testing:* Basic type-system vocabulary and precision.

*Follow-up questions:*
- "Why is there no `int` type in TypeScript?" (Because JavaScript itself only has one numeric type under the hood — IEEE 754 double-precision floating point — so TypeScript mirrors that.)

---

**Q3. What is type inference in TypeScript?**

*Ideal Answer:* Type inference is TypeScript's ability to automatically determine a variable's type based on its assigned value, without an explicit type annotation. For example, `let age = 25` is automatically inferred as `number`, so writing `let age: number = 25` is redundant (though sometimes done for clarity).

*Why it's correct:* Demonstrates understanding that TypeScript doesn't require annotations everywhere — it's smart about inference — while also showing awareness of when explicit typing is still useful (function parameters, complex object shapes).

*Common wrong answer:* "You always have to write types manually in TypeScript" — false; inference handles the majority of simple cases.

*What the interviewer is testing:* Whether the candidate understands TypeScript isn't just "add `: type` everywhere," but a smart system that reduces boilerplate.

*Follow-up questions:*
- "Where does TypeScript NOT infer types, and you must annotate explicitly?" (Function parameters — TS can't guess what a parameter's type should be without an annotation or a contextual type.)

---

**Q4. Explain the difference between `any` and `unknown`.**

*Ideal Answer:* Both represent "I don't know the type yet," but `any` completely disables type checking — you can call any method or access any property on an `any` value with no compiler complaints, which defeats the purpose of using TypeScript. `unknown` is the type-safe alternative: TypeScript still enforces that you must **narrow** the type (using `typeof`, `instanceof`, or a custom type guard) before performing any operations on it. Best practice is to always prefer `unknown` over `any`.

*Why it's correct:* Explains both the similarity (both represent uncertain types) and the crucial safety difference (narrowing requirement), plus gives the practical recommendation.

*Common wrong answer:* "They're basically the same thing" — a major red flag; this is one of the most commonly tested TS-specific questions precisely because so many people don't know the difference.

*What the interviewer is testing:* Real depth of TypeScript knowledge beyond "I added some type annotations to my JS code." This question alone separates people who've truly learned TS from people who've only skimmed it.

*Follow-up questions:*
- "Give an example of a scenario where you'd use `unknown`." (Parsing JSON from an API response before validating its shape.)
- "What happens if you try to call a method on an `unknown` value without narrowing?" (Compile-time error.)

---

**Q5. What is the purpose of `tsconfig.json`?**

*Ideal Answer:* `tsconfig.json` is the configuration file that tells the TypeScript compiler how to compile a project — including which JS version to target (`target`), which module system to use (`module`), how strict the type checking should be (`strict` and related flags), where to output compiled files (`outDir`), and which files to include/exclude. It also marks the root of a TypeScript project for editors and tooling.

*Why it's correct:* Covers the core purpose and names concrete, commonly-used options.

*Common wrong answer:* "It's just for setting the output folder" — too narrow; misses the type-checking strictness settings, which are arguably more important.

*What the interviewer is testing:* Practical, hands-on project setup experience, not just type syntax knowledge.

*Follow-up questions:*
- "What does `strict: true` actually enable?" (A bundle of flags including `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, etc.)
- "What's the difference between `target` and `module` in tsconfig?" (`target` = which JS syntax version to output; `module` = which module system, e.g., CommonJS vs ES modules, to use for imports/exports.)

---

*End of Part 1.*

---

# PART 2

> Covers: Utility Types → Mapped/Conditional Types → Decorators → Module Systems → Declaration Files → More Diagrams → More Production Code → Intermediate Interview Questions.

---

## 10. Utility Types (Built-In Type Transformations)

TypeScript ships a set of **generic utility types** that transform existing types instead of forcing you to hand-write repetitive variations. These are asked about constantly in interviews because they show real, hands-on TS experience.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> — makes every property optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number }
function updateUser(id: number, updates: Partial<User>) { /* ... */ }

// Required<T> — makes every property mandatory (opposite of Partial)
type RequiredUser = Required<PartialUser>;

// Readonly<T> — makes every property read-only
type ReadonlyUser = Readonly<User>;
const u: ReadonlyUser = { id: 1, name: "A", email: "a@a.com", age: 20 };
u.name = "B"; // ❌ Error

// Pick<T, K> — select a subset of properties
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit<T, K> — remove a subset of properties
type UserWithoutEmail = Omit<User, "email">;
// { id: number; name: string; age: number }

// Record<K, T> — build an object type with specific keys, all mapping to the same value type
type UserRoles = Record<"admin" | "editor" | "viewer", boolean>;
// { admin: boolean; editor: boolean; viewer: boolean }

// Exclude<T, U> / Extract<T, U> — filter union types
type Status = "active" | "inactive" | "banned" | "pending";
type ActiveStatuses = Exclude<Status, "banned" | "pending">; // "active" | "inactive"
type InactiveStatuses = Extract<Status, "banned" | "pending">; // "banned" | "pending"

// NonNullable<T> — remove null and undefined from a type
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

// ReturnType<T> — extract a function's return type
function createUser() { return { id: 1, name: "Alice" }; }
type NewUser = ReturnType<typeof createUser>; // { id: number; name: string }

// Parameters<T> — extract a function's parameter types as a tuple
function greet(name: string, age: number) {}
type GreetParams = Parameters<typeof greet>; // [string, number]

// Awaited<T> — unwraps a Promise type (useful with async functions)
async function fetchUser(): Promise<User> { /* ... */ return {} as User; }
type FetchedUser = Awaited<ReturnType<typeof fetchUser>>; // User
```

> **Interview tip:** Being able to explain `Pick`, `Omit`, `Partial`, and `Record` fluently — and knowing WHY you'd reach for each one — is one of the fastest ways to signal "this person actually uses TypeScript daily" versus "this person memorized syntax."

---

## 11. Mapped Types

Mapped types let you build new object types by transforming the properties of an existing type — utility types like `Partial<T>` are actually implemented internally using mapped types.

```typescript
// Basic mapped type syntax
type OptionalFlags<T> = {
  [Key in keyof T]?: T[Key];
};

interface Settings {
  darkMode: boolean;
  notifications: boolean;
}
type OptionalSettings = OptionalFlags<Settings>;
// { darkMode?: boolean; notifications?: boolean }

// Modifiers: adding/removing `readonly` and `?`
type ReadonlyVersion<T> = { readonly [K in keyof T]: T[K] };
type MutableVersion<T> = { -readonly [K in keyof T]: T[K] };  // `-readonly` strips it
type RequiredVersion<T> = { [K in keyof T]-?: T[K] };          // `-?` strips optionality

// Key remapping with `as` (TS 4.1+)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
interface Person { name: string; age: number; }
type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }
```

## 12. Conditional Types

Conditional types let a type "branch" based on a check — the type-system equivalent of an `if/else`.

```typescript
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// `infer` — extract a type from within another type
type ElementType<T> = T extends (infer U)[] ? U : T;
type Num = ElementType<number[]>;   // number
type Str = ElementType<string>;      // string (not an array, so returns T itself)

// Real-world example: unwrapping a Promise
type Unwrap<T> = T extends Promise<infer U> ? U : T;
type Resolved = Unwrap<Promise<string>>;  // string

// Distributive conditional types (applies per union member automatically)
type ToArray<T> = T extends any ? T[] : never;
type StrOrNumArray = ToArray<string | number>;  // string[] | number[]
```

> **Interview tip:** You are rarely asked to WRITE complex conditional types from scratch in an interview, but you are often asked to **read and explain** one — especially `infer`. Practice reading `ReturnType<T>`'s actual internal definition:
> ```typescript
> type ReturnType<T extends (...args: any) => any> =
>   T extends (...args: any) => infer R ? R : any;
> ```
> This reads as: "If T is a function type, extract and return its return type (`R`); otherwise fall back to `any`."

## 13. Template Literal Types

```typescript
type World = "world";
type Greeting = `hello ${World}`; // "hello world"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "/users" | "/products";
type Route = `${HttpMethod} ${Endpoint}`;
// "GET /users" | "GET /products" | "POST /users" | ... (all 8 combinations)

// Real-world: strongly typed event names
type EventName = `on${Capitalize<"click" | "hover" | "focus">}`;
// "onClick" | "onHover" | "onFocus"
```

## 14. Decorators

Decorators are a (now stable, as of TS 5.0 using the standard ECMAScript decorators proposal) way to attach metadata or modify behavior of classes/methods/properties declaratively, using the `@decorator` syntax. Heavily used in frameworks like **Angular** and **NestJS**.

```typescript
function LogMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  function replacementMethod(this: any, ...args: any[]) {
    console.log(`Calling ${methodName} with`, args);
    return originalMethod.call(this, ...args);
  }
  return replacementMethod;
}

class Calculator {
  @LogMethod
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // logs: "Calling add with [2, 3]"
```

Real-world usage — NestJS controller (illustrative):
```typescript
@Controller("users")
class UserController {
  @Get(":id")
  getUser(@Param("id") id: string) {
    return { id };
  }
}
```

## 15. Modules — `import`/`export`, CommonJS vs ESM

```typescript
// ES Modules (modern standard)
export interface User { id: number; name: string; }
export function getUser(id: number): User { /* ... */ return {} as User; }
export default class UserService { /* ... */ }

// importing
import UserService, { User, getUser } from "./userService";

// CommonJS (older Node.js style, still common)
// module.exports = { getUser };
// const { getUser } = require("./userService");
```

| | CommonJS | ES Modules (ESM) |
|---|---|---|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Supports async loading |
| Origin | Node.js (pre-ES6) | Official ECMAScript standard |
| Tree-shaking | Poor support | Good support (dead code elimination) |
| Default in modern Node.js | Still widely used | Increasingly the default (`"type": "module"` in package.json) |

## 16. Declaration Files (`.d.ts`)

Declaration files describe the **types** of existing JavaScript code without containing any implementation — they let TypeScript understand plain JS libraries.

```typescript
// mathLib.d.ts
declare function add(a: number, b: number): number;
declare module "some-untyped-js-library" {
  export function doSomething(input: string): boolean;
}
```

Most popular libraries either ship their own `.d.ts` files (look for `"types"` in their `package.json`) or the community maintains them in the **DefinitelyTyped** repository, installed via `npm install --save-dev @types/lodash` (for example).

---

## 17. More Visual Diagrams

### 17.1 Utility Type Cheat Map

```
                          ┌───────────────────────────┐
                          │        interface User      │
                          │  id, name, email, age       │
                          └──────────────┬─────────────┘
        ┌──────────────┬─────────────────┼─────────────────┬───────────────┐
        ▼               ▼                 ▼                 ▼               ▼
   Partial<User>   Required<User>   Readonly<User>    Pick<User,"id"|"name">  Omit<User,"email">
  (all optional)   (all mandatory)  (all read-only)   ({id,name} only)      (everything but email)
```

### 17.2 Conditional Type Evaluation Flow

```
        T extends U ?
              │
      ┌───────┴───────┐
     YES              NO
      │                │
  Result = X       Result = Y

  Example: IsString<T> = T extends string ? "yes" : "no"
  IsString<"hello">  → "hello" extends string → YES → "yes"
  IsString<42>        → 42 extends string     → NO  → "no"
```

### 17.3 Module Resolution Flow (Node-style)

```
   import { helper } from "./utils"
                │
                ▼
   Does "./utils.ts" exist?  ── YES ──▶ use it
                │ NO
                ▼
   Does "./utils/index.ts" exist? ── YES ──▶ use it
                │ NO
                ▼
          ❌ Module not found error
```

---

## 18. Code Examples — Intermediate & Production Level

### 18.1 Discriminated Unions (extremely common in real apps + interviews)

```typescript
// Simple
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
  }
}

// Production: modeling API/async states (very common React/Redux pattern)
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function renderState<T>(state: RequestState<T>): string {
  switch (state.status) {
    case "idle": return "Waiting to start...";
    case "loading": return "Loading...";
    case "success": return `Data loaded: ${JSON.stringify(state.data)}`;
    case "error": return `Error: ${state.error}`;
  }
}
```
> **Why interviewers love this:** Discriminated unions combine narrowing, exhaustiveness checking, and real-world state modeling in one pattern. Mention that TypeScript will flag a `switch` as non-exhaustive (using the `never` type in a `default` case) if a new variant is added later and not handled — a huge maintenance win.

```typescript
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(x)}`);
}
function areaExhaustive(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
    default: return assertNever(shape); // compile error if a new `kind` is added and not handled
  }
}
```

### 18.2 Generic API Client (Production Pattern)

```typescript
interface ApiError {
  message: string;
  code: number;
}

class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) {
      const error: ApiError = await res.json();
      throw new Error(`API Error ${error.code}: ${error.message}`);
    }
    return res.json() as Promise<T>;
  }

  async post<TBody, TResponse>(path: string, body: TBody): Promise<TResponse> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json() as Promise<TResponse>;
  }
}

interface User { id: string; name: string; }
interface CreateUserDto { name: string; email: string; }

const api = new ApiClient("https://api.example.com");
const user = await api.get<User>("/users/1");
const newUser = await api.post<CreateUserDto, User>("/users", { name: "Bob", email: "b@b.com" });
```

---

## 19. Intermediate Interview Questions

**Q1. Explain `Partial<T>`, `Pick<T, K>`, and `Omit<T, K>` with a real use case for each.**

*Ideal Answer:* `Partial<T>` makes all properties of `T` optional — commonly used in update/PATCH functions where a caller might only send some fields to change. `Pick<T, K>` builds a new type with only a chosen subset of `T`'s properties — useful for lightweight "preview" or "summary" objects, e.g., a `UserListItem` that only needs `id` and `name` out of a full `User`. `Omit<T, K>` builds a new type excluding certain properties — useful for stripping sensitive fields, e.g., `Omit<User, "passwordHash">` when returning user data from an API.

*Why it's correct:* Ties each utility type to a concrete, realistic scenario rather than just reciting the definition.

*Common wrong answer:* Reciting only the type signatures with no real-world context — technically not wrong, but weaker.

*What the interviewer is testing:* Practical, hands-on usage versus rote memorization.

*Follow-up questions:*
- "How would you implement `Pick<T, K>` yourself using a mapped type?" (`type MyPick<T, K extends keyof T> = { [P in K]: T[P] }`)

---

**Q2. What is a discriminated union, and why is it useful?**

*Ideal Answer:* A discriminated union is a union of object types that share a common literal property (the "discriminant" or "tag"), like `kind` or `status`. TypeScript uses that property to narrow the type automatically inside conditional blocks (`if`/`switch`). It's useful for modeling states that are mutually exclusive — like a network request being `idle`, `loading`, `success`, or `error` — because it makes illegal states unrepresentable (e.g., you literally cannot have `data` present while `status` is `"loading"`) and TypeScript can enforce exhaustive handling of every case.

*Why it's correct:* Explains the mechanism (shared literal tag + narrowing) and the value (illegal states become unrepresentable, exhaustiveness checking).

*Common wrong answer:* "It's just a union type" — misses the "discriminant property + narrowing" mechanism that makes it specifically useful.

*What the interviewer is testing:* Whether the candidate can model real application state safely, not just write basic union types.

*Follow-up questions:*
- "How do you get TypeScript to warn you if you forget to handle a new case in a switch statement?" (The `assertNever`/`never` exhaustiveness-check pattern.)

---

**Q3. What's the difference between structural typing and nominal typing? Which does TypeScript use?**

*Ideal Answer:* Nominal typing (used by Java, C#) checks type compatibility based on the **declared name/identity** of a type — two types with identical shapes are still incompatible unless one explicitly implements/extends the other. Structural typing (used by TypeScript) checks compatibility based purely on the **shape** of the data — if an object has all the required properties with compatible types, it's considered compatible, regardless of how it was declared. TypeScript uses structural typing.

*Why it's correct:* Correctly contrasts both systems and identifies TypeScript's model with a clear example available (like Section 3.3).

*Common wrong answer:* Confusing the two, or saying TypeScript uses nominal typing (a common misconception for people coming from Java/C#).

*What the interviewer is testing:* Deep understanding of TypeScript's actual type-checking model, not just syntax.

*Follow-up questions:*
- "Can TypeScript simulate nominal typing when you actually need it (e.g., preventing a `UserId` from being passed where an `OrderId` is expected, even though both are strings)?" (Yes — via the "branded types" / "nominal typing" pattern using a unique symbol or literal tag property.)

---

**Q4. What are declaration files (`.d.ts`) and why are they necessary?**

*Ideal Answer:* Declaration files contain only type information — no implementation — describing the shape of existing JavaScript code so TypeScript can type-check code that uses it. They're necessary because most JavaScript libraries (especially older ones) aren't written in TypeScript, so without a `.d.ts` file, TypeScript would have no idea what types their functions/exports expect or return, and would treat everything as `any`. Many popular libraries ship their own; for others, the community-maintained **DefinitelyTyped** repository provides them via `@types/packageName`.

*Why it's correct:* Explains purpose, necessity, and where they come from.

*Common wrong answer:* "They're just documentation" — technically related but understates that they are functionally required for type checking to work at all against untyped JS.

*What the interviewer is testing:* Practical experience integrating third-party JS libraries into a TypeScript project.

*Follow-up questions:*
- "What happens if a library has no types and no `@types` package available?" (You can either write your own ambient declaration file, or fall back to `declare module "libraryName";` to silence errors while treating it as `any`.)

---

**Q5. Explain `keyof`, `typeof`, and indexed access types (`T[K]`) in TypeScript.**

*Ideal Answer:* `keyof T` produces a union of all the property names (as string/number/symbol literal types) of type `T`. `typeof` (in a type position) extracts the **type** of a value, letting you reuse an existing variable's inferred type instead of redeclaring it. Indexed access `T[K]` retrieves the type of a specific property `K` from type `T` — similar to how you'd access a property at runtime, but at the type level.

```typescript
interface User { id: number; name: string; }
type UserKeys = keyof User;        // "id" | "name"

const config = { darkMode: true, version: 2 };
type ConfigType = typeof config;   // { darkMode: boolean; version: number }

type NameType = User["name"];      // string
type ValueTypes = User[keyof User]; // number | string
```

*Why it's correct:* Covers all three operators with correct, precise definitions and working code.

*Common wrong answer:* Confusing `typeof` in TypeScript's type position with JavaScript's runtime `typeof` operator — they look identical but operate in completely different contexts (compile-time type extraction vs. runtime string check).

*What the interviewer is testing:* Fluency with TypeScript's more "meta" type-level operators, which come up constantly in generic/utility-type code.

*Follow-up questions:*
- "How is `keyof` used inside a generic function to make it safer?" (E.g., `function getProp<T, K extends keyof T>(obj: T, key: K): T[K]` — guarantees `key` is a valid property of `obj` and the return type is correctly inferred.)

---

*End of Part 2.*

---

# PART 3

> Covers: Advanced Topics → Module Augmentation → Migration Strategies → Advanced Interview Questions → Scenario-Based Questions → Debugging Questions.

---

## 20. Advanced Topics

### 20.1 Variance: Covariance, Contravariance, Bivariance

A subtle but real interview topic for senior roles. **Variance** describes how subtyping between complex types (like function types) relates to subtyping between their component types.

```typescript
class Animal { name = "animal"; }
class Dog extends Animal { breed = "labrador"; }

// Covariance: Dog[] is assignable to Animal[] because Dog IS-A Animal (return types are covariant)
let animals: Animal[] = [];
let dogs: Dog[] = [new Dog()];
animals = dogs; // ✅ OK — covariant

// Function PARAMETER types are contravariant in strict mode (strictFunctionTypes)
type AnimalHandler = (a: Animal) => void;
type DogHandler = (d: Dog) => void;

let handleAnimal: AnimalHandler = (a) => console.log(a.name);
let handleDog: DogHandler = handleAnimal; // ✅ OK — a function accepting a broader type can handle a narrower one
```

> **Interview-level explanation:** "Covariant" means a type relationship preserves direction (`Dog extends Animal` ⟹ `Dog[] extends Animal[]`). "Contravariant" means the relationship reverses (a function that accepts a wider type can safely be used where a function accepting a narrower type is expected, because it can handle everything the narrower one can and more).

### 20.2 Module Augmentation & Ambient Declarations

You can extend existing modules/global types — extremely common for adding custom properties to Express's `Request` object, or extending a third-party library's types.

```typescript
// express.d.ts — augmenting Express's Request type with a custom `user` property
import "express";

declare module "express" {
  interface Request {
    user?: { id: string; role: string };
  }
}

// Now, anywhere in the project:
app.get("/profile", (req, res) => {
  console.log(req.user?.id); // ✅ TypeScript knows about `user` now
});
```

```typescript
// Global augmentation (e.g., adding a custom property to `window`)
declare global {
  interface Window {
    analytics: { track: (event: string) => void };
  }
}
window.analytics.track("page_view");
```

### 20.3 Type-Level Programming: Recursive Conditional Types

```typescript
// Deep Partial — makes ALL nested properties optional, recursively
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

interface Config {
  server: { host: string; port: number };
  debug: boolean;
}
type PartialConfig = DeepPartial<Config>;
// { server?: { host?: string; port?: number }; debug?: boolean }

// Flatten a nested array type recursively
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;
type Deep = Flatten<number[][][]>; // number
```

### 20.4 `satisfies` Operator (TS 4.9+)

Solves a long-standing tension: you want to validate a value matches a type WITHOUT widening/losing its more specific inferred type.

```typescript
type Colors = Record<string, [number, number, number] | string>;

// Without satisfies — loses specific tuple/string info, everything becomes the union type
const palette1: Colors = {
  red: [255, 0, 0],
  blue: "#0000FF",
};
// palette1.red is inferred as [number,number,number] | string — you lose precision

// With satisfies — TS checks the shape matches Colors, BUT keeps the precise inferred type
const palette2 = {
  red: [255, 0, 0],
  blue: "#0000FF",
} satisfies Colors;
// palette2.red is still known specifically as [number, number, number]
```

### 20.5 Compiler Performance & Internals (Senior/Staff-Level)

- **Incremental builds:** `tsc --incremental` caches build info (`.tsbuildinfo`) so subsequent compiles only re-check changed files and their dependents.
- **Project References:** For large monorepos, `tsconfig.json` can reference other projects (`"references": [{ "path": "../shared" }]`), letting `tsc --build` compile in correct dependency order and cache each sub-project independently.
- **Structural type checking cost:** Because TypeScript compares shapes (not names), very large or deeply recursive types can cause the compiler to slow down significantly — a real, known pain point in large codebases with complex generic utility types.
- **The Go-native compiler port ("tsgo"):** The TypeScript team has been porting the compiler to Go for a dramatic (5-10x class) performance improvement, since the existing compiler (written in TypeScript/JavaScript itself) hits performance ceilings on huge codebases. Worth mentioning if asked about the "future of TypeScript" in a senior interview.

### 20.6 Migrating a JavaScript Codebase to TypeScript

A commonly asked real-world/scenario question. Standard incremental strategy:

1. Add a `tsconfig.json` with `allowJs: true` and `checkJs: false` initially, so `.js` and `.ts` files coexist.
2. Rename files `.js` → `.ts` **one at a time**, starting with leaf modules that have few dependents (utility functions, types/constants) before moving to files with many dependents.
3. Fix type errors file by file — start with `strict: false`, then progressively enable `noImplicitAny`, `strictNullChecks`, and finally full `strict: true` once the codebase stabilizes.
4. Add `@types/...` packages for third-party JS dependencies as needed.
5. Use `// @ts-check` comments in remaining `.js` files to get partial type checking before they're fully converted.
6. Set up CI to fail on new type errors even while old ones are still being cleaned up (e.g., using a baseline error count that must never increase).

---

## 21. Advanced Interview Questions

**Q1. Explain covariance and contravariance in TypeScript with an example.**

*Ideal Answer:* Covariance means a subtyping relationship is preserved in the same direction for a compound type — e.g., since `Dog extends Animal`, `Dog[]` is assignable to `Animal[]`; array element types are covariant. Contravariance means the relationship reverses — for function types, parameter types are contravariant under `strictFunctionTypes`, meaning a function that accepts a broader/more general parameter type can be safely substituted where a function accepting a narrower/more specific type is expected, because the broader handler can process everything the narrower one could and more.

*Why it's correct:* Correctly distinguishes the two, gives concrete, technically accurate examples matching TypeScript's actual behavior under `strictFunctionTypes`.

*Common wrong answer:* Mixing up the direction, or claiming TypeScript function parameters are always covariant (they're bivariant for **methods** by default for backward-compatibility reasons, but contravariant for standalone function types under strict mode — a nuance worth knowing at senior level).

*What the interviewer is testing:* Deep, formal understanding of the type system, typically reserved for senior/staff-level interviews.

---

**Q2. What is the `satisfies` operator and what problem does it solve?**

*Ideal Answer:* `satisfies` checks that an expression matches a given type without changing the expression's inferred type the way an explicit type annotation would. Before `satisfies`, if you wanted type-checking against an interface, you'd annotate the variable directly (`const x: Colors = {...}`), but that would "widen" the value's type to match the annotation, losing more specific inferred information (like exact literal or tuple types). `satisfies` validates the shape while preserving the narrowest inferred type TypeScript can determine.

*Why it's correct:* Explains the exact tension (validation vs. type-widening) that `satisfies` was introduced to resolve, with the mechanism correctly described.

*Common wrong answer:* "It's the same as a type annotation" — misses the core reason it exists.

*What the interviewer is testing:* Awareness of recent TypeScript features and genuine hands-on usage, not just fundamentals.

---

**Q3. How would you migrate a large JavaScript codebase to TypeScript incrementally, without stopping feature development?**

*Ideal Answer:* Enable `allowJs` so `.js` and `.ts` files coexist; convert files incrementally, starting with leaf/utility modules with few dependents; keep `strict` mode off initially and progressively tighten it (`noImplicitAny` → `strictNullChecks` → full `strict`) as the codebase stabilizes; add `@types` packages for dependencies; optionally use `// @ts-check` in still-JS files for partial checking; and enforce via CI that the type-error count never increases, even while historical errors are still being cleaned up.

*Why it's correct:* Gives a realistic, phased, low-risk migration plan that acknowledges business constraints (can't halt feature work), which is exactly what's expected at mid/senior level.

*Common wrong answer:* "Just convert every file to `.ts` and fix all the errors" — unrealistic for any codebase beyond a small project; ignores incremental delivery and team disruption.

*What the interviewer is testing:* Real-world project and team-management judgment, not just TypeScript syntax.

---

**Q4. Explain how the TypeScript compiler internally handles type erasure, and give an example of code that would compile but fail differently than expected because of it.**

*Ideal Answer:* Type annotations, interfaces, and type aliases exist purely in the compiler's internal representation and are stripped entirely during the emit phase — none of that information exists in the output JavaScript or at runtime. A common failure mode: trying to use `instanceof` with an interface (`value instanceof SomeInterface`) doesn't work and won't even compile, because interfaces produce zero runtime artifact — only classes do (since they compile to real JS constructor functions). Another example: casting with `as` (e.g., `const x = value as User`) doesn't perform any runtime check or conversion — it purely tells the compiler "trust me," so if the actual runtime shape doesn't match, you'll get a runtime error/bug despite TypeScript reporting no errors.

*Why it's correct:* Explains the mechanism precisely and gives two concrete, realistic failure examples that show consequences, not just the definition.

*Common wrong answer:* "Types just disappear" without explaining WHY this matters practically (instanceof failures, unsafe `as` casts, need for runtime validation).

*What the interviewer is testing:* Whether the candidate genuinely understands TypeScript's compile-time-only nature deeply enough to avoid dangerous assumptions in production code.

---

## 22. Scenario-Based Questions

**Scenario 1: "Our API returns a field that's sometimes a string, sometimes null, and our React component crashes intermittently in production. How would you use TypeScript to prevent this class of bug?"**

*Ideal Answer:* Type the API response field explicitly as `string | null` (not just `string`) so TypeScript forces every consumer to handle the null case — with `strictNullChecks` enabled, TypeScript will refuse to compile code that uses the value without a null check. Additionally, add runtime validation (e.g., with `zod`) at the API boundary, since the actual runtime response could diverge from the declared type if the backend changes unexpectedly — TypeScript types alone don't protect against that. In the component, use optional chaining (`?.`) and nullish coalescing (`??`) or explicit conditional rendering to handle the null case gracefully in the UI.

*What the interviewer is testing:* Ability to connect type-system features (`strictNullChecks`, union types) to a real, relatable production bug, plus awareness that types alone aren't a complete safety net.

---

**Scenario 2: "A teammate wants to use `any` everywhere to 'move faster' during a tight sprint. How do you respond?"**

*Ideal Answer:* Acknowledge the short-term speed benefit, but explain the long-term cost: `any` silently disables type checking for that value and everything derived from it (it "spreads" through the codebase), reintroducing exactly the runtime bugs TypeScript exists to prevent, and making refactoring dangerous later. Suggest a middle ground: use `unknown` with narrowing where the type is genuinely uncertain, or use precise-but-quick types (even loosely defined interfaces) instead of `any`, and reserve explicit, commented `any`/`@ts-expect-error` for rare, justified cases — not as a default habit. Frame it as a team standards/code-review conversation, not just a personal preference.

*What the interviewer is testing:* Communication and technical leadership — can the candidate advocate for good practices without being dogmatic, while backing it up with real technical reasoning?

---

**Scenario 3: "You're designing a shared `types` package used by both a Node.js backend and a React frontend in a monorepo. What would you consider?"**

*Ideal Answer:* Keep the shared package free of any framework-specific types (no React or Express-specific imports) — only pure data-shape types (DTOs, enums, API contracts). Use TypeScript project references so the frontend/backend build against the shared package incrementally and get fast rebuilds. Version or at least clearly document breaking changes to shared types, since a change ripples to both consumers simultaneously. Consider whether request/response validation schemas (e.g., `zod` schemas) should live alongside the types so both the type AND the runtime validator stay in sync automatically (many teams derive the TS type FROM the zod schema using `z.infer<typeof schema>` to avoid keeping two definitions in sync manually).

*What the interviewer is testing:* System design thinking applied specifically to TypeScript tooling in a realistic full-stack/monorepo setup.

---

## 23. Debugging Questions

**Debug 1:**
```typescript
interface User { name: string; age: number; }
function greet(user: User) {
  console.log(`Hello ${user.name}, age ${user.age}`);
}
const person = { name: "Alice" };
greet(person); // ❌ What error occurs, and why?
```
*Answer:* Error: `Property 'age' is missing in type '{ name: string; }' but required in type 'User'.` Because `person`'s inferred type is `{ name: string }` (missing `age`), and `greet` requires a full `User` shape — TypeScript's structural typing checks that ALL required properties are present, not just compatible ones that do exist. Fix: add `age` to `person`, or make `age` optional in `User` (`age?: number`) if that's intentional.

**Debug 2:**
```typescript
function double(x: number | string) {
  return x * 2; // ❌ Error here — why, and how to fix?
}
```
*Answer:* Error: `Operator '*' cannot be applied to types 'string | number'.` TypeScript won't let you perform a numeric operation on a union that includes `string`, because `"5" * 2` would be nonsensical/unsafe from a type-safety standpoint even though JS would coerce it at runtime. Fix: narrow the type first.
```typescript
function double(x: number | string) {
  if (typeof x === "string") {
    return Number(x) * 2;
  }
  return x * 2;
}
```

**Debug 3:**
```typescript
class Box<T> {
  private value: T;
  constructor(value: T) { this.value = value; }
  getValue() { return this.value; }
}
const box = new Box("hello");
const upper = box.getValue().toUppercase(); // ❌ Runtime error despite "no TS errors"? Explain.
```
*Answer:* This is actually a **compile-time** error, not a silent runtime one — TypeScript correctly infers `T` as `string` from the constructor argument, so `getValue()` returns `string`, and `string` has no method called `toUppercase` (it's `toUpperCase`, capital U) — TypeScript catches the typo at compile time with `Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?` This demonstrates generics correctly preserving and propagating type information through a class, catching what would otherwise be a runtime `TypeError` in plain JavaScript.

---

*End of Part 3.*

---

# PART 4

> Covers: Coding Exercises (Easy → Interview Level, with full solutions) → Multiple Choice Questions (every option explained) → Flashcards.

---

## 24. Coding Exercises

### 🟢 Easy

**Exercise 1: Type-safe `sum` function**
> Write a function `sum` that takes an array of numbers and returns their total. Type it fully.

```typescript
function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum([1, 2, 3])); // 6
```
*Explanation:* Straightforward array typing and `reduce`. Tests basic function typing and array method familiarity.

---

**Exercise 2: `Person` interface + greeting function**
> Define an interface `Person` with `name: string` and `age: number`. Write a function `introduce(person: Person): string` that returns `"Hi, I'm {name} and I'm {age} years old."`

```typescript
interface Person {
  name: string;
  age: number;
}
function introduce(person: Person): string {
  return `Hi, I'm ${person.name} and I'm ${person.age} years old.`;
}
```

---

**Exercise 3: Optional property**
> Write a `formatPrice` function that takes a `price: number` and an optional `currency?: string` (default `"USD"`), returning a formatted string like `"$100.00"`.

```typescript
function formatPrice(price: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] ?? "";
  return `${symbol}${price.toFixed(2)}`;
}
console.log(formatPrice(100));           // "$100.00"
console.log(formatPrice(100, "EUR"));    // "€100.00"
```

---

### 🟡 Medium

**Exercise 4: Generic `filterByProperty`**
> Write a generic function that filters an array of objects by a given property equaling a given value.

```typescript
function filterByProperty<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T[] {
  return items.filter((item) => item[key] === value);
}

interface Product { id: number; category: string; price: number; }
const products: Product[] = [
  { id: 1, category: "electronics", price: 500 },
  { id: 2, category: "books", price: 20 },
];
const electronics = filterByProperty(products, "category", "electronics");
```
*Explanation:* Uses `keyof` + generic constraint (`K extends keyof T`) so `key` must be a valid property of `T`, and `value`'s type is automatically inferred as `T[K]` — you can't accidentally pass a mismatched value type. This is a very common "show me you understand generics" interview exercise.

---

**Exercise 5: Discriminated union — traffic light**
> Model a traffic light with states `"red" | "yellow" | "green"`, and write a function `nextLight` that returns the next state in the cycle (red → green → yellow → red).

```typescript
type LightState = "red" | "yellow" | "green";

function nextLight(current: LightState): LightState {
  const transitions: Record<LightState, LightState> = {
    red: "green",
    green: "yellow",
    yellow: "red",
  };
  return transitions[current];
}
```
*Explanation:* Uses `Record<K, T>` to build an exhaustive transition map — TypeScript will error if any `LightState` key is missing, giving compile-time guarantees the transition table is complete.

---

**Exercise 6: Type guard for a union of API shapes**
> Given `type ApiResult = { success: true; data: string } | { success: false; error: string }`, write a function that logs the right thing depending on the result.

```typescript
type ApiResult = { success: true; data: string } | { success: false; error: string };

function handleResult(result: ApiResult): void {
  if (result.success) {
    console.log("Data:", result.data);   // TS knows `data` exists here
  } else {
    console.error("Error:", result.error); // TS knows `error` exists here
  }
}
```

---

### 🔴 Hard

**Exercise 7: Implement your own `DeepReadonly<T>`**
> Write a utility type that makes an object type — including all nested objects — fully read-only.

```typescript
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface Config {
  server: { host: string; ports: number[] };
}
type ReadonlyConfig = DeepReadonly<Config>;
// server is readonly, server.host is readonly, even ports array elements become effectively locked at the type level
```
*Explanation:* Tests recursive conditional types + mapped types — a genuinely advanced, "write it yourself" version of a pattern usually only seen as a library utility.

---

**Exercise 8: Type-safe event emitter**
> Implement a generic, type-safe event emitter where each event name maps to a specific payload type, and `on`/`emit` are fully type-checked against that map.

```typescript
type EventMap = {
  login: { userId: string };
  logout: undefined;
  error: { message: string; code: number };
};

class TypedEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(payload: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, callback: (payload: T[K]) => void): void {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof T>(event: K, payload: T[K]): void {
    this.listeners[event]?.forEach((cb) => cb(payload));
  }
}

const emitter = new TypedEmitter<EventMap>();
emitter.on("login", (payload) => console.log(payload.userId)); // payload correctly typed as { userId: string }
emitter.emit("login", { userId: "123" });     // ✅
emitter.emit("login", { wrong: "field" });    // ❌ Compile error
```
*Explanation:* A genuinely production-grade pattern (similar to Node's `EventEmitter` but type-safe) — tests generics, mapped types, and indexed access types together. This is a strong senior-level exercise.

---

### 🟣 Interview-Level (Whiteboard-Style)

**Exercise 9: "Implement `Omit<T, K>` yourself, without using the built-in utility type."**

```typescript
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

interface User { id: number; name: string; email: string; }
type UserWithoutEmail = MyOmit<User, "email">;
```
*What the interviewer is testing:* Can you reason about `keyof`, `Exclude`, and mapped types together to reconstruct a utility type from first principles — this is a classic "prove you understand the primitives" whiteboard question.

**Exercise 10: "Write a function overload for a `createElement` function that returns different types based on a string tag argument."**

```typescript
function createElement(tag: "img"): HTMLImageElement;
function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const img = createElement("img"); // typed as HTMLImageElement
const link = createElement("a");  // typed as HTMLAnchorElement
```
*What the interviewer is testing:* Function overloading — a feature many devs know exists but rarely practice writing; shows precision typing skill for APIs where the return type depends on an input value.

---

## 25. Multiple Choice Questions (MCQs)

**MCQ 1.** What does the following code output when compiled and run?
```typescript
let x: any = "hello";
x = 42;
console.log(typeof x);
```
- A) `string`
- B) `any`
- C) `number` ✅
- D) Compile error

*Explanation:* `any` disables type checking, so reassigning `x` to `42` is allowed with no error. At **runtime**, `typeof` reflects the actual JS value, which is now a number — so `"number"` prints. (A) is wrong because it ignores the reassignment. (B) is wrong because `any` is a compile-time-only concept; it doesn't exist as a runtime `typeof` result — JS's `typeof` only knows `"string"`, `"number"`, `"boolean"`, `"object"`, `"function"`, `"undefined"`, `"symbol"`, `"bigint"`. (D) is wrong because `any` permits any reassignment without error.

---

**MCQ 2.** Which utility type would you use to make every property of an interface optional?
- A) `Optional<T>`
- B) `Partial<T>` ✅
- C) `Maybe<T>`
- D) `Nullable<T>`

*Explanation:* `Partial<T>` is the correct built-in TypeScript utility type. (A), (C), and (D) are not real built-in TypeScript utility types (some libraries define their own similarly-named helpers, but they aren't part of the language).

---

**MCQ 3.** What is the output/result of this code?
```typescript
interface Point { x: number; y: number; }
function logPoint(p: Point) { console.log(p.x, p.y); }
logPoint({ x: 1, y: 2, z: 3 });
```
- A) Compile error — extra property `z` not allowed
- B) Compiles and runs fine, logging `1 2` ✅
- C) Compiles but throws a runtime error
- D) `z` is silently added to the `Point` interface

*Explanation:* This demonstrates structural typing — an object with EXTRA properties is still compatible as long as it has everything required. (A) would only be true for an **object literal assigned directly with excess property checking** in certain contexts (this is actually a nuance — see the follow-up note below) — but passed via a variable or in this exact inline form to a function parameter, TypeScript performs "excess property checking" ONLY on fresh object literals assigned directly. Note: this specific example (an inline literal argument) would actually trigger excess property checking and produce a compile error in real TypeScript — this MCQ is intentionally testing whether you know that inline object literals are checked more strictly than variables holding the same shape.

> **Note for the reader:** This is a genuinely subtle, frequently-misunderstood area. If `const obj = {x:1,y:2,z:3}; logPoint(obj);` — that compiles fine (structural typing, variable form). But `logPoint({x:1,y:2,z:3})` directly — TypeScript's **excess property check** flags the literal. Interviewers sometimes use this exact contrast to separate people who deeply understand TS from those who only know the general "structural typing" rule.

---

**MCQ 4.** Which of these correctly narrows a value of type `string | number` to `string`?
- A) `if (value == "string")`
- B) `if (value instanceof String)`
- C) `if (typeof value === "string")` ✅
- D) `if (value.length)`

*Explanation:* `typeof` is the correct, idiomatic way to narrow primitives. (A) compares the *value* to the literal string `"string"`, not its type. (B) is wrong for primitive strings — `instanceof String` only matches boxed `String` objects created via `new String(...)`, not primitive string literals. (D) would cause a compile error since `.length` isn't guaranteed to exist on `number`.

---

**MCQ 5.** What does `Awaited<ReturnType<typeof fetchData>>` accomplish, given `async function fetchData(): Promise<User> {...}`?
- A) Gets the type of the `fetchData` function itself
- B) Gets `Promise<User>`
- C) Gets `User` ✅
- D) Causes a compile error since `Awaited` doesn't exist

*Explanation:* `ReturnType<typeof fetchData>` extracts `Promise<User>` (the declared return type). `Awaited<...>` then unwraps the Promise, giving `User`. (B) is the intermediate step, not the final result. (D) is wrong — `Awaited<T>` is a real built-in utility type (introduced to properly handle recursively-nested/thenable promise unwrapping).

---

## 26. Flashcards

> Format: **Front (Question)** → *Back (Answer)*

1. **What does TypeScript compile down to?** → *Plain JavaScript — all types are erased at compile time.*
2. **What is type inference?** → *TypeScript automatically determining a variable's type from its assigned value, without explicit annotation.*
3. **`any` vs `unknown`?** → *`any` disables type checking entirely; `unknown` requires narrowing before use, preserving safety.*
4. **What typing model does TypeScript use — structural or nominal?** → *Structural (duck typing) — shape matters, not the declared type name.*
5. **What does `Partial<T>` do?** → *Makes all properties of `T` optional.*
6. **What does `Pick<T, K>` do?** → *Creates a new type with only the selected keys `K` from `T`.*
7. **What does `Omit<T, K>` do?** → *Creates a new type excluding the selected keys `K` from `T`.*
8. **What is a discriminated union?** → *A union of object types sharing a common literal "tag" property, enabling automatic narrowing and exhaustiveness checks.*
9. **What is `never` used for?** → *Represents a value/function that never successfully returns (throws, infinite loop) or an exhaustively-narrowed empty case.*
10. **Difference between `interface` and `type`?** → *`interface` supports declaration merging and is idiomatic for object shapes; `type` can express unions, intersections, and primitives, but can't merge.*
11. **What is a generic?** → *A way to write reusable code that works across multiple types while preserving type safety, instead of using `any`.*
12. **What does `keyof T` produce?** → *A union of the literal property names of `T`.*
13. **What is `satisfies` used for?** → *Validating a value against a type without widening/losing its more specific inferred type.*
14. **Why can't you use `instanceof` with an interface?** → *Interfaces produce zero runtime code (type erasure) — only classes exist at runtime.*
15. **What does `strictNullChecks` do?** → *Forces `null`/`undefined` to be explicitly included in a type's union before they're allowed — prevents a huge class of null-reference bugs.*
16. **What is a `.d.ts` file?** → *A declaration file containing only type information (no implementation), used to type plain JS code/libraries.*
17. **What does `readonly` do on a property?** → *Prevents that property from being reassigned after initial creation.*
18. **What is excess property checking?** → *TypeScript's stricter check applied to fresh object literals assigned directly to a typed variable/parameter, flagging properties not defined on the target type.*
19. **What does `Record<K, T>` build?** → *An object type with keys of type `K`, all mapped to value type `T`.*
20. **What is type narrowing?** → *Refining a broader type (like a union) to a more specific type within a code branch, using `typeof`, `instanceof`, or custom type guards.*

---

*End of Part 4.*

---

# PART 5

> Covers: Cheat Sheet → Timed Revision Notes → Common Bugs → Production Interview Stories → FAQ Bank (Batch 1).

---

## 27. One-Page Cheat Sheet

```
┌──────────────────────────────── TYPESCRIPT CHEAT SHEET ─────────────────────────────────┐

BASIC TYPES
  string  number  boolean  null  undefined  bigint  symbol  any  unknown  never  void

DECLARING
  let x: number = 5;                    interface Person { name: string; age?: number }
  const arr: number[] = [1,2,3];        type ID = string | number;
  const tuple: [string, number]         enum Color { Red, Green, Blue }

FUNCTIONS
  function add(a: number, b: number): number { return a + b }
  const fn: (a: number) => number = (a) => a * 2

GENERICS
  function identity<T>(x: T): T { return x }
  interface Box<T> { value: T }
  class Repo<T extends { id: string }> { ... }

UNIONS / NARROWING
  string | number            →  typeof value === "string"
  ClassA | ClassB             →  value instanceof ClassA
  { kind:"a" } | { kind:"b" } →  switch(value.kind)

UTILITY TYPES
  Partial<T>   Required<T>   Readonly<T>   Pick<T,K>   Omit<T,K>
  Record<K,T>  Exclude<T,U>  Extract<T,U>  NonNullable<T>
  ReturnType<T>  Parameters<T>  Awaited<T>

KEY OPERATORS
  keyof T        → union of property names
  typeof value   → extract type of a value
  T[K]           → indexed access (property type)
  T extends U ? X : Y   → conditional type
  infer U        → extract a type within a conditional type

MODIFIERS
  readonly prop         optional prop?           -readonly / -?  (strip modifiers)

tsconfig.json ESSENTIALS
  "strict": true          "target": "ES2020"        "module": "commonjs" / "esnext"
  "noImplicitAny": true   "strictNullChecks": true   "esModuleInterop": true

RULES OF THUMB
  • Prefer `unknown` over `any`
  • Use `interface` for object/class shapes, `type` for unions/intersections
  • Always validate external data (API/JSON) at runtime — types vanish at runtime
  • Enable `strict: true` from day one
  • Use discriminated unions to model mutually-exclusive states

└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 28. Revision Notes by Time Budget

### ⏱ 5-Minute Revision
- TypeScript = JavaScript + static types, compiled by `tsc`, types erased at runtime.
- Structural typing: shape matters, not the declared name.
- `any` = unsafe, disables checking. `unknown` = safe, requires narrowing.
- Core utility types: `Partial`, `Pick`, `Omit`, `Record`.
- Discriminated unions model mutually-exclusive states safely.
- Types don't validate runtime data — always validate API responses separately.

### ⏱ 15-Minute Revision
Add to the above:
- Generics (`<T>`) enable reusable, type-safe code — know `Repository<T>`-style patterns.
- `interface` vs `type`: merging + object shapes vs unions/intersections/primitives.
- Type narrowing via `typeof`, `instanceof`, custom type guards (`value is X`).
- `keyof`, `typeof` (type position), indexed access `T[K]`.
- `strictNullChecks` forces explicit handling of `null`/`undefined`.
- `.d.ts` files describe types for plain JS libraries; `@types/...` from DefinitelyTyped.

### ⏱ 30-Minute Revision
Add to the above:
- Mapped types (`{ [K in keyof T]: ... }`), conditional types (`T extends U ? X : Y`), `infer`.
- Template literal types for string unions (`` `on${Capitalize<Event>}` ``).
- `satisfies` operator — validates shape without widening inferred type.
- Module augmentation (`declare module "express" { interface Request {...} }`).
- Function overloads for input-dependent return types.
- Compilation pipeline: Scanner → Parser (AST) → Binder (symbol table) → Checker → Emitter.
- Migration strategy: `allowJs` → convert leaf files first → progressively enable `strict`.

### ⏱ 60-Minute Revision
Add to the above — do a full pass through:
- Every code example in Sections 5, 18, and 20 (write them from memory, then compare).
- All 5 MCQs (Section 25) — make sure you can explain every wrong option, not just the right one.
- All 20 flashcards (Section 26) — cover the answer and self-test.
- The 3 Scenario-Based Questions (Section 22) — practice saying the answer out loud in under 90 seconds each.
- Re-read Section 20.1 (variance) and 20.4 (`satisfies`) once more — these are the two most commonly under-revised advanced topics.

---

## 29. Common Bugs — Why They Happen & How to Fix Them

| Bug | Why It Happens | How to Debug | Fix |
|---|---|---|---|
| `Property 'x' does not exist on type 'Y'` | Accessing a property TypeScript doesn't know about (typo, wrong type, or genuinely missing from the interface) | Check the exact type via hover in VS Code; check for typos | Correct the property name, or extend the interface if the property should legitimately exist |
| `Object is possibly 'undefined'` | `strictNullChecks` is on and you're accessing a property on a value that might be `undefined` (e.g., array `.find()` result) | Trace where the value came from — does it involve `.find()`, an optional property, or an optional chain? | Add a guard (`if (x) {...}`), use optional chaining (`x?.y`), or use a non-null assertion (`x!.y`) ONLY if you are certain it can't be null |
| `Type 'X' is not assignable to type 'Y'` | Trying to assign an incompatible shape/value | Compare the two types side-by-side; look for missing properties, mismatched literal types, or extra properties on literals | Fix the source value's shape, or adjust the target type if it was too narrow |
| Silent runtime crash despite "no TS errors" | Usually caused by an unsafe `as` cast, `any` typed value, or unvalidated external data (API response) | Search for `as` casts and `any` near the crash site; check if the value came from `fetch`/`JSON.parse` | Replace unsafe casts with proper type guards; add runtime validation (zod/io-ts) at data boundaries |
| `This condition will always return true/false` | Comparing two types that TypeScript has already proven can never overlap (e.g., checking `typeof x === "number"` when `x` is already narrowed to `string`) | Read the inferred type at that point in the code (hover in editor) | Remove the redundant check, or fix the type upstream if the narrowing is wrong |
| Generic function losing type inference (returns `unknown`/`any`) | Constraint (`extends`) missing, or type parameter used in a position TS can't infer from | Check if `T` appears in a parameter position TS can infer from | Add explicit generic argument at call site, or improve the function signature so `T` is inferable |
| Excess property check failing on an object that "should" be fine | Passing a fresh object literal directly (not via a variable) to a typed parameter with extra properties | Check whether the object is a literal or a pre-declared variable | Either remove the extra property, extend the target type, or assign to a variable first (bypasses the stricter fresh-literal check — use deliberately, not as a workaround habit) |

---

## 30. Production Interview Stories

**Story 1 — "The `any` that cost a production incident."**
> A senior engineer describes: a team used `any` for a payment amount field coming from a third-party payment gateway's webhook, to "get it shipped fast." Months later, the gateway changed the field from a `number` (cents) to a `string` in a webhook version upgrade — no compiler error occurred anywhere in the codebase because the value was typed `any`, so it silently flowed through arithmetic (`amount * 100`), producing `NaN` and creating incorrect charge records for hours before anyone noticed.
> **What a senior engineer expects you to say:** identify that `any` should have been `unknown`, validated with a schema (e.g., `zod`) right at the webhook boundary, and that a single missed type-safety shortcut on a financial field is the kind of place where the "TypeScript overhead" argument completely falls apart — the cost of one incident vastly exceeds the time saved.

**Story 2 — "Refactoring 200 files safely."**
> An interviewer describes needing to rename a `userId` property to `accountId` across a large codebase. Ask: "How would TypeScript help you do this safely, and what would you still need to check manually?"
> **Expected answer:** Renaming the property in the shared `interface`/`type` immediately surfaces every usage across the codebase as a compile error — TypeScript effectively acts as a checklist of every place that needs updating, and editors (VS Code) can often auto-rename all usages via "Rename Symbol." What TypeScript can't catch: string-based references (e.g., a dynamic property access like `obj["userId"]`, GraphQL query strings, or raw SQL column names), external API contracts with other services not covered by the shared types, and anywhere `any` was used to bypass the type system around that property.

**Story 3 — "The interview question behind the question: modeling state correctly."**
> Interviewer: "Design the types for a multi-step signup form (step 1: email, step 2: password, step 3: profile info) where each step's data should only be accessible once completed."
> **What separates strong candidates:** Using a discriminated union to represent the form's progress (`{ step: "email" } | { step: "password"; email: string } | { step: "profile"; email: string; password: string }`) so that TypeScript makes it literally impossible to access `password` before `email` is set — "illegal states unrepresentable" — rather than a single flat interface with a bunch of optional fields and manual runtime checks scattered everywhere.

---

## 31. FAQ Bank — Beginner (Batch 1 of 4 — Q1–25)

*(Concise format for this bank: Question → Answer. Full-depth "ideal answer / why / wrong answer / follow-up" format was used for the 9 core questions in Sections 9, 19, 21 above — treat those as the deep-dive template, and this bank as broad rapid-fire coverage.)*

1. **What does "TypeScript is a superset of JavaScript" mean?** → Every valid JS file is also valid TS; TS only adds features on top, never removes JS capabilities.
2. **Do browsers run TypeScript directly?** → No — it must be compiled to JavaScript first.
3. **What command compiles a TypeScript file?** → `tsc filename.ts`
4. **What is `tsconfig.json`?** → The project's compiler configuration file (target, strictness, output dir, etc.).
5. **What does `strict: true` do?** → Enables a bundle of stricter checks (`noImplicitAny`, `strictNullChecks`, etc.) for maximum type safety.
6. **Is TypeScript object-oriented?** → It supports OOP features (classes, interfaces, inheritance, access modifiers) on top of JS, which itself has prototype-based OOP.
7. **What is `noImplicitAny`?** → A compiler flag that errors when a variable/parameter's type can't be inferred and would otherwise silently become `any`.
8. **Can you use `let`/`const` in TypeScript?** → Yes — TypeScript supports all modern JS syntax, including `let`/`const`, arrow functions, destructuring, etc.
9. **What's the difference between `let` and `const` typing-wise?** → No difference in typing rules directly, but `const` with a literal value can be inferred as a more specific literal type in some contexts.
10. **What does `readonly` do?** → Prevents reassignment of a property after it's initially set.
11. **What is an enum?** → A way to define a set of named constants (numeric or string-based).
12. **What's the difference between numeric and string enums?** → Numeric enums auto-increment from 0 by default; string enums require explicit string values for every member and are more debuggable (the value IS the name).
13. **What does the `?` mean after a property name in an interface?** → Marks that property as optional.
14. **What does the `!` (non-null assertion) operator do?** → Tells the compiler "trust me, this value is not null/undefined," bypassing the check — used sparingly, only when you're certain.
15. **Can a function have no return type specified?** → Yes, TypeScript will infer it; explicit annotation is best practice for public/exported functions.
16. **What is a type alias?** → A custom name for any type, created with the `type` keyword.
17. **Can TypeScript catch every JavaScript bug?** → No — logic errors, runtime data mismatches, and issues from unsafely-typed code (`any`, bad casts) can still slip through.
18. **What is `void` used for?** → The return type of a function that doesn't return a meaningful value.
19. **What's the difference between `undefined` and `null`?** → `undefined` typically means "not yet assigned," `null` means "intentionally empty" — TypeScript treats them as distinct types under `strictNullChecks`.
20. **Does TypeScript support arrow functions?** → Yes, fully, with the same typing rules as regular functions.
21. **What is destructuring, and can you type it?** → Extracting values from arrays/objects into variables; yes, you can type destructured parameters: `function f({ name }: { name: string }) {}`.
22. **What is a union type?** → A type that can be one of several specified types, written with `|`.
23. **What is an intersection type?** → A type that combines multiple types into one, requiring all their properties, written with `&`.
24. **Can interfaces extend other interfaces?** → Yes: `interface Admin extends User { permissions: string[] }`.
25. **Can a class implement an interface?** → Yes: `class Employee implements Person { ... }` — the class must then provide all properties/methods the interface declares.

---

*End of Part 5.*

---

# PART 6

> Covers: FAQ Bank — Beginner (26–50) → Intermediate (1–25) → Company-Specific Questions.

---

## 32. FAQ Bank — Beginner (Batch 2 of 4 — Q26–50)

26. **What is `Array<T>` vs `T[]`?** → Identical meaning, different syntax; `T[]` is more common, `Array<T>` is preferred when `T` is itself a complex/union type for readability (e.g., `Array<string | number>`).
27. **What happens if you don't specify a type at all?** → TypeScript infers it if possible; otherwise (with `noImplicitAny` on) it's a compile error, or defaults to `any` if the flag is off.
28. **What is a tuple?** → A fixed-length array where each position has its own specific type.
29. **Can tuples have optional elements?** → Yes: `[string, number?]`.
30. **What is the `in` operator used for in type narrowing?** → Checking whether a property exists on an object to narrow a union: `if ("swim" in animal)`.
31. **What does `Object.keys()` return the type of, and why is this often surprising?** → `string[]` — even for a strictly typed object, because JS objects can have extra keys added dynamically at runtime, so TS can't guarantee the returned keys exactly match `keyof T`.
32. **What is a literal type?** → A type representing one exact, specific value, e.g., `type Status = "active"` (only the string `"active"` is valid, not any string).
33. **How do you type a function that takes another function as a parameter (callback)?** → `function run(callback: (result: string) => void): void { ... }`
34. **What is the difference between a type error and a runtime error?** → Type errors are caught by the compiler before the code runs; runtime errors occur while the program is executing, regardless of language.
35. **Can you have circular type references?** → Yes, TypeScript supports recursive types (e.g., a `TreeNode` type referencing itself in a `children` property).
36. **What is `Array.isArray()` used for in TypeScript type narrowing?** → Narrowing a value of an ambiguous/union type to confirm it's specifically an array before using array methods.
37. **What does the spread operator (`...`) do, and is it typed?** → Expands an iterable's elements; fully typed — spreading a `number[]` into a function expecting rest `number[]` params works safely.
38. **What is the difference between `const` and `readonly`?** → `const` prevents *reassigning a variable binding*; `readonly` prevents *reassigning a property* on an object/class.
39. **Is TypeScript compiled or interpreted?** → Compiled (to JavaScript) — though the resulting JavaScript may then be interpreted or JIT-compiled by the JS engine.
40. **What does `unknown[]` mean vs `any[]`?** → `unknown[]` still requires narrowing each element before use; `any[]` allows unchecked operations on elements.
41. **Can a TypeScript variable have no type at all?** → Every value has SOME type at compile time (even if it's inferred as `any` when checks are relaxed) — TypeScript is always tracking a type internally.
42. **What is `Function` type vs a specific function signature type?** → `Function` is a very loose type (any callable value, no parameter/return checking); prefer specific signatures like `(a: number) => void`.
43. **What's the purpose of the `declare` keyword?** → Declares a variable/function/module's type without providing an implementation — used in `.d.ts` files or for globals defined elsewhere (e.g., injected by a script tag).
44. **What does "duck typing" mean?** → "If it walks like a duck and quacks like a duck, treat it as a duck" — TypeScript checks shape/behavior compatibility, not declared identity.
45. **Is it possible to disable type checking for a single line?** → Yes, with `// @ts-ignore` (suppresses silently) or `// @ts-expect-error` (suppresses AND errors if the line stops having an error — safer, self-cleaning).
46. **What is the `as const` assertion?** → Locks a value to its most specific literal type and makes it deeply `readonly`, e.g., `const dirs = ["up","down"] as const` types it as `readonly ["up","down"]` instead of `string[]`.
47. **What is index signature syntax?** → `{ [key: string]: number }` — describes an object with dynamic/unknown keys, all mapping to a consistent value type.
48. **Can you type `this` inside a function?** → Yes, via a special first parameter: `function greet(this: Person, msg: string) { ... }` — purely for type-checking, erased at compile time.
49. **What is a class access modifier?** → `public` (default), `private` (only accessible within the class), `protected` (accessible within the class and subclasses) — control property/method visibility.
50. **What is an abstract class?** → A class that cannot be instantiated directly and may declare methods without implementations, meant to be extended by subclasses that provide the concrete implementation.

---

## 33. FAQ Bank — Intermediate (Batch 1 of 4 — Q1–25)

1. **What's the difference between `Pick` and `Omit` in one sentence?** → `Pick` selects specific keys to keep; `Omit` selects specific keys to remove.
2. **When would you use `Record<K, T>` over a regular interface?** → When keys are dynamic/enumerable from a union (like all values of a string-literal union) rather than a small fixed set of named properties.
3. **What is the difference between function overloading and generics?** → Overloading defines multiple specific signatures for concrete input/output type pairs; generics define one flexible signature parameterized over any type.
4. **How does TypeScript handle default parameter values for typing?** → It infers the parameter's type from the default value if no explicit annotation is given, and automatically makes the parameter optional.
5. **What's the danger of using type assertions (`as`) carelessly?** → They bypass the compiler's checking entirely with no runtime verification — if the actual value doesn't match, you get a runtime bug with no compile-time warning.
6. **What is `Exclude<T, U>` used for?** → Removing specific members from a union type.
7. **How would you type a React functional component's props (conceptually)?** → Define a `Props` interface describing all expected props, then type the component function's parameter with it (`function Comp(props: Props)`), or use `React.FC<Props>` (though many style guides now prefer the plain function signature).
8. **What is the difference between a class and an interface implementing similar shapes?** → A class provides both a type AND a runtime implementation (constructor, methods); an interface is purely a compile-time contract with zero runtime footprint.
9. **What does `Array<T>.find()` return, and why does this matter for `strictNullChecks`?** → `T | undefined`, because the search might not find a match — forces you to handle the "not found" case explicitly.
10. **How do generics interact with default type parameters?** → You can specify a default: `interface Box<T = string> { value: T }`, so `Box` without an explicit type argument defaults to `Box<string>`.
11. **What is the purpose of `Omit` chained with `Partial`?** → A common production pattern for "update" DTOs: `Partial<Omit<User, "id">>` — every field optional except explicitly removing fields that should never be updatable (like `id`).
12. **How do you type an async function that might throw?** → TypeScript doesn't type thrown errors directly (no checked exceptions); the return type is `Promise<T>` for the success path, and error handling is a runtime/`try-catch` concern, though some teams model errors explicitly via a Result-type union instead of throwing.
13. **What's the difference between `T[]` and `readonly T[]`?** → `readonly T[]` disallows mutating methods (`push`, `pop`, `splice`, index assignment) at compile time, while still allowing non-mutating operations (`map`, `filter`).
14. **How does TypeScript handle optional chaining (`?.`) with typing?** → The result type automatically becomes `T | undefined` (adding `undefined` to the type) at each optional step.
15. **What is the nullish coalescing operator (`??`) and how does it differ from `||`?** → `??` only falls back when the left side is `null`/`undefined`; `||` falls back for any falsy value (`0`, `""`, `false` too) — `??` is usually the more precise, type-safe choice for defaults.
16. **How would you type a Redux reducer function?** → `function reducer(state: State, action: Action): State { ... }`, typically with `Action` as a discriminated union over an `type` field.
17. **What's the benefit of branded/nominal types, and how do you simulate them?** → Prevents structurally-identical but semantically-different types (like `UserId` vs `OrderId`, both strings) from being interchangeable; simulated via an intersection with a unique tag: `type UserId = string & { __brand: "UserId" }`.
18. **How do generics improve on function overloading for many cases?** → One generic signature can replace dozens of overloads when the relationship between input and output type is systematic/parameterizable, rather than a fixed enumerated set.
19. **What does `Object.freeze()` do to TypeScript's type of a value?** → When combined with `as const`, or when TypeScript can infer it, `Object.freeze()` on a typed object produces a `Readonly<T>` typed result, blocking property reassignment at compile time too.
20. **What is module resolution, and why does it sometimes fail in TS projects?** → The process TypeScript uses to locate the actual file behind an `import` path; failures often stem from incorrect `baseUrl`/`paths` config, missing file extensions in certain module modes, or case-sensitivity mismatches between the import and the actual filename.
21. **What's the difference between `import type` and a regular `import`?** → `import type` imports ONLY for type-checking purposes and is guaranteed to be fully erased at compile time (never generates a runtime `require`/`import`) — useful for avoiding unnecessary runtime dependencies and enabling certain bundler optimizations.
22. **How do you type a component/function that accepts children (React context)?** → Typically via `children: React.ReactNode` in the props interface.
23. **What is the difference between `interface Foo { (): void }` and `type Foo = () => void`?** → Both describe a callable signature; the interface form is "call signature" syntax and can also carry additional properties (hybrid types), while the type alias form is simpler for pure function types.
24. **How does TypeScript's control flow analysis work with early returns?** → The compiler tracks type narrowing along every code path — an early `return` inside an `if` branch means the narrowed type from that check doesn't apply to code after the block, refining what's known further down.
25. **What's a common reason a generic type parameter fails to be inferred, forcing you to specify it explicitly?** → When `T` only appears in the return type/position and not in any parameter TypeScript can use to infer it from actual arguments (e.g., an empty array `useState<string[]>([])` — without the explicit type argument, TS would infer `never[]`).

---

## 34. Company-Specific Interview Questions (Adapted for Full-Stack MERN Developers)

### 🔵 Google-style
- "Design the TypeScript types for a paginated API response generic enough to work for any resource (`users`, `products`, `orders`)." → Expect a generic `PaginatedResponse<T>` with `data: T[]`, `page`, `totalPages`, `totalItems`.
- "How would you enforce that a function's error handling covers every possible error variant at compile time?" → Discriminated union for errors + exhaustiveness checking via `never`.
- "Explain a situation where TypeScript's structural typing caused an unexpected bug, and how you'd prevent it." → Tests awareness of accidental compatibility (e.g., two differently-intended types being structurally identical) — mitigated with branded/nominal types.

### 🟢 Microsoft-style
- "Walk through what happens internally when you run `tsc` on a file with a type error — does it still emit JavaScript?" → Tests understanding of the compilation pipeline (Section 3) — yes, by default TS still emits JS even with type errors unless `noEmitOnError` is set.
- "How would you type a plugin/extension system where third parties register typed handlers?" → Generic `Record`/mapped-type based plugin registry, similar to the `TypedEmitter` exercise (Section 24).
- "What tradeoffs would you weigh before adopting `strict: true` on a 5-year-old, 500k-line JavaScript codebase?" → Migration cost, incremental rollout strategy (Section 20.6), team disruption vs. long-term bug reduction.

### 🟠 Amazon-style
- "Design types for an order processing state machine (placed → paid → shipped → delivered/cancelled) that make invalid transitions impossible to represent." → Discriminated union per state, transition functions that only accept the valid prior state(s).
- "How do you ensure type safety between a Node.js/Express backend and a frontend consuming its API, without duplicating type definitions?" → Shared types package/monorepo (Section 22, Scenario 3), or generating types from an OpenAPI/GraphQL schema.
- "Tell me about a time type safety caught a bug before it reached production." → Behavioral + technical — expects a concrete example, ideally quantified impact.

### 🔷 Meta-style
- "How would you type a deeply nested, dynamically-shaped configuration object used across a large React component tree?" → `DeepPartial<T>` (Section 20.3) plus context-based typed providers.
- "Explain how TypeScript's generics interact with React hooks like `useState` and `useReducer`." → `useState<T>(initial: T)`, explicit generics needed when the initial value doesn't fully convey the intended type (e.g., empty array/null initial state).
- "What's your approach to typing a component library meant for external consumption by other teams?" → Precise, well-documented prop interfaces, exported types alongside components, avoiding leaking internal-only types, considering backward compatibility of the public type surface as a real API contract.

### 🔴 Netflix-style
- "How would you type a system with multiple video playback error codes that need different handling logic across services?" → Enum or literal union for error codes + discriminated union for handling result, exhaustiveness-checked.
- "Discuss performance considerations of TypeScript's type checker on a very large codebase, and how you'd mitigate them." → Project references, incremental builds, avoiding excessively deep/recursive generic types (Section 20.5).

### 🟣 Startup-style (broad, practical)
- "We have no types anywhere and a tight deadline — how do you introduce TypeScript incrementally without slowing the team down?" → Migration strategy (Section 20.6): `allowJs`, convert leaf files first, progressive strictness.
- "Convince me TypeScript is worth the setup overhead for a 3-person startup team." → Balanced answer: faster onboarding, safer refactors, fewer runtime surprises — weighed honestly against genuine short-term velocity cost for tiny throwaway prototypes.

---

*End of Part 6.*

---

# PART 7

> Covers: FAQ Bank — Beginner (51–75) → Intermediate (26–50) → Advanced (1–25).

---

## 35. FAQ Bank — Beginner (Batch 3 of 4 — Q51–75)

51. **What is the difference between `interface` merging and redefining a `type`?** → Two `interface Foo {}` declarations with the same name automatically merge into one combined interface; two `type Foo = {}` declarations with the same name cause a compile error (duplicate identifier).
52. **Can you assign `null` to a `string` variable by default?** → No, under `strictNullChecks`; you'd need `string | null`. Without `strictNullChecks`, yes (not recommended).
53. **What is a "fresh" object literal in the context of excess property checks?** → An object literal written directly at the point of assignment/call (not stored in a variable first) — subject to stricter extra-property checking.
54. **What does `Array<string>.includes()` return?** → `boolean` — whether the array contains the given value.
55. **How do you type a variable that could be several different literal strings?** → A string literal union: `type Direction = "up" | "down" | "left" | "right"`.
56. **What is the `Number()`, `String()`, `Boolean()` conversion pattern, and is it type-safe?** → Runtime type-coercion functions; TypeScript types their return values correctly (`Number(x)` returns `number`) but doesn't validate the semantic correctness of the conversion (e.g., `Number("abc")` compiles fine but yields `NaN`).
57. **What is a class constructor's parameter property shorthand?** → `constructor(public name: string) {}` — automatically declares AND assigns a class property in one line.
58. **What does `implements` do for a class?** → Forces the class to satisfy a given interface's shape, or the compiler errors.
59. **Can an interface have method signatures, not just properties?** → Yes: `interface Greeter { greet(name: string): string }`.
60. **What is the difference between `public`, `private`, and `protected`?** → `public` (default) accessible everywhere; `private` accessible only inside the declaring class; `protected` accessible inside the declaring class and its subclasses.
61. **Does TypeScript enforce access modifiers at runtime?** → No — like all types, access modifiers are compile-time only and are erased; nothing stops JS code from accessing a "private" field at runtime (though native JS `#privateField` syntax, which TS also supports, DOES enforce privacy at runtime).
62. **What's the difference between TypeScript's `private` and JavaScript's `#private` fields?** → TS `private` is compile-time-only (erased, technically accessible via bracket notation at runtime); native `#private` fields are enforced by the JS engine itself at runtime too.
63. **What does `import * as X from "module"` mean?** → Imports the entire module's exports as a single namespace object named `X`.
64. **What is a namespace in TypeScript, and is it still commonly used?** → An older way (`namespace Foo { ... }`) to organize code and avoid naming collisions, largely superseded by ES modules in modern codebases.
65. **What is the `in` keyword used for besides narrowing?** → Also used in mapped types: `{ [K in keyof T]: ... }`, iterating over a union of keys.
66. **What is the safest way to loop over an object's keys with correct typing?** → `(Object.keys(obj) as (keyof typeof obj)[]).forEach(...)`, or better, use `Object.entries` with careful typing, since `Object.keys` always returns `string[]` by default.
67. **What does `Array.prototype.map()` preserve/change about types?** → Returns a new array typed based on the callback's return type — e.g., mapping `number[]` with `(n) => n.toString()` yields `string[]`.
68. **What is a "type-only" import used for (`import type`)?** → Importing purely for compile-time type checking, guaranteed to produce zero runtime code — helps avoid circular runtime dependencies and unnecessary bundle size.
69. **What happens if two properties in an intersection type conflict (e.g., same property name, incompatible types)?** → The resulting property type becomes `never` (since no value could satisfy both), effectively making that property impossible to set validly.
70. **What's the difference between compile-time and design-time in the context of TypeScript tooling?** → Compile-time is when `tsc` actually processes the whole project (e.g., a build step); "design-time" typically refers to the live, incremental checking the Language Service provides inside your editor as you type.
71. **Can a function type describe a function with optional parameters?** → Yes: `type Fn = (a: number, b?: string) => void`.
72. **What is the difference between an arrow function and a regular function regarding `this` typing?** → Arrow functions don't have their own `this` (they inherit it lexically from the enclosing scope), which TypeScript accounts for — a common source of `this`-related bugs in regular functions used as callbacks.
73. **How would you type an object where you know the keys but not upfront, only that they map to numbers?** → An index signature: `{ [key: string]: number }`.
74. **What's the benefit of typing your Express route handlers' request/response objects?** → Autocomplete and compile-time errors for accessing `req.body`/`req.params`/`req.query` fields, catching typos and shape mismatches before runtime.
75. **What does the term "ambient declaration" mean?** → A type declaration (via `declare`) describing something that exists elsewhere at runtime (a global variable, a script-tag-injected library) without providing its implementation.

---

## 36. FAQ Bank — Intermediate (Batch 2 of 4 — Q26–50)

26. **How would you type a function that accepts either a single item or an array of items, and always returns an array?** → `function toArray<T>(input: T | T[]): T[] { return Array.isArray(input) ? input : [input]; }`
27. **What's the difference between `Record<string, T>` and an index signature `{ [key: string]: T }`?** → Functionally near-identical for string keys; `Record` is more concise and composable in generics, while index signatures allow slightly more nuanced declarations (like combining with specific named properties in some cases).
28. **How do you enforce that at least one of several optional properties is provided?** → A union of object types, each requiring a different one of the properties, e.g., `{ email: string; phone?: never } | { phone: string; email?: never }`.
29. **What is the purpose of the `unique symbol` type?** → Creates a type that only that exact, specific symbol value can satisfy — often used for advanced branded-type patterns or well-known symbol-keyed properties.
30. **How would you type a memoization/cache utility generically?** → `function memoize<Args extends any[], R>(fn: (...args: Args) => R): (...args: Args) => R { ... }`, using a `Map` keyed by serialized arguments.
31. **What's the danger of overusing type assertions in test code?** → Tests are meant to catch real bugs; excessive `as` casting in tests can hide type mismatches that would otherwise fail correctly, weakening the safety net the tests are supposed to provide.
32. **How does TypeScript type array destructuring with a fixed number of elements?** → If destructuring from a tuple, each variable gets the exact corresponding type; from a regular array, all variables get the array's element type (or `undefined` union if `noUncheckedIndexedAccess` is enabled).
33. **What is `noUncheckedIndexedAccess` and why do senior teams enable it?** → A stricter compiler flag that adds `undefined` to the result of any index/array access (`arr[i]` becomes `T | undefined`), since a numeric index isn't guaranteed to exist — catches an entire class of off-by-one/out-of-bounds bugs that plain `strict` mode misses.
34. **How do you type a function overload set for a `parseValue` function that returns a different type per input string literal?** → Function overloads with literal parameter types per signature, similar to Exercise 10 in Section 24.
35. **What is the difference between `Function` and `(...args: any[]) => any`?** → Functionally similar looseness, but `(...args: any[]) => any` is explicit about being a callable signature, whereas `Function` is a broader, less precise built-in type — most style guides discourage both in favor of specific signatures.
36. **How would you model a "form field" type that captures both the value and its validation error state?** → `interface FormField<T> { value: T; error?: string; touched: boolean }`, often combined generically across a whole form: `Record<keyof FormValues, FormField<unknown>>` variations.
37. **What's a common pitfall when combining generics with default parameter values?** → TypeScript may infer a narrower/wider type than intended from the default value alone if the generic isn't also constrained/explicit, e.g., an empty array default silently inferring `never[]` instead of the intended `T[]`.
38. **How do discriminated unions interact with exhaustiveness checking in a `switch`?** → With `strict` mode and a `default: return assertNever(x)` pattern, adding a new union member without updating every switch statement produces a compile error at the `assertNever` call, since the unhandled member no longer narrows to `never`.
39. **What is a "type predicate," and where is it used?** → A function return type of the form `param is Type`, used to tell the compiler that a boolean-returning function narrows its argument's type when it returns `true` — the backbone of custom type guards.
40. **How would you type an event bus where handlers are registered by string key with arbitrary payloads, safely?** → Generic `EventMap` object type + generic emitter class constrained by `keyof T`, exactly as shown in Exercise 8 (Section 24).
41. **What's the difference between `Object` and `object` as types?** → `Object` (capitalized) matches almost anything, including primitives (since they have methods via boxing) — very loose and rarely useful; `object` (lowercase) matches any non-primitive value (objects, arrays, functions) but excludes primitives — much more useful and precise.
42. **How would you safely type `JSON.parse()`'s result?** → It always returns `any` by default (a known TS limitation) — wrap it with a type guard/schema validator (e.g., zod) to get a properly narrowed, verified type instead of blindly casting with `as`.
43. **What's the benefit of a generic constraint like `<T extends Record<string, unknown>>` over `<T extends object>`?** → More precise — guarantees `T` behaves like a plain key-value object with unknown-but-typed values, useful for generic utilities that need to safely iterate/access properties.
44. **How do you type a higher-order function that wraps another function and logs its calls, preserving the original signature?** → Using a generic capturing the wrapped function's full type: `function withLogging<T extends (...args: any[]) => any>(fn: T): T { ... }` (often paired with `as T` at the return, since the wrapper's own inferred type doesn't perfectly match without help).
45. **What's a common issue with typing recursive data structures like a linked list or tree?** → Self-referencing interfaces work fine (`interface Node { value: number; next: Node | null }`), but deeply recursive generic/conditional types can hit the compiler's recursion depth limits and slow down type-checking significantly.
46. **How would you type a debounce/throttle utility function generically?** → `function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void { ... }` — uses `Parameters<T>` to preserve the original argument types on the returned debounced function.
47. **What does "type widening" mean, and when does it happen?** → TypeScript sometimes infers a broader type than the exact literal value assigned, e.g., `let x = "hello"` infers `string` (widened), not the literal `"hello"` — because `let` implies the value might change; `const` often preserves the literal type instead.
48. **How would `as const` change the inferred type of an object literal?** → Every property becomes `readonly`, and literal values (strings, numbers) are inferred as their exact literal types instead of the general `string`/`number` type — extremely useful for defining fixed configuration objects or enum-like structures.
49. **What is the practical difference between using an `enum` and a union of string literals?** → String literal unions have zero runtime footprint (fully erased) and integrate more naturally with plain JS/JSON; `enum` generates actual runtime JS objects, offers reverse-mapping (for numeric enums), but adds runtime code and has some interop quirks — many modern style guides (including parts of the TS team's own guidance) lean toward literal unions for simplicity.
50. **How would you type a "builder pattern" class where each method returns `this` for chaining?** → `class QueryBuilder { where(cond: string): this { ...; return this; } }` — using the `this` type ensures subclasses' chained methods still return the correct subclass type, not the base class.

---

## 37. FAQ Bank — Advanced (Batch 1 of 4 — Q1–25)

1. **Explain how TypeScript's control flow analysis handles type narrowing across closures.** → Narrowing generally does NOT persist into closures created within a narrowed block, because TypeScript can't guarantee the outer variable won't change by the time the closure actually executes (especially with `let` bindings) — this is why capturing a narrowed value into a `const` local variable before use in a callback is a common, necessary pattern.
2. **What is the difference between structural subtyping and duck typing formally, if any?** → In practice, TypeScript's community uses them interchangeably; formally, "structural typing" is the broader type-theory term (compatibility based on structure), while "duck typing" is more commonly associated with dynamically-typed languages checking behavior at runtime — TypeScript performs structural checks statically at compile time, which is technically distinct from runtime duck typing but conceptually analogous.
3. **How does the compiler decide whether a generic function's type parameter should be inferred as a union or a common supertype from multiple arguments?** → TypeScript attempts to find the best common type; for array literals/multiple same-position arguments, it typically infers a union of the distinct types encountered unless a contextual type or constraint suggests otherwise.
4. **Explain the difference between bivariant and contravariant method parameter checking, and why TypeScript methods are (unsafely) bivariant by default.** → Standalone function type parameters are contravariant under `strictFunctionTypes`, but class/interface *methods* (declared with method shorthand syntax) remain bivariant for backward compatibility with common inheritance patterns predating stricter checks — meaning method parameter type-safety is technically slightly unsound by design for practical/historical reasons.
5. **What are "higher-kinded types," and does TypeScript support them?** → Types that abstract over type constructors themselves (e.g., a generic "container" abstraction working across `Array<T>`, `Promise<T>`, `Option<T>` uniformly) — TypeScript does NOT natively support true higher-kinded types (unlike Haskell/Scala), which is a known limitation for certain advanced functional-programming patterns; workarounds exist but are complex and rarely used in typical app code.
6. **How would you implement a type-level tuple-to-union conversion, and vice versa?** → Tuple to union: `type TupleToUnion<T extends any[]> = T[number]`; union to tuple is notoriously difficult/impossible to do reliably in general TypeScript without external libraries, due to unions being inherently unordered.
7. **Explain how TypeScript resolves overload signatures when a call could match multiple overloads.** → It picks the FIRST overload signature (in declaration order) that the call is compatible with — meaning overload order matters, and more specific signatures should generally be declared before more general/fallback ones.
8. **What is "type instantiation is excessively deep and possibly infinite," and what usually causes it?** → A compiler error/warning triggered when a recursive conditional/mapped type recurses too many times (often due to a missing base case or an accidental infinite recursive type definition) — fix by adding proper termination conditions or simplifying the recursive type.
9. **How does variance affect the safety of array covariance in TypeScript, and what's a concrete unsound example?** → Because arrays are covariant, `Dog[]` is assignable to `Animal[]`, but this permits unsound code: `function addCat(animals: Animal[]) { animals.push(new Cat()) } addCat(dogs)` — this compiles but corrupts `dogs` (now containing a `Cat`) at runtime, since arrays are mutable; this is a known, accepted unsoundness tradeoff in TypeScript's type system for practicality.
10. **What is the difference between `Parameters<T>` and manually destructuring a function's parameter types?** → `Parameters<T>` is a built-in conditional type using `infer` to extract the full parameter tuple automatically and stays in sync if the function signature changes; manual destructuring requires maintaining a parallel type definition by hand, risking drift.
11. **Explain declaration merging in depth — what kinds of declarations can merge, and which can't?** → Interfaces merge with other interfaces (combining members); namespaces merge with other namespaces, classes, functions, or enums (adding to them); `type` aliases never merge with anything (duplicate name = error) — this is one of the core structural reasons libraries prefer `interface` for extensible public APIs.
12. **How would you design a type-safe dependency injection container?** → Using a generic `Map`/registry keyed by string tokens or symbols, mapped to their corresponding types via a generic type parameter map (similar to the `TypedEmitter` pattern), so `container.get<UserService>("userService")` returns the correctly typed instance, validated against a central token-to-type map.
13. **What is the difference between "assignability" and "identity" in TypeScript's type comparisons?** → Identity (same type, exact structural match) is stricter than assignability (can this value be safely used where that type is expected) — a subtype is generally assignable to its supertype's position without being identical to it.
14. **Explain why `unknown` is described as the "top type" and `never` as the "bottom type."** → `unknown` can hold ANY value (everything is assignable TO `unknown`), making it the most general/top of the type hierarchy; `never` represents no possible values at all (nothing is assignable FROM `never` except `never` itself, but `never` is assignable to everything), making it the most specific/bottom.
15. **How does TypeScript's inference behave differently for `const` object literals vs. `let`?** → `let` widens primitive literal properties to their general type (`string`, `number`); `const` still widens object literal PROPERTY types by default too (unless using `as const`) — the widening rule for object literals is about mutability of properties, not the variable declaration keyword alone, which is a common misconception.
16. **What's the significance of the `--isolatedModules` compiler flag?** → Ensures each file can be safely transpiled independently (without full program type information), which is required by fast, non-type-aware transpilers like Babel or esbuild — catches patterns (like certain `const enum` usages or ambiguous re-exports) that only work with a full type-checking compiler.
17. **Explain how `infer` handles multiple candidate types in covariant vs. contravariant positions.** → In covariant positions (like function return types), multiple `infer` candidates are combined into a union; in contravariant positions (like function parameters), they're combined into an intersection instead — a subtle rule that affects how conditional types behave with function types.
18. **What are "const type parameters" (`const T`), introduced in TS 5.0?** → Allows a generic function to infer literal types (as if `as const` were applied) directly from its arguments without the caller needing to add `as const` manually, e.g., `function tuple<const T extends readonly unknown[]>(...args: T): T`.
19. **How would you type a plugin architecture where plugins can extend a shared global config type via module augmentation?** → Each plugin's `.d.ts` file uses `declare module "core-package" { interface Config { pluginSpecificOption?: string } }`, letting the compiler merge all plugins' contributions into one unified `Config` interface across the whole project.
20. **What's the practical difference between `Awaited<T>` and simply writing `T extends Promise<infer U> ? U : T`?** → `Awaited<T>` recursively unwraps NESTED promises/thenables (`Promise<Promise<string>>` → `string`), while a single-level manual conditional type would only unwrap one layer, leaving `Promise<string>` in nested cases — a subtle but real correctness gap.
21. **How does TypeScript handle type checking for tagged template literals?** → The function tag's type signature determines the types of the interpolated expressions and the return type, e.g., a custom SQL tag function `` sql`SELECT * FROM users WHERE id = ${id}` `` can be typed to enforce `id` matches an expected type and return a branded `SafeSQLString` type.
22. **What is the significance of `strictPropertyInitialization`?** → Ensures every class property is either initialized at declaration, assigned in the constructor, or explicitly marked `?`/`!` — prevents accidentally leaving a property `undefined` at runtime despite the type declaring it as always present.
23. **How would you reason about and fix a "type instantiation is excessively deep" error in a real generic utility you wrote?** → Identify the recursive type causing unbounded recursion (often a mapped/conditional type without a clear base case for primitive/leaf types), add explicit termination conditions, and consider whether the recursion depth is genuinely necessary or could be simplified/flattened.
24. **What's the tradeoff of using `any` internally within a well-typed generic utility function's implementation, while keeping its public signature fully typed?** → A commonly accepted, pragmatic pattern — sometimes the compiler can't verify complex internal generic logic even when it's actually correct, so implementers use targeted, contained `any`/assertions INSIDE the function body while guaranteeing full type safety at the public-facing signature, which is what callers actually interact with.
25. **How does the TypeScript compiler's structural comparison algorithm avoid infinite loops when comparing circular/recursive types?** → It tracks pairs of types currently being compared in a comparison stack/cache; if it encounters the same pair again during a recursive comparison, it assumes compatibility (or uses memoized results) rather than recursing infinitely — a form of coinductive reasoning under the hood.