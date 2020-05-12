const express = require('express');
require('./db/mongoose'); // don't want to grab anythig, we just want to make sure the file runs and connects to the database
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled');
//   } else {
//     next(); // continues to the next middleware or route function
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send('Site is under maintenance.');
// });

app.use(express.json()); // will automatically parse incoming json to an object so we can access it in our request handlers
app.use(userRouter);
app.use(taskRouter);

//
// Without middleware: new request -> run route handler
//
// With middleware: new request -> do something -> run route handler
//

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//   // const task = await Task.findById('5eb93407ea67353710f753ce');
//   // await task.populate('owner').execPopulate(); // goes off and finds the user associated with this task and task.owner will be the entire user document not just owner id
//   // console.log(task.owner);

//   const user = await User.findById('5eb9336144350a16a8f4355f');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };
// main();
