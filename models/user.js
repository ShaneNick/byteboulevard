const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password);
    }
}

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
        hooks: {
            beforeCreate: async (newUserData) => {
                try {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                } catch (err) {
                    console.log(err);
                    // Handle the error appropriately
                }
            },
            beforeUpdate: async (updatedUserData) => {
                try {
                    if (updatedUserData.password) { // Add this check
                        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    }
                    return updatedUserData;
                } catch (err) {
                    console.log(err);
                    // Handle the error appropriatelyHere's the continuation of the `models/user.js`:
                }
            },
        },
        sequelize,
        timestamps: true,  // Enable timestamps
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
