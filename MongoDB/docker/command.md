# Manual replica set config

```bash
# Enter mongo shell
mongosh

# Replica set status
rs.status()

# Replica set config
cfg = rs.conf()

# Update Replica set config
cfg.members[0].host = "mongo-local:27017"   // or 127.0.0.1:27017

rs.status()
```

Connection string
```bash
mongodb://127.0.0.1:27017/?replicaSet=rs0
# or
mongodb://127.0.0.1:27017/?directConnection=true
```
