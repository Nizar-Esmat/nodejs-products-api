import db from '../../db/db.connection.js';
const create_db = async (req, res) => {
    const queries = [
        `CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            email VARCHAR(250) NOT NULL,
            role VARCHAR(50) NOT NULL,
            password VARCHAR(250) NOT NULL,
            first_name VARCHAR(250) NOT NULL,
            last_name VARCHAR(250) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY uq_users_email (email)
        ) ENGINE=InnoDB`,

        `CREATE TABLE IF NOT EXISTS users_phone (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id INT UNSIGNED NOT NULL,
            phone VARCHAR(50) NOT NULL,
            PRIMARY KEY (id),
            KEY idx_users_phone_user_id (user_id),
            UNIQUE KEY uq_users_phone_phone (phone),
            CONSTRAINT fk_users_phone_user
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        ) ENGINE=InnoDB`,

        `CREATE TABLE IF NOT EXISTS products (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(250) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            stock INT NOT NULL,
            is_deleted TINYINT(1) NOT NULL DEFAULT 0,
            user_id INT UNSIGNED NOT NULL,
            PRIMARY KEY (id),
            KEY idx_products_user_id (user_id),
            CONSTRAINT fk_products_user
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        ) ENGINE=InnoDB`
    ];

    try {
        for (const query of queries) {
            await db.promise().execute(query);
        }
        return res.status(200).json({ message: 'Tables created successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export { create_db };