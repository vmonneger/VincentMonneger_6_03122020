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

// exports.likeSauce = (req, res, next) => {
//     Sauce.updateOne({ _id: req.params.id }, { likes: 1, usersLiked: req.body.userId, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Vous avez like.'}))
//     .catch(error => res.status(400).json({ error }));
// };

// exports.likeSauce = (req, res, next) => {
//     const likes = req.body.likes;
//     switch (likes) {
//         case 1:
//             Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, usersLiked: req.body.userId, _id: req.params.id })
//             .then(() => res.status(200).json({ message: 'Vous avez like.'}))
//             .catch(error => res.status(400).json({ error }));
//             break;
//         case -1:
//             Sauce.updateOne({ _id: req.params.id }, { likes: 1, usersDisliked: req.body.userId, _id: req.params.id })
//             .then(() => res.status(200).json({ message: 'Vous ne likez pas.'}))
//             .catch(error => res.status(400).json({ error }));
//             break;
//     }
// };

exports.likeSauce = (req, res, next) => {
    const likes = req.body.like;
    const dislikes = req.body.dislike;
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        // if ((req.body.like = 1)) {
        //     Sauce.updateOne({ _id: req.params.id }, { $inc : { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id })
        //         .then(() => res.status(200).json({ message: 'Vous avez like.'}))
        //         .catch(error => res.status(400).json({ error }));
        // } else if ((req.body.like = -1)) {
        //     Sauce.updateOne({ _id: req.params.id }, { $inc : { likes: -1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id })
        //         .then(() => res.status(200).json({ message: 'Vous ne likez pas.'}))
        //         .catch(error => res.status(400).json({ error }));
        // }
        switch(likes){
            case 1:
                Sauce.updateOne({ _id: req.params.id }, { $inc : { likes: 1 }, $push: { usersLiked: req.body.userId }})
                .then(() => res.status(200).json({ message: 'Vous avez like.'}))
                .catch(error => res.status(400).json({ error }));
            break;
            case -1:
                Sauce.updateOne({ _id: req.params.id }, { $inc : { dislikes: 1 }, $push: { usersDisliked: req.body.userId }})
                .then(() => res.status(200).json({ message: "Vous n'avez  pas like."}))
                .catch(error => res.status(400).json({ error }));
            break;
            case 0:
                Sauce.updateOne({ _id: req.params.id }, { $inc : { likes: -1 }, $push: { usersDisliked: req.body.userId }})
                .then(() => res.status(200).json({ message: "Vous avez retirer votre avis."}))
                .catch(error => res.status(400).json({ error }));
            break;
        }
    })
    .catch(error => res.status(400).json({ error }));
};