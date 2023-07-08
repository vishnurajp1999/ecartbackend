//import wishlists
const wishlists=require('../models/wishlistSchema')
//logic for wishlists

exports.addtowishlist=async(req,res)=>{
    //get product details from request
    // req.body={

    // }
    //destructure req.body
    const{id,title,price,image}=req.body

    try{
const item=await wishlists.findOne({id})
if(item){
    res.status(404).json("product already exists")
}
else{
    //add item to wishlist collection
    const newItem=new wishlists({id,title,price,image})
    //to store in wishlist collection
    await newItem.save()
    //response send back to the client
    res.status(200).json("Product added to the wishlist")
}
    }
    catch(error){
        res.status(404).json(error)
    }
}
///logic for view wishlists products details

exports.getWishlist=async(req,res)=>{
    //logic for view wishlists product details
  try{
    const allWishlists = await wishlists.find()
    res.status(200).json(allWishlists)
  }
catch(error){
    res.status(404).json(error)
}

}
//delete wishlist product detils

exports.deletewishlist=async(req,res)=>{
    //get id from the request
    const {id}=req.params

    //logic for detelet wishlist product details
    try{
        const removewishlists=await wishlists.deleteOne({id})
    if(removewishlists){
        //get all wishlists products after removing particular product details
        const allitems=await wishlists.find()
        res.status(200).json(allitems)
    }
    }
    catch(error){
        res.status(404).json(error)
    }
}