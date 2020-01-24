import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
class cipher {
  static hashPassword(password) {
    return bcrypt.hashSync(password, Number(process.env.salt));
  }

  static decodePassword(enteredPwd, hashedPwd) {
    return bcrypt.compareSync(enteredPwd, hashedPwd);
  }
}


export default cipher;
