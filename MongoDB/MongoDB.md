In MongoDB there are no ACID constrains like unique, required or even out-the-box transactions(which causes race condition problems).

The only way to enforce uniqueness is to create unique index. But it is more like workaround.
Mongoose can validate required, but it is the validation on ODM/code level, not the DBMS.
There is no transactions in operations like with ACID.

MongoDB follows BASE transaction model.


# Transactions

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

If we run this code, we will get the following error:

```Transaction numbers are only allowed on a replica set member or mongos```

This is because transactions are only possible on a replica set https://habr.com/ru/articles/417131/

But even when the replica set is enabled and we run multiple transactions at once, we get another error:

```MongoServerError: WriteConflict error: this operation conflicted with another operation. Please retry your operation or multi-document transaction.```

https://www.mongodb.com/community/forums/t/mongoservererror-writeconflict-error-this-operation-conflicted-with-another-operation-please-retry-your-operation-or-multi-document-transaction/206298

This is because when the first transaction locks the docs, the second transaction may not wait long enough for the lock release and get terminated.

__So, MongoDB is bad in transactions.__
