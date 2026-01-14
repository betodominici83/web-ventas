const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");

exports.createUser = async ({ email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashed },
  });
};

exports.findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};
