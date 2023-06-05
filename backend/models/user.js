const mongoose = require("mongoose");
const cyrpto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
      lowercase: true,
    },
    profile: {
      type: String,
      require: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: Number,
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timeStamp: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    // created  a temp variable
    this._password = password;

    // creaTE  salt
    this.salt = this.makeSalt();
    // encrpyted password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.__password;
  });

userSchema.methods = {
  autehenticate: function (plaintext) {
    return this.encryptPassword(plaintext) == this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
