const menu = require('../routers/postRouter.js')
const posts = require('../data/posts.js')
const connection = require ('../data/db.js')
const { json } = require('express')


 
function index (req, res){
    const tag = req.query.tag

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results)=>{
        if (err) return res.status(500).json({error: 'query del database fallito'})
            res.json(results)
    })


    
    }



function show (req, res){
    
    const {id} = req.params

    const sql = 'SELECT * FROM posts WHERE ID = ?'
    connection.query(sql, [id], (err, results)=>{
        if (err) return res.status(500).json ({error: 'Query del database fallita'})
        if (results.length === 0) return res.status(404).json ({error: 'Post non trovato'})
        res.json(results[0])    
    })
}

function store (req, res){

    console.log(req.body)


    const newId = posts[posts.length - 1].id + 1 

   const newPosts = {
    id: newId,
    title: req.body.title,
    tags: req.body.tags
   }

    posts.push(newPosts)

    console.log(posts)
    
    res.status(201).json(newPosts)
}

function update (req, res){

    const id = parseInt(req.params.id)
    const finder = posts.find(item=> item.id === id)

    if(!finder) {

    res.status(404)

    return res.json({
        erro: 'Non trovato',
        message: 'Post non trovato'
    })
    }


    const {title, tags} = req.body

    finder.title = req.body.title
    finder.tags = req.body.tags

    console.log(posts)


    res.send(finder)
    
    // res.send(posts)
}

function modify (req, res) {

    const id = parseInt(req.params.id)
    const finder = posts.find(item=> item.id === id)

    if(!finder) {

        

    return res.json({
        erro: 'Non trovato',
        message: 'Post non trovato'
    })
    }

    finder.tags = req.body.tags

    console.log(posts)

    res.json(finder)
}

function destroy (req, res){
    
    const {id} = req.params

    connection.query('DELETE FROM posts WHERE id = ?', [id], (err)=>{
        if (err) return res.status (500).json({
            error: 'Errore nel cancellare un post'

        })

        res.sendStatus(204)
    })
    
}


module.exports = {index, show, store, update, modify, destroy}