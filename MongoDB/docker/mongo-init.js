// rs.initiate() is run only once when you first create the replica set
// The rs config is preserved in /data/db volume, so re-starting/re-creating container would not run rs.initiate() again

rs.initiate({
  _id: 'rs0',
  members: [{ _id: 0, host: '127.0.0.1:27017' }],
});
