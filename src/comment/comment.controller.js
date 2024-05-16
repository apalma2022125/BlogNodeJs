import Publication from '../publication/publication.model.js';
import Comment from '../comment/comment.model.js'

export const commentPost = async (req, res) =>{
    const { idPublication } = req.params;
    const {autorName, date, commentText} = req.body;

    const publication = await Publication.findById(idPublication);

    if (!publication) {
        return res.status(404).json({ 
            msg: 'Publication not found, plis try with other publication' 
        });
    }

    if (!publication.estado) {
        return res.status(500).json({ 
            msg: 'Cannot add comment because the publication was deleted' 
        });
    }
    
    const comment = new Comment({autorName, date, commentText, idPublication});

    await comment.save();

    res.status(202).json({
        msg: 'Content of the publication: ',
        comment
    });
}

export const commentsGet = async (req, res) => {
    const {limite, desde} = req.query;
    const { publiId } = req.params;
    const query = {estado: true, idPublication: publiId};

    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        comments
    });
}


export const commentPut = async (req, res) => {
    const { idPublication } = req.params;
    const {_id, estado, ...resto} = req.body;

    const commentUpdate = await Comment.findByIdAndUpdate(idPublication, resto, { new: true });

    res.status(200).json({
        msg: 'This comment was EDITED',
        commentUpdate
    });
}

export const commentDelete = async (req, res) => {
    const { idPublication } = req.params;

    const commentDeleted = await Comment.findByIdAndUpdate(idPublication, { estado: false });

        res.status(200).json({
            msg: 'This comment was DELETED',
            commentDeleted
        });
};