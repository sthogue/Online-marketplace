// import data from User and Item models
const User = require('./User');
const Item = require('./Item');

// each User is able to have 'many' items that are associated with them
// user_id is the foreign key, it is the column in the 'Item' table that will link that item to a User
// if a User is deleted, it will 'cascade' through and delete all items that are affiliated with that User
User.hasMany(Item, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// each Item will belong to just ONE User
Item.belongsTo(User, {
  foreignKey: 'user_id'
});

// export the User and Item models to be used in other sections of the web app
module.exports = { User, Item };
