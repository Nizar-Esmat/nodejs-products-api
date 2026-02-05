import dbRouter from "./modules/db/db.controller.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/users/users.controller.js";
import productsRouter from "./modules/products/products.controller.js";
export const boatStrab = (app , express) => {
    app.use(express.json());
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/db', dbRouter);
    app.use("/auth", authRouter);
    app.use('/user', userRouter);
    app.use('/products', productsRouter);
}