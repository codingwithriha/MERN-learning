# 📗 MongoDB Interview Handbook — Part 2

### Interview Question Bank, Query Exercises, MCQs, Flashcards, Cheat Sheet & Revision System

> Part 2 of 2, completing the MongoDB handbook (Part 1 covered theory/internals/code). Same drilling format as the Express.js handbook.

---

## Table of Contents

1. [Beginner Interview Questions](#1-beginner-interview-questions)
2. [Intermediate Interview Questions](#2-intermediate-interview-questions)
3. [Advanced Interview Questions](#3-advanced-interview-questions)
4. [Scenario-Based Questions](#4-scenario-based-questions)
5. [Debugging Questions](#5-debugging-questions)
6. [Coding/Query Exercises](#6-codingquery-exercises)
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

**Q1. What is MongoDB and what type of database is it?**
**Answer:** A NoSQL, document-oriented database that stores data as flexible, JSON-like BSON documents grouped into collections, rather than rows/columns in fixed-schema tables.
*Tests:* Basic orientation.

**Q2. What is a "document" in MongoDB?**
**Answer:** A single record, stored as a BSON object with key-value fields — roughly analogous to a row in SQL, but able to contain nested objects and arrays.
*Tests:* Core vocabulary.

**Q3. What is a "collection"?**
**Answer:** A group of documents, analogous to a SQL table, but without an enforced schema by default.
*Tests:* Core vocabulary.

**Q4. What is `_id`?**
**Answer:** The mandatory unique identifier field for every document, auto-generated as an `ObjectId` if not explicitly provided.
*Tests:* Fundamental knowledge almost every interview touches.

**Q5. What is an `ObjectId` made of?**
**Answer:** A 12-byte value: 4-byte timestamp, 5-byte random/machine value, 3-byte incrementing counter — roughly sortable by creation time and unique without central coordination.
*Wrong answer:* "It's just a random string" — misses the timestamp-based structure that's often specifically asked about.

**Q6. How do you insert a document?**
**Answer:** `db.collection.insertOne({...})` or `insertMany([{...}, {...}])`.
*Tests:* Basic CRUD syntax.

**Q7. How do you find documents matching a condition?**
**Answer:** `db.collection.find({ field: value })`; `findOne()` returns just the first match.
*Tests:* Basic CRUD syntax.

**Q8. What does `$set` do in an update?**
**Answer:** Updates only the specified fields, leaving the rest of the document untouched — without it, `updateOne`/`replaceOne` (used incorrectly) could overwrite the entire document.
*Tests:* A very common practical gotcha.

**Q9. What is the difference between `updateOne` and `replaceOne`?**
**Answer:** `updateOne` modifies specific fields (typically via `$set` or other operators). `replaceOne` replaces the **entire document** (except `_id`) with the new one provided.
*Tests:* Precision — commonly confused by beginners.

**Q10. What does MongoDB being "schema-less" actually mean?**
**Answer:** By default, documents in the same collection aren't required to share the same fields or types — MongoDB doesn't enforce structure unless you explicitly add schema validation (or use an ODM like Mongoose at the application layer).
*Tests:* Correct mental model, not "there's literally no structure ever."

**Q11. What's an index, in simple terms?**
**Answer:** A data structure that lets MongoDB find matching documents quickly without scanning the whole collection — similar to a book's index letting you jump to a page instead of reading cover to cover.
*Tests:* Basic performance concept.

**Q12. What does `db.collection.find().limit(10)` do?**
**Answer:** Restricts the returned result set to at most 10 documents.
*Tests:* Basic query modifier syntax.

**Q13. What is Mongoose?**
**Answer:** An ODM (Object Data Modeling) library for Node.js that adds schemas, validation, and convenience methods on top of the native MongoDB driver.
*Tests:* Whether the candidate distinguishes the database from the library used to talk to it.

**Q14. How do you delete a document?**
**Answer:** `db.collection.deleteOne({...})` for one match, `deleteMany({...})` for all matches.
*Tests:* Basic CRUD syntax.

**Q15. What does `sort({ age: -1 })` do?**
**Answer:** Sorts results by `age` in descending order (`1` = ascending, `-1` = descending).
*Tests:* Basic query modifier syntax.

*(Beginner bank continues with equivalent depth across: what a "field" is, basic `$gt`/`$lt` operators, what `mongosh` is, difference between MongoDB and MySQL at a high level, what "NoSQL" stands for, connecting via connection string, what a database vs collection vs document hierarchy looks like, and basic projection syntax — all following the same Q/Answer/Why/Tests format.)*

---

## 2. Intermediate Interview Questions

**Q1. Explain embedding vs referencing with a concrete example of when you'd choose each.**
**Answer:** Embedding nests related data directly in the parent document — ideal for a blog post's list of tags (small, always read with the post). Referencing stores just an `_id` pointing to another collection — ideal for a blog post's comments if comments can number in the thousands and are sometimes queried/paginated independently of the post.
*Tests:* The single most common MongoDB design question — tests real schema-design judgment, not memorized syntax.

**Q2. How does MongoDB provide durability, and what is the journal?**
**Answer:** WiredTiger writes changes to a write-ahead journal before/alongside applying them to the main data files; on crash, MongoDB replays the journal on restart to recover unflushed writes, preventing data loss.
*Tests:* Internals understanding beyond "it just saves data."

**Q3. What is the aggregation framework, and how does it differ from simple `find()` queries?**
**Answer:** The aggregation framework processes documents through a multi-stage pipeline (`$match`, `$group`, `$sort`, `$project`, `$lookup`, etc.), enabling complex transformations, grouping, and joins that `find()` alone cannot express — roughly MongoDB's equivalent of SQL's `GROUP BY`/`JOIN`/`HAVING` combined.
*Tests:* Whether candidate has gone past basic CRUD.

**Q4. How would you implement pagination in MongoDB, and what's wrong with naive `skip()`/`limit()` at scale?**
**Answer:** `skip(n).limit(m)` is simple but MongoDB must still walk past the first `n` documents internally, making deep pages progressively slower on large collections. **Cursor/keyset pagination** — using the last seen `_id` (or a sort field) as a filter (`{ _id: { $gt: lastId } }`) with `limit()` — avoids this since it uses an index seek instead of scanning-and-discarding.
*Tests:* Real scalability awareness.

**Q5. What is a compound index, and how does field order affect it?**
**Answer:** An index on multiple fields together, e.g., `{ status: 1, createdAt: -1 }`. Field order matters — MongoDB can use a compound index efficiently as a prefix (queries filtering on `status` alone can use it; queries filtering on `createdAt` alone generally cannot, since it's not the leading field).
*Tests:* Index design comprehension, not just "add an index."

**Q6. Explain the difference between `find()` and `aggregate()` performance-wise.**
**Answer:** Simple `find()` queries with proper indexes are generally the fastest path for straightforward lookups. `aggregate()` pipelines are more powerful/flexible but each stage can add processing overhead — well-designed pipelines place `$match`/`$sort` early (to leverage indexes and shrink the working set) before heavier stages like `$group`/`$lookup`.
*Tests:* Practical performance tuning knowledge.

**Q7. What are Mongoose middleware (hooks), and give a real use case.**
**Answer:** Functions that run before (`pre`) or after (`post`) a specific Mongoose operation (`save`, `remove`, `find`, etc.) — e.g., a `pre('save')` hook to hash a password before storing a user document.
*Tests:* Practical Mongoose fluency used constantly in real MERN apps.

**Q8. How do you enforce uniqueness on a field in MongoDB?**
**Answer:** Create a **unique index**: `db.users.createIndex({ email: 1 }, { unique: true })`. In Mongoose, `unique: true` in the schema definition triggers creation of this same underlying unique index (it's not application-level-only validation).
*Tests:* Whether candidate knows uniqueness is enforced at the index level, not just "Mongoose magic."

**Q9. What is a replica set and why does it matter for production?**
**Answer:** A group of `mongod` nodes maintaining copies of the same data — one Primary (accepts writes), multiple Secondaries (replicate via oplog). Provides high availability (automatic failover election if the Primary goes down) and enables read scaling via secondary reads.
*Tests:* Production-readiness awareness — a standalone `mongod` is a single point of failure.

**Q10. What does `.explain()` do and why is it useful?**
**Answer:** Returns the query planner's execution details — which plan was chosen, whether an index was used (`IXSCAN`) or a full scan occurred (`COLLSCAN`), number of documents examined vs returned — essential for diagnosing slow queries.
*Tests:* Real performance debugging experience.

**Q11. What is projection, and why use it?**
**Answer:** Specifying which fields to return from a query (`db.users.find({}, { name: 1, email: 1 })`) instead of the full document — reduces network payload and memory usage, especially important for large documents or high-traffic endpoints.
*Tests:* Performance-conscious query writing.

**Q12. How would you model a many-to-many relationship in MongoDB (e.g., students and courses)?**
**Answer:** Typically via referencing — each `student` document (or a join-style collection) stores an array of `courseIds`, and/or each `course` stores an array of `studentIds`, depending on which side is queried more often; for very large many-to-many sets, a separate "enrollments" collection (similar to a SQL join table) is often cleaner than large arrays on both sides.
*Tests:* Applying embedding/referencing judgment to a classic relational scenario.

**Q13. What is `$lookup` and what SQL concept does it resemble?**
**Answer:** An aggregation stage that performs a left-outer-join-like operation, pulling in matching documents from another collection based on a field match — the closest MongoDB equivalent to a SQL `JOIN`.
*Tests:* Bridging SQL knowledge to MongoDB concepts, common for candidates transitioning from relational backgrounds.

**Q14. Explain optimistic vs pessimistic concurrency in the context of MongoDB updates.**
**Answer:** MongoDB doesn't lock documents for reading before an update by default (no pessimistic locking at the app level); instead, atomic operators like `$inc`/`$set` applied directly in `updateOne` avoid race conditions common in read-modify-write patterns — this is effectively built-in optimistic, atomic-operation-based concurrency for single-document updates.
*Tests:* Deeper concurrency reasoning beyond basic CRUD.

**Q15. When would you choose to denormalize (duplicate) data across documents, and what's the tradeoff?**
**Answer:** Denormalize when read performance matters more than write complexity — e.g., storing a `authorName` directly on a `post` document to avoid a join on every read, accepting that if the author's name changes, you must update it in every duplicated location (or accept eventual/manual sync).
*Tests:* Real-world tradeoff reasoning, a hallmark of production experience.

---

## 3. Advanced Interview Questions

**Q1. Walk through exactly what happens internally when a write is made to a replica set with `writeConcern: { w: 'majority' }`.**
**Answer:** The write is applied on the Primary's WiredTiger storage and recorded in its oplog; the Primary then waits until a majority of replica set members (including itself) have replicated and applied that oplog entry before acknowledging success to the client — ensuring the write survives a Primary failover, at the cost of added latency compared to `w: 1`.
*Tests:* Deep internals + practical consistency/durability tradeoff reasoning — a strong senior-level differentiator.

**Q2. How would you choose a shard key for a multi-tenant SaaS application, and what happens if you choose poorly?**
**Answer:** A good shard key has high cardinality and distributes both storage and write load evenly — e.g., a compound key like `{ tenantId: 1, _id: 1 }` if tenants vary widely in size. A poor choice (e.g., sharding purely by a monotonically increasing timestamp) sends all new writes to a single shard range ("hot shard"), negating the benefit of sharding entirely.
*Tests:* System design maturity specific to MongoDB's sharding model.

**Q3. Explain MVCC in WiredTiger and why it matters for read/write concurrency.**
**Answer:** WiredTiger uses Multi-Version Concurrency Control — readers operate against a consistent snapshot of data at the time their operation began, so they aren't blocked by concurrent writers, and writers don't block readers. This enables MongoDB's document-level concurrency (rather than needing collection-wide locks for most operations).
*Tests:* True storage-engine internals knowledge.

**Q4. How do multi-document ACID transactions work in MongoDB, and what are their limitations compared to a relational database?**
**Answer:** Since v4.0 (replica sets) and v4.2 (sharded clusters), MongoDB supports multi-document transactions via sessions (`startTransaction`/`commitTransaction`), providing full ACID guarantees across multiple documents/collections. Limitations: transactions have a default 60-second runtime limit, add performance overhead compared to single-document atomic operations, and historically (still often in practice) MongoDB schema design favors avoiding the *need* for cross-document transactions by embedding related data instead.
*Tests:* Whether candidate understands this as a genuine but costlier feature, not a free replacement for good schema design.

**Q5. How would you design a schema to avoid the MongoDB 16MB document size limit for a chat application with potentially millions of messages per conversation?**
**Answer:** Never embed all messages inside a single "conversation" document. Instead, store each message as its own document in a `messages` collection referencing `conversationId`, indexed on `{ conversationId: 1, createdAt: -1 }` for efficient retrieval of recent messages per conversation, with pagination via keyset (cursor) pagination.
*Tests:* Applying the embedding-limit tradeoff to a realistic, commonly-asked system design scenario.

**Q6. Explain Change Streams and a production use case, including what infrastructure they require.**
**Answer:** Change Streams provide a real-time, resumable stream of data change events (`insert`, `update`, `delete`) on a collection/database, built on the oplog — requiring a replica set (or sharded cluster), since standalone `mongod` instances lack an oplog. Common use case: triggering real-time notifications (e.g., via Socket.io) when a new order is inserted, without polling the database.
*Tests:* Real-time architecture knowledge tied specifically to MongoDB internals.

**Q7. How would you handle a schema migration on a 500-million-document production collection without downtime?**
**Answer:** Avoid a single blocking migration script. Instead: (1) add the new field/shape as optional in application code, handling both old and new document shapes gracefully; (2) backfill gradually via a background batch job (processing in chunks with rate limiting to avoid overloading the cluster); (3) once backfill completes and is verified, optionally clean up old fields; (4) use a `schemaVersion` field to track progress if the migration is complex.
*Tests:* Real production migration experience — a common Staff+ scenario question.

**Q8. What is the difference between `readConcern: 'local'` and `readConcern: 'majority'`, and when would each matter?**
**Answer:** `local` returns the most recent data on the node being read from, which *could* later be rolled back if that data hadn't yet replicated to a majority before a failover. `majority` guarantees the read reflects data acknowledged by a majority of replica set members, meaning it won't be rolled back — critical for scenarios where reading "phantom" data that later disappears would cause real problems (e.g., displaying a payment as confirmed before it durably is).
*Tests:* Deep consistency model understanding, often tested at senior/staff level.

**Q9. How does MongoDB handle indexing on array fields (multikey indexes), and what's a common pitfall?**
**Answer:** Indexing a field that contains an array creates a **multikey index** — MongoDB indexes each array element separately. Pitfall: you **cannot** create a compound index with more than one array field (a "parallel arrays" restriction), since it would create a combinatorial explosion of index entries.
*Tests:* A subtle, genuinely advanced indexing detail that separates deep practitioners from surface-level users.

**Q10. Design a MongoDB schema and indexing strategy for a high-write-throughput IoT sensor logging system (millions of writes/day, time-range queries).**
**Answer:** Use **time-series collections** (native since MongoDB 5.0) or a bucketing pattern (grouping many readings per time-window into a single document) to reduce per-document overhead; index on `{ sensorId: 1, timestamp: -1 }` for common per-sensor time-range queries; consider TTL indexes to auto-expire old raw data after it's been rolled up into aggregates; write with `w: 1` (not `majority`) if slight durability tradeoff is acceptable for the throughput gain, depending on business requirements.
*Tests:* End-to-end system design combining schema, indexing, and write-concern tradeoffs for a realistic high-scale scenario.

---

## 4. Scenario-Based Questions

**Scenario 1:** *"A query that used to be fast is now taking 5+ seconds as the collection grew to 10 million documents. How do you investigate?"*
**Ideal Answer:** Run `.explain('executionStats')` to check if it's doing a `COLLSCAN` instead of `IXSCAN`; check `totalDocsExamined` vs `nReturned` (a huge gap signals a missing/wrong index); verify the query shape matches an existing index's prefix; check if a compound index needs to be added or reordered per the ESR rule.
*Tests:* Structured performance debugging, the most common MongoDB "senior" interview question.

**Scenario 2:** *"Two concurrent requests both try to decrement a 'stock' field for the same product, and you end up with negative stock in production. What went wrong and how do you fix it?"*
**Ideal Answer:** Likely a read-modify-write race condition (`read stock, check > 0, then update` — two requests both read before either updates). Fix: use an atomic, conditional update: `updateOne({ _id, stock: { $gt: 0 } }, { $inc: { stock: -1 } })` — the condition and decrement happen atomically at the document level, so a request only succeeds if stock was still positive at that exact atomic moment.
*Tests:* Concurrency reasoning + knowing MongoDB's atomic single-document operations solve this without needing a full transaction.

**Scenario 3:** *"Your team wants to migrate a MySQL orders table (with strict foreign keys to users, products) to MongoDB. How do you approach the schema redesign?"*
**Ideal Answer:** Don't mirror the relational schema 1:1. Analyze actual access patterns first (which fields are read together, how often orders are updated vs read, whether product details need to be historically 'frozen' at order time). Likely design: embed a snapshot of relevant product/user info directly in the order document (since order history shouldn't change if the product later changes), while still referencing `userId`/`productId` for traceability.
*Tests:* Real migration judgment — resisting the urge to just recreate SQL structure in a document database.

**Scenario 4:** *"Your Change-Stream-based notification feature stopped receiving events after a planned maintenance window. What might be wrong?"*
**Ideal Answer:** Change streams use a **resume token** to continue from where they left off; if the application didn't persist and reuse the resume token correctly (or the oplog window expired before reconnecting, i.e., the resume token became too old), events between disconnect and reconnect could be lost. Check resume-token handling and oplog retention window size.
*Tests:* Operational depth beyond "just use change streams," a common real-world gotcha.

---

## 5. Debugging Questions

**Bug 1:** A `find()` query that should return results returns an empty array.
**Diagnosis:** Check field name typos/case sensitivity (`Email` vs `email`), check if the value type matches (querying `{ age: "25" }` when the field is stored as a Number `25`), and confirm you're connected to the correct database/collection (easy to accidentally query a differently-named dev/staging DB).

**Bug 2:** `E11000 duplicate key error`.
**Diagnosis:** A unique index constraint was violated (often `_id` reused, or a `unique: true` field like `email` already exists) — check which index triggered it from the error message's index name, and confirm the application logic checks for existing records before inserting, or handles this error gracefully as a "already exists" response.

**Bug 3:** `findByIdAndUpdate` returns the old document even though the update seems to have applied.
**Diagnosis:** Missing `{ new: true }` option — Mongoose defaults to returning the pre-update document.

**Bug 4:** Aggregation pipeline throws a memory limit error.
**Diagnosis:** A stage (often `$group` or `$sort` on unindexed large data) exceeds the default 100MB per-stage memory limit — add `{ allowDiskUse: true }` to the aggregate call, or restructure the pipeline to filter/reduce data earlier via `$match`/`$project`.

**Bug 5:** Application intermittently can't connect / gets connection timeouts under load.
**Diagnosis:** Connection pool exhaustion — check the Mongoose/driver's `maxPoolSize` setting versus actual concurrent load, check for unclosed cursors/sessions leaking connections, and check network/firewall rules if using Atlas with IP allow-lists.

**Bug 6:** A previously-fast query slows down dramatically after adding a new field used in a new filter.
**Diagnosis:** No index exists for the new query pattern — run `.explain()` to confirm a `COLLSCAN`, then add an appropriate index (potentially a new compound index if the query combines the new field with existing filters).

---

## 6. Coding/Query Exercises

### 🟢 Easy

**Exercise:** Write a query to find all users older than 18, returning only their `name` and `email` fields.

**Solution:**
```js
db.users.find(
  { age: { $gt: 18 } },
  { name: 1, email: 1, _id: 0 }
);
```
*Explanation:* The second argument is the projection — `1` includes a field, `_id: 0` explicitly excludes the default `_id` field (included by default otherwise).

### 🟡 Medium

**Exercise:** Given an `orders` collection with `{ userId, product, amount, status }`, write an aggregation to get the total amount spent per user, only counting `status: 'completed'` orders, sorted highest to lowest.

**Solution:**
```js
db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$userId', totalSpent: { $sum: '$amount' } } },
  { $sort: { totalSpent: -1 } }
]);
```
*Explanation:* `$match` filters first (uses an index on `status` if present, and reduces documents before the more expensive `$group` stage) — a key performance habit, not just correctness.

### 🔴 Hard

**Exercise:** Implement cursor-based (keyset) pagination for a `posts` collection sorted by `createdAt` descending, given a `lastSeenCreatedAt` and `lastSeenId` from the previous page.

**Solution:**
```js
async function getNextPage(lastSeenCreatedAt, lastSeenId, pageSize = 20) {
  const filter = lastSeenCreatedAt
    ? {
        $or: [
          { createdAt: { $lt: lastSeenCreatedAt } },
          { createdAt: lastSeenCreatedAt, _id: { $lt: lastSeenId } }
        ]
      }
    : {};

  return db.posts
    .find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .limit(pageSize)
    .toArray();
}
```
*Explanation:* The `$or` handles the tie-breaking case where multiple posts share the exact same `createdAt` — using `_id` as a secondary sort/filter key guarantees stable, gap-free pagination, unlike naive `skip()`, and this pattern scales to arbitrarily deep pages without slowdown since it always uses an index seek (`{ createdAt: -1, _id: -1 }` compound index) instead of scanning-and-discarding.

### 🟣 Interview-Level

**Exercise:** *"Design and implement an atomic 'reserve inventory' operation that prevents overselling when many concurrent requests try to buy the last few units of a product, without using a multi-document transaction."*

**Solution:**
```js
async function reserveStock(productId, quantity) {
  const result = await db.products.updateOne(
    { _id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } }
  );

  if (result.modifiedCount === 0) {
    throw new Error('Insufficient stock');
  }
  return true;
}
```
*Explanation:* This is a genuinely important senior-level pattern: the **condition check (`stock >= quantity`) and the mutation (`$inc`) happen as a single atomic operation** at the document level in WiredTiger — no separate read-then-write race window exists, so concurrent requests are naturally serialized correctly by MongoDB itself, without needing the overhead of a multi-document transaction. This is preferred over transactions whenever the operation only touches a single document.

---

## 7. MCQs

**Q1.** What does `db.users.find({ age: { $gt: 18 } })` return?
A) Users exactly 18 years old
B) Users older than 18 ✅
C) Users 18 or younger
D) All users, ignoring the filter

*Explanation:* `$gt` = strictly greater than; `$gte` would include 18 itself.

**Q2.** Which best describes a MongoDB "document"?
A) A SQL table
B) A single record stored as BSON, like a JSON object ✅
C) A binary file stored in GridFS
D) A query result set

