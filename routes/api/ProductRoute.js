const express = require('express')
const router = express.Router();  
const productsController = require('../../Controllers/products_controllers')


// Fetch all products from MongoDB
router.get('/', productsController.getAllProducts)

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
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne(
            { _id: req.params.id },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                photo: req.body.photo
            },
            { upsert: true } // create if not found
        );

        if (updatedProduct.matchedCount === 0 && updatedProduct.upsertedCount === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            result: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});


// Deleting a product
router.delete('/:id', async(req, res) => {
    try {
        const response = await Product.deleteOne({
            _id: req.params.id
        });
        if(response.deletedCount == 0) {
            return res.status(404).json({
                message: 'Product not found',
                status: "1"
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