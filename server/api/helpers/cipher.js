import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
class cipher {
  static hashPassword(password) {
    return bcrypt.hashSync(password, Number(process.env.salt));
  }

  static comparePassword(enteredPwd, hashedPwd) {
    return bcrypt.compareSync(enteredPwd, hashedPwd);
  }
}


export default cipher;
