import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import MODELS from '../config/db.config.js';

const User = MODELS.User;
const { JWTSECRET } = process.env;

const login = async (req, res) => {

  let { email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    let token = jwt.sign({ id: user.id, logindatetime: new Date() }, JWTSECRET, { expiresIn: '24h' });
    res.json({ authorization: token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
  
};

export default {
  login
}