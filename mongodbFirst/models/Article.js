const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    author: {type: String},
    title: { type: String, minLength: 2 },
    content: { type: String, minLength: 2 }
}) 

const Article = model('Article', articleSchema);

module.exports = Article;