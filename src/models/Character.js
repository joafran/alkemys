import { DataTypes } from 'sequelize';
import db from "../db";

const Character = db.define('character', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name must not be empty' }
        }
    },
    story: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.INTEGER
    },
    img: {
        type: DataTypes.STRING
    }
},
{
    timestamps: false
}
);

export default Character;