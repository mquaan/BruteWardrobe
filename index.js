import express from 'express';
import ejsMate from 'ejs-mate';
import path, { delimiter } from 'path';
import { fileURLToPath } from 'url';
import route from './routes/indexRouter.js';

const customerApp = express();
const merchantApp = express();
const adminApp = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set the view engine to ejs
customerApp.engine('ejs', ejsMate);
customerApp.set('view engine', 'ejs');
customerApp.set('views', path.join(__dirname, '/views'));

// set static folder
customerApp.use(express.static('public'));

// routes
route(customerApp, merchantApp, adminApp);

// listen
customerApp.listen(3000, () => {
    console.log('Serving on port 3000');
});
merchantApp.listen(4000, () => {
    console.log('Serving on port 4000');
});
adminApp.listen(5000, () => {
    console.log('Serving on port 5000');
});