*Explanation:* (A) confuses document with collection. (C) confuses it with MongoDB's separate large-file storage system.

**Q3.** What happens if you call `updateOne()` with an update object that has no `$` operators, e.g., `updateOne({_id: 1}, {name: "Ali"})`?
A) Only the `name` field is updated
B) MongoDB throws an error, since a plain object without operators is invalid for `updateOne` ✅
C) The entire document is silently replaced
D) Nothing happens

*Explanation:* This is a real, commonly-tested gotcha — `updateOne`/`updateMany` require update operators (`$set`, etc.); a plain replacement object triggers an error in most driver versions (use `replaceOne` for full replacement instead).

**Q4.** Which of these is NOT a valid use of an index?
A) Speeding up `find()` filters
B) Speeding up `sort()` operations
C) Enforcing uniqueness constraints
D) Automatically validating data types ✅

*Explanation:* Indexes don't validate types — that's the job of schema validation (`$jsonSchema`) or Mongoose schemas.

**Q5.** What's required for MongoDB to support multi-document transactions?
A) Any standalone `mongod` instance works
B) A replica set (or sharded cluster) ✅
C) A special "transaction" storage engine
D) Transactions aren't supported in MongoDB at all

*Explanation:* Standalone instances lack the oplog infrastructure transactions depend on.

