import express from 'express';
import { boatStrab } from './src/app.controller.js';
const app = express();
const port = 3000;

boatStrab(app, express);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

