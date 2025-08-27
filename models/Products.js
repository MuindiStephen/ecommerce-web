const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Model = mongoose.model;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    photo:String
})

const Product = Model('Product', productSchema)

module.exports = Product;