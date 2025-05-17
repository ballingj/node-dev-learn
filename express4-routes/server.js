const express = require('express');
const app = express();
const apiRoutes = require('./routes/api.routes');

// Mount the top-level /api router
app.use('/api', apiRoutes);

// you can add more top-level routes here
//app.use('/store', storeRoutes);

app.listen(3002, () => {
  console.log('Server running on port 3002');
});
