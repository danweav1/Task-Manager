const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('password contains password');
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// a virutal propery. not stored in the database but a relationship between two entities. Lets mongoose know how the two are related
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id', // associated with the _id of the user
  foreignField: 'owner', // the name of the field on the other object that creates the relationship, which we set to the owner
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');

  this.tokens.push({ token });
  await user.save();

  return token;
};

// doesn't need to be async because we aren't using any async functions (await)
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // the below two lines allow us to remove properties that are being sent back, for use with private data
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login'); // throwing an error will immediately leave this function
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
}; // our own custom method

// Hash the plain text password before saving. This is saying we want to do something before a user is saved
userSchema.pre('save', async function (next) {
  // MUST BE A NORMAL FUNCTION not an arrow
  const user = this; // the user we are saving

  if (user.isModified('password')) {
    // will be true when the user is first created and if the user is being udpated and password was one of the fields changed
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
