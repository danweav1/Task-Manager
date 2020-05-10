const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }

  // old non-async code
  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
}); // auth being used means you have to be logged in/authenticated to use this route

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// router.get('/users', auth, async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(500).send();
//   }

//   // User.find({})
//   //   .then((users) => {
//   //     res.send(users); //if successful it will already be a 200 status code so don't need to set
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).send();
//   //   });
// });

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send(); // no user found with given id
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }

  // User.findById(_id) // mongoose automatically converts string ids into object ids for us
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send(); // no user found with given id
  //     }

  //     res.send(user);
  //   })
  //   .catch((error) => {
  //     res.status(500).send();
  //   });
});

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body); // takes the object and returns the keys of the object as an array of strings
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); // for every update in updates, return true or false

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const _id = req.params.id;
  try {
    const user = await User.findById(_id);

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }); // old way
    if (!user) {
      return res.status(404).send(); // no user found with given id
    }
    res.send(user);
  } catch (error) {
    // could be validation or server/database issue
    res.status(400).send(error);
  }
});

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      res.status(404).send(error);
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
