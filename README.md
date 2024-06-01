Repository about databsases.

Schema design:

- __Many side should own relationship__

"Owner side" is a table that stores the relation column(foreign key)\
https://orkhan.gitbook.io/typeorm/docs/faq#what-does-owner-side-in-a-relations-mean-or-why-we-need-to-use-joincolumn-and-jointable

https://mongoosejs.com/docs/populate.html#populate-virtuals
![Screenshot from 2024-06-01 20-54-56](https://github.com/VIK2395/Databases/assets/50545334/5bbbeebd-6cd7-4d7e-a8ad-3db3b2d06488)

One-to-one example:
```javascript
Country.hasOne(Capital);
Capital.belongsTo(Country);
```
In this case, the __capitals__ table should store the foreign key (contryId), and so to own the relationship.
