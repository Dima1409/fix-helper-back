const {createNew} = require('./create')
const {deleteStuff} = require('./delete')
const {updateStuff} = require('./edit')
const {getAll} = require('./getAll')
const {getById} = require('./getById')
const {getByName} = require('./getByName')

module.exports = {
    createNew,
    deleteStuff,
    updateStuff,
    getAll,
    getById,
    getByName
}