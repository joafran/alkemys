import { Character, Movie, Character_Movie } from '../models';
import { Op } from 'sequelize';
// import { Character, Movie } from '../models';

export const getCharacters = async (req, res) => {
    const characters = await Character.findAll(
        {
            attributes: ['name', 'img']
        }
        ); 
    return res.json(characters);
}

// /characters/:id
export const getCharacter = async (req, res) => {
    const { id } = req.params;

    const character = await Character.findByPk(id);
    if(!character) {
        return res.status(404).json({message: `The character doesn't exist`})
    }

    try {
        const characterMovies = await Character_Movie.findAll(
            {
                where: {characterId: id},
                include: [Movie]
            }
        );
        let movies = [];
        characterMovies.forEach( el => movies.push(el.movie));     
        
        return res.json({character, movies});
    
    } catch (error) {
        console.error(error);
    }
}

export const searchCharacter = async (req, res) => {
    let { name, age, weight, movie } = req.query;
    age = age ? age : null;
    weight = weight ? weight : null;
    try {
        const matchedCharacters = await Character.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${name}%`
                        },
                    },
                    {
                        age,
                    },
                    {
                        weight
                    }                    
                ]
            }
        });
        if(!matchedCharacters.length) return res.status(404).send('Not found')
        return res.json(matchedCharacters);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const editCharacter = async (req, res) => {
    const { id } = req.params;
    const { name, img, story, age, weight } = req.body;
    try {
        const character = await Character.update(
            {
            name,
            img,
            story,
            age,
            weight
        },
        {
            where: { id },
            returning: true
        }
        )
        return res.json(character[1][0]);
    } catch (error) {
        return res.status(400).send(error);
    }    
}

export const createCharacter = async (req, res) => {
    const { name, img, story, age, weight } = req.body;
    try {
        const character = await Character.create(
            {
                name,
                img,
                story,
                age,
                weight
            }
        );
        return res.json(character);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const deleteCharacter = async (req, res) => {
    const { id } = req.params;
    try {
        await Character.destroy({where: { id }}
        )
        return res.json({message: 'Character Deleted'});
    } catch (error) {
        return res.status(400).send(error);
    }    
}