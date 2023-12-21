import express from 'express';
import ejsMate from 'ejs-mate';
import path, { delimiter } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import './auth/auth.js';
import userRouter from './routes/userRouter.js';
import customerRouter from './routes/customerRouter.js';
import merchantRouter from './routes/merchantRouter.js';
import adminRouter from './routes/adminRouter.js';

dotenv.config();

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
app.use(cookieParser());
// routes
app.use('/', userRouter);
// app.use('/', passport.authenticate('jwt', { session: false }), customerRouter);

// listen
app.listen(4000, () => {
	console.log('Serving on port 4000');
});
