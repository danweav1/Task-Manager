const mongoose = require('mongoose');
const connectionURL = process.env.PROD_URL;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
