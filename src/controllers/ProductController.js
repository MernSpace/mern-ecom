const ProductModel = require('../models/ProductModel');
const { ListByFilterService, CreateReviewService, BrandListService, CategoryListService, SliderListService, ListByCategoryService, ListByBrandService, ListByRemarkService, ListBySmilierService, ListByKeywordService, DetailsService, ReviewListService } = require('../services/ProductServices')
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

exports.ProductBrandList = async (req, res) => {
    let result = await BrandListService();
    return res.status(200).json(result)
}

exports.ProductCategoryList = async (req, res) => {
    let result = await CategoryListService();
    return res.status(200).json(result)
}

exports.ProductSliderList = async (req, res) => {
    let result = await SliderListService();
    return res.status(200).json(result)
}

exports.ProductListByBrand = async (req, res) => {
    let result = await ListByBrandService(req);
    return res.status(200).json(result)
}


exports.ProductListByCategory = async (req, res) => {
    let result = await ListByCategoryService(req);
    return res.status(200).json(result)
}

exports.ProductListBySmilier = async (req, res) => {
    let result = await ListBySmilierService(req);
    return res.status(200).json(result)
}

exports.ProductListByKeyword = async (req, res) => {
    let result = await ListByKeywordService(req);
    return res.status(200).json(result)
}

exports.ProductListByRemark = async (req, res) => {
    let result = await ListByRemarkService(req);
    return res.status(200).json(result)
}



exports.ProductListByFilter = async (req, res) => {
    let result = await ListByFilterService(req);
    return res.status(200).json(result)
}




exports.ProductDetails = async (req, res) => {
    let result = await DetailsService(req);
    return res.status(200).json(result)
}

exports.ProductReviewList = async (req, res) => {
    let result = await ReviewListService(req);
    return res.status(200).json(result)
}



exports.CreateReview = async (req, res) => {
    let result = await CreateReviewService(req);
    return res.status(200).json(result)
}




// Admin controller


exports.AllProduct = async (req, res) => {
    try {

        const data = await ProductModel.find({})
        res.status(200).json({ status: "success", data: data })

    } catch (error) {
        return res.status(500).json({ error })
    }
}


exports.AdminProductDetail = async (req, res) => {
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        const data = await ProductModel.find({ _id: ProductID })
        res.status(200).json({ status: "success", data: data })

    } catch (error) {
        return res.status(500).json({ error })
    }
}
