const express = require('express')
const router = express.Router();
const homeController = require('../controllers/HomeController')


router.get('/',homeController.listRestaurants())

router.get('/restaurante/:id',homeController.showRestaurant())

router.get('/cadastro',homeController.formRestaurant())

router.post('/cadastro',homeController.createRestaurant())

router.get('/restaurante/deletar/:id',homeController.deleteRestaurant())


module.exports = router