**Q6.** In a compound index `{ status: 1, createdAt: -1 }`, which query can use it efficiently as a prefix?
A) `find({ createdAt: {$gt: X} })` alone
B) `find({ status: 'completed' })` alone ✅
C) Neither
D) Both equally

*Explanation:* Compound indexes are usable as a prefix starting from the leading field (`status`); filtering only on the second field (`createdAt`) generally can't use this index effectively.

---

## 8. Flashcards

| Front | Back |
|---|---|
| What is `_id`? | Auto-generated unique document identifier (ObjectId by default) |
| Embedding vs referencing? | Embed data read together & bounded; reference large/independent/growing data |
| What does an index do? | Avoids full collection scans by enabling fast lookups |
| What is the oplog? | Capped collection logging every write, used for replication & change streams |
| What storage engine does MongoDB use by default? | WiredTiger |
| What enables real-time change notifications? | Change Streams (built on the oplog, needs a replica set) |
| `$set` vs full replace? | `$set` updates specific fields; `replaceOne` replaces the whole document |
| ESR rule? | Equality fields, then Sort fields, then Range fields, in compound index order |
| Why avoid deep `.skip()`? | It scans-and-discards; use cursor/keyset pagination instead |
| What's a multikey index? | An index on an array field — each element indexed separately |
| What enables atomic race-free stock decrement? | Conditional atomic update: `updateOne({stock:{$gte:qty}}, {$inc:{stock:-qty}})` |
| What's `w: 'majority'`? | Write concern requiring majority replica acknowledgment before success |
| What's the document size limit? | 16MB per document |
| What's `mongos`? | The query router in a sharded cluster |
| What's a shard key? | The field(s) MongoDB uses to distribute data across shards |

