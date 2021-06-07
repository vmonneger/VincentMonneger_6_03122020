const Sauce = require('../models/Sauce');

exports.allSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(201).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.oneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id })
    .then(sauce => res.status(201).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

exports.postSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce ({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée." }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée.'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée.' }))
    .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    const likes = req.body.like;
    userId = req.body.userId;
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        if (likes === 1) {
            Sauce.updateOne({ _id: req.params.id }, { $inc : { likes: 1 }, $push: { usersLiked: req.body.userId }})
            .then(() => res.status(200).json({ message: sauce}))
            .catch(error => res.status(400).json({ error }));
        } else if (likes === -1) {
            Sauce.updateOne({ _id: req.params.id }, { $inc : { dislikes: 1 }, $push: { usersDisliked: req.body.userId }})
            .then(() => res.status(200).json({ message: "Vous n'avez  pas like."}))
            .catch(error => res.status(400).json({ error }));
        } else if (likes === 0) {
            if (sauce.usersLiked.includes(userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc : { likes: -1 }, $pull: { usersLiked: req.body.userId }})
                .then(() => res.status(200).json({ message: "Vous avez retirer votre avis."}))
                .catch(error => res.status(400).json({ error }));
            } else if (sauce.usersDisliked.includes(userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc : { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }})
                .then(() => res.status(200).json({ message: "Vous avez retirer votre avis."}))
                .catch(error => res.status(400).json({ error }));
            }
        }
    })
    .catch(error => res.status(400).json({ error }));
};