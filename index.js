import express from 'express';
import ejsMate from 'ejs-mate';
import path, { delimiter } from 'path';
import { fileURLToPath } from 'url';
import route from './routes/indexRouter.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set the view engine to ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// set static folder
app.use(express.static('public'));

// routes
route(app);

// listen
app.listen(3000, () => {
    console.log('Serving on port 3000');
});