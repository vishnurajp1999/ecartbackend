/// impoort cart from  collection 

const carts = require('../models/cartSchema')

//add to cart 
exports.addToCart = async (req, res) => {
    // get product details from the the request

    const { id, title, price, image, quantity, grandTotal } = req.body

    //logic

    try {
        // check if the product is already in cart collection 
        const product = await carts.findOne({ id })
        if (product) {
            // product is in the cart collection so increment product quantity
            product.quantity += 1
            //update the product grand total
            product.grandTotal += product.price * product.quantity
            //to  update product grand total in mongo db
            product.save()

            // to send responce back to client
            res.status(200).json("item added successfully")
        }
        else {
            // product is not in the cart collection 
            // add product to cart
            const newProduct = new carts({ id, title, price, image, quantity, grandTotal: price })
            //save new product in cart
            await newProduct.save()
            // to send responce back into client
            res.status(200).json("product added successfully")

        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//get cart
exports.getCart = async (req, res) => {
    //get all products from cart
    try {
        //logic check
        const allCarts = await carts.find()
        res.status(200).json(allCarts)
    }
    catch (error) {
        res.status(404).json(error)
    }
}


//cart deletion
exports.removeCartItem = async (req, res) => {
    //getid from the request
    const { id } = req.params
    //product remove from the cart collection
    try {
        //logic
        const removecart = await carts.deleteOne({ id })
        if (removecart.deleteCount != 0) {
            //re,maining products from the cart displayed to front end
            const allcarts = await carts.find()
            res.status(200).json(allcarts)
        }
        else {
            res.status(404).json("items not found")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}

//cart increment
exports.incrementCart = async (req, res) => {
    //get product id from the reques
    const {id} = req.params
    try{
        //logic
        //check the product in the cart
        const product = await carts.findOne({ id })
        //if it exists increment the quantity
        if (product) {
            //update the product quantity and (price)
            product.quantity += 1
            product.grandTotal = product.price * product.quantity
            //save changes in mongo DB
            await product.save()
            //increment the quantity get all cart collection item and updating in particular item count
            const allCarts = await carts.find()
            res.status(200).json(allCarts)
        }
        else {
            res.status(404).json("items not found")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}


//cart decrement
exports.decrementCart = async (req, res) => {
    //get product id from the reques
    const {id} = req.params
    try{
        //logic
        //check the product in the cart
        const product = await carts.findOne({ id })
        //if it exists increment the quantity
       if(product.quantity==0){
        const removecart = await carts.deleteOne({ id })
            //remaining products from the cart displayed to front end
            const allcarts = await carts.find()
            res.status(200).json(allcarts)
       }
       else{
        if (product) {
            //update the product quantity and (price)
            product.quantity -= 1
            product.grandTotal = product.price * product.quantity
            //save changes in mongo DB
            await product.save()
            //increment the quantity get all cart collection item and updating in particular item count
            const allCarts = await carts.find()
            res.status(200).json(allCarts)
        }
        else {
            res.status(404).json("items not found")
        }
       }
    }
    catch (error) {
        res.status(404).json(error)
    }
}