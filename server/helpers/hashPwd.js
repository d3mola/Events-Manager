import bcrypt from 'bcrypt';

/**
 * Hash user password
 * @param {object} user
 * @return {object} user with hashed pwd
 */
const hashPwd = ((user) => {
  const hash = bcrypt.hashSync(user.password, 10);
  // Store hash in your password DB.
  user.password = hash;
  return user;
});

// bcrypt.compareSync(myPlaintextPassword, hash);

export default hashPwd;
