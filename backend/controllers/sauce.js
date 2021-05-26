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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée." }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée.'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée.' }))
    .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { likes: 1, usersLiked: req.body.userId, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Vous avez like.'}))
    .catch(error => res.status(400).json({ error }));
};

// if likes = 1
//     push dans l'array userLiked l'userId