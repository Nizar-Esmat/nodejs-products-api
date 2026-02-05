import db from "../../db/db.connection.js";


export const addProduct = async (req, res) => {
    const { name, price, stock, userId } = req.body;
    if (!name || !price || !stock || !userId) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const [userResults] = await db.promise().execute('SELECT * FROM users WHERE id = ?', [userId]);
        if (userResults.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const [results] = await db.promise().execute('INSERT INTO products (name, price, stock , user_id) VALUES (?, ?, ?, ?)', [name, price, stock, userId]);
        return res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.promise().execute('DELETE FROM products WHERE id = ?', [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {

    }
}

export const searchProducts = async (req, res) => {
    const { name } = req.query;
    try {
        const [results] = await db.promise().execute('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }
        return res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProductsIn = async (req, res) => {
    const { ids } = req.query;
    const idsArray = ids.split(',').map(id => parseInt(id));
    try {
        const [results] = await db.promise().execute(`
            SELECT id , name , price 
            FROM products 
            WHERE
            is_deleted = 0 
            AND
            id IN (${idsArray.map(() => '?').join(',')})`, idsArray);
        if (results.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }
        return res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

export const getAllProducts = async (req, res) => {
    try {
        const [results] = await db.promise().execute(`SELECT 
            id ,
            name as "productName" , 
            concat(price,"$") as "cost",
            stock as "availableStock",
            is_deleted as "isDeleted" 
            FROM products WHERE is_deleted = 0`);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getProductsOwner = async (req, res) => {
    try {
        const q = `SELECT p.name as productName , u.email as "user email"
                    from products as p 
                    join users as u
                    on p.user_id = u.id`
        const [results] = await db.promise().execute(q);
        return res.status(200).json(results);
    } catch (error) {

    }
}

export const getMaxPrice = async (req, res) => {

    try {
        const q = `select MAX(price) as "max price"
                    from products `
        const [results] = await db.promise().execute(q);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getTopfiveProducts = async (req, res) => {
    try {
        const q = ` select name , price
                    from products
                    order by price DESC
                    limit 5`
        const [results] = await db.promise().execute(q);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}