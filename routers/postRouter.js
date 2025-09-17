const express = require("express")
const router = express.Router()

const menu = require('../data/posts.js')


const postController = require('../controller/postController.js')


router.get('/', (req, res) =>{
    res.send('La mia Pasticceria')
})

// index
router.get('/posts', postController.index )
   

// show
router.get('/posts/:id', postController.show )

// create

router.post('/posts', postController.store )

// update

router.put('/posts/:id', postController.update )

// patch

router.patch('/posts/:id', postController.modify)

// delete

router.delete('/posts/:id', postController.destroy)



module.exports = router