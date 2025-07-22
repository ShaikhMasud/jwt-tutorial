const express=require('express');
const {loginPage,dashboardpage}=require('../controllers/login')
const router =express.Router();

router.post('/login',loginPage);
router.get('/dashboard',dashboardpage)

module.exports = router;