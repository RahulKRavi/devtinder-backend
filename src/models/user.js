const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [1, "First Name must be atlease 1 character"],
    maxlength: [25, "First Name can only be upto 25 charcters"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [1, "Last Name must be atlease 1 character"],
    maxlength: [25, "Last Name can only be upto 25 charcters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function (value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate: function (value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password is not strong");
      }
    },
  },
  age: {
    type: Number,
    min: [18, "Age should be atleast 18"],
    max: [120, "Enter a valide age"],
  },
  about: {
    type: String,
    default: "About the user",
    max: [250, "Descriptino can only be upto 250 charcters"],
  },
  photoURL: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/12/49/12/63/360_F_1249126338_leS5yTD2NdGuTra86mGyq9heEAxLbX5O.jpg",
    validate: function (value) {
      if (!validator.isURL(value)) {
        throw new Error("Photo URL is not valid");
      }
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
