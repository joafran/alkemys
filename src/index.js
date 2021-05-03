import server from './server';
import db from './db';
import dotenv from 'dotenv';
import Character from './models/Character';
import Movie from './models/Movie';
import Character_Movie from './models/Character_Movie';
dotenv.config();

const { PORT } = process.env;

db.sync({force: true}).then( async () => {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
    try {
        await Character.bulkCreate([
            { name: 'Linguini', story: 'A guy that is chef', age: 1, weight: 70},
            { name: 'Cat', story: 'A cat with boats', age: 12, weight: 3},
            { name: 'Many', story: 'An animal of the ice age', age: 150, weight: 530},
        ]);
        await Movie.bulkCreate([
            { title: 'Ratatouille', description: 'A disney movie', rating: 4, gender: 'Fiction'},
            { title: 'Shrek', description: 'A disney movie', rating: 5, gender: 'Comedy'},
            { title: 'Ice age', description: 'A disney movie', rating: 5, gender: 'Sobrenatural'},
        ]);
        await Character_Movie.bulkCreate([
            {characterId: 1, movieId: 1},
            {characterId: 2, movieId: 2},
            {characterId: 2, movieId: 3},
            {characterId: 3, movieId: 3},
        ]);
        console.log('<< DB CONNECTED >>')
    } catch (error) {
        console.error(error);
    };
});