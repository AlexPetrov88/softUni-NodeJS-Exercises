const { getAllArticles, createArticle } = require('../services/articlesServices');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const articles = await getAllArticles();
    // console.log(articles);
    res.render('articles', {
        title: 'Article',
        articles
    });
});

router.post('/', async (req, res) => {
    await createArticle(req.body.author, req.body.title, req.body.content);
    res.redirect('/articles');
})

module.exports = router;