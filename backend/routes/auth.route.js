import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router();
/*
# const router = express.Router(); is a line of code used in Node.js applications with the Express framework to create a new router object. This router object is used to define a group of related routes that you can then use in your main application. The purpose of using a router is to modularize and organize the routes in your application, making the codebase easier to manage and maintain.
*/

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

export default router;