---

## 9. Cheat Sheet

```
MONGODB ONE-PAGE CHEAT SHEET
─────────────────────────────
CRUD
  insertOne/insertMany
  find(filter, projection).sort().limit().skip()
  updateOne/updateMany   -> needs $set etc.
  replaceOne             -> full document replace
  deleteOne/deleteMany

COMMON OPERATORS
  $eq $ne $gt $gte $lt $lte $in $nin
  $and $or $not $exists $regex
  $set $inc $push $pull $unset

AGGREGATION STAGES (order matters!)
  $match  -> filter early (uses indexes)
  $group  -> group + aggregate ($sum, $avg, $push)
  $sort   -> order results
  $project-> reshape/limit fields
  $lookup -> join another collection
  $unwind -> flatten arrays

INDEXING
  createIndex({field: 1})           // single field
  createIndex({a: 1, b: -1})        // compound - ESR rule
  createIndex({field: 1}, {unique: true})
  createIndex({field: 1}, {expireAfterSeconds: N}) // TTL
  .explain('executionStats')        // verify IXSCAN vs COLLSCAN

SCHEMA DESIGN DECISION
  Embed  -> read together, bounded size
  Reference -> large, independent, shared, grows unboundedly

TRANSACTIONS (multi-document atomicity)
  session.startTransaction()
  ...updates with { session }
  session.commitTransaction() / abortTransaction()
  Requires replica set

REPLICATION
  Primary (writes) -> oplog -> Secondaries
  Automatic election on Primary failure

PRODUCTION MUST-HAVES
  Auth enabled, proper indexes, projection on large docs,
  cursor pagination for scale, sanitize input (NoSQL injection),
  monitor with .explain()/mongotop/Atlas
```

