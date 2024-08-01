import express from 'express';
import { sendMessage,getMessage } from '../controllers/message.controller.js';
import  protectRoute  from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/:id',protectRoute,getMessage)//protect this route before you run the sendMessage function 
router.post('/send/:id',protectRoute,sendMessage)//protect this route before you run the sendMessage function 

export default router;