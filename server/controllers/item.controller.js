const Item = require('../database-mongo/Item.model.js');

const selectAll = function (req, res) {
    Item.find({})
        .then((items) => {
            res.status(200).send(items);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

const addItems = function (req, res) {
  console.log(req.body);
    Item.insertMany(req.body)
        .then((items) => {
            res.status(200).send(items);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};


const updateItem = function (req, res) {
    Item.updateOne({ _id: req.body.id }, { $set: req.body })
        .then((items) => {
            res.status(200).send(items);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

const deleteItem = function (req, res) {
    Item.deleteOne({ _id: req.params.id })
        .then((items) => {
            res.status(200).send(items);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

module.exports = { selectAll, addItems, updateItem, deleteItem };