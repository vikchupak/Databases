table => schema\
column => attribute\
row => entity, tuple, record\
cell => field, value

# Normalization

__There are 6 NFs, all other NFs are subsets of these 6 NFs.__

https://www.geeksforgeeks.org/types-of-normal-forms-in-dbms/ \
https://en.wikipedia.org/wiki/Database_normalization \
https://www.javatpoint.com/dbms-normalization \
https://www.youtube.com/watch?v=zqQxWdTpSIA

__Unnormalized Form or Zero Normal Form (UNF or 0NF)__ => skip

## First Normal Form (1NF)
Each field/cell contains a single/atomic value. A field/cell must not contain a set of values or a nested record.

## Second Normal Form (2NF)
No partial dependence. When a column completely depends on PK.\
Partial dependence. When a column depends on one part of a composite key, but not on the whole key.

## Third Normal Form (3NF)
No transitive dependence.

Functional Dependency is a direct relationship between two attributes (e.g., A -> B).\
If attribute A functionally __uniquely(one)__ determines attribute B, it is denoted as A-> B.\
EmployeeID -> EmployeeName (EmployeeID uniquely determines EmployeeName).

Transitive Dependency is indirect relationship involving a third attribute (e.g., A -> B and B -> C, leading to A -> C).\
When one column depends on another column through a third column.

Example:

![Screenshot from 2024-06-14 18-03-58](https://github.com/VIK2395/Databases/assets/50545334/2aa80d7e-578e-4efb-b042-562b39d4b65e)

Table already in 1NF and 2NF.

![Screenshot from 2024-06-14 18-06-02](https://github.com/VIK2395/Databases/assets/50545334/1a8fe7b7-f7ed-4d5c-96d4-8113811f85f3)

![Screenshot from 2024-06-14 18-06-49](https://github.com/VIK2395/Databases/assets/50545334/50877538-9ac7-4700-ab47-f7d6caf0877c)

__Elementary key normal form (EKNF) falls strictly between 3NF and BCNF.__ => skip

A table does not contain any extraneous key attributes. An extraneous key attribute is an attribute that can be removed from a candidate key without affecting the uniqueness of the key.\
https://en.wikipedia.org/wiki/Elementary_key_normal_form#:~:text=Elementary%20key%20normal%20form%20(EKNF,the%20overlapping%20column(s) \
https://www.youtube.com/watch?v=mAUe1KEylak

## Enchanced 3NF (E3NF) | Boyce-Codd Normal Form (BCNF or 3.5NF)
For every functional dependency A->B, A must be a superkey (or simply speaking a candicate key - **uniquely defines entire row**).

![Screenshot from 2024-06-14 19-02-06](https://github.com/VIK2395/Databases/assets/50545334/81b4aaa9-ffd3-4e14-8d32-05b517d9f6f0)

https://www.youtube.com/watch?v=NNjUhvvwOrk&list=PLLGlmW7jT-nTr1ory9o2MgsOmmx2w8FB3&index=6

https://www.geeksforgeeks.org/boyce-codd-normal-form-bcnf/

![Screenshot from 2024-06-14 19-13-29](https://github.com/VIK2395/Databases/assets/50545334/daf07c8a-184e-486a-9db4-eba3d6170d14)
![Screenshot from 2024-06-14 19-16-20](https://github.com/VIK2395/Databases/assets/50545334/00366a42-318f-49de-8a34-87fb91191ff5)

![Screenshot from 2024-06-14 19-15-11](https://github.com/VIK2395/Databases/assets/50545334/622f7d7d-ad12-40d3-b3de-6eb80d46933f)

## Fourth normal form (4NF)
No multi-valued (->->) dependency.\
Multi-valued dependency is a relationship between two attributes (e.g., A ->-> B).\
If attribute A determines a set of attribute B values, it is denoted as A->-> B.

A table has a multi-valued dependency, when:
1. A->-> B and A->-> C; (at least 2 multi-valued dependencies exist)
2. B and C are independent of each other;

https://www.youtube.com/watch?v=OTCuykFHBeA

![image](https://github.com/VIK2395/Databases/assets/50545334/f595d9ea-fbbf-428e-9291-7f6bdf87f0b3)

![image](https://github.com/VIK2395/Databases/assets/50545334/9ea60a9d-0ab4-4373-86dc-9a00aef8e4ed)

__Essential tuple normal form (ETNF)__ => skip\
No Elementary Transitive Dependency.

An elementary transitive dependency is a specific type of transitive dependency where a non-prime attribute depends on a candidate key, and the intermediate attribute on which it depends is not a candidate key.

## Fifth normal form (5NF)
No join dependency.

__Domain-key normal form (DKNF)__ => skip

__Sixth normal form (6NF):__ => skip\
Is not used in real systems.
