const categoryController = require('../service/categories');


exports.get = async function () {
    return await categoryController.get();
}