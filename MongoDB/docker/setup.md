# Manual replica set config

```bash
# While in container, enter mongo shell
mongosh

# Get replica set status
rs.status()

# Replica set config
cfg = rs.conf()

# Update Replica set config
cfg.members[0].host = "127.0.0.1:27017"

# Apply updated config
rs.reconfig(cfg)

# Get replica set status
rs.status()
```

Connection string
```bash
mongodb://127.0.0.1:27017/?replicaSet=rs0
# or
mongodb://127.0.0.1:27017/?directConnection=true
```

# Guide

- [3 replicas example](https://medium.com/workleap/the-only-local-mongodb-replica-set-with-docker-compose-guide-youll-ever-need-2f0b74dd8384)
