# Usefull courses
https://www.youtube.com/watch?v=7S_tz1z_5bA \
https://www.youtube.com/watch?v=oPV2sjMG53U&list=PLZPZq0r_RZOMskz6MdsMOgxzheIyjo-BZ \
https://www.youtube.com/watch?v=Ww71knvhQ-s&list=RDCMUCnz-ZXXER4jOvuED5trXfEA&index=1 \
https://www.youtube.com/watch?v=rGx1QNdYzvs&list=PLUaB-1hjhk8FE_XZ87vPPSfHqb6OcM0cF

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

Spesial trick
```mysql
# Returns most fresh reports "grouped by" vin
SELECT t1.*
FROM reports t1
LEFT JOIN reports t2 ON t1.vin = t2.vin AND r1.reportDate < t2.reportDate
WHERE t2.vin IS NULL;
```

# Count total rows
1. `SQL_CALC_FOUND_ROWS` + `SELECT FOUND_ROWS()`
2. `SELECT COUNT(*)`
3. `SELECT COUNT(*) OVER()`

1 is deprecated and doesn't use indexes and not always counts rows correctly when UNION is used
- https://dev.mysql.com/worklog/task/?id=12615
- https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_found-rows
- https://habr.com/ru/articles/64655/

3 is much more slower than 2 with large tables. Tested in reality, difference is miliseconds against seconds.

___So 2 is the best way___\
https://stackoverflow.com/questions/186588/which-is-fastest-select-sql-calc-found-rows-from-table-or-select-count

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
In the image below, it is not (implicit) join, but nested select
<img width="773" alt="2_tables" src="https://github.com/VIK2395/Databases/assets/50545334/1bae99a9-c544-4d7e-b503-2f40bdcd1a66">

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

# Stored procedures
https://dev.mysql.com/doc/refman/8.4/en/create-procedure.html \
https://www.youtube.com/watch?v=oagHZwY9JJY

__Can have parameters, but doesn't return a value__

# Functions
https://dev.mysql.com/doc/refman/8.4/en/create-procedure.html \
https://www.w3schools.com/mysql/mysql_ref_functions.asp

- CURRENT_TIMESTAMP()

__Can have parameters, and returns a value__

# Triggers
https://www.youtube.com/watch?v=jVbj72YO-8s

# JSON type
- https://www.youtube.com/watch?v=mL7xnMZNYXM
- https://www.youtube.com/watch?v=QZBxgX2OWbI

<img width="960" alt="Json_in_mysql" src="https://github.com/VIK2395/Databases/assets/50545334/8d393326-d18f-48f3-bf5a-3cfe2f265cee">
<img width="960" alt="db_jsons" src="https://github.com/VIK2395/Databases/assets/50545334/8e2b3173-c6eb-4d5c-bcd0-01fbb30e01ca">

# Pagination (offset vs cursor)
https://www.youtube.com/watch?v=zwDIN04lIpc

# Full-text indexing and searching
Investige this topic

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

# Articles comment-reply task

```javascript
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
});

connection.connect();

// Recursive query to fetch comments and replies
const query = `
WITH RECURSIVE CommentHierarchy AS (
    SELECT
        id,
        article_id,
        parent_comment_id,
        user_id,
        content,
        created_at,
        0 AS level
    FROM comments
    WHERE article_id = ? AND parent_comment_id IS NULL

    UNION ALL

    SELECT
        c.id,
        c.article_id,
        c.parent_comment_id,
        c.user_id,
        c.content,
        c.created_at,
        ch.level + 1
    FROM comments c
    INNER JOIN CommentHierarchy ch ON c.parent_comment_id = ch.id
)
SELECT
    id,
    article_id,
    parent_comment_id,
    user_id,
    content,
    created_at,
    level
FROM CommentHierarchy
ORDER BY level, created_at;
`;

const articleId = 1;

connection.query(query, [articleId], (error, results) => {
    if (error) {
        console.error('Error executing query:', error);
        connection.end();
        return;
    }

    const comments = results;

    // Function to build the hierarchical structure
    function buildCommentTree(comments) {
        const commentDict = {};
        comments.forEach(comment => {
            comment.replies = [];
            commentDict[comment.id] = comment;
        });

        const commentTree = [];
        comments.forEach(comment => {
            if (comment.parent_comment_id === null) {
                commentTree.push(comment);
            } else {
                commentDict[comment.parent_comment_id].replies.push(comment);
            }
        });

        return commentTree;
    }

    // Build the hierarchical comment tree
    const commentTree = buildCommentTree(comments);

    // Print the hierarchical structure
    console.log(JSON.stringify(commentTree, null, 4));

    connection.end();
});
```
```javascript
[
    {
        "id": 1,
        "article_id": 1,
        "parent_comment_id": null,
        "user_id": 1,
        "content": "This is a top-level comment",
        "created_at": "2024-06-30T12:34:56.000Z",
        "level": 0,
        "replies": [
            {
                "id": 2,
                "article_id": 1,
                "parent_comment_id": 1,
                "user_id": 2,
                "content": "This is a reply to the top-level comment",
                "created_at": "2024-06-30T12:35:56.000Z",
                "level": 1,
                "replies": [
                    {
                        "id": 4,
                        "article_id": 1,
                        "parent_comment_id": 2,
                        "user_id": 3,
                        "content": "This is a reply to the reply",
                        "created_at": "2024-06-30T12:36:56.000Z",
                        "level": 2,
                        "replies": []
                    },
                    {
                        "id": 5,
                        "article_id": 1,
                        "parent_comment_id": 2,
                        "user_id": 4,
                        "content": "This is another reply to the reply",
                        "created_at": "2024-06-30T12:37:56.000Z",
                        "level": 2,
                        "replies": []
                    }
                ]
            },
            {
                "id": 3,
                "article_id": 1,
                "parent_comment_id": 1,
                "user_id": 3,
                "content": "This is another reply to the top-level comment",
                "created_at": "2024-06-30T12:36:00.000Z",
                "level": 1,
                "replies": [
                    {
                        "id": 6,
                        "article_id": 1,
                        "parent_comment_id": 3,
                        "user_id": 5,
                        "content": "This is a reply to another reply",
                        "created_at": "2024-06-30T12:38:00.000Z",
                        "level": 2,
                        "replies": []
                    }
                ]
            }
        ]
    },
    {
        "id": 7,
        "article_id": 1,
        "parent_comment_id": null,
        "user_id": 2,
        "content": "This is another top-level comment",
        "created_at": "2024-06-30T12:38:56.000Z",
        "level": 0,
        "replies": [
            {
                "id": 8,
                "article_id": 1,
                "parent_comment_id": 7,
                "user_id": 6,
                "content": "This is a reply to another top-level comment",
                "created_at": "2024-06-30T12:39:56.000Z",
                "level": 1,
                "replies": []
            }
        ]
    }
]
```
```
Top-Level Comment 1
    ├── Reply 1 (User 2)
    │    ├── Reply 1.1 (User 3)
    │    └── Reply 1.2 (User 4)
    └── Reply 2 (User 3)
         └── Reply 2.1 (User 5)

Top-Level Comment 2
    └── Reply 3 (User 6)
```
