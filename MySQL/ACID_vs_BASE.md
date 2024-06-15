# Transaction Models

In chemistry, a base is the opposite of an acid. ACID vs BASE in chemistry.\
Аббревиатуры BASE и ACID специально подбирались так, чтобы в английском языке они противопоставлялись друг другу, поскольку эти же слова обозначают химически противоположные термины «щелочь» и «кислота».

Integrity - цілісність

ACID

- Atomicity (No intermediate state, the whole transaction succeeds or rollbacks)
- Consistency (Transaction brings data from one consistent state to another one, e.g. constrains, data types, so on are always meet)
- Isolation (Eliminate concurrency, race condition problems. Each transaction is executed in isolation from the others. Isolation Levels, Locking, Multiversioning)
- Durability (Once a transaction has been committed, it will remain committed even in the case of a system failure)

Distributed transactions

BASE

- Basically available (Reading and writing operations are available as much as possible sacrificing сonsistency)
- Soft-state (Without consistency guarantees, after some amount of time, we only have some probability of knowing the state, since it might not yet have converged)
- Eventually consistent (If we execute some writes and then the system functions long enough, we can know the state of the data; any further reads of that data item will return the same value)

