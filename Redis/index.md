### Database count

- Redis instance/server has fixed database(index) count.
  - Default is 16. indexes from 0 to 15.
  - The count can be configured on the server startup and cannot be changed later
 
### Isolation

| Redis feature | Behaviour with numbered databases |
|---|---|
| Keys, queues, caches, locks | Isolated: a key exists only in the database it was written to |
| `flushdb` | Clears only the database the connection has selected |
| `flushall` | Clears every database on the server |
| Pub/sub channels | Shared: a message published from any database reaches subscribers on every database |
