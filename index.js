import express from 'express';
import ejsMate from 'ejs-mate';
import path, { delimiter } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import route from './routes/indexRouter.js';
import cors from 'cors';
import session from 'express-session';

const app = express();

app.use(cors());
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false, // if true only transmit cookie over https
			httpOnly: true, // prevent client side JS from reading the cookie
			maxAge: 60 * 60 * 1000, // 60m
		},
	})
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set the view engine to ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// set static folder
app.use(express.static('public'));

app.use(express.json());

// routes
route(app);

// listen
app.listen(4000, () => {
	console.log('Serving on port 4000');
});
