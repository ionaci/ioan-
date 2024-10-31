import Product from "../../models/productSchema.js";
import Category from "../../models/categorySchema.js";
import asyncHandler from "../../utlis/asyncHandler.js";
import ErrorResponse from "../../utlis/ErrorResponse.js";

// get All Products
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products.length) throw new ErrorResponse("No product found", 404);
  res.json(products);
});
// get Product by id
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public

export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id); // Check if product exists
  if (!product)
    throw new ErrorResponse(`Product with id: ${id} does not exist`, 404);
  res.json(product);
});
// Update Product
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const udpateProduct = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  console.log(id);
  const updatedProduct = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedProduct)
    throw new ErrorResponse(`Product with id: ${id} does not exist`, 404);

  res.json(updatedProduct);
});

// Add new Product
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

export const CreateProduct = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    throw new ErrorResponse("No file uploaded", 400);
  }

  const { name, description, brand, new_price, old_price, category } = req.body;
  const imageUrls = req.files.map((file) => file.path);

  if (!name || !description || !brand || !new_price || !old_price) {
    throw new ErrorResponse(
      "Name, description, brand, new_price, and old_price are required fields",
      418
    );
  }

  const validCategories = [
    "TV",
    "Smartphone",
    "Console",
    "Laptop",
    "Tablet",
    "Wearables",
    "Audio",
    "Camera",
    "Gaming",
    "Accessories",
    "NEW",
  ];
  const validCategory = validCategories.includes(category) ? category : "NEW";

  let existingCategory = await Category.findOne({ name: validCategory });
  if (!existingCategory) {
    existingCategory = await Category.create({ name: validCategory });
  }

  const newProduct = await Product.create({
    name,
    images: imageUrls,
    description,
    brand,
    new_price,
    old_price,
    category: existingCategory.name,
  });

  res.status(201).json(newProduct);
});

// Delete Product
// @desc    Delete single product
// @route   DELETE /api/products/:id
// @access  Private/Admin

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct)
    throw new ErrorResponse(`Product with id: ${id} does not exist`, 404);

  res.json({ success: `Product with ${id} was deleted` });
});

export const getProductsByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;

  const products = await Product.find({ category });
  if (!products.length) {
    throw new ErrorResponse(`No products found in category: ${category}`, 404);
  }

  res.status(200).json(products);
});
