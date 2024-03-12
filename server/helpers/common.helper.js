import jwt from 'jsonwebtoken';
const { JWTSECRET } = process.env;

const verifyToken = async (token) => {

    try {
        let validate = jwt.verify(token, JWTSECRET);
        return true;
    } catch (error) {
        return false;
    }
    
}

export default {
    verifyToken
}
