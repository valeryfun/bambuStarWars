const mongoose = require('mongoose')

const PeopleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String
    }
})

module.exports = People = mongoose.model('people', PeopleSchema)