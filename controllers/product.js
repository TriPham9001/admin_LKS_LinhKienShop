const productService = require('../service/product');


exports.get = async function () {
    return await productService.get();
}

exports.getOne = async function (id) {
    const product = await productService.getOne(id);
    return product;
}

exports.insert = async function (body) {
    const { name, price, category, image, description, available, published } = body;
    const product = {
        name: name,
        price: Number(price),
        category: category,
        image: image,
        description: description,
        available: available ? true : false,
        published: published
    }
    await productService.insert(product);
}

exports.update = async function (body) {
    const { _id, name, price, category, image, description, available, published } = body;
    const product = {
        _id: _id,
        name: name,
        price: Number(price),
        category: category,
        image: image,
        description: description,
        available: available ? true : false,
        published: published
    }
    await productService.update(product);
}

exports.delete = async function (_id) {
    await productService.delete(_id);
}

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
