## Mongoose ODM

### What is the difference between model and schema, why need both?

Ah, this is a question that often confuses people, especially in **NestJS + Mongoose or similar frameworks**. Let’s clarify carefully.

---

## 🔹 **Schema**

* **Definition:** A **schema** is a **blueprint that defines the structure of your data** in the database.

* **Responsibilities:**

  * Specifies **fields**, **types**, **default values**, **validators**, and **indexes**.
  * Tells the ORM/ODM how to **store and retrieve data** from the database.
  * Can define **hooks/middleware** (like `pre-save`, `post-save` in Mongoose).

* **Example (Mongoose + NestJS):**

```ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true }) email: string;
  @Prop() name: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
```

Here:

* `UserSchema` = **how the data is stored in MongoDB**.

---

## 🔹 **Model**

* **Definition:** A **model** is the **class or object you use to interact with the database**.

* **Responsibilities:**

  * Provides **CRUD methods** (`find`, `findOne`, `save`, `update`).
  * Optionally adds **instance methods** (e.g., `user.verifyPassword()`).
  * Essentially, the model is your **gateway to the database**, using the schema as a blueprint.

* **Example:**

```ts
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(email: string, name: string) {
    const user = new this.userModel({ email, name });
    return user.save(); // Model handles persistence
  }
}
```

Here:

* `userModel` = **the Mongoose Model** (instance + static methods).
* `UserSchema` = defines **how the model maps to MongoDB**.

---

## 🔹 **Analogy**

* **Schema = blueprint of a house** (structure, dimensions, materials).
* **Model = construction company** (uses the blueprint to build, modify, or query houses).

---

## 🔹 **Why need both?**

1. **Separation of concerns:**

   * Schema = defines **structure & validation**.
   * Model = handles **data operations**.

2. **Reusability:**

   * Multiple models can share the same schema with different configurations.

3. **ORM/ODM design:**

   * Schema is database-focused, while Model is application-focused.

---

✅ **Summary:**

* **Schema:** describes data structure and rules.
* **Model:** interface to interact with data (CRUD + methods).
* Both are needed in Mongoose/NestJS because the ORM separates **structure** from **behavior**.

## What is the difference between a mongoose model and a typerorm repository?

Great question 👍 because **Mongoose Model** and **TypeORM Repository** *feel similar* at first, but they come from different philosophies. Let’s break it down:

---

## 🔹 **Mongoose Model**

* **What it is:**
  A **Model** in Mongoose is both:

  1. A **constructor function/class** for documents (instances of your schema).
  2. A **data access layer** that talks to MongoDB collections.

* **Responsibilities:**

  * Defines the **shape of the data** via a schema.
  * Provides **CRUD methods** (`find`, `create`, `updateOne`, etc.).
  * Every document is an instance of the model, with methods like `.save()`.

* **Example:**

  ```ts
  @Schema()
  export class User {
    @Prop() email: string;
    @Prop() password: string;
  }
  export const UserSchema = SchemaFactory.createForClass(User);

  // NestJS injection gives you this
  @InjectModel(User.name) private userModel: Model<UserDocument>

  // Usage
  const user = new this.userModel({ email, password });
  await user.save(); // document-level save
  const found = await this.userModel.findOne({ email });
  ```

* ✅ Mongoose models are **both** domain (document instances) **and repository (query interface)**.

---

## 🔹 **TypeORM Repository**

* **What it is:**
  A **Repository** in TypeORM is a dedicated class for **data persistence and querying**.
  It separates the entity (model) from the persistence logic.

* **Responsibilities:**

  * Wraps the database access logic.
  * Provides methods like `findOne`, `save`, `remove`.
  * Entities are **plain classes** with no DB methods (unless you add them manually).

* **Example:**

  ```ts
  @Entity()
  export class User {
    @PrimaryGeneratedColumn() id: number;
    @Column() email: string;
    @Column() password: string;
  }

  @InjectRepository(User)
  private userRepository: Repository<User>;

  // Usage
  const user = this.userRepository.create({ email, password });
  await this.userRepository.save(user); // repository-level save
  const found = await this.userRepository.findOne({ where: { email } });
  ```

* ✅ In TypeORM, **entity = data model** and **repository = data access layer** (separated).

---

## 🔹 Key Differences

| Aspect                   | **Mongoose Model**                                               | **TypeORM Repository**                                          |
| ------------------------ | ---------------------------------------------------------------- | --------------------------------------------------------------- |
| **Entity definition**    | Schema → Model → Document class                                  | Class decorated with `@Entity()`                                |
| **Where DB logic lives** | On the Model itself (static + instance methods)                  | On the Repository                                               |
| **Save operation**       | `doc.save()` (on the document itself)                            | `repository.save(entity)`                                       |
| **Philosophy**           | **Active Record** style → objects know how to persist themselves | **Data Mapper** style → separate repository handles persistence |
| **Tight coupling**       | Document = DB + business logic mixed                             | Entity is clean, persistence abstracted away                    |

---

## 🔹 Analogy

* **Mongoose:** Each user (document) can walk to the database and save itself.
* **TypeORM:** Users are just plain objects. If you want to save them, you must go through the repository clerk.

---

👉 So the **main difference** is:

---

ODM model (curl db methods)
- Model = Data model
- Model = Data access layer (Active Record)

--

ORM entity (no db methods, entities are "plain" classes)
- Entity = Data model
- Repository = Data access layer (Data Mapper)

## Active Record pattern vs Data Mapper pattern

It isn’t about *technical limitations* (we **could** wrap Mongoose in a repository layer, just like I showed with Firebase) — it’s more about the **philosophy/design pattern** each library follows by default:

* **Mongoose (MongoDB ODM):**

  * Inspired by **Active Record pattern** (like Rails’ ActiveRecord or Sequelize).
  * A `Model` both **defines data structure** *and* provides **query/save methods**.
  * Documents (`new User(...)`) even have `.save()`, `.remove()`, etc.
  * Easier for small projects because you only deal with one abstraction.

* **TypeORM (SQL ORM):**

  * Inspired by **Data Mapper pattern** (like Hibernate, Doctrine, Dapper).
  * Entities are just **plain classes** (no DB logic inside).
  * Repositories are the dedicated **persistence layer**.
  * Better separation of concerns → cleaner for big projects, easier to swap databases.

---

## 🔹 Active Record vs Data Mapper (simple analogy)

* **Active Record (Mongoose):**

  > Each object knows how to talk to the database.

  * Example:

    ```ts
    const user = new User({ email: 'a@b.com' });
    await user.save();  // the entity persists itself
    ```

* **Data Mapper (TypeORM):**

  > Objects are pure data, and you need a repository/mapper to persist them.

  * Example:

    ```ts
    const user = new User();
    user.email = 'a@b.com';
    await userRepo.save(user); // repository handles persistence
    ```

---

## 🔹 Can they be unified?

Yes, absolutely.

* You can **wrap Mongoose Models inside a repository class** → then you get the same Data Mapper feeling as TypeORM.
* You can also use **TypeORM in Active Record mode** (they support it!) → each entity has `.save()`, `.remove()`.

So the patterns themselves aren’t locked — it’s just the *default style* encouraged by the library.

---

✅ **Summary**:

* Mongoose defaults to **Active Record** → entity + repository combined.
* TypeORM defaults to **Data Mapper** → entity and repository separated.
* You *can* adapt either to mimic the other, but each library chose its default for historical and philosophical reasons.
