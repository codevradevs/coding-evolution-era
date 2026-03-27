require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('../../models/index');

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await User.findOne({ email: 'codevradevs@gmail.com' });
  if (existing) {
    existing.role = 'admin';
    existing.password = await bcrypt.hash('12345678', 10);
    await existing.save();
    console.log('Admin user updated.');
  } else {
    await User.create({
      name: 'Codevra Admin',
      email: 'codevradevs@gmail.com',
      password: await bcrypt.hash('12345678', 10),
      role: 'admin',
      provider: 'local',
    });
    console.log('Admin user created.');
  }

  await mongoose.disconnect();
}

seedAdmin().catch(err => { console.error(err); process.exit(1); });
