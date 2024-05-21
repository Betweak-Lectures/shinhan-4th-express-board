const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "이메일을 입력하여 주세요."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "올바른 이메일 형식이 아닙니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호가 입력되어야 합니다."],
  },
});

userSchema.statics.signUp = async function (email, password) {
  // bcrypt: hash 알고리즘. (비밀번호 암호화)
  const salt = await bcrypt.genSalt();
  console.log(salt);
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hashedPassword });
    return {
      _id: user._id,
      email: user.email,
    };
  } catch (err) {
    throw err;
  }
};

userSchema.statics.login = async function (email, password) {
const user = await this.findOne({ email });
  if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
      return user.visibleUser;
      }
      throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
  
const visibleUser = userSchema.virtual("visibleUser");
visibleUser.get(function (value, virtual, doc) {
  return {
    _id: doc._id,
    email: doc.email,
  };
});

const User = mongoose.model("user", userSchema);

module.exports = User;

  
  
  