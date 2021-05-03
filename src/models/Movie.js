import { DataTypes } from 'sequelize';
import db from "../db";

const Movie = db.define('movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    movie_img: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            len: [1,5]
        }
    },
    gender: {
        type: DataTypes.STRING
    }

});

export default Movie;