# CTE (Common Table Expression)
https://learnsql.com/blog/what-is-with-clause-sql/ \
https://www.geeksforgeeks.org/sql-with-clause/

<img width="801" alt="With_SQL" src="https://github.com/VIK2395/Databases/assets/50545334/b30db5be-74cd-4733-9fe2-2b1fc9321236">

# Recursive CTE
https://learnsql.com/blog/do-it-in-sql-recursive-tree-traversal/

# Temp table vs CTE
https://www.youtube.com/watch?v=ZaFMM-vNlvc&t=387s

![image](https://github.com/VIK2395/Databases/assets/50545334/191024de-5ffa-4dfa-91b4-8231d0477f69)

https://www.youtube.com/watch?v=uEk07jXdKOo

How to show temp tables:\
https://dev.mysql.com/doc/refman/8.4/en/innodb-information-schema-temp-table-info.html \
https://www.percona.com/blog/temporary-tables-in-mysql-never-ending-story/ 

# Get first row in a group
Problem https://mariadb.com/kb/en/order-by-before-group-by/

https://learnsql.com/cookbook/how-to-select-the-first-row-in-each-group-by-group/ (read row_number vs rank)\
https://www.geeksforgeeks.org/how-to-select-the-first-row-of-each-group-by-in-sql/

# Aggregate functions
https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html

__Aggregate functions (Group by) collapse rows__

- GROUP_CONCAT() https://www.w3resource.com/mysql/aggregate-functions-and-grouping/aggregate-functions-and-grouping-group_concat.php\

# Winfow functions
https://dev.mysql.com/doc/refman/8.4/en/window-functions-usage.html

__Winfow functions (Partition by) do not collapse rows__

![image](https://github.com/VIK2395/Databases/assets/50545334/ee73f0a3-a1ce-49ac-a834-31fea001c294)
![image](https://github.com/VIK2395/Databases/assets/50545334/c056ba83-116e-4f89-8af5-dc4021c72c99)

https://www.youtube.com/watch?v=Ww71knvhQ-s \
https://www.youtube.com/watch?v=zAmJPdZu8Rg \
https://www.devart.com/dbforge/mysql/studio/mysql-window-functions.html \
https://www.youtube.com/watch?v=7NBt0V8ebGk

- LAG() (to get prev row value)
https://www.scaler.com/topics/mysql-lag/

# SELF JOIN
https://www.mysqltutorial.org/mysql-basics/mysql-self-join/

# Implicit (inner) join vs explicit (inner) join

Implicit (inner) join can always be rewritten with explicit (inner) join.

```mysql
# Implicit join
SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
FROM Customers A, Customers B
WHERE A.City = B.City AND A.CustomerID <> B.CustomerID
ORDER BY A.City;
# Without where clause results to cross join
```
```mysql
# Explicit join
SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
FROM Customers A
JOIN Customers B ON A.City = B.City AND A.CustomerID <> B.CustomerID
ORDER BY A.City;
```

# Views

https://www.youtube.com/watch?v=wciubfRhvtM \
https://www.w3schools.com/mysql/mysql_view.asp

![image](https://github.com/VIK2395/Databases/assets/50545334/7f7b4f71-e24b-4e18-baad-244af67b64f5)

# JSON type

<img width="960" alt="Json_in_mysql" src="https://github.com/VIK2395/Databases/assets/50545334/8d393326-d18f-48f3-bf5a-3cfe2f265cee">
<img width="960" alt="db_jsons" src="https://github.com/VIK2395/Databases/assets/50545334/8e2b3173-c6eb-4d5c-bcd0-01fbb30e01ca">

# How to transform flat sql data into hierarchical object structure

1st approach: LEFT JOIN SQL Query. Simpler in terms of the number of queries executed, but may be less flexible if your data structures or relationships are more complex.

- TypeOrm gets raw data using left join
- https://orkhan.gitbook.io/typeorm/docs/find-options
- https://github.com/typeorm/typeorm/issues/6803#issuecomment-864681382

```javascript
SELECT 
    user.id AS user_id, 
    user.name AS user_name, 
    post.id AS post_id, 
    post.title AS post_title, 
    post.userId AS post_userId 
FROM user 
LEFT JOIN post ON post.userId = user.id;
```
```javascript
// Simulated raw SQL results
const rawResults = [
    { user_id: 1, user_name: "John Doe", post_id: 1, post_title: "First Post", post_userId: 1 },
    { user_id: 1, user_name: "John Doe", post_id: 2, post_title: "Second Post", post_userId: 1 },
    { user_id: 2, user_name: "Jane Doe", post_id: 3, post_title: "Another Post", post_userId: 2 }
];

// Mapping results to entities
const userMap = new Map<number, User>();
const postMap = new Map<number, Post>();

rawResults.forEach(row => {
    // Map users
    if (!userMap.has(row.user_id)) {
        const user = new User();
        user.id = row.user_id;
        user.name = row.user_name;
        user.posts = [];
        userMap.set(row.user_id, user);
    }

    // Map posts
    if (row.post_id) {
        const post = new Post();
        post.id = row.post_id;
        post.title = row.post_title;
        post.user = userMap.get(row.user_id);
        postMap.set(row.post_id, post);
        
        // Add post to user's posts array
        userMap.get(row.user_id).posts.push(post);
    }
});

// Convert map to array
const users = Array.from(userMap.values());

console.log(JSON.stringify(users, null, 2));
```
```javascript
[
  {
    "id": 1,
    "name": "John Doe",
    "posts": [
      {
        "id": 1,
        "title": "First Post",
        "user": {
          "id": 1,
          "name": "John Doe",
          "posts": []
        }
      },
      {
        "id": 2,
        "title": "Second Post",
        "user": {
          "id": 1,
          "name": "John Doe",
          "posts": []
        }
      }
    ]
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "posts": [
      {
        "id": 3,
        "title": "Another Post",
        "user": {
          "id": 2,
          "name": "Jane Doe",
          "posts": []
        }
      }
    ]
  }
]
```

2nd approach. Multiple SQL Queries: More flexible and can handle more complex data structures or relationships but involves more data processing in Node.js.

```javascript
// Function to get reviews and their replies using multiple queries
function getReviewsWithReplies(callback) {
  const reviewsQuery = `
    SELECT
      review_id,
      comment,
      user_id AS review_user_id,
      add_date AS review_add_date,
    FROM reviews
  `;

  const repliesQuery = `
    SELECT
      reply_id,
      review_id,
      user_id AS reply_user_id,
      add_date AS reply_add_date
    FROM replies
  `;

  connection.query(reviewsQuery, (reviewsError, reviewsResults) => {
    if (reviewsError) {
      callback(reviewsError);
      return;
    }

    connection.query(repliesQuery, (repliesError, repliesResults) => {
      if (repliesError) {
        callback(repliesError);
        return;
      }

      // Transform the results into the desired structure
      const reviewsMap = new Map();

      reviewsResults.forEach(review => {
        reviewsMap.set(review.review_id, {
          review_id: review.review_id,
          comment: review.comment,
          user_id: review.review_user_id,
          add_date: review.review_add_date,
          replies: []
        });
      });

      repliesResults.forEach(reply => {
        if (reviewsMap.has(reply.review_id)) {
          reviewsMap.get(reply.review_id).replies.push({
            reply_id: reply.reply_id,
            user_id: reply.reply_user_id,
            add_date: reply.reply_add_date
          });
        }
      });

      const reviews = Array.from(reviewsMap.values());
      callback(null, reviews);
    });
  });
}
```
