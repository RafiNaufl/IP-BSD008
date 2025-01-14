const bcrypt = require("bcryptjs");

const hash = (val) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(val, salt);
};

const compareHash = (val, hashed) => {
  return bcrypt.compareSync(val, hashed);
};

module.exports = {
  hash,
  compareHash,
};
