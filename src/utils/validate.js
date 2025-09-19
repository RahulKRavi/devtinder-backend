const validator = require("validator");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const validateSignUp = (req) => {
  const { firstName, lastName, email, password, age } = req;
  if (!firstName || !lastName || !email || !password || !age) {
    throw new Error("Sorry Friend, Please enter all data");
  } else if (firstName.length < 1 && firstName.length > 25) {
    throw new Error("Sorry Friend, Firstname should be 1-25 characters");
  } else if (lastName.length < 1 && lastName.length > 25) {
    throw new Error("Sorry Friend, Lastname should be 1-25 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Sorry Friend, Please enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Sorry Friend, Please enter a strong password");
  } else if (typeof age !== "number" || age > 120) {
    throw new Error("Sorry Friend, Please enter a valid age");
  } else if (age < 18) {
    throw new Error("Sorry Friend, Age should be atleast 18");
  }
};

const validateLogin = async (req) => {
  const { email, password } = req;
  if (!validator.isEmail(email)) {
    throw new Error("Sorry Friend, Enter a valid email");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Sorry Friend, Invalid Credentials");
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  return [matchPassword, user];
};

const validateProfileUpdate = (req) => {
  const allowedFields = ['firstName','lastName','age','about','photoURL']
  if(!Object.keys(req).every(item => allowedFields.includes(item))) {
    throw new Error('Updation is not allowed on some fields')
  }
};
module.exports = { validateSignUp, validateLogin, validateProfileUpdate };
