const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }

  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
  // Task.find({})
  //   .then((tasks) => {
  //     res.send(tasks);
  //   })
  //   .catch((error) => {
  //     res.status(500).send();
  //   });
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
  // Task.findById(_id) // mongoose automatically converts string ids into object ids for us
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send(); // no task found with given id
  //     }

  //     res.send(task);
  //   })
  //   .catch((error) => {
  //     res.status(500).send();
  //   });
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body); // takes the object and returns the keys of the object as an array of strings
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); // for every update in updates, return true or false

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }); // old way
    if (!task) {
      return res.status(404).send(); // no task found with given id
    }
    res.send(task);
  } catch (error) {
    // could be validation or server/database issue
    res.status(400).send(error);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      res.status(404).send(error);
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
