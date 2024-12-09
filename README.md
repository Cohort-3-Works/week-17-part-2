# PostgreSQL - Part 2 - Transactions and Joins

In this section, I focused on **querying the database** and explored some essential concepts.

---

## Key Learnings

### 1. Transactions

Transactions are crucial when executing multiple queries that depend on each other.

#### Example:

Imagine you want to add a user with details stored in two different tables:

- **User Details**
- **User Address**

If the first query (inserting user details) succeeds but the second query (inserting user address) fails, this would leave the database in an inconsistent state with only partially saved data.

To prevent such issues, **transactions** ensure:

- If one query fails, all previous queries in the transaction are rolled back.
- The database remains consistent, either fully completing all operations or none at all.

---
