import db from '../../db/db.connection.js';
export const alterable = async (req, res) => {
    const { id } = req.body;
    try {
        const [results] = await db.promise().execute('SELECT * FROM users WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = results[0];
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: User does not have admin privileges' });
        }

        const [columns] = await db.promise().execute('SHOW COLUMNS FROM users like "createdAt"');

        if (columns.length > 0) {
            return res.status(400).json({ error: 'Column "createdAt" already exists' });
        }

        await db.promise().execute(`
            alter table users 
            add column createdAt timestamp default NOW()
`)

        return res.status(200).json({ message: 'Table altered successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const clearTable = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const userData = await db.promise().execute('SELECT * FROM users WHERE id = ?', [id]);
        if (userData[0].length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userData[0][0];
        console.log(user);
        if (user.role != 'admin') {
            return res.status(403).json({ error: 'Forbidden: User does not have admin privileges' });
        }


        const [results] = await db.promise().execute('truncate table products');
        return res.status(200).json({ message: 'Table cleared successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
