// import sequelize in config folder, userData, itemData and User and Item models
const sequelize = require('../config/connection');
const { User, Item } = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');

// asynchronous function, force: true drops any tables that already exist with the same name and creates a new one (resets database)
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // this method puts userData into the User table
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // inserts itemData into the Item table
  for (const item of itemData) {
    await Item.create({
      ...item,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
