const express = require('express')
const Article = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {//GET FORM TO ADD BLOG
  res.render('articles/new', { article: new Article() })
})

router.post('/', async (req, res, next) => {//post ROUTE AFTER ADD FORM
  let article=await new Article({
    title:req.body.title,
    description:req.body.description,
    marksdown:req.body.markdown
  }).save();
  res.redirect('/')//redirect to index.ejs
});

router.get('/edit/:id', async (req, res) => {//GET EDIT PAGE
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})

router.put('/:id', async (req, res, next) => {//AFTER EDIT
  let article = await Article.findById(req.params.id)
   article.title=req.body.title;
   article.description=req.body.description;
   article.markdown=req.body.markdown; 
   article.save().then(res=>{
     res.redirect(`/articles/${article.slug}`)
   })
 })

router.get('/:slug', async (req, res) => {//get detail page
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router