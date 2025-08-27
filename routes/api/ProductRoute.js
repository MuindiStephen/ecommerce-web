const express = require('express')
const router = express.Router();  
const Product = require('../../models/Products')


// Fetch all products from MongoDB
router.get('/', async(req, res) => {

    // async/await:
    /*try {
        const products = await Product.find({})
        res.json(products)
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }*/

    // or ..then /.catch
    Product.find({})
      .then(products => { 
        console.log(products);
        res.json(products).status(401)
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({message: 'Server Error'});
      })
    
})

router.post('/', async(req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        });

        const savedProduct = await newProduct.save()
        res.json(savedProduct).status(201)
    } catch(error) {
        console.log(error)
        res.json(error.message).status(400)
    }
})

module.exports = router;