row => tuple, entity\
column => attribute\
cell => field

# Normalization

__There are 6 NFs, all other NFs are subsets of these 6 NFs.__

https://www.geeksforgeeks.org/types-of-normal-forms-in-dbms/ \
https://en.wikipedia.org/wiki/Database_normalization \
https://www.javatpoint.com/dbms-normalization \
https://www.youtube.com/watch?v=zqQxWdTpSIA

__Unnormalized Form or Zero Normal Form (UNF or 0NF):__

__First Normal Form (1NF):__\
Each field/cell contains a single/atomic value. A field/cell must not contain a set of values or a nested record.

__Second Normal Form (2NF):__\
No partial dependence. When a column completely depends on PK.\
Partial dependence. When a column depends on one part of a composite key, but not on the whole key.

__Third Normal Form (3NF):__\
Functional Dependency is a direct relationship between two attributes (e.g., A -> B).\
If attribute A functionally determines attribute B, it is denoted as A-> B.\
EmployeeID -> EmployeeName (EmployeeID uniquely determines EmployeeName).

Transitive Dependency is indirect relationship involving a third attribute (e.g., A -> B and B -> C, leading to A -> C).

No transitive dependence. When one column depends on another column through a third column.

Example:

![Screenshot from 2024-06-14 18-03-58](https://github.com/VIK2395/Databases/assets/50545334/2aa80d7e-578e-4efb-b042-562b39d4b65e)

Table already in 1NF and 2NF.

![Screenshot from 2024-06-14 18-06-02](https://github.com/VIK2395/Databases/assets/50545334/1a8fe7b7-f7ed-4d5c-96d4-8113811f85f3)

![Screenshot from 2024-06-14 18-06-49](https://github.com/VIK2395/Databases/assets/50545334/50877538-9ac7-4700-ab47-f7d6caf0877c)

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
