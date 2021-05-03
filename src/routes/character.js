import { Router } from 'express';
import { 
    getCharacters,
    getCharacter,
    editCharacter,
    createCharacter,
    deleteCharacter,
    searchCharacter,
} from '../controllers/character.controllers';

const router = Router();

router.get('/', getCharacters);
router.get('/search', searchCharacter);
router.get('/:id', getCharacter);
router.put('/:id', editCharacter);
router.post('/', createCharacter);
router.delete('/:id', deleteCharacter);


export default router;