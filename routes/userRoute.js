import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { apply, deleteUser, get, getCompanyJob, getJob, update } from '../controllers/userControllers.js';
const route = express.Router();

route.get('/get',authMiddleware,get);
route.put('/update',authMiddleware,update);
route.delete('/delete',authMiddleware,deleteUser);

route.get('/get-job',getJob);
route.get('/:company/get-job',getCompanyJob);

route.post('/apply',authMiddleware,apply);

export default route;