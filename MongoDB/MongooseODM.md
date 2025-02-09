The path is called an object/document's field.

There are 3 ways to create sub __objects__ in mongoose:
- __Nested path (nested object)__. It is just a nested object.
- __Subdocument (dependent nested schema)__. It is a nested schema. The nested schema doesn't have its own collection and is saved as the part of the parent whenever the parent schema is saved.
- __Referenced(populated) documents (ref nested schema with own colection)__. They have its own collections and can be saved independently of the parent.

__About nested path vs subdocument(nested schema):__\
https://mongoosejs.com/docs/subdocs.html

__About Ref/populated documents:__\
[https://mongoosejs.com/docs/populate.html#deep-populate](https://mongoosejs.com/docs/populate.html)

![Screenshot from 2024-06-01 19-15-33](https://github.com/VIK2395/Databases/assets/50545334/7ade1ab4-166c-4998-a78f-49f8d475e950)

__How to populate in MongoDB:__\
https://www.youtube.com/watch?v=FWVP7hhKI4Y

![Screenshot from 2024-06-01 19-13-30](https://github.com/VIK2395/Databases/assets/50545334/b7f0f75c-ba59-4711-b9a9-11df40cfa27f)

# Some methods descriptions

### replaceOne() and findOneAndReplace():
- overwrites all non-_id properties (all previous get removed including timestamps and __v); We have to pass new values yourself to keep them https://mongoosejs.com/docs/timestamps.html;
- if no match, the new doc won't be created.

### updateOne() and findOneAndUpdate():
- `$set` doesn't removes fields, only updates specified;
- without `$set` replaces all doc, but keeps `__v`, `createdAt`

```javascript
const result1 = await Model.findOne({ vin }); // null if not found
const result2 = await Model.find(); // [] if not found
await Model.create() // runs Mongoose validation, like required
await Model.findOneAndUpdate(
  { orderId: 12345 },
  { $set: { 'report.battery.conditionRating': 4 } }, // if $set is not used, will replace whole doc
  {
    new: true, // return updated doc
    upsert: true, // update or insert
    runValidators: true, // run mongoose validation. By default false, which means it can write required fields as null
  }
);
```
#### updateOne vs findOneAndUpdate:
| Feature                    | `updateOne`                                         | `findOneAndUpdate`                                  |
|----------------------------|----------------------------------------------------|----------------------------------------------------|
| **Return Value**            | `WriteResult` object with status information       | The updated document (or the original document)    |
| **Use Case**                | Simple update when you don’t need the updated document | Update with the need to access the document after the update |
| **Use of `new` Option**     | Not applicable                                      | `new: true` returns the updated document           |
| **Atomicity**               | Atomic update of the specified document            | Atomic update, but allows you to return the document |
| **Options**                 | Limited options, mainly about the update operation | More flexible, including options for returning the document before/after update |
