const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods.comparePassword = function (password, hash_password) {
  // console.log(password,hash_password);
  return bcrypt.compare(password, hash_password);
};

module.exports = mongoose.model("User", userSchema);
