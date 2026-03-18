require('dotenv').config();
const mongoose = require('mongoose');
const { Product } = require('../../models');
const { products, moreProducts, finalProducts } = require('./productsData');

const allProducts = [...products, ...moreProducts, ...finalProducts];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const inserted = await Product.insertMany(allProducts);
    console.log(`✅ Successfully seeded ${inserted.length} products!`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
