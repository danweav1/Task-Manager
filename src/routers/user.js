const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
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

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }

  // User.find({})
  //   .then((users) => {
  //     res.send(users); //if successful it will already be a 200 status code so don't need to set
  //   })
  //   .catch((error) => {
  //     res.status(500).send();
  //   });
});

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
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
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
