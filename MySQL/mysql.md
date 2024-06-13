row => tuple, entity\
column => attribute\
cell => field

# Normalization

https://www.geeksforgeeks.org/types-of-normal-forms-in-dbms/ \
https://en.wikipedia.org/wiki/Database_normalization \
https://www.javatpoint.com/dbms-normalization

__Unnormalized form (UNF):__

__First Normal Form (1NF):__\
Each field/cell contains a single/atomic value. A field/cell must not contain a set of values or a nested record.

__Second Normal Form (2NF):__\
No partial dependence. When a column completely depends on PK.\
Partial dependence. When a column depends on one part of a composite key, but not on the whole key.

__Third Normal Form (3NF):__\
No transitive (functional ->) dependence. When a column depends more on another column rather than PK.

Elementary key normal form (EKNF) falls strictly between 3NF and BCNF.

Enchanced 3NF | Boyce-Codd Normal Form (BCNF). 

__Fourth normal form (4NF):__\
No multi-valued (->>) dependency.

Essential tuple normal form (ETNF)

__Fifth normal form (5NF):__\
No join dependency.

Domain-key normal form (DKNF)

__Sixth normal form (6NF):__\
Is not used in real systems.
