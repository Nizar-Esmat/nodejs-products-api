import db from '../../db/db.connection.js';
const signUp = async (req, res) => {
    const { email, role, password, first_name, last_name } = req.body;

    if (!email || !role || !password || !first_name || !last_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [existingUser] = await db.promise().execute('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const [result] = await db.promise().execute('INSERT INTO users (email, role, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)',
            [email, role, password, first_name, last_name]
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

        const [results] = await db.promise().execute(query, [email, password]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        return res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role, first_name: user.first_name, last_name: user.last_name } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

export { signUp, login };