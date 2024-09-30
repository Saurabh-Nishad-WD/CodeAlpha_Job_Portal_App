import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { get, update } from '../controllers/userControllers.js';
const route = express.Router();

route.get('/get',authMiddleware,get);
route.put('/update',authMiddleware,update);

export default route;