const express = require('express');
require('./db/mongoose'); // don't want to grab anythig, we just want to make sure the file runs and connects to the database
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json()); // will automatically parse incoming json to an object so we can access it in our request handlers
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
