const menu = require('../routers/postRouter.js')
const posts = require('../data/posts.js')


 
function index (req, res){
    const tag = req.query.tag

    


    let filteredTags = posts

    if(tag){
        filteredTags = posts.filter(item =>{
            const lowerTags = item.tags.map(tag => tag.toLowerCase()).includes(tag.toLowerCase())

            // return lowerTags
            })
        }

        res.json(posts)
    }



function show (req, res){
    const id = parseInt(req.params.id)
    const finder = posts.find(item=> item.id === id)

    if(!finder) {

        res.status(404)

        return res.json({
            erro: 'Non trovato',
            message: 'Post non trovato'
        })
    }

    res.send(finder)
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
    
     const id = parseInt(req.params.id)
    const finder = posts.find(item=> item.id === id)

    if(!finder) {

    res.status(404)

        return res.json({
        erro: 'Non trovato',
        message: 'Post non trovato'
        })
    }

    posts.splice(posts.indexOf(posts), 1)

    console.log(posts)

    res.sendStatus(204)

}


module.exports = {index, show, store, update, modify, destroy}