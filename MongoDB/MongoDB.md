By default, the MongoDB driver serializes undefined values as null values during write operations.\
We can set to ignore the undefined.\
https://www.mongodb.com/docs/drivers/node/current/fundamentals/bson/undefined-values/#ignore-undefined-values

# Normalization vs Denormalization

https://dev.to/damcosset/mongodb-normalization-vs-denormalization

# ACID

In MongoDB there are no ACID constrains like unique or even out-the-box transactions(which causes race condition problems).

The only way to enforce uniqueness is to create unique index. But it is more like a workaround.

By default there is no schema validation at MongoDB level.
But we can still set the validation yourself. We can enforce required and non null, for example.

MongoDB\
https://www.mongodb.com/docs/manual/core/schema-validation/ \
MongoDB Compass\
https://www.mongodb.com/docs/compass/current/validation/

![Screenshot from 2024-06-02 00-08-31](https://github.com/VIK2395/Databases/assets/50545334/7a70d3be-2ce5-4eac-a760-993e73825834)

__Sql unique but allow null__\
https://www.cockroachlabs.com/docs/stable/unique

![Screenshot from 2024-06-08 21-33-23](https://github.com/VIK2395/Databases/assets/50545334/3ba9e089-ee2b-4ad9-ae3c-f30af76b62ff)

__Mongo unique but allow null__\
This is a sparse index. It still doesn't allow null-fields dublicates.\
https://www.mongodb.com/community/forums/t/cant-create-a-unique-index-that-ignores-nulls-in-mongodb/199145

This is a partial index, and it really allows null-fields dublicates.\
https://stackoverflow.com/questions/35755628/unique-index-in-mongodb-3-2-ignoring-null-values

# Transactions

MongoDB follows BASE transaction model.

Example of a function using mongoose transactions:
```javascript
async createAndSaveInfoQueue(identifier) {
    const baseInfoQueue = await thirdApiClient.createBaseInfoQuery(identifier);

    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      const exist = await BaseInfoQueue.findOne({ identifier }).session(session);

      if (exist) {
        await exist.replaceOne({
          ...baseInfoQueue,
          createdAt: exist.createdAt,
          updatedAt: new Date(),
          __v: exist.__v + 1,
        }, { session });
      } else {
        await BaseInfoQueue.create([baseInfoQueue], { session });
      }
      await session.commitTransaction();
    } catch (error) {
      await session?.abortTransaction();
      throw error;
    } finally {
      await session?.endSession();
    }

    return baseInfoQueue;
  }
```

![Screenshot from 2024-06-01 20-24-00](https://github.com/VIK2395/Databases/assets/50545334/28e4ff71-e9ab-45b2-b2ae-9c3a4bb815cd)

If we run this code, we will get the following error:

```MongoError: Transaction numbers are only allowed on a replica set member or mongos.```

This is because transactions are only possible on a replica set https://habr.com/ru/articles/417131/

But even when the replica set is enabled, and we run multiple transactions at once, we get another error:

```MongoServerError: WriteConflict error: this operation conflicted with another operation. Please retry your operation or multi-document transaction.```

https://www.mongodb.com/community/forums/t/mongoservererror-writeconflict-error-this-operation-conflicted-with-another-operation-please-retry-your-operation-or-multi-document-transaction/206298

This is because when the first transaction locks the docs, the second transaction may not wait long enough for the lock release and gets terminated.

https://medium.com/mongodb-performance-tuning/tuning-mongodb-transactions-354311ab9ed6

__So, MongoDB is bad in transactions.__

About passing session to operations\
![Screenshot from 2024-06-01 20-24-00](https://github.com/VIK2395/Databases/assets/50545334/28e4ff71-e9ab-45b2-b2ae-9c3a4bb815cd)

# Transactions vs atomic operations

![Screenshot from 2024-06-01 20-38-54](https://github.com/VIK2395/Databases/assets/50545334/8dbf8e23-23cd-4fbc-a4cc-822c40829db4)

https://mongoosejs.com/docs/tutorials/findoneandupdate.html#atomic-updates

# Indexes

__Note: in MongoDB null can be an index key.__

There are 3 __main__ types of indexes in MongoDB:
- non-sparse index (classic, indexes all docs. Stores null values for those documents that do not contain the indexed field)
- sparse index (skips docs with missing field being indexed) https://www.mongodb.com/docs/manual/core/index-sparse/
- partial index (include in index docs that meet spesific filter criteria) https://www.mongodb.com/docs/manual/core/index-partial/

__All index types and their properties__\
https://www.mongodb.com/docs/manual/core/indexes/index-types/ \
https://www.mongodb.com/docs/manual/core/indexes/index-properties/
