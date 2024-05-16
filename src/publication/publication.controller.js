import Publication from './publication.model.js';

export const publicationPost = async (req, res) => {
    const { title, text, descript, img } = req.body;

    const publication = new Publication({ title, text, descript , img });

    await publication.save();

    res.status(202).json({
        publication
    });
}

export const publicationsGet = async (req, res) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        publications
    });
}

export const publicationById = async (req, res) => {
    const { id } = req.params;
    const publication = await Publication.findOne({ _id: id });

    if (!publication.estado) {
        res.status(400).json({
            msg: 'This publication was deleted :('
        });
    }

    res.status(200).json({
        publication
    });
}



export const publicationPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const publication = await Publication.findOne({ _id: id });

    if (!publication) {
        return res.status(404).json({ msg: "Publication not found, plis try with other publication" });
    }

    const publicationUpdate = await Publication.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: 'This publication was EDITED',
        publicationUpdate
    });
}

export const publicationDelete = async (req, res) => {
    const { id } = req.params;


    const publication = await Publication.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'This publication was DELETED',
        publication
    });
};