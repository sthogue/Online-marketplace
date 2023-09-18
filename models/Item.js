// import Model and DataTypes from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// This creates a class 'Item' which will use the Model class from Sequelize
class Item extends Model {}

// This initializes the Item model, each Item will have the following fields of data (id, category_name, etc.)
// each field of data has specific configurations to ensure the correct data is added to the tables and database
Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: { 
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL (12,2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Item',
  }
);

module.exports = Item;