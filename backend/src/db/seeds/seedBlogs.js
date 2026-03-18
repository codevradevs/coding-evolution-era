require('dotenv').config();
const mongoose = require('mongoose');
const { BlogPost } = require('../../models');
const { allBlogs } = require('./blogData');

async function seedBlogs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    const inserted = await BlogPost.insertMany(allBlogs);
    console.log(`✅ Successfully seeded ${inserted.length} blog posts!`);

    const categories = [...new Set(allBlogs.map(b => b.category))];
    console.log('\nCategories:', categories.join(', '));

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
}

seedBlogs();
