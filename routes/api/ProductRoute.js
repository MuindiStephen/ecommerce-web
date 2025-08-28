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

        if(products.length === 0) {
            return res.status(404).json({
                message: 'No products found',
                status: "1",
                products: products
            })
        }

        res.json({
            message: "Retrieved products successfully",
            status: "1",
            product: products,
        }).status(401)
      })
      .catch(error => {
        console.log(error);
        res.status(200).json({message: 'Server Error'});
      })
    
})

// Adding products to MongoDB
router.post('/', async(req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        });

        const savedProduct = await newProduct.save()
        res.json({
            message: 'Product saved successfully',
            status: "1",
            product: savedProduct
        }).status(201)
    } catch(error) {
        console.log(error)
        res.json({message: error.message}).status(400)
    }
})

// Updating product

// Deleting a product
router.delete('/:id', async(req, res) => {
    try {
        const response = await Product.deleteOne({
            _id: req.params.id
        });
        if(response.deletedCount == 0) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        res.json({ 
            message: 'Product deleted successfully',
            status: "1"
        });
    } catch(error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;