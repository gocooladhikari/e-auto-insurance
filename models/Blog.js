const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {type: String},
    caption: {type: String},
    iamges: [{type: String}],
    description: {type: String},
    content: {type: String}
})

const Blog = mongoose.model('blogs', blogSchema)
module.exports = Blog