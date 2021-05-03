import { DataTypes } from 'sequelize';
import db from "../db";

const User = db.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: { msg: 'Email must not be empty' }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

export default User;