CTE (Common Table Expression):\
https://learnsql.com/blog/what-is-with-clause-sql/ \
https://www.geeksforgeeks.org/sql-with-clause/

<img width="801" alt="With_SQL" src="https://github.com/VIK2395/Databases/assets/50545334/b30db5be-74cd-4733-9fe2-2b1fc9321236">

Recursive CTE:\
https://learnsql.com/blog/do-it-in-sql-recursive-tree-traversal/

Aggregate functions:\
https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html

GROUP_CONCAT() https://www.w3resource.com/mysql/aggregate-functions-and-grouping/aggregate-functions-and-grouping-group_concat.php\

Get first row in a group:
- problem https://mariadb.com/kb/en/order-by-before-group-by/

https://learnsql.com/cookbook/how-to-select-the-first-row-in-each-group-by-group/ (read row_number vs rank)\
https://www.geeksforgeeks.org/how-to-select-the-first-row-of-each-group-by-in-sql/

LAG function (to get prev row value):\
https://www.scaler.com/topics/mysql-lag/

SELF JOIN:\
https://www.mysqltutorial.org/mysql-basics/mysql-self-join/

How to transform flat sql data into hierarchical object structure:

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
