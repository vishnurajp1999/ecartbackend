///inside router.js file, import express

const express =require('express')


//import wishlist controller
const wishlistController = require('../controllers/wishlistController')

//import cart

const cartController=require('../controllers/cartController')


//import product controller
const productController =require('../controllers/productController')

//using express create an object for router class in order to setup

const router =new express.Router()

//resolve client req in various server router
//all api call will be resolved


//get all products
router.get('/products/all-products',productController.getAllProducts)

//get particular product details
router.get('/products/viewproduct/:id',productController.viewProduct)

//add to wishlist product details
router.post('/products/addtowishlist',wishlistController.addtowishlist)


//get wishlist  product
router.get('/products/getwishlist',wishlistController.getWishlist)

//remove wishlist product
router.delete('/products/deletewishlist/:id',wishlistController.deletewishlist)


//add to cart

router.post('/products/addtocart',cartController.addToCart)

//get cart
router.get('/products/getcart',cartController.getCart)

//cart deletion
router.delete('/products/deletecart/:id',cartController.removeCartItem)

//cart increment
router.get('/products/increment/:id',cartController.incrementCart)

// cart decrement
router.get('/products/decrement/:id',cartController.decrementCart)

//export router
module.exports = router