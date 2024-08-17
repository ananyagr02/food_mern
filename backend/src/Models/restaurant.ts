import mongoose from "mongoose";
const menuItemSchema = new mongoose.Schema({
    name: {type:String, required: true},
    description: { type: String, required: true },
    price:{type: Number, required:true},
    imageUrl: { type: String, required: true }
})
const restaurantSchema =new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:"user"},
    restaurantName: {type: String, required: true},
    city:{type:String, required: true},
    country: {type:String, required: true},
    deliveryPrice:{type:Number, required: true},
    estimatedDeliveryTime:{type:Number, required:true},
    cuisines:[{type:String, required:true}] ,   // array of strings
    menuItems:[menuItemSchema],
    imageUrl: {type:String, required:true},  // url we get back from cloud after uploading image
    lastUpdated:{type: Date, required:true},
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default Restaurant ;