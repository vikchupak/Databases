# Autocommit. When each statement is run as transaction

https://www.youtube.com/watch?v=GOQVlrQohtM \
https://dev.mysql.com/doc/refman/8.0/en/innodb-autocommit-commit-rollback.html

<img width="653" alt="01" src="https://github.com/VIK2395/Databases/assets/50545334/760b95c3-5f4d-4258-ac77-d7a150247482">

# About dead locks
https://www.youtube.com/watch?v=y5h3mI9OvOI

# Locks and isolation levels
https://retool.com/blog/isolation-levels-and-locking-in-relational-databases

https://www.youtube.com/watch?v=S3XbZzqPS3g&list=PLd5sTGXltJ-l9PKT2Bynhg0Ou2uESOJiH&index=17 \
https://www.youtube.com/watch?v=ER8oKX5myE0

__Read Phenomena:__

https://learn.microsoft.com/en-us/sql/odbc/reference/develop-app/transaction-isolation-levels?view=sql-server-ver16 \
https://en.wikipedia.org/wiki/Isolation_(database_systems)

- Dirty Reads;
- Non Repeatable read;
- Phantom Read;

__Isolation levels:__

![image](https://github.com/VIK2395/Databases/assets/50545334/24a03409-3204-4f67-8f5a-0369c2ed4262)
SQL standard defines four isolation levels that prevents the phenomena above:
- Read Uncommitted;
- Read Committed;
- Repeatable Read;
- Serializable;

![image](https://github.com/VIK2395/Databases/assets/50545334/a3dd5b36-0859-43a6-85df-0b192854aac6)

https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/ \

__Lock modes(types):__\
https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html

Shared lock -> Prevents others from updating the data.
Exclusive lock -> Prevents others from reading or updating the data.

- Shared lock (S);
- Exclusive lock (X);
- Intention shared lock (IS);
- Intention exclusive lock (IX);\
.\
.\
.
https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html \
https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html

__Two phase commit:__\
https://en.wikipedia.org/wiki/ACID \
https://www.geeksforgeeks.org/two-phase-locking-protocol/
