import User from '../user/user.model.js';
import Publication from '../publication/publication.model.js';

export const existePublicationById = async (id = '') => {
    const existePublication = await Publication.findById(id);
    if (!existePublication){
        throw new Error(`This ${id} from a PUBLICATION don't exists in database`);
    }
}