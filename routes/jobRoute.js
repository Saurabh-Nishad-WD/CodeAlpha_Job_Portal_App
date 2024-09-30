import express from 'express';
import { create, deleteJob, getAllJob, getJob, update } from '../controllers/jobControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const route = express.Router();

route.post('/create',authMiddleware,create)
route.get('/getAllJob',authMiddleware,getAllJob)
route.get('/getJob/:id',authMiddleware,getJob)
route.put('/update/:id',authMiddleware,update)
route.delete('/delete/:id',authMiddleware,deleteJob)

export default route;