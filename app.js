import express from 'express';
const app = express()
import dotenv, { config } from "dotenv";
import cors from 'cors';
import connectDb from './config/connectdb.js';
import user from './routes/authRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/user', user );


app.use(errorMiddleware);

const PORT = process.env.PORT || 3000
connectDb();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})