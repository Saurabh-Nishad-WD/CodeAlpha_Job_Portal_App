import express from 'express';
import { applier, create, deleteJob, getAllJob, getJob, response, update, updateStatus } from '../controllers/jobControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const route = express.Router();

route.post('/create',authMiddleware,create)
route.get('/getAllJob',authMiddleware,getAllJob)
route.get('/getJob/:id',authMiddleware,getJob)
route.put('/update/:id',authMiddleware,update)
route.delete('/delete/:id',authMiddleware,deleteJob)

route.get('/get-applier/:id',authMiddleware,applier)
route.post('/response/:id',authMiddleware,response)
route.put('/statusUpdate/:id',authMiddleware,updateStatus)


export default route;