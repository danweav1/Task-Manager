require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5eb58010ec50aa686cce427a', {
//   age: 1,
// })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// The two below functions are the same as above but better syntax
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount('5eb58010ec50aa686cce427a', 2)
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
