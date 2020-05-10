require('../src/db/mongoose');
const Task = require('../src/models/task');

// Model.findbyidanddelete

// Task.findByIdAndDelete('5eb577fa01add56308ca09a6')
//   .then((task) => {
//     // if we didn't have the console.log(task) below, we could have just left (task) as ()
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// The below two functions are the same as above but better
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount('5eb5809e0639c74654bdd39b')
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
