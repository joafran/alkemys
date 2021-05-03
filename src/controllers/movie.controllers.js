import Movie from '../models/Movie';
import { Op } from 'sequelize';

export const getMovies = async (req, res) => {
    const movies = await Movie.findAll(
        {
            attributes: ['title', 'movie_img', 'createdAt']
        }
        ); 
    if(!movies.length) return res.status(404).send('No movies available')
    return res.json(movies);
}

export const getMovie = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) {
        return res.status(404).send({message: `The movie doesn't exist`})
    } 
    return res.json(movie);

}

export const searchMovie = async (req, res) => {
    const { title, gender, order } = req.query;

    try {
        const movies = await Movie.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${title}%`
                        },
                    },
                    {
                        gender: {
                            [Op.iLike]: `%${gender}%`
                        }
                    }
                ]
            },
            order: [
                ['createdAt', order || 'ASC']
            ]
        })
        if(!movies.length) return res.status(404).send('Movie not found')
        return res.json(movies)
    } catch (error) {
        return res.status(404).send(error)
        
    }
}

export const editMovie = async (req, res) => {
    const { id } = req.params;
    const { title, description, movie_img, rating, gender } = req.body;
    try {
        const movie = await Movie.update(
            {
            title,
            description,
            movie_img,
            rating,
            gender
        },
        {
            where: { id },
            returning: true
        }
        )
        return res.json(movie[1][0]);
    } catch (error) {
        return res.status(400).send(error);
    }
}

export const createMovie = async (req, res) => {
    const { title, description, movie_img, rating, gender } = req.body;
    try {
        const movie = await Movie.create(
            {
                title,
                description,
                movie_img,
                rating,
                gender
            }
        );
        return res.json(movie);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        await Movie.destroy({where: { id }}
        )
        return res.json({message: 'Movie Deleted'});
    } catch (error) {
        return res.status(400).send(error);
    }    
}