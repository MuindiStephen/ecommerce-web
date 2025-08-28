const Product = require('../models/Products')

const getAllProducts = async(req, res) => {
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
}

module.exports = {
    getAllProducts
}