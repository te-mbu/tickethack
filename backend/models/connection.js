const mongoose = require('mongoose');

// const connectionString = 'mongodb+srv://mbuterence:VkyG8Bs456VNyS3Y@myfirstdatabase.zucv2aj.mongodb.net/tickethack';
const connectionString = 'mongodb+srv://mbuterence:VkyG8Bs456VNyS3Y@myfirstdatabase.zucv2aj.mongodb.net/tickethack'
mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
  