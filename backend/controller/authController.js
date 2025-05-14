import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Auth } from '../models/Auths.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Auth.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
