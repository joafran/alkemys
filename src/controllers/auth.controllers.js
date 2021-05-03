import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv'
import User from '../models/User';
dotenv.config();

const { JWT_SECRET } = process.env;

// middleware 
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        return res.status(401).send("A token was not provided. You must login");
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err) => {
        if(err) return res.status(403).send('Invalid token');
    });
    next();
}

// auth routes
export const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        await User.create({email, password: hash})
        return res.json({ msg: 'You have successfully registered. To have access you must login'});
    } catch (error) {
        return res.status(400).send(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({where: { email } });
        const passwordMatch = bcryptjs.compareSync(password, user?.dataValues.password);
        
        if(user && passwordMatch) {
            const token = jwt.sign({email, password}, JWT_SECRET, {
                expiresIn: 3600
            });
            
            return res.json({token});
        }
        return res.status(400).send("Invalid email or password.")

    } catch (error) {
        console.log(error)
        return res.status(400).send("The user doesn't exist or password doesn't match.");
    }
}