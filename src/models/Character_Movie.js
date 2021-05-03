import { DataTypes } from 'sequelize';
import db from '../db';

const Character_Movie = db.define('character_movie', {
    characterId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'characters',
            key: 'id'
        }
    },
    movieId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'movies',
            key: 'id'
        }
    }
},
{
    timestamps: false
}
);

export default Character_Movie;