const categories = [
    { _id: 1, name: 'TShirt' },
    { _id: 2, name: 'Shirt' },
    { _id: 3, name: 'Pants' },
    { _id: 4, name: 'Shorts' },

]
const categoryModel = require('../models/categoryModel');
exports.get = async function(){
    return await categoryModel.find();
}