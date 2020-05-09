// This file not used anymore but keep as reference

// // CRUD create read update delete

// // const mongodb = require('mongodb');
// // const MongoClient = mongodb.MongoClient;
// // const ObjectID = mongodb.ObjectID;

// const { MongoClient, ObjectID } = require('mongodb'); // short hand destructuring way for above

// const connectionURL = 'mongodb://127.0.0.1:27017';
// const databaseName = 'task-manager';

// MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
//   if (error) {
//     return console.log('Unable to connect to the database');
//   }

//   const db = client.db(databaseName);

//   db.collection('tasks')
//     .deleteOne({
//       description: 'Task 1',
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   // db.collection('users')
//   //   .deleteMany({
//   //     age: 27,
//   //   })
//   //   .then((result) => {
//   //     console.log(result);
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });
// });
// //   db.collection('tasks')
// //     .updateMany(
// //       {
// //         completed: false, //first find all tasks where completed: false
// //       },
// //       {
// //         $set: {
// //           completed: true,
// //         },
// //       }
// //     )
// //     .then((result) => {
// //       console.log(result);
// //     })
// //     .catch((error) => {
// //       console.log(error);
// //     });
// // });

// //   db.collection('users')
// //     .updateOne(
// //       {
// //         _id: new ObjectID('5eb544df205b8e1b7c137872'),
// //       },
// //       {
// //         $inc: {
// //           age: 1,
// //         },
// //       }
// //     )
// //     .then((result) => {
// //       console.log(result);
// //     })
// //     .catch((error) => {
// //       console.log(error);
// //     });
// // });

// //   db.collection('users')
// //     .updateOne(
// //       {
// //         _id: new ObjectID('5eb544df205b8e1b7c137872'),
// //       },
// //       {
// //         $set: {
// //           name: 'Mike',
// //         },
// //       }
// //     )
// //     .then((result) => {
// //       console.log(result);
// //     })
// //     .catch((error) => {
// //       console.log(error);
// //     });
// // });

// // db.collection('tasks').findOne({ _id: new ObjectID('5eb546b5ade1e037bcf4759e') }, (error, task) => {
// //   if (error) {
// //     return console.log('error');
// //   }

// //   console.log(task);
// // });

// // db.collection('tasks')
// //   .find({
// //     completed: false,
// //   })
// //   .toArray((error, tasks) => {
// //     console.log(tasks);
// //   });

// // db.collection('users').findOne({ _id: new ObjectID('5eb549c62bce5740587f00d2') }, (error, user) => {
// //   if (error) {
// //     return console.log('error');
// //   }

// //   console.log(user);
// // });

// // db.collection('users')
// //   .find({
// //     age: 29,
// //   })
// //   .toArray((error, users) => {
// //     console.log(users);
// //   }); // with .find multiple, you h ave to convert to array and then you can use the callback

// // db.collection('users')
// //   .find({
// //     age: 29,
// //   })
// //   .count((error, count) => {
// //     console.log(count);
// //   });
// // callback is called when we actually connect to the database
