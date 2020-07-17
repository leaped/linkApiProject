const crud = require("../Model/Database/crud")
const MongoClient = require('mongodb').MongoClient;

const findAllDocuments = function (request, response) {
    crud.findDocuments(result => {
        response.send(result)
    })
}

module.exports = {
    findAllDocuments
}