---

## 10. Revision Notes

### ⏱ 5-Minute Revision
- MongoDB = document DB, BSON documents in collections, flexible schema.
- `_id` = auto ObjectId, roughly time-sortable.
- CRUD: `insertOne/find/updateOne($set)/deleteOne`.
- Embedding = read-together bounded data; Referencing = large/independent data.
- Indexes avoid full scans — check with `.explain()`.

### ⏱ 15-Minute Revision
Add:
- Aggregation pipeline stages: `$match → $group → $sort → $project → $lookup`.
- Compound index ESR rule (Equality, Sort, Range).
- Replica sets: Primary/Secondary, oplog, automatic failover.
- `w: 'majority'` vs `w: 1` write concern tradeoff.
- Mongoose = ODM layer with schemas/validation/hooks on top of the native driver.

### ⏱ 30-Minute Revision
Add:
- WiredTiger internals: MVCC, document-level concurrency, journal for durability.
- Sharding: shard key choice, `mongos` router, config servers, hot-shard risk.
- Multi-document transactions: requires replica set, session-based, has runtime limits.
- Cursor/keyset pagination vs `.skip()` at scale.
- Multikey indexes and the parallel-array restriction.

### ⏱ 60-Minute Revision
Add:
- Walk through the Production Example in Part 1 out loud: compound index design, `$lookup`+`$unwind`+`$project`, and the transaction-based credit transfer.
- Practice writing the atomic "reserve stock" pattern from memory.
- Review all Debugging Questions (Section 5) and diagnose each from symptom alone.
- Review Change Streams + resume token gotcha.
- Rehearse at least 3 Scenario-Based Questions out loud.
- Skim the full Cheat Sheet once more right before the interview.

