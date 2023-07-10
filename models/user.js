const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // Ensure unique usernames
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8], //password must be at least 8 characters long
            },
        },
    },
    {
        sequelize,
        timestamps: true,  // Enable timestamps
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
