var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development'])

router.get('/allStories', function(req,res,next){
  knex('story').select('*').then(function(result){
    console.log(result)
    res.json({stories:result})
  })
})

router.post('/addStory', function(req,res,next){
  knex('story').insert({
    title: req.body.form.title,
    link : req.body.form.link,
    image : req.body.form.image,
    summary : req.body.form.summary
  }).returning('id').then(function(response){
    console.log('done')
    res.send('200')
  })
})

router.post('/addComment', function(req,res,next){
  knex('comments').insert({
    text : req.body.form.comment,
    story_id : req.body.story_id
  }).then(function(respnse){
    res.send(200)
  })
})

router.get('/oneStory/:id', function(req,res,next){
  var response = {story: [], comments : [] }
  
  knex('story').where({
    id : req.params.id
  }).then(function(story){
    response.story = story
    return knex('comments').where({
      story_id : story[0].id
    })
  }).then(function(comments){
    console.log(comments)
    response.comments = comments
    res.json(response)
  })
})

/* GET home page. */
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public'
  })
});

module.exports = router;

/*  { title: 'Ringling Bros. to Retire All Circus Elephants in May — 2 Years Early',
     summary: 'The Ringling Bros. and Barnum & Bailey Circus is ending its elephant acts a year and a half early, and will retire all of its touring elephants in May.',
     image: 'http://media1.s-nbcnews.com/j/newscms/2015_28/1107676/150706-circus-animals-jpo-338a_53468ad4592c2beeb9cd61d7e2d8c84e.nbcnews-ux-2880-1000.jpg',
     link: 'http://www.nbcnews.com/business/business-news/ringling-bros-retire-all-circus-elephants-may-2-years-early-n493986' }

     */