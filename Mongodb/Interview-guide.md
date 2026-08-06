# 📗 MongoDB Interview Handbook — Part 1

### Chapters 1–9: Foundations → Advanced Topics

> Part 1 of 2. This part builds real understanding of MongoDB from zero to advanced/production level — internals, diagrams, and code. Part 2 (after you confirm) will hold the full interview question bank, coding/query exercises, MCQs, flashcards, cheat sheet, and revision checklist — same format as the Express.js handbook.

---

## Table of Contents

1. [Introduction to MongoDB](#1-introduction-to-mongodb)
2. [Core Concepts](#2-core-concepts)
3. [Internal Working](#3-internal-working)
4. [Visual Diagrams](#4-visual-diagrams)
5. [Code Examples (Simple → Intermediate → Production)](#5-code-examples)
6. [Real-World Usage in MERN Apps](#6-real-world-usage-in-mern-apps)
7. [Best Practices](#7-best-practices)
8. [Common Beginner Mistakes](#8-common-beginner-mistakes)
9. [Advanced Topics](#9-advanced-topics)

---

## 1. Introduction to MongoDB

### 1.1 What is MongoDB?

MongoDB is a **document-oriented, NoSQL database**. Instead of storing data in rigid rows/columns like a relational (SQL) database, MongoDB stores data as **flexible, JSON-like documents** called **BSON** (Binary JSON) inside collections.

```json
{
  "_id": "64f...",
  "name": "Ali",
  "email": "ali@example.com",
  "orders": [
    { "product": "Laptop", "price": 1200 },
    { "product": "Mouse", "price": 25 }
  ]
}
```

Notice: a user's orders are **embedded directly inside the user document** — no separate "orders table" with a foreign key required (though you *can* still reference other documents when needed).

### 1.2 Why Was MongoDB Created?

MongoDB was created in **2007** by the founders of DoubleClick (Dwight Merriman, Eliot Horowitz, Kevin Ryan), released publicly in **2009**. It emerged from the "NoSQL movement" — a reaction to limitations engineers hit with traditional relational databases at internet scale:

- Rigid schemas made rapid iteration painful (every schema change needed a migration).
- Horizontal scaling (sharding across many servers) was hard to bolt onto relational databases.
- Many real-world objects (a user profile, a product with variable attributes) map naturally to nested documents, not normalized tables spread across many joins.

### 1.3 Why Do Companies Use MongoDB?

- **Flexible schema** — ideal for rapidly evolving products (startups, MVPs) where the data model changes frequently.
- **Natural fit for JSON-based stacks** — pairs seamlessly with Node.js/Express APIs and JavaScript objects (no impedance mismatch like converting SQL rows to objects).
- **Horizontal scalability** — built-in sharding distributes data across many servers for massive datasets.
- **High write throughput** — good fit for logging, analytics, IoT data, and content-heavy apps.
- Used by companies like **eBay, Adobe, Forbes, Toyota, EA, and many startups** for content management, catalogs, user profiles, and real-time analytics.

### 1.4 Real-World Analogy

A **relational database** is like a **library with strict card catalog rules** — every book must be indexed with the exact same fields (author, ISBN, year), and related information (like reviews) lives in an entirely separate catalog you must cross-reference.

**MongoDB** is like a **filing cabinet of folders** — each folder (document) can contain whatever's relevant to that specific case, including sub-folders (nested/embedded data) directly inside it, without needing a rigid cross-referenced system for everything.

### 1.5 History Timeline

| Year | Milestone |
|---|---|
| 2007 | Development begins at 10gen (later renamed MongoDB Inc.) |
| 2009 | MongoDB open-sourced |
| 2013 | 10gen renamed to MongoDB Inc. |
| 2015 | WiredTiger becomes the default storage engine (huge performance/concurrency improvement over MMAPv1) |
| 2017 | MongoDB Atlas (fully managed cloud MongoDB) launched |
| 2018 | Multi-document ACID transactions introduced (v4.0) — a major shift, since MongoDB was historically criticized for lacking multi-document transactions |
| 2021+ | Continued growth of Atlas, time-series collections, and serverless instances |

### 1.6 Advantages

- Flexible, schema-less (or "schema-on-read") document model.
- Excellent horizontal scalability via native sharding.
- High performance for read/write-heavy, denormalized data access patterns.
- JSON-native — maps directly to JavaScript objects, ideal for MERN stacks.
- Rich query language, aggregation framework, and indexing support.
- Managed cloud offering (Atlas) reduces operational overhead.

### 1.7 Disadvantages

- No enforced schema by default → risk of inconsistent data if discipline/validation isn't applied.
- Historically weaker at multi-document transactions/joins compared to relational DBs (improved significantly since v4.0, but still costlier than in SQL).
- Denormalization can lead to data duplication, requiring careful update logic to keep duplicated data in sync.
- Poor schema design (e.g., unbounded array growth) can cause serious performance problems (the "16MB document limit" trap).
- Not naturally suited for highly relational data with many complex joins (e.g., deep financial reporting) — SQL often still wins there.

---

## 2. Core Concepts

### 2.1 Databases, Collections, Documents

```
MongoDB Server
 └── Database (e.g., "shop")
      └── Collection (e.g., "users")   ← analogous to a SQL "table"
           └── Document (a single user) ← analogous to a SQL "row"
                └── Field (e.g., "email") ← analogous to a SQL "column"
```

Key difference from SQL: **documents in the same collection don't need identical fields.** One `user` document might have a `phone` field; another might not.

### 2.2 BSON vs JSON

MongoDB stores documents as **BSON** (Binary JSON) — a binary-encoded superset of JSON that adds extra types JSON lacks natively: `ObjectId`, `Date`, `Int32`/`Int64`, `Decimal128`, `Binary data`. BSON is more efficient to parse and traverse than text-based JSON.

### 2.3 The `_id` Field

Every document has a unique `_id` field, automatically generated as an **`ObjectId`** if not provided. An `ObjectId` is a 12-byte value encoding: a 4-byte timestamp, a 5-byte random value (unique per machine/process), and a 3-byte incrementing counter — meaning **ObjectIds are roughly sortable by creation time** and globally unique without central coordination.

### 2.4 CRUD Operations

| Operation | Method |
|---|---|
| Create | `insertOne()`, `insertMany()` |
| Read | `find()`, `findOne()` |
| Update | `updateOne()`, `updateMany()`, `replaceOne()` |
| Delete | `deleteOne()`, `deleteMany()` |

```js
db.users.insertOne({ name: 'Ali', age: 25 });
db.users.find({ age: { $gt: 18 } });
db.users.updateOne({ name: 'Ali' }, { $set: { age: 26 } });
db.users.deleteOne({ name: 'Ali' });
```

### 2.5 Query Operators

| Operator | Meaning |
|---|---|
| `$eq` / `$ne` | equal / not equal |
| `$gt` / `$gte` | greater than / greater or equal |
| `$lt` / `$lte` | less than / less or equal |
| `$in` / `$nin` | value in / not in array |
| `$and` / `$or` / `$not` | logical operators |
| `$exists` | field presence check |
| `$regex` | pattern matching |

### 2.6 Embedding vs Referencing (The Core Schema Design Decision)

**Embedding** — nesting related data directly inside a document:
```json
{ "_id": 1, "name": "Ali", "address": { "city": "Lahore", "zip": "54000" } }
```
Best when the nested data is **always accessed together** with the parent and doesn't grow unbounded.

**Referencing** — storing an `_id` that points to a document in another collection (similar to a SQL foreign key):
```json
// users collection
{ "_id": 1, "name": "Ali" }
// orders collection
{ "_id": 101, "userId": 1, "product": "Laptop" }
```
Best when the related data is **large, grows unboundedly, or is shared/queried independently.**

> This embedding-vs-referencing decision is **the single most-asked MongoDB design question** in interviews.

### 2.7 Indexes

An index is a special data structure (by default, a **B-tree**) that stores a small, sorted subset of a collection's data, enabling MongoDB to find documents **without scanning every document** (a "collection scan").

```js
db.users.createIndex({ email: 1 }); // ascending index on email
```

Without an index, `db.users.find({ email: 'x' })` on a 10-million-document collection scans all 10 million documents (`COLLSCAN`). With an index, it can jump almost directly to the match (`IXSCAN`).

### 2.8 The Aggregation Framework

A **pipeline** of stages that transform documents step by step — MongoDB's equivalent of SQL's `GROUP BY`, `JOIN`, `HAVING` combined into a composable pipeline.

```js
db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } }
]);
```

Each stage receives the output of the previous stage as its input — like a Unix pipe (`cmd1 | cmd2 | cmd3`).

### 2.9 Schema Validation

Even though MongoDB is "schema-less" by default, you can enforce structure using **JSON Schema validation** at the collection level:

```js
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      required: ['email'],
      properties: {
        email: { bsonType: 'string', description: 'must be a string and required' }
      }
    }
  }
});
```

### 2.10 Mongoose (The ODM Layer, used constantly in MERN)

**Mongoose** is an Object Data Modeling (ODM) library for Node.js that sits on top of the native MongoDB driver, adding:
- Schema definitions with types and validation
- Middleware (`pre`/`post` hooks)
- Model methods and virtuals
- Query building conveniences

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);
```

> **Interview distinction:** MongoDB is the database; Mongoose is an optional library that adds schema structure and convenience on top of it when used from Node.js.

---

## 3. Internal Working

### 3.1 Storage Engine — WiredTiger

Since MongoDB 3.2 (and default since 3.2+), **WiredTiger** is the default storage engine. Key internal facts:

- Uses **document-level concurrency control** (not collection- or database-level locking) — multiple writes to different documents can happen concurrently without blocking each other.
- Uses **MVCC (Multi-Version Concurrency Control)** — readers see a consistent snapshot of data without being blocked by concurrent writers.
- Data is compressed on disk by default (snappy compression), reducing storage footprint.
- Maintains an in-memory cache (default ~50% of RAM minus 1GB) for hot data, backed by on-disk B-tree storage.

### 3.2 How a Query Executes Internally

1. **Query received** by `mongod` (the MongoDB server process).
2. **Query planner** evaluates possible execution plans (which index, if any, to use).
3. If multiple indexes could apply, MongoDB **trials multiple plans** in parallel for a small number of documents and picks the winner (cached as the "winning plan" for similar future queries).
4. **Execution** — either an `IXSCAN` (index scan, fast) or `COLLSCAN` (full collection scan, slow on large data).
5. Matching documents are fetched from WiredTiger's storage layer (from cache if hot, from disk if not).
6. Results are returned to the client, often in batches (cursor-based) rather than all at once.

### 3.3 The Journal & Write-Ahead Logging (Durability)

Before changes are applied to the actual data files, WiredTiger writes them to a **journal (write-ahead log)**. If the server crashes mid-write, MongoDB replays the journal on restart to recover any data that hadn't yet been flushed to the main data files — this is what gives MongoDB **crash recovery/durability** guarantees.

### 3.4 Replication Internals (Replica Sets)

A **replica set** = a group of `mongod` instances maintaining the same data set, providing high availability.

- One node is the **Primary** — accepts all writes.
- Other nodes are **Secondaries** — replicate data from the Primary via the **oplog** (operations log, a capped collection recording every write operation).
- If the Primary becomes unavailable, the remaining nodes hold an **election** and promote a new Primary automatically (typically within seconds).

```
        ┌───────────┐
        │  PRIMARY  │◀── all writes
        └─────┬─────┘
      oplog    │    oplog
   replication │ replication
    ┌──────────┴──────────┐
    ▼                     ▼
┌──────────┐        ┌──────────┐
│SECONDARY │        │SECONDARY │
└──────────┘        └──────────┘
```

### 3.5 Sharding Internals (Horizontal Scaling)

**Sharding** splits a large collection's data across multiple servers ("shards") based on a **shard key**.

```
                ┌────────────┐
   Client ─────▶│  mongos    │  (query router)
                └─────┬──────┘
        ┌─────────────┼─────────────┐
        ▼              ▼              ▼
   ┌─────────┐    ┌─────────┐    ┌─────────┐
   │ Shard 1 │    │ Shard 2 │    │ Shard 3 │
   │ (a-h)   │    │ (i-p)   │    │ (q-z)   │
   └─────────┘    └─────────┘    └─────────┘
```

- **`mongos`** is a routing process that directs each query to the correct shard(s) based on the shard key.
- **Config servers** store cluster metadata (which ranges of shard-key values live on which shard).
- Choosing a good **shard key** is critical — a poor choice (e.g., a monotonically increasing field like a timestamp) causes all new writes to hit a single shard ("hot shard" problem), defeating the purpose of sharding.

### 3.6 Execution Flow Diagram — A Single Write Operation

```
Client sends insertOne()
        │
        ▼
mongod receives write
        │
        ▼
Write applied to WiredTiger in-memory cache
        │
        ▼
Operation recorded in the Journal (write-ahead log)
        │
        ▼
Operation recorded in the oplog (for replication)
        │
        ▼
Secondaries pull from oplog & apply the same write
        │
        ▼
Acknowledgment returned to client
   (timing depends on the "write concern" level — see below)
```

---

## 4. Visual Diagrams

### 4.1 Document Model vs Relational Model

```
RELATIONAL (SQL)                    DOCUMENT (MongoDB)
┌──────────┐  ┌──────────┐          ┌─────────────────────────┐
│  users   │  │  orders  │          │  users (embedded orders) │
├──────────┤  ├──────────┤          ├─────────────────────────┤
│ id | name│  │id|user_id│          │ { name: "Ali",           │
│ 1  | Ali │  │101|  1   │          │   orders: [               │
└──────────┘  └──────────┘          │     {product:"Laptop"},   │
      JOIN required to combine       │     {product:"Mouse"}     │
                                     │   ] }                     │
                                     └─────────────────────────┘
```

### 4.2 CRUD Flow

```
   ┌────────┐   insertOne/find/updateOne/deleteOne   ┌──────────┐
   │ Client │ ─────────────────────────────────────▶ │  mongod  │
   └────────┘                                          └────┬─────┘
                                                              │
                                                     Query Planner
                                                     picks index or
                                                     collection scan
                                                              │
                                                              ▼
                                                   WiredTiger storage
                                                     (cache/disk)
                                                              │
                                                              ▼
                                                     Result returned
```

### 4.3 Aggregation Pipeline Flow

```
Raw Documents
     │
     ▼
[ $match ]  ──▶ filters documents (like WHERE)
     │
     ▼
[ $group ]  ──▶ groups + aggregates (like GROUP BY)
     │
     ▼
[ $sort ]   ──▶ orders results (like ORDER BY)
     │
     ▼
[ $project ]──▶ reshapes output fields (like SELECT specific columns)
     │
     ▼
Final Output
```

### 4.4 Replica Set Failover Flow

```
Normal:         PRIMARY (writes) ──oplog──▶ SECONDARY, SECONDARY

Primary dies:   ✗ PRIMARY         SECONDARY, SECONDARY
                                        │
                                   election held
                                        ▼
New state:      SECONDARY(old)    NEW PRIMARY, SECONDARY
```

---

## 5. Code Examples

### 5.1 Simple Example — Native Driver Connection & Insert

```js
const { MongoClient } = require('mongodb');

async function main() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();

  const db = client.db('shop');
  const result = await db.collection('users').insertOne({ name: 'Ali', age: 25 });

  console.log('Inserted ID:', result.insertedId);
  await client.close();
}

main();
```

**Explanation:**
- `MongoClient` is the official native driver's connection class.
- `client.connect()` establishes the TCP connection to the server (or cluster).
- `client.db('shop')` selects (or implicitly creates, on first write) the `shop` database.
- `.collection('users').insertOne(...)` inserts a single document; MongoDB auto-generates `_id` since none was provided.
- Always `close()` the client when done to release the connection.

### 5.2 Intermediate Example — Mongoose Schema, Model, and Queries

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function run() {
  await mongoose.connect('mongodb://localhost:27017/shop');

  const user = await User.create({ name: 'Ali', email: 'ali@example.com', age: 25 });

  const adults = await User.find({ age: { $gte: 18 } }).sort({ createdAt: -1 }).limit(10);

  const updated = await User.findByIdAndUpdate(
    user._id,
    { $set: { age: 26 } },
    { new: true } // return the updated document, not the original
  );

  console.log(adults, updated);
}

run();
```

**Explanation:**
- The schema declares types, validation (`required`, `min`), and defaults — Mongoose enforces this at the application layer before hitting MongoDB.
- `User.create()` is a convenience wrapper combining document construction + `save()`.
- `.find().sort().limit()` demonstrates **chainable query building**, compiled into an actual query only when awaited (Mongoose queries are thenable but lazily built).
- `{ new: true }` is a very commonly forgotten option — without it, `findByIdAndUpdate` returns the **pre-update** document by default.

### 5.3 Production Example — Aggregation, Indexing, Transactions, and Error Handling

```js
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

orderSchema.index({ userId: 1, createdAt: -1 }); // compound index for common query pattern

const Order = mongoose.model('Order', orderSchema);

// Aggregation: total completed spend per user, last 30 days
async function getTopSpenders() {
  return Order.aggregate([
    { $match: { status: 'completed', createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
    { $group: { _id: '$userId', totalSpent: { $sum: '$amount' }, orderCount: { $sum: 1 } } },
    { $sort: { totalSpent: -1 } },
    { $limit: 10 },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $project: { totalSpent: 1, orderCount: 1, 'user.name': 1, 'user.email': 1 } }
  ]);
}

// Multi-document transaction: transfer "credit" between two accounts atomically
async function transferCredit(fromId, toId, amount) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const from = await Account.findById(fromId).session(session);
    if (from.balance < amount) throw new Error('Insufficient balance');

    await Account.updateOne({ _id: fromId }, { $inc: { balance: -amount } }, { session });
    await Account.updateOne({ _id: toId }, { $inc: { balance: amount } }, { session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
```

**Explanation:**
- **Compound index** `{ userId: 1, createdAt: -1 }` speeds up exactly the query pattern used in `getTopSpenders` (filtering/sorting by user + recency) — index design should follow real query patterns, not be added blindly.
- **`$lookup`** performs a left-outer-join-like operation against the `users` collection, `$unwind` flattens the resulting array into a single object per result, and `$project` shapes the final output — this whole pipeline replaces what would be a SQL `JOIN + GROUP BY + ORDER BY + LIMIT`.
- **Transactions** (`startSession`/`startTransaction`/`commitTransaction`/`abortTransaction`) ensure the two balance updates either **both** succeed or **both** roll back — critical for financial correctness. This requires a replica set (even a single-node one) — standalone `mongod` instances don't support multi-document transactions.
- `$inc` is used instead of read-modify-write to avoid race conditions from concurrent transfers.

---

## 6. Real-World Usage in MERN Apps

- **MongoDB is the default database choice in MERN** — Express + Mongoose talk to MongoDB, while React never touches the database directly.
- **User profiles, product catalogs, blog posts, comments** — all natural fits for MongoDB's document model since they're read far more often than they're relationally joined.
- **Session storage** — libraries like `connect-mongo` store Express sessions in MongoDB instead of memory, so sessions survive server restarts and work across multiple server instances.
- **Real-time apps (chat, notifications)** often pair MongoDB (data persistence) with something like Socket.io (real-time delivery) — MongoDB's **Change Streams** feature lets the backend react instantly to data changes without polling.
- **E-commerce**: product documents often embed variants/images directly, while orders reference users and products by `ObjectId` — a textbook embedding-vs-referencing tradeoff in production.

---

## 7. Best Practices

### 7.1 Schema Design
- Model your schema around **how your app queries data**, not around abstract "correctness" — MongoDB rewards designing for access patterns (unlike SQL normalization theory).
- Prefer embedding for data that's **always read together** and bounded in size; prefer referencing for large or independently-queried data.
- Avoid unbounded arrays inside a single document (e.g., "all comments ever" embedded in a blog post) — can hit the **16MB document size limit** and degrades performance well before that.

### 7.2 Indexing
- Index fields used in `find()` filters, `sort()`, and `$lookup` joins.
- Use **compound indexes** matching your actual query shape (order matters: equality fields first, then sort fields, then range fields — the "ESR rule").
- Avoid over-indexing — every index adds write overhead and disk usage.
- Use `.explain('executionStats')` to verify a query is actually using an index (`IXSCAN`, not `COLLSCAN`).

### 7.3 Security
- Always enable authentication (`--auth`) — never run MongoDB open to the internet without it.
- Use role-based access control (read-only roles for reporting tools, restricted roles for app users).
- Never trust client input directly in queries — sanitize to avoid **NoSQL injection** (e.g., `express-mongo-sanitize`).
- Use MongoDB Atlas's built-in network access lists / VPC peering in production instead of open IP access.

### 7.4 Performance & Scalability
- Use **projection** (`.find({}, { name: 1, email: 1 })`) to fetch only needed fields, not entire documents.
- Paginate with `.skip()/.limit()` for small datasets, but prefer **cursor-based pagination** (using `_id` or timestamp ranges) for large datasets, since `.skip()` gets slower the deeper you page.
- Choose shard keys with high cardinality and even write distribution.
- Monitor with `mongostat`, `mongotop`, or Atlas's built-in performance advisor.

### 7.5 Maintainability
- Use Mongoose schema validation to catch bad data at the application layer, even though MongoDB itself is flexible.
- Version schema changes carefully — since there's no forced migration, old documents may lack newly added fields; handle defaults gracefully in application code.

---

## 8. Common Beginner Mistakes

| Mistake | Why It Happens | The Fix |
|---|---|---|
| Treating MongoDB like a normalized SQL database (over-referencing everything) | Coming from a SQL background | Design around access patterns; embed data that's read together |
| Embedding unbounded arrays (e.g., all comments in a post document) | Not realizing embedded data can grow indefinitely | Reference large/growing collections instead of embedding them |
| Forgetting indexes on frequently queried fields | Not realizing `find()` does a full scan without one | Add indexes matching real query patterns; verify with `.explain()` |
| Using `.skip()` for deep pagination on large collections | Assuming skip/limit scales the same at any depth | Use range-based ("keyset") pagination instead |
| Not handling missing fields in older documents after a schema change | Assuming all documents in a collection are uniform | Use defaults, optional-field checks, or a migration script |
| Forgetting `{ new: true }` in `findByIdAndUpdate` | Assuming it always returns the updated document | Explicitly pass `{ new: true }` when the updated doc is needed |
| Storing dates as strings instead of `Date` objects | JSON has no native date type, so it feels natural | Use proper `Date` objects/BSON date type for correct sorting/querying |
| Not using transactions for multi-document operations that must be atomic | Not realizing MongoDB supports transactions since v4.0 | Use `session.startTransaction()` for related multi-document writes |
| Running MongoDB without authentication in production | Copy-pasting default local dev config | Always enable `--auth` and configure proper users/roles |
| Blindly passing `req.body` into a query filter | Not sanitizing user input | Use `express-mongo-sanitize` and explicit field allow-lists |

---

## 9. Advanced Topics

### 9.1 Change Streams

Change Streams let an application **subscribe to real-time data changes** in a collection, without polling:

```js
const changeStream = db.collection('orders').watch();
changeStream.on('change', (change) => {
  console.log('Something changed:', change);
  // e.g., push a notification via Socket.io when a new order is inserted
});
```

Internally built on top of the **oplog**, requires a replica set (even a single-node one) since standalone instances don't have an oplog.

### 9.2 Read/Write Concerns and Consistency Tradeoffs

- **Write Concern** (`w: 1`, `w: 'majority'`) controls how many replica set members must acknowledge a write before it's considered successful — `w: 'majority'` is safer (survives failover) but slower than `w: 1`.
- **Read Concern** (`local`, `majority`, `linearizable`) controls the consistency guarantee of reads — `majority` ensures you only read data that's been replicated to a majority of nodes (won't be rolled back).
- **Read Preference** (`primary`, `secondary`, `secondaryPreferred`) controls which replica set members can serve reads — reading from secondaries can reduce load on the primary but risks slightly stale data (**eventual consistency**).

### 9.3 The ESR Rule for Compound Indexes

When designing a compound index, order fields as: **E**quality → **S**ort → **R**ange.

```js
// Query: find status='completed' orders for a user, sorted by date, in a date range
db.orders.find({ status: 'completed', createdAt: { $gte: X, $lte: Y } }).sort({ createdAt: -1 });

// Correct index order:
db.orders.createIndex({ status: 1, createdAt: -1 });
```
`status` is an equality match (comes first), `createdAt` handles both sort and range (comes after) — this ordering lets MongoDB use the index most efficiently.

### 9.4 Time-To-Live (TTL) Indexes

Automatically delete documents after a set time — perfect for session data, temporary tokens, or logs:

```js
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // auto-delete after 1 hour
```

### 9.5 Schema Versioning Pattern

For long-lived collections that evolve over time, a common production pattern is embedding a `schemaVersion` field and handling multiple versions in application code (or running background migration scripts) rather than forcing an instant, all-at-once migration across potentially huge collections.

### 9.6 Aggregation Pipeline Performance

- Place `$match` and `$sort` stages **as early as possible** in the pipeline — this allows MongoDB to use indexes and reduce the working set before expensive stages like `$lookup` or `$group`.
- Use `$project` early to drop unneeded fields and reduce memory pressure through the rest of the pipeline.
- Aggregation pipelines have a **100MB memory limit per stage** by default; use `{ allowDiskUse: true }` for large aggregations that must spill to disk.

### 9.7 Horizontal Scaling Decision Framework

Before sharding (a significant operational complexity increase), production teams typically exhaust:
1. Proper indexing.
2. Read replicas (secondary reads) for read-heavy workloads.
3. Caching layers (Redis) for hot data.
4. Vertical scaling (bigger server).

...and only shard once a single replica set genuinely can't handle the data volume or write throughput — sharding is a powerful but operationally heavy tool, and interviewers value candidates who know it's not the default first move.
