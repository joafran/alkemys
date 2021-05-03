import Character from './Character';
import Character_Movie from './Character_Movie';
import Movie from './Movie';

Character_Movie.belongsTo(Movie);
Character_Movie.belongsTo(Character);

// Character.belongsToMany(Movie, {through: 'character_movies'})
// Movie.belongsToMany(Character, {through: 'character_movies'})

export { Character, Movie, Character_Movie }