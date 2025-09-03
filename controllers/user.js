const bcrypt = require("bcrypt");

const User = require("../models/user");

const login = async (email, password) => {};

const signup = async (name, email, password) => {
  // 1. check if email provided already exists or not
  const emailExists = await User.findOne({ email: email });
  // if email exists, throw an error
  if (emailExists) {
    throw new Error(
      "Email already exists. Please use another email or login with your existing email."
    );
  }
  // 2. create new user
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // hash the password with 10 rounds of salt
  });

  // 3. save the user
  await newUser.save();
  // 4. return the user
  return newUser;
};

module.exports = {
  login,
  signup,
};