---

## 11. Common Bugs

| Bug | Why It Occurs | How to Debug | How to Fix |
|---|---|---|---|
| Empty results from a query that should match | Field name/type mismatch, wrong DB/collection | Log the exact filter object; check field types in actual stored documents | Fix casing/typing; confirm connection target |
| `E11000 duplicate key` | Unique index violated | Read the index name in the error message | Check for existing record first, or handle gracefully as a conflict response |
| Stale document returned after update | Missing `{ new: true }` in Mongoose | Check the update call's options | Add `{ new: true }` |
| Aggregation memory error | Large `$group`/`$sort` without early filtering | Check pipeline stage order | Move `$match` earlier; add `allowDiskUse: true` |
| Connection pool exhaustion under load | `maxPoolSize` too low, unclosed sessions/cursors | Monitor active connections via Atlas/`mongostat` | Tune pool size; ensure sessions/cursors are closed |
| Query slows down after schema change | No index for new query pattern | Run `.explain()`, check for `COLLSCAN` | Add appropriate (possibly compound) index |

---

## 12. Production Interview Stories

**Story 1 — "The Growing Document":**
*Setup:* "A `conversation` document that embeds all chat messages started throwing errors once a conversation reached thousands of messages. Walk me through why, and how you'd redesign it."
*What they expect:* Recognition of the 16MB document limit and the performance cliff *well before* that limit (rewriting/reading a huge document on every message is expensive even under 16MB), and a redesign moving messages to their own collection referenced by `conversationId`, with appropriate indexing and pagination.

