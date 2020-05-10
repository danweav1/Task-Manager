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

const jwt = require('jsonwebtoken');

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' }); // last parameter is when token expires
  console.log(token);

  const payload = jwt.verify(token, 'thisismynewcourse');
  console.log(payload);
};

myFunction();
