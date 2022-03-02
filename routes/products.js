var express = require('express');
var router = express.Router();
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const upload = require('../middle/upload');
const authen = require('../middle/authen')

/* Hiện danh sách sản phẩm */
router.get('/', async function (req, res, next) {
    const products = await productController.get()
    const categories = await categoryController.get()

    res.render('san-pham', { products: products, categories: categories });
});

/**Thêm mới sản phẩm */
router.post('/', async function (req, res, next) {
    const { body } = req;
    await productController.insert(body);
    res.redirect('/san-pham')

});

/**xóa sản phẩm */
router.delete('/:id', async function (req, res, next) {
    const { params } = req;
    await productController.delete(params.id);
    res.json({ result: true });
});

/**hiện trang chi tiết sản phẩm */
router.get('/:id/edit', async function (req, res, next) {
    const { id } = req.params;
    const product = await productController.getOne(id);
    const categories = await categoryController.get();
    res.render('chi-tiet-san-pham', { product: product, categories: categories });
});

/**cập nhật chi tiết sản phẩm */
router.post('/:id/edit', [upload.single('image')], async function (req, res, next) {
    let { params, body, file } = req;

    if (file) {
        const image = 'http://192.168.1.93:3000/images/' + file.filename;
        body = { ...body, image }
    }
    body = { ...body, _id: params.id }
    await productController.update(body);
    res.redirect('/san-pham');

});

module.exports = router;    
