https://stackoverflow.com/questions/6766781/maximum-length-for-mysql-type-text

***In mysql, does it mean that the system reserves specific amount of memory for every cell depending on the cell data type, even though the cell is empty?***

In MySQL, the amount of memory reserved for each cell depends on the data type of the column, but it does **not** necessarily reserve a fixed amount of memory for each cell, especially if the cell is empty. Different data types handle storage differently, and MySQL tries to optimize storage by not always reserving the full data size for each column. Here’s how it works for various types:

### 1. **Fixed-Length Data Types (e.g., `CHAR`, `INT`, `DATE`)**:
   - **`CHAR(n)`**: This is a fixed-length string type. MySQL reserves exactly `n` characters for every `CHAR` column, regardless of the actual content. If the content is shorter, it is padded with spaces. Even if the column is empty, space for `n` characters is reserved.
   - **`INT`, `BIGINT`, `FLOAT`, `DOUBLE`**: These numeric types are fixed-length, so they always use the same amount of storage regardless of whether the field is empty. For example, an `INT` uses 4 bytes, a `BIGINT` uses 8 bytes, etc.
   - **`DATE`**: This stores date values using 3 bytes regardless of the actual value stored.

   **Empty values**: Even though the cell may appear empty or `NULL`, the system still reserves the defined amount of space for these fixed-length types (though MySQL tries to optimize NULL handling with additional bits). 

### 2. **Variable-Length Data Types (e.g., `VARCHAR`, `TEXT`, `BLOB`)**:
   - **`VARCHAR(n)`**: This is a variable-length string type. MySQL only stores the actual content length, plus 1 or 2 bytes to indicate the length of the string. If the string is empty, the length part is stored, but no additional memory is allocated for the content.
     - For example, a `VARCHAR(255)` can store up to 255 characters, but if a particular row only has a 10-character string, only the space for those 10 characters (plus 1 or 2 bytes for the length) is used.
   - **`TEXT` and `BLOB`**: These are variable-length types that store larger amounts of text or binary data. They also only use the space necessary for the actual content, plus a few bytes for length metadata.

   **Empty values**: If the column is `NULL` or an empty string, only the length metadata (1 or 2 bytes for `VARCHAR`, or 1–4 bytes for `TEXT/BLOB`) is stored, but no space is allocated for the content.

### 3. **`NULL` Values**:
   - In most cases, a column that is `NULL` doesn't consume the full space allocated for its data type. Instead, MySQL uses an extra **NULL flag** (1 bit per column) to indicate whether the value is `NULL`.
   - Fixed-length types like `INT` still reserve space, but MySQL uses an internal optimization so that `NULL` columns may not always take the full space.

### Summary:
- **Fixed-length data types** like `CHAR` and `INT` reserve a specific amount of space regardless of the content or emptiness.
- **Variable-length data types** like `VARCHAR`, `TEXT`, and `BLOB` allocate memory dynamically based on the content, with minimal space reserved for empty values.
- **`NULL` values** don't take the full column space but are tracked by a special `NULL` flag.

So, MySQL optimizes storage in various ways, especially with variable-length and nullable columns, meaning it doesn’t reserve the full defined memory for empty cells unless they are fixed-length data types.

***Is MEDIUMTEXT fixed or variable length data type?***

`MEDIUMTEXT` is a **variable-length** data type in MySQL. It is used to store large amounts of text data, with a maximum length of up to 16,777,215 characters (16 MB).

### How `MEDIUMTEXT` works:
- **Storage size**: `MEDIUMTEXT` only uses the space required to store the actual data, plus 3 bytes to store the length of the text. The 3 bytes are used to indicate how long the stored string is (since it can store up to 16 MB of data).
  
- **Empty or small values**: If a `MEDIUMTEXT` column contains only a small amount of text or is empty, it only uses the necessary space for the actual content plus the 3 bytes for the length. If the field is empty, MySQL stores just the 3 bytes for length metadata, and no additional space is used for content.

In summary, `MEDIUMTEXT` is a **variable-length** data type, meaning it dynamically allocates space based on the size of the content in each row, rather than reserving a fixed amount of memory for every row.
