var express = require('express');
var router = express.Router();
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const upload = require('../middle/upload');
const authen = require('../middle/authen')

/* lấy danh sách sản phẩm */
router.get('/', async function (req, res, next) {
    const products = await productController.get();
    const categories = await categoryController.get();

    res.json({ products: products, categories: categories });
});
/**hiện trang chi tiết sản phẩm */
router.get('/:id/edit', async function (req, res, next) {
    const { id } = req.params;
    const product = await productController.getOne(id);
    const categories = await categoryController.get();
    res.json({ product: product, categories: categories });
});


module.exports = router;
