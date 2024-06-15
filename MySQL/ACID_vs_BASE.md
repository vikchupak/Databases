# Transaction Models

In chemistry, a base is the opposite of an acid. ACID vs BASE in chemistry.\
Аббревиатуры BASE и ACID специально подбирались так, чтобы в английском языке они противопоставлялись друг другу, поскольку эти же слова обозначают химически противоположные термины «щелочь» и «кислота».

Integrity - цілісність

ACID

- Atomicity (No intermediate state, the whole transaction succeeds or rollbacks)
- Consistency (Transaction brings data from one consistent state to another one, e.g. constrains, data types, so on are always meet. __Also this means every read gets actual state/value/data__)
- Isolation (Eliminate concurrency, race condition problems. Each transaction is executed in isolation from the others. Isolation Levels, Locking, Multiversioning)
- Durability (Once a transaction has been committed, it will remain committed even in the case of a system failure)

BASE

- Basically available (Reading and writing operations are available as much as possible sacrificing сonsistency. Rather than enforcing immediate consistency, BASE-modelled NoSQL databases will ensure availability of data by spreading and replicating it across the nodes of the database cluster.)
- Soft-state (Without consistency guarantees, after some amount of time, we only have some probability of knowing the state, since it might not yet have converged. Данные могут находиться в промежуточных или временных состояниях. Due to the lack of immediate consistency, data values may change over time. The BASE model breaks off with the concept of a database which enforces its own consistency, delegating that responsibility to developers. subsequent read operations may not see the most updated/fresh value)
- Eventually consistent (If we execute some writes and then the system functions long enough, we can know the state of the data; any further reads of that data item will return the same value. Запись достигнет согласованности не сразу, а после завершения всех одновременных обновлений. The fact that BASE does not enforce immediate consistency does not mean that it never achieves it. However, until it does, data reads are still possible (even though they might not reflect the reality))

CAP teorem for Distributed Systems (transactions)

![image](https://github.com/VIK2395/Databases/assets/50545334/355957a4-3f15-4619-8b66-64135c96ef19)
![image](https://github.com/VIK2395/Databases/assets/50545334/5fba2816-8c1d-430b-965e-8f24a92c8368)

