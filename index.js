import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './auth/auth.js';
import userRouter from './routes/userRouter.js';
import customerRouter from './routes/customerRouter.js';
import merchantRouter from './routes/merchantRouter.js';
import adminRouter from './routes/adminRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cookieParser());

app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
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

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);
app.use('/customer', customerRouter)

app.listen(4000, () => {
	console.log('Serving on port 4000');
});