**Story 2 — "The Silent Race Condition":**
*Setup:* "Customer support reports that a small number of orders show negative inventory. Walk me through your investigation and fix."
*What they expect:* Recognizing a read-modify-write race, proposing the atomic conditional-update pattern (`$gte` condition + `$inc` in a single `updateOne`), and discussing why this is preferable to a full transaction for single-document atomicity.

**Story 3 — "The Slow Dashboard":**
*Setup:* "An internal analytics dashboard querying millions of orders via aggregation got progressively slower as data grew, eventually timing out. What do you check, and how do you fix it?"
*What they expect:* Checking pipeline stage order (is `$match` first?), verifying indexes support the `$match`/`$sort` stages, considering precomputed/materialized aggregates (e.g., updating running totals incrementally instead of recomputing from scratch), and potentially separating a read-optimized reporting collection from the live transactional collection.

---

## 13. Company-Specific Questions

**Google-style (systems thinking):** *"Design the MongoDB schema and indexing strategy for a URL-shortener service handling 1 billion redirects/day, optimized for read latency."* — Tests read-heavy schema design, indexing, and possibly caching-layer reasoning alongside MongoDB itself.

**Microsoft-style (correctness & edge cases):** *"Here's an aggregation pipeline [sample with `$group` before `$match`] — identify the performance issue and fix it."* — Tests precise understanding of pipeline stage ordering.

**Amazon-style (leadership principles + ownership):** *"Tell me about a time you had to fix a production MongoDB performance issue under pressure. What was your process, and what did you change to prevent recurrence?"* — Tests ownership, structured debugging, and follow-through (monitoring/alerting added afterward).

**Meta-style (speed + pragmatism):** *"In 20 minutes: design a schema for a social media 'likes' feature that must handle a post with millions of likes without hitting document size limits."* — Tests fast, correct application of the embedding-limit tradeoff (storing likes as separate documents or maintaining only a counter with a separate detail collection).

**Netflix-style (production resilience):** *"Your MongoDB Primary just failed over during peak traffic. What happens to in-flight writes, and how does your application need to be designed to handle this gracefully?"* — Tests understanding of replica set failover behavior, write concern tradeoffs, and application-level retry logic.

**Modern startup-style (pragmatism):** *"We need to ship a product catalog in a day. Would you embed variants/images in the product document or reference them separately, and why?"* — Tests fast, defensible schema-design judgment under real MVP constraints.
