require('dotenv').config();
const mongoose = require('mongoose');
const { Tip } = require('../../models');
const { gitTips } = require('./gitTips');
const { deploymentTips } = require('./deploymentTips');
const { vscodeTips } = require('./vscodeTips');
const { javascriptTips } = require('./javascriptTips');
const { securityTips } = require('./securityTips');
const { aiTips } = require('./aiTips');
const { devopsTips } = require('./devopsTips');

const allTips = [
  ...gitTips,
  ...deploymentTips,
  ...vscodeTips,
  ...javascriptTips,
  ...securityTips,
  ...aiTips,
  ...devopsTips
];

async function seedTips() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Tip.deleteMany({});
    console.log('Cleared existing tips');

    const inserted = await Tip.insertMany(allTips);
    console.log(`✅ Successfully seeded ${inserted.length} tips!`);
    console.log('\nBreakdown:');
    console.log(`- Git: ${gitTips.length} tips`);
    console.log(`- Deployment: ${deploymentTips.length} tips`);
    console.log(`- VS Code: ${vscodeTips.length} tips`);
    console.log(`- JavaScript: ${javascriptTips.length} tips`);
    console.log(`- Security: ${securityTips.length} tips`);
    console.log(`- AI: ${aiTips.length} tips`);
    console.log(`- DevOps: ${devopsTips.length} tips`);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding tips:', error);
    process.exit(1);
  }
}

seedTips();
