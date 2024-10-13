import express from 'express';
const app = express()
import dotenv, { config } from "dotenv";
import cors from 'cors';
import connectDb from './config/connectdb.js';
import authentication from './routes/authRoute.js';
import user from './routes/userRoute.js';
import job from './routes/jobRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';


dotenv.config();
app.use(express.json());
app.use(cors());
connectDb();

app.use('/',authentication);
app.use('/user',user);
app.use('/job',job);

app.use(errorMiddleware);